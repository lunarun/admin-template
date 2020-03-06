import * as qiniuJs from 'qiniu-js';
import MD5 from 'md5';
import net from '../../../net';

/**
 * 七牛上传组件
 * */
class QuniuUploader {
  tokenConfig = {};
  fileSource = {};

  /**
   * 初始化上传配置
   * @params type     {String} 获取上传token用类型; [必填]
   * */
  async upload({ type }) {
    if (!type) {
      throw '缺少上传必须参数';
    }

    // 没有缓存配置则重新获取
    if (Object.keys(this.tokenConfig) <= 0) {
      this.tokenConfig = await this.getToken(type);
    }
  }

  /**
   * 实际执行上传方法
   * @params fileSource     {Object} 文件对象
   * @params path     {String} 上传路径(不包含域名)
   * @params token    {String} 上传密钥
   * @params putExtra {Object} 七牛上传配置
   * @params config   {Object} 七牛上传配置
   * */
  uploading(
    fileSource,
    putExtra,
    config = { useCdnDomain: true, region: qiniuJs.region.z0 }
  ) {
    this.fileSource = fileSource;

    const { name: fileName } = fileSource.file;
    const { sub_url: subUrl, token } = this.tokenConfig;

    const newName = name ? name : this.getUploadUrlName(fileName);
    const filePath = `${subUrl}/${newName}`;
    const { domain } = this.tokenConfig;
    const observable = qiniuJs.upload(
      fileSource.file,
      filePath,
      token,
      putExtra,
      config
    );

    return new Promise((resolve, reject) => {
      this.subscription = observable.subscribe({
        next: (res) => {
          this.calcProgress(res, fileSource);
        },
        error: (res) => {
          reject({ response: res });
        },
        complete: (res) => {
          this.updateStatus(fileSource, 'success');
          resolve({ path: filePath, domain, response: res });
        },
      });
    });
  }

  calcProgress(res, fileSource) {
    if (Number(res.total.loaded) && Number(res.total.size)) {
      fileSource.progress = parseInt(
        (Number(res.total.loaded) / Number(res.total.size)) * 100,
        10
      );
    }
  }

  updateStatus(fileSource, status) {
    fileSource.uploadStatus = status;
  }

  /**
   * 终止上传
   * */
  abort() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.updateStatus(this.fileSource, 'wait');
    }
  }

  /**
   * 获取七牛上传配置
   * @params type {String} 获取上传token用类型
   * */
  getToken(type) {
    return new Promise((resolve, reject) => {
      net
        .initHttp()
        .$post('common/qiniu/config', { type: 'backend_article_image' })
        .then(({ result }) => {
          resolve(result.qiniu_config);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * 生成新文件名
   * @params fileName {String} 原文件名
   * */
  getUploadUrlName(fileName) {
    const reg = /(.+)(\.+[^\.]+$)/.exec(fileName);
    const name = reg[1];
    const ext = reg[2];
    const newName = MD5(name + new Date().getTime());
    return `${newName}${ext}`;
  }
}

export { QuniuUploader };
