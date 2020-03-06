/**
 *  上传
 *  gulp upload
 *
 *  删除七牛文件（logs里的文件名，带后缀txt）
 *  set QINIU_NAME=online-xxxx.txt
 *  gulp remove
 *
 *  下载七牛文件（logs里的文件名，带后缀txt）
 *  set QINIU_NAME=online-xxxx.txt
 *  gulp download
 */

import gulp from 'gulp';

import os from 'os';
import fs from 'fs';
import walk from 'walk';
import path from 'path';
import qiniu from 'qiniu';
import moment from 'moment';
import request from 'request';
import apollo from '@iyourcar/apollo';

gulp.task('fetchQiniuConfig', async () => {
  let config = await new Promise((resolve, reject) => {
    apollo
      .get('prod', {
        appId: 'iyourcar-frontend-admin',
        namespaceName: 'application',
      })
      .then((res) => {
        resolve(res);
      });
  });

  // 七牛
  qiniu.conf.ACCESS_KEY = config['qiniu.conf.ACCESS_KEY'];
  qiniu.conf.SECRET_KEY = config['qiniu.conf.SECRET_KEY'];
});

const bucket = 'fcdn',
  onlineFloder = require('./package.json').name;

/**
 * 上传 命令行设置
 * @param QINIU_UPLOAD_NAME 为日志文件名 （可选）
 */
gulp.task('upload', ['fetchQiniuConfig'], () => {
  //要上传的空间
  const localFloder = 'dist',
    extFiles = ['html'],
    extPath = ['ueditor'],
    localLogs = [],
    onlineLogs = [];

  const walker = walk.walk(localFloder);

  walker.on('file', (root, stat, next) => {
    // 过滤目录
    const line = os.platform() == 'win32' ? '\\' : '/';
    for (var i in extPath) {
      if (!!~root.indexOf(line + extPath[i])) {
        next();
        return false;
      }
    }

    // 过滤扩展名文件
    let fileExt = path.parse(stat.name).ext;
    for (var i in extFiles) {
      if (fileExt == '.' + extFiles[i]) {
        next();
        return false;
      }
    }

    // 组装路径
    let filePath = path.format({
        dir: root,
        base: stat.name,
      }),
      key = path.format({
        dir: onlineFloder,
        base: filePath,
      });

    // 系统兼容，替换斜杠
    if (os.platform() == 'win32') {
      filePath = filePath.replace(/\\/g, '/');
      key = key.replace(/\\/g, '/');
    }

    //删除本地目录名
    key = key.replace(`${localFloder}/`, '');

    localLogs.push(filePath);
    onlineLogs.push(key);

    const token = new qiniu.rs.PutPolicy(bucket + ':' + key).token();

    uploadFile(token, key, filePath, next);
  });

  walker.on('end', () => {
    let logsTime =
        process.env.QINIU_UPLOAD_NAME ||
        moment(new Date().getTime()).format('YYYY-MM-DD---HH-mm-ss'),
      logsPath = path.format({
        dir: __dirname,
        base: 'logs/',
      }),
      localFileName = logsPath + ('local-' + logsTime + '.txt'),
      onlineFileName = logsPath + ('online-' + logsTime + '.txt');

    if (!fs.existsSync(logsPath)) {
      fs.mkdirSync(logsPath);
    }

    fs.writeFileSync(localFileName, localLogs.join('\r'));
    fs.writeFileSync(onlineFileName, onlineLogs.join('\r'));

    console.log('上传完毕');
  });

  // //构造上传函数
  function uploadFile(uptoken, key, localFile, next) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, (err, ret) => {
      if (!err) {
        console.log('上传成功：' + ret.key);
        next();
        // 上传成功， 处理返回值
        // console.log(ret.hash, ret.key, ret.persistentId);
      } else {
        // 上传失败， 处理返回代码
        throw err;
      }
    });
  }
});

/**
 * 下载 需在命令行设置 QINIU_NAME 为文件名
 */
gulp.task('download', ['fetchQiniuConfig'], () => {
  if (!process.env.QINIU_NAME) {
    throw '请输入 QINIU_NAME 文件名';
  }

  const downloadPath = path.format({
    dir: __dirname,
    base: 'logs/' + process.env.QINIU_NAME,
  });

  const aFiles = fs.readFileSync(downloadPath, 'utf-8').split(/\r/);

  let downloadLen = 0;

  downloadFile(aFiles);

  function downloadFile(aFiles) {
    if (downloadLen == aFiles.length) {
      console.log('下载完毕');
      return false;
    }

    const url = 'http://res.suv666.com/' + aFiles[downloadLen],
      policy = new qiniu.rs.GetPolicy(),
      downloadUrl = policy.makeRequest(url),
      floder = path.format({
        dir: __dirname,
        base: 'download/',
      });

    let filename = floder + path.parse(aFiles[downloadLen]).base;

    if (!fs.existsSync(floder)) {
      fs.mkdirSync(floder);
    }

    var stream = fs.createWriteStream(filename);
    request(downloadUrl)
      .pipe(stream)
      .on('close', () => {
        if (os.platform() == 'win32') {
          filename = filename.replace(/\\/g, '/');
        }
        console.log('下载成功：' + filename);
        downloadLen++;
        downloadFile(aFiles);
      });
  }
});

/**
 * 删除 需在命令行设置 QINIU_NAME 为文件名
 */
gulp.task('remove', ['fetchQiniuConfig'], () => {
  if (!process.env.QINIU_NAME) {
    throw '请输入 QINIU_NAME 文件名';
  }

  const deletePath = path.format({
    dir: __dirname,
    base: 'logs/' + process.env.QINIU_NAME,
  });

  const client = new qiniu.rs.Client(),
    aFiles = fs.readFileSync(deletePath, 'utf-8').split(/\r/);

  let removeLen = 0;

  removeFile(bucket, aFiles);

  function removeFile(bucket, aFiles) {
    if (removeLen == aFiles.length) {
      console.log('删除完毕');
      return false;
    }

    client.remove(bucket, aFiles[removeLen], (err, ret) => {
      if (err) {
        throw err;
      }
      console.log(`删除成功:${aFiles[removeLen]}`);
      removeLen++;
      removeFile(bucket, aFiles);
    });
  }
});
