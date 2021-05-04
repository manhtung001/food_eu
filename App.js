/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import messaging from '@react-native-firebase/messaging';
import {
  Alert,
  View,
  ActivityIndicator
} from 'react-native';
import RootStack from './src/navigation/RootStack';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import configureStore from './src/redux/store';
import helpers from './src/globals/helpers';
import UiContainer from './src/uiModal/index';
import Color from './src/constants/Color';
import Geolocation from '@react-native-community/geolocation';


let store = configureStore();
helpers.setStore(store);

const App: () => React$Node = () => {

  const [refreshingToken, setRefreshingToken] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
    // requestUserPermission();
    // handleRefreshToken();
    resquestGeo();
  }, [])

  async function resquestGeo() {
    Geolocation.getCurrentPosition(info => console.log(info));
  }

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      messaging().getToken().then(fcm => {
        console.log("FCM: ", fcm);
      });

      // forequit
      messaging().getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            helpers.showMessage({
              title: remoteMessage.notification.title,
              content: remoteMessage.notification.body,
            });
          }
        });

      //inapp
      messaging().onMessage(async remoteMessage => {
        helpers.showMessage({
          title: remoteMessage.notification.title,
          content: remoteMessage.notification.body,
        });
      });

      // run but in bg
      messaging().onNotificationOpenedApp(async remoteMessage => {
        helpers.showMessage({
          title: remoteMessage.notification.title,
          content: remoteMessage.notification.body,
        });
      });
    }
  }

  const handleRefreshToken = async () => {
    await helpers.refreshToken();
    setRefreshingToken(false);
  }


  // if (refreshingToken) {
  //   return (
  //     <View
  //       style={{ flex: 1, justifyContent: "center" }}
  //     >
  //       <ActivityIndicator color={Color.Primary} size="large" style={{ alignSelf: 'center', marginTop: 10 }} />
  //     </View>
  //   );
  // }

  return <Provider store={store}>
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
    <UiContainer />
  </Provider>
};

export default App;
