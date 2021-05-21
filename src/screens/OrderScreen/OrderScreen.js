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
import Icon from 'react-native-vector-icons/Ionicons';
import helpers from '../../globals/helpers';

const OrderScreen = (props) => {
  useEffect(() => {
    onRefresh();
  }, []);

  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setList([]);
    helpers.showLoading();
    setRefreshing(true);
    let res = await dataService.getListShipping(props.userInfo.id);
    console.log(res);
    helpers.hideModal();
    if (res) {
      setList(res);
    }
    setRefreshing(false);
  };

  const onCountTotalOneOrder = (order) => {
    let sum = 0;
    order.forEach((element) => {
      element.listProduct.forEach((item) => {
        sum += item.count * item.price;
      });
    });
    return sum;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        bounces={true}
        bouncesZoom={false}
        contentContainerStyle={{
          paddingBottom: 50
        }}
        refreshControl={
          <RefreshControl
            progressViewOffset={100}
            refreshing={Platform.OS == 'ios' ? false : refreshing}
            onRefresh={() => onRefresh()}
            colors={[Color.Primary, Color.SUCCESS, Color.Primary]}
            tintColor={Color.Primary}
          />
        }
        ListFooterComponent={
          <View
            style={{
              width: '100%',
              height: 200
            }}
          />
        }
        keyExtractor={(item, index) => index + ''}
        data={list}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                padding: 10,
                borderColor: Color.Primary,
                borderRadius: 10,
                borderWidth: 1,
                marginTop: 20,
                marginHorizontal: 20
              }}
              onPress={() => {
                props.navigation.navigate('OrderDetailScreen', {
                  data: item,
                  totalPriceOneOrder: onCountTotalOneOrder(
                    item.shopOrderResponses
                  )
                });
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  alignSelf: 'center'
                }}
              >
                {' '}
                Đơn hàng: {item.idOrder}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 10
                }}
              >
                {' '}
                Tổng Tiền:{' '}
                {helpers.formatMoney(
                  onCountTotalOneOrder(item.shopOrderResponses)
                )}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({
  userInfo: state.userState?.user
});

export default connect(mapStateToProps)(OrderScreen);
