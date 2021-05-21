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
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
import Layout from '../../constants/Layout';
import moment from 'moment';
import Color from '../../constants/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import helpers from '../../globals/helpers';

const Cofirm = (props) => {
  const onCountTotalMoney = (data) => {
    let tmp = data;
    let total = 0;
    tmp.length > 0 &&
      tmp.forEach((item) => {
        total += parseInt(item.price) * item.count;
      });
    return total;
  };

  const orderCart = async () => {
    let cart = props.cart;
    let data = {
      userId: props.userInfo.id,
      listProduct: cart
    };
    helpers.showLoading();
    let res = await dataService.orderFood(data);
    helpers.hideModal();
    if ((res.message = 'Đặt hàng thành công')) {
      helpers.showMessage({ content: res.message });
      helpers.setCurrentCart([]);
      props.navigation.goBack();
    }
  };

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
        keyExtractor={(item, index) => index + ''}
        data={props.cart}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text>back</Text>
            </TouchableOpacity>
            <Text>Xác nhận đơn hàng</Text>
            <View style={{ width: 40, height: 1 }} />
          </View>
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginTop: 10,
              paddingBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: Color.GRAY3
            }}
            key={item.id}
          >
            <View
              style={{
                width: 90,
                height: 90,
                backgroundColor: 'pink'
              }}
            />
            <View
              style={{
                flex: 1,
                marginLeft: 16
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: helpers.fonts('regular')
                }}
              >
                {item.productName}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: helpers.fonts('regular')
                }}
              >
                {item.shopName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                  alignItems: 'flex-end'
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: helpers.fonts('regular')
                  }}
                >
                  {helpers.formatMoney(parseFloat(item.price))}đ x {item.count}
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: helpers.fonts('regular'),
                    marginRight: 10
                  }}
                >
                  {helpers.formatMoney(parseFloat(item.price * item.count))}đ
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          width: '96%',
          position: 'absolute',
          bottom: 0
        }}
      >
        <Text
          style={{
            fontSize: 24,
            textDecorationLine: 'underline',
            marginBottom: 10,
            alignSelf: 'center'
          }}
        >
          Tổng: {helpers.formatMoney(onCountTotalMoney(props.cart))}đ
        </Text>
        <TouchableOpacity
          style={{
            width: '96%',
            backgroundColor: Color.Primary,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 18,
            borderRadius: 50,
            marginBottom: 10
          }}
          onPress={() => {
            orderCart();
          }}
        >
          <Text>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({
  cart: state.userState?.cart,
  userInfo: state.userState?.user
});

export default connect(mapStateToProps)(Cofirm);
