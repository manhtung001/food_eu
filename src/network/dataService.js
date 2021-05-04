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
  getListPending: (params) => {
    let url = 'api/shipper/list-order-pending';
    return request.post(params, url);
  },
  getListShipping: (params) => {
    let url = 'api/shipper/list-order-shipping';
    return request.post(params, url);
  },
  getListShipped: (params) => {
    let url = 'api/shipper/list-order-shipped';
    return request.post(params, url);
  },
  getListCancelled: (params) => {
    let url = 'api/shipper/list-order-cancel';
    return request.post(params, url);
  },
  getOrderDetail: (params) => {
    let url = 'api/shipper/order-detail';
    return request.post(params, url);
  },
  shipperAcceptOrder: (params) => {
    let url = 'api/shipper/accept-order';
    return request.post(params, url);
  },
  shipperCancelOrder: (params) => {
    let url = 'api/shipper/cancel-order';
    return request.post(params, url);
  },
  shipperShippedOrder: (params) => {
    let url = 'api/shipper/shipped-order';
    return request.post(params, url);
  },
  getListNotification: (params) => {
    let url = 'api/notification/get-all-notification';
    return request.post(params, url);
  },
  updateNotiAllIsRead: (params) => {
    let url = 'api/notification/update-all-is-read';
    return request.post(params, url);
  },
  updateNotiIsRead: (params) => {
    let url = 'api/notification/update-is-read';
    return request.post(params, url);
  }



};

export default dataService;
