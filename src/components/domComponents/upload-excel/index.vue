<script>
/**
 * props
 * @beforeUpload 上传前的判断函数，非必传，返回为false会中断上传，true的时候会继续上传
 * @onSuccess 上传成功的回调函数，参数为一个对象{results, header}，results为数据列表，header为表头数组
 * @uploadType 上传方式，drag：拖拽，click：点击
 * @dragClassName 采用拖拽上传方式的组件类名
 *
 */
import XLSX from 'xlsx';
export default {
  props: {
    beforeUpload: Function,
    dragClassName: String,
    onSuccess: Function,
    uploadType: {
      type: String,
      default: 'drag',
    },
  },
  name: 'uploadExcelComponent',
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null,
      },
    };
  },
  computed: {
    dragClass() {
      return this.dragClassName || 'drop';
    },
  },
  methods: {
    generateData({ header, results }) {
      this.excelData.header = header;
      this.excelData.results = results;
      this.onSuccess && this.onSuccess(this.excelData);
    },
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.loading) return;
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        this.$errorMessage('一次只允许上传一个文件！');

        return;
      }
      const rawFile = files[0]; // only use files[0]

      if (!this.isExcel(rawFile)) {
        this.$errorMessage('只支持上传.xlsx, .xls, .csv为后缀格式的文件！');
        return false;
      }
      this.upload(rawFile);
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click();
    },
    handleClick(e) {
      const files = e.target.files;

      const rawFile = files[0];
      if (!rawFile) return;
      this.upload(rawFile);
    },
    upload(rawFile) {
      // 可重复上传同一个文件
      const inputEle = this.$refs['excel-upload-input'];
      inputEle && (inputEle.value = null);

      // 无上传前的判断函数，就直接读取文件
      if (!this.beforeUpload) {
        this.readerData(rawFile);
        return;
      }
      const before = this.beforeUpload(rawFile);
      if (before) {
        this.readerData(rawFile);
      }
    },
    readerData(rawFile) {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const header = this.getHeaderRow(worksheet);
          const results = XLSX.utils.sheet_to_json(worksheet);
          this.generateData({ header, results });
          this.loading = false;
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },
    getHeaderRow(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet['!ref']);
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    },
  },
};
</script>
<template>
  <div>
    <div
      :class="dragClass"
      @drop="handleDrop"
      @dragover="handleDragover"
      @dragenter="handleDragover"
      v-if="uploadType === 'drag'"
    >
      拖取execl文件至该区域
    </div>
    <div v-if="uploadType === 'click'">
      <input
        ref="excel-upload-input"
        class="excel-upload-input"
        type="file"
        accept=".xlsx, .xls"
        @change="handleClick"
      />
      <el-button :loading="loading" type="primary" @click="handleUpload">
        浏览
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.excel-upload-input {
  display: none;
  z-index: -9999;
}
.drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
