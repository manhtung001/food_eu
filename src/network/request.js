// import api from './index'
// import config from '../config';
import helpers from '../globals/helpers';
import { Platform } from 'react-native';

const HOST = 'https://appfoodorder.herokuapp.com';

const request = {
  get: (url) => {
    url = HOST + '/' + url;
    return fetch(url)
      .catch((err) => {
        console.log(err);
      })
      .then((response) => response.json());
  },
  put: async (data, url) => {
    url = HOST + '/' + url;
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'vi'
    };
    console.log(
      '\n %c-----------------------------[ POST ]-------------------------------------- \n [' +
        url +
        ' ] \n ',
      'color:red;font-size:15px',
      headers,
      data,
      ' \n----------------------------------------------------------------------------- \n'
    );
    try {
      let response = await fetch(
        url,
        {
          method: 'PUT',
          headers,
          'Accept-Language': 'vi',
          body: JSON.stringify(data)
        },
        10000
      );
      console.log('All Response', response);
      let rs = await response.json();
      console.log(
        '\n %c-----------------------------[ RESPONSE ]------------------------------------ \n [' +
          url +
          ' ] \n ',
        'color:green;font-size:15px',
        'Data Post',
        data,
        '\n',
        ' Respone  ',
        rs,
        ' \n----------------------------------------------------------------------------- \n'
      );
      switch (response.status) {
        case 200:
          return rs;
        // case 401:
        //   removeToken();
        //   return;
        default: {
          throw rs;
        }
      }
    } catch (error) {
      console.log(error);
      if (error.msg) {
        // helpers.showMessage(error.msg);
      }
      return error;
    }
  },
  post: async (data, url, token) => {
    url = HOST + '/' + url;
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (token || helpers.getToken()),
      'Accept-Language': 'vi'
    };
    console.log(
      '\n %c-----------------------------[ POST ]-------------------------------------- \n [' +
        url +
        ' ] \n ',
      'color:red;font-size:15px',
      headers,
      data,
      ' \n----------------------------------------------------------------------------- \n'
    );
    try {
      let response = await fetch(
        url,
        {
          method: 'POST',
          headers,
          'Accept-Language': 'vi',
          body: JSON.stringify(data)
        },
        10000
      );
      console.log('All Response', response);
      let rs = await response.json();
      console.log(
        '\n %c-----------------------------[ RESPONSE ]------------------------------------ \n [' +
          url +
          ' ] \n ',
        'color:green;font-size:15px',
        'Data Post',
        data,
        '\n',
        ' Respone  ',
        rs,
        ' \n----------------------------------------------------------------------------- \n'
      );
      switch (response.status) {
        case 200:
          return rs;
        // case 401:
        //   removeToken();
        //   return;
        default: {
          throw rs;
        }
      }
    } catch (error) {
      console.log(error);
      if (error.msg) {
        // helpers.showMessage(error.msg);
      }
      return error;
    }
  }
};

// let removeToken = async () => {
//   helpers.setListCode([]);
//   helpers.setUserInfo({});
//   helpers.setToken(null);
//   helpers.hideLoading();
// };

export default request;
