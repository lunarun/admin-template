import service from './service.js';

export default {
  data() {
    return {
      postApi: '',
      commonGet: '',
      commonPost: '',
    };
  },
  created() {
    this._$service = new service(this.refreshList);
  },
  mounted() {
    this._$service.postApi().then((data) => {
      this.postApi = data;
    });

    this._$service.commonGet().then((data) => {
      this.commonGet = data;
    });

    this._$service.commonPost().then((data) => {
      this.commonPost = data;
    });
  },
};
