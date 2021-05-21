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
import FastImage from 'react-native-fast-image';

const LIMIT_DATA = 10;
let LOADING = true;
let CAN_LOAD_MORE = true;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const listFood = (props) => {
  useEffect(() => {
    onRefresh();
  }, []);

  const [listFood, setListFood] = useState([]);
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
    setListFood(res);
  };

  const onRefresh = async () => {
    LOADING = true;
    setListFood([]);
    setRefreshing(true);
    await getListFood();
    setRefreshing(false);
  };

  const toOrderDetail = async (item) => {
    props.navigation.navigate('Agent', { data: item.idShop });
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
        ListFooterComponent={
          <View
            style={{
              width: '100%',
              height: 200
            }}
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
          <View
            style={{
              marginTop: 16,
              borderTopColor: Color.GRAY2,
              borderTopWidth: 0.5
            }}
          >
            <Text
              style={{
                fontSize: 26,
                marginTop: 5,
                fontFamily: helpers.fonts('regular'),
                alignSelf: 'center',
                color: Color.Primary
              }}
            >
              {item.categoryName}
            </Text>
            {item.productResponseList.map((child, index) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: 10
                }}
                key={index}
                onPress={() => toOrderDetail(child)}
              >
                <FastImage
                  style={{ width: 100, height: 100 }}
                  source={{
                    uri: child.linkImage,
                    priority: FastImage.priority.normal
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <View
                  style={{
                    marginLeft: 10
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 4,
                      fontFamily: helpers.fonts('regular')
                    }}
                  >
                    {child.productName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 4,
                      fontFamily: helpers.fonts('regular')
                    }}
                  >
                    Tên cửa hàng: {child.shopName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 4,
                      fontFamily: helpers.fonts('regular')
                    }}
                  >
                    Giá {child.price}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
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
