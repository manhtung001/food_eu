/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
  FlatList,
  Platform,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
import Layout from '../../constants/Layout';
import moment from 'moment';
import Color from '../../constants/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import helpers from '../../globals/helpers';

const OrderDtailScreen = (props) => {
  const { data, totalPriceOneOrder } = props.route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        bounces={true}
        bouncesZoom={false}
        contentContainerStyle={{
          paddingBottom: 50
        }}
        ListFooterComponent={
          <View
            style={{
              width: '100%',
              height: 200
            }}
          />
        }
        ListHeaderComponent={
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10
              }}
            >
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Ionicons
                  name="arrow-back"
                  size={30}
                  style={{
                    marginLeft: 4,
                    color: Color.Primary
                  }}
                />
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    fontSize: 24,
                    color: Color.Primary
                  }}
                >
                  Đơn hàng số: {data.idOrder}
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 1
                }}
              />
            </View>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 20,
                marginTop: 10
              }}
            >
              Tổng tiền: {helpers.formatMoney(totalPriceOneOrder)}đ
            </Text>
            <Text
              style={{
                fontSize: 26,
                marginLeft: 10,
                marginTop: 10
              }}
            >
              Chi tiết đơn hàng:
            </Text>
          </View>
        }
        keyExtractor={(item, index) => index + ''}
        data={data.shopOrderResponses}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                marginTop: 14,
                paddingTop: 14,
                borderTopColor: Color.GRAY2,
                borderTopWidth: 1,
                marginHorizontal: 10
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 5
                }}
              >
                Tên cửa hàng: {item.shopName}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 5
                }}
              >
                Trạng thái: {item.status}
              </Text>
              {item.listProduct.map((child, index2) => {
                return (
                  <View
                    key={index2}
                    style={{
                      paddingTop: 10
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        marginTop: 5
                      }}
                    >
                      {child.productName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        marginTop: 5
                      }}
                    >
                      Giá: {child.price} x {child.count} ={' '}
                      {child.count * child.price}
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default OrderDtailScreen;
