import net from 'src/net';

const http = net.initHttp();

export const aCommonGet = (params) =>
  http.$get(
    `http://res.youcheyihou.com/test/node/datar/mock/4c89284694a7c5f195e75dc2bd15364a/adminTemplate/getCommonApi`,
    params
  );
export const aCommonPost = (params) =>
  http.$post(
    `http://res.youcheyihou.com/test/node/datar/mock/4c89284694a7c5f195e75dc2bd15364a/adminTemplate/postCommonApi`,
    params
  );

export const aGetMeInfo = (params) => http.$post('common/user_info', params);
