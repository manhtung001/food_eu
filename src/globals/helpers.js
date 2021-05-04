import dataService from './../network/dataService';
import { Linking } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

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
      nameClose,
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
    confirmImgUrl,
  }) => {
    store.dispatch({
      type: 'SHOW_CONFIRM',
      title,
      content,
      textOk,
      textCancer,
      onOk,
      onCancer,
      confirmImgUrl,
    });
  },

  getToken: () => {
    return store ? store.getState().userState.token : undefined;
  },

  refreshToken: async () => {
    let token = null;
    try {
      token = await AsyncStorage.getItem('token');
      console.log("[refreshToken] true: ", token)
    } catch (e) {
      console.log("[refreshToken]: ", e)
    }
    let result = await dataService.refreshToken({}, token);
    if (result.code == 0) {
      store.dispatch({
        type: 'SET_USER_INFO',
        data: result.data.shipperInfo,
      });
      store.dispatch({
        type: 'SET_TOKEN',
        data: result.data.token,
      });
      await AsyncStorage.setItem('token', result.data.token);
    }
  },

  login: async (data) => {
    let result = await dataService.login(data);
    if (result.code == 0) {
      store.dispatch({
        type: 'SET_USER_INFO',
        data: result.data.shipperInfo,
      });
      store.dispatch({
        type: 'SET_TOKEN',
        data: result.data.token,
      });
      await AsyncStorage.setItem('token', result.data.token);
    }
    return result;
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
