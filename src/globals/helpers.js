import dataService from './../network/dataService';
import { Linking } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import 'intl';
import 'intl/locale-data/jsonp/vi';

let store = null;
const helpers = {
  setStore: (newStore) => {
    store = newStore;
  },
  showLoading: () => {
    store.dispatch({ type: 'SHOW_LOADING' });
  },
  showMessage: ({ content, title, callBack, nameClose }) => {
    store.dispatch({
      type: 'SHOW_MESSAGE',
      content: content,
      title,
      funcMsg: callBack,
      nameClose
    });
  },
  hideModal: () => {
    store.dispatch({ type: 'HIDE_MODAL' });
  },
  showComfirm: ({
    title,
    content,
    textOk,
    textCancer,
    onOk,
    onCancer,
    confirmImgUrl
  }) => {
    store.dispatch({
      type: 'SHOW_CONFIRM',
      title,
      content,
      textOk,
      textCancer,
      onOk,
      onCancer,
      confirmImgUrl
    });
  },

  getToken: () => {
    return store ? store.getState().userState.token : undefined;
  },

  fonts: (font) => {
    let fontFamily = 'iCielVAGRoundedNext-Light';
    switch (font) {
      case 'bold':
        fontFamily = 'iCielVAGRoundedNext-Bold';
        break;
      case 'regular':
        fontFamily = 'iCielVAGRoundedNext-Regular';
        break;
      case 'medium':
        fontFamily = 'iCielVAGRoundedNext-Medium';
        break;
      case 'light':
        fontFamily = 'iCielVAGRoundedNext-Light';
        break;
      case 'demiBold':
        fontFamily = 'iCielVAGRoundedNext-DemiBold';
        break;
      case 'lightItalic':
        fontFamily = 'iCielVAGRoundedNext-LightItalic';
        break;
      default:
        fontFamily = 'iCielVAGRoundedNext-Light';
    }
    return fontFamily;
  },
  formatMoney: (money) => {
    var formatter = new Intl.NumberFormat('vi-VI');
    return formatter.format(money);
  },
  refreshToken: async () => {
    let token = null;
    try {
      token = await AsyncStorage.getItem('token');
      console.log('[refreshToken] true: ', token);
    } catch (e) {
      console.log('[refreshToken]: ', e);
    }
    let result = await dataService.refreshToken({}, token);
    if (result.code == 0) {
      store.dispatch({
        type: 'SET_USER_INFO',
        data: result.data.shipperInfo
      });
      store.dispatch({
        type: 'SET_TOKEN',
        data: result.data.token
      });
      await AsyncStorage.setItem('token', result.data.token);
    }
  },

  login: async (data) => {
    let result = await dataService.login(data);

    if (result?.token) {
      store.dispatch({
        type: 'SET_USER_INFO',
        data: result?.user
      });
      store.dispatch({
        type: 'SET_TOKEN',
        data: result.token
      });
      await AsyncStorage.setItem('token', result.token);
    }
    return result;
  },

  register: async (data) => {
    let result = await dataService.register(data);
    return result;
  },

  setCurrentCart: (data) => {
    let res = data.filter((item) => item.count >= 1);
    store.dispatch({
      type: 'UPDATE_CART',
      data: res
    });
  },

  clearUser: async () => {
    // store.dispatch({
    //   type: 'SET_USER_INFO',
    //   data: null,
    // });
    // store.dispatch({
    //   type: 'SET_TOKEN',
    //   data: null,
    // });
    await AsyncStorage.setItem('token', '');
  }
};

export default helpers;
