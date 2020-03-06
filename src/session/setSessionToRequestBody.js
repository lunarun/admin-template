import MD5 from './md5';
export default function(requestData = null) {
  if (!requestData) throw 'Error: 请传入requestData';

  const { sid, token } = this.getInstance().getSession();
  const sign = MD5(token + requestData.data);

  Object.assign(requestData, { sid, sign });
}
