/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  LoginScreen,
  Agent,
  SearchScreen,
  Cofirm,
  SearchResult,
  RegisterScreen,
  EditProfile,
  OrderDetailScreen
} from '../screens/index';
import RootTab from './RootTab';
import { createStackNavigator } from '@react-navigation/stack';
import helpers from '../globals/helpers';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName={helpers.getToken() ? 'RootTab' : 'LoginScreen'}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="RootTab" component={RootTab} />
      <Stack.Screen name="Agent" component={Agent} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="Cofirm" component={Cofirm} />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
