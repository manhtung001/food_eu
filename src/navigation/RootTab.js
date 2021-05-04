/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import {
  listShop,
  Profile,
  NotificationScreen,
  OrderScreen
} from './../screens/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Color from '../constants/Color';

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const TopTabScreen = (props) => {
  const toSearch = () => {
    props.navigation.navigate("SearchScreen")
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Giao hang den:</Text>
      <TouchableOpacity
        onPress={() => toSearch()}
      >
        <View>
          <Text>Search</Text>
        </View>
      </TouchableOpacity>
      <TopTab.Navigator
        tabBarOptions={{
          activeTintColor: Color.Primary,
          inactiveTintColor: Color.GRAY,
          indicatorStyle: { backgroundColor: Color.Primary },
          scrollEnabled: true
        }}
        lazy={true}
        swipeEnabled={true}

      >
        <TopTab.Screen name="Gan toi" component={listShop} />
        <TopTab.Screen name="ban chay" component={listShop} />
        <TopTab.Screen name="danh gia" component={listShop} />
        <TopTab.Screen name="more" component={listShop} />
      </TopTab.Navigator>
    </SafeAreaView>
  );
}


const RootTab = ({ route }) => {
  return (
    <View style={{ flex: 1 }}>
      <BottomTab.Navigator
        initialRouteName="TopTabScreen"
        tabBarOptions={{
          activeTintColor: Color.Primary,
          inactiveTintColor: Color.GRAY,
        }}
      >
        <BottomTab.Screen
          name="TopTabScreen"
          component={TopTabScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <View>
                <Icon
                  size={30}
                  name="home"
                  color={focused ? Color.Primary : Color.GRAY}
                />
              </View>
            ),
            tabBarLabel: 'Trang chủ',
          }}
        />
        <BottomTab.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <View>
                <Icon
                  size={30}
                  name="home"
                  color={focused ? Color.Primary : Color.GRAY}
                />
              </View>
            ),
            tabBarLabel: 'Order',
          }}
        />
        <BottomTab.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                size={30}
                color={focused ? Color.Primary : Color.GRAY}
                name="bell"
              />
            ),
            tabBarLabel: 'Thông báo',
          }}
        />
        <BottomTab.Screen
          name="ProfileUserScreen"
          component={Profile}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                size={30}
                color={focused ? Color.Primary : Color.GRAY}
                name="user-circle"
              />
            ),
            tabBarLabel: 'Cá nhân',
          }}
        />
      </BottomTab.Navigator>

    </View>
  );
}


export default RootTab;
