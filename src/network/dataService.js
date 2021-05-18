import request from './request';
let dataService = {
  login: (params) => {
    let url = 'api/shipper/login';
    return request.post(params, url);
  },
  refreshToken: (params, token) => {
    let url = 'api/shipper/renew-token';
    return request.post(params, url, token);
  },

  getListShop: () => {
    let url = 'api/shop/getAll';
    return request.get(url);
  },
  getListFood: () => {
    let url = 'api/product/getproductbyidProduct/1';
    return request.get(url);
  }

  // getListNotification: (params) => {
  //   let url = 'api/notification/get-all-notification';
  //   return request.post(params, url);
  // },
  // updateNotiAllIsRead: (params) => {
  //   let url = 'api/notification/update-all-is-read';
  //   return request.post(params, url);
  // },
  // updateNotiIsRead: (params) => {
  //   let url = 'api/notification/update-is-read';
  //   return request.post(params, url);
  // }
};

export default dataService;
