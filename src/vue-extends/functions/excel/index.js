import Vue from 'vue';
// 正在进行导出
let EXPORTING = false;

/**
 * 将数据格式化成插件所需的格式
 * @param {Array} filterVal 需要导出的字段的key值所组成的数组
 * @param {Array} jsonData 整个数据数组
 */
const formatJson = (filterVal, jsonData) => {
  return jsonData.map((v) => filterVal.map((j) => v[j]));
};

const requredData = (list, warningTxt) => {
  return new Promise((resolve) => {
    if (Array.isArray(list) && list.length > 0) {
      return resolve();
    }
    return Vue.prototype.$warningMessage(warningTxt);
  });
};

/**
 * 将数组数据导出为excel文件
 * @param {Array} tHeader excel文件表头数组，如[作者', '标题', '阅读量', '时间', '状态', '审核'],
 * @param {Array} filterVal excel文件导出的列的key值所组成的数组，和tHeader要一一对应，如[author', 'title', 'pageviews', 'time', 'disabled', 'reviewer']
 * @param {Array} data 要操作的列表项
 * @param {String} [filename='excel_list'] 文件名
 * @param {Boolean} [autoWidth=true] 单元格是否要自适应宽度
 * @param {String} [bookType='xlsx'] 导出的文件类型
 * @param {Function} callback 回调函数
 */
const $exportExcel = async ({
  tHeader,
  filterVal,
  data,
  filename,
  autoWidth,
  bookType,
  callback,
}) => {
  if (EXPORTING) {
    return Vue.prototype.$warningMessage('正在导出，请不要重复操作...');
  }
  await requredData(tHeader, 'excel文件头部字段组成的数组列表为空');
  await requredData(filterVal, '要导出的列的key值所组成的数组列表为空');
  await requredData(data, '要导出的数据列表为空！');
  EXPORTING = true;
  const list = formatJson(filterVal, data);
  import('@/static_resource/Export2Excel').then((excel) => {
    excel.export_json_to_excel({
      header: tHeader,
      data: list,
      filename,
      autoWidth,
      bookType,
    });
    EXPORTING = false;
    callback && callback();
  });
};

export default {
  $exportExcel,
};
