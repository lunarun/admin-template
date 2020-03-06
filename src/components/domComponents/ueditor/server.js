import Vue from 'vue';
import { MessageBox } from 'element-ui';
import * as qiniu from 'qiniu-js';
import { randomString } from '@/utils';
import net from '../../../net';
/**
 * 七牛token缓存列表
 * [{type: '', result: '', expire: ''}]
 */
const qiniuTokenList = [];

class service extends Vue {
  constructor() {
    super();
  }

  async aVideoUploadToQiniu(params, progressFn) {
    const type = params.type || 'cyfl_bonus_event_video';
    const time = Date.now();
    if (!type) {
      MessageBox('上传视频参数有误', '提示');
      return Promise.reject(new Error('上传视频的参数有误'));
    }
    let qnConfig = qiniuTokenList.find((item) => item.type === type) || {};
    if (!qnConfig.expire || qnConfig.expire < time) {
      const tempConfig = await net
        .initHttp()
        .$post('common/qiniu/config', { type: type });
      // const tempConfig = await aGetQiniuConfig({
      //   type
      // });
      if (!tempConfig) return;
      const tokenResult = tempConfig.result.qiniu_config;
      if (!tokenResult || !tokenResult.token) {
        MessageBox('获取七牛token出错', '提示');
        return Promise.reject(new Error('获取七牛token出错'));
      }
      // let _item = qiniuTokenList[qiniuTokenList.]
      const expire = time + 1000 * 60 * 50;
      const tempItem = {
        type,
        result: tokenResult,
        expire,
      };
      if (!qiniuTokenList.length) {
        qiniuTokenList.push(tempItem);
      } else {
        const index = qiniuTokenList.indexOf(qnConfig);
        qiniuTokenList[index] = tempItem;
      }
      qnConfig = tempItem;
    }

    const str = randomString(8);
    const fileType =
      params.file.name.indexOf('.') === -1
        ? ''
        : params.file.name.split('.').pop();
    const key = `${qnConfig.result.sub_url}${str}_${time}.${fileType}`;
    // qiniu.region.z0: 代表华东区域
    // qiniu.region.z1: 代表华北区域
    // qiniu.region.z2: 代表华南区域
    // qiniu.region.na0: 代表北美区域
    // qiniu.region.as0: 代表东南亚区域
    const upConfig = {
      useCdnDomain: true,
      // region: qiniu.region.z2
    };
    const observable = qiniu.upload(
      params.file,
      key,
      qnConfig.result.token,
      {},
      upConfig
    );
    return new Promise((resolve, reject) => {
      observable.subscribe({
        // 上传进度
        next: (res) => {
          if (progressFn) progressFn(res);
        },
        error: (res) => {
          MessageBox('上传文件出错了', '提示');
          reject(res);
        },
        complete: (res) => {
          res.url = qnConfig.result.domain + res.key;
          resolve(res);
        },
      });
    });
  }
}
export default service;
