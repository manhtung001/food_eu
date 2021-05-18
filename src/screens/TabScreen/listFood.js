/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
  TextInput,
  FlatList,
  Alert,
  RefreshControl,
  Platform,
  LayoutAnimation,
  UIManager
} from 'react-native';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
import Layout from '../../constants/Layout';
import moment from 'moment';
import Color from '../../constants/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import helpers from '../../globals/helpers';

const LIMIT_DATA = 10;
let LOADING = true;
let CAN_LOAD_MORE = true;

const DATA_TEST = [
  {
    khuvuc: 123105,
    monans: [
      {
        cuahang: 6,
        loaimonan: 3,
        mamonan: 4,
        hinhanh: null,
        gia: 35000,
        tenmonan: 'Trà sữa hoàng kim'
      },
      {
        cuahang: 6,
        loaimonan: 4,
        mamonan: 5,
        hinhanh: null,
        gia: 3000,
        tenmonan: 'a'
      },
      {
        cuahang: 6,
        loaimonan: 1,
        mamonan: 2,
        hinhanh: null,
        gia: 5000,
        tenmonan: 'b'
      },
      {
        cuahang: 6,
        loaimonan: 10,
        mamonan: 11,
        hinhanh: null,
        gia: 350000,
        tenmonan: 'csd'
      },
      {
        cuahang: 6,
        loaimonan: 12,
        mamonan: 12,
        hinhanh: null,
        gia: 3000,
        tenmonan: 'sadas'
      },
      {
        cuahang: 6,
        loaimonan: 14,
        mamonan: 15,
        hinhanh: null,
        gia: 5000,
        tenmonan: 'asd'
      }
    ],
    thoigiangiaohang: '08:30:00',
    macuahang: 6,
    matkhau: 'ABC',
    tencuahang: 'ABC',
    email: 'ABC@gmail.com',
    thoigianphucvu: '08:30:00',
    dienthoai: '0948787324',
    hinhanh: ''
  },
  {
    khuvuc: 123,
    monans: [],
    thoigiangiaohang: '08:30:00',
    macuahang: 7,
    matkhau: 'ABC',
    tencuahang: 'abbc',
    email: 'ABC@gmail.com',
    thoigianphucvu: '08:30:00',
    dienthoai: '0948787324',
    hinhanh: ''
  }
];

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const listFood = (props) => {
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      onRefresh();
    });
  }, []);

  const [listFood, setListFood] = useState(DATA_TEST);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const toggleLoading = (stt) => {
    LOADING = stt;
    setLoading(stt);
  };

  const getListFood = async () => {
    toggleLoading(true);
    let res = await dataService.getListFood();
    toggleLoading(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    if (!res || res.length == 0) return;
    console.log('getListFood');
    console.log(res);
    // setListFood(res.data.orderInfos);
  };

  const onRefresh = async () => {
    LOADING = true;
    setListFood([]);
    setRefreshing(true);
    await getListFood();
    setRefreshing(false);
  };

  const toOrderDetail = async (item) => {
    props.navigation.navigate('Agent', { data: item });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={listFood}
        bounces={true}
        bouncesZoom={false}
        refreshControl={
          <RefreshControl
            progressViewOffset={100}
            refreshing={Platform.OS == 'ios' ? false : refreshing}
            onRefresh={() => onRefresh()}
            colors={[Color.Primary, Color.SUCCESS, Color.Primary]}
            tintColor={Color.Primary}
          />
        }
        ListEmptyComponent={
          (!loading || !refreshing) && (
            <View
              style={{
                height: Layout.window.height,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 10,
                  color: Color.Primary,
                  fontWeight: '700'
                }}
              >
                Danh sách rỗng
              </Text>
            </View>
          )
        }
        keyExtractor={(item, index) => index + ''}
        renderItem={({ item, index }) => (
          <View style={styles.cardItemWrapper}>
            <TouchableOpacity
              style={styles.cardItem}
              onPress={() => toOrderDetail(item)}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: 'pink'
                }}
              />
              <View
                style={{
                  marginLeft: 10
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Ionicons
                    name="md-shield-checkmark"
                    size={20}
                    color="#FF8C00"
                    style={{
                      marginRight: 4
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 24,
                      marginTop: 4,
                      fontFamily: helpers.fonts('regular')
                    }}
                  >
                    {item.tencuahang}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 4,
                    fontFamily: helpers.fonts()
                  }}
                >
                  Email: {item.email}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 4,
                    fontFamily: helpers.fonts()
                  }}
                >
                  SĐT: {item.dienthoai}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  cardItemWrapper: {
    width: Layout.screen.width,
    marginVertical: 10,
    paddingLeft: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.GRAY2
  },
  cardItem: {
    paddingLeft: 5,
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row'
  }
});

export default listFood;
