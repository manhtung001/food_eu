import request from './request';
let dataService = {
  login: (params) => {
    let url = 'api/user/login';
    return request.post(params, url);
  },
  register: (params) => {
    let url = 'api/user/register';
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
    let url = 'api/product/searchByCategory';
    return request.get(url);
  },
  getProductByIdShop: (id) => {
    if (id) {
      let url = `api/product/getproductbyidShop/${id}`;
      return request.get(url);
    }
    return [];
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
