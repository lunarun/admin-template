const { apiDomain, projectApi } = process.env;
const projectUrlPrefix = apiDomain + projectApi;
export default {
  fulfilled(request) {
    try {
      if (!/^(http(|s):\/\/)|^\/\//.test(request.url))
        request.url = projectUrlPrefix + request.url;
      return request;
    } catch (err) {
      throw err;
    }
  },
};
