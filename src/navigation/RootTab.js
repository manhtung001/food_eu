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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text>Giao hang den:</Text>
      <TouchableOpacity
        onPress={() => toSearch()}
      >
        <View
          style={{
            width: "96%",
            alignSelf: "center",
            backgroundColor: Color.GRAY3,
            borderRadius: 20,
            padding: 10,
            flexDirection: "row"
          }}
        >
          <FontAwesome
            size={22}
            name="search"
            color={Color.GRAY}
            style={{
              marginLeft: 10
            }}
          />
          <Text
            style={{
              fontSize: 16,
              color: Color.GRAY,
              marginLeft: 10
            }}
          >Tìm kiếm</Text>
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
                <FontAwesome
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
                <MaterialCommunityIcons
                  size={30}
                  name="clipboard-list-outline"
                  color={focused ? Color.Primary : Color.GRAY}
                />
              </View>
            ),
            tabBarLabel: 'Đơn hàng',
          }}
        />
        <BottomTab.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome
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
              <FontAwesome
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
