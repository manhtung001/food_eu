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
import Icon from 'react-native-vector-icons/FontAwesome';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

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
        tenmonan: "Trà sữa hoàng kim"
      },
      {
        cuahang: 6,
        loaimonan: 4,
        mamonan: 5,
        hinhanh: null,
        gia: 3000,
        tenmonan: "a"
      },
      {
        cuahang: 6,
        loaimonan: 1,
        mamonan: 2,
        hinhanh: null,
        gia: 5000,
        tenmonan: "b"
      },
      {
        cuahang: 6,
        loaimonan: 10,
        mamonan: 11,
        hinhanh: null,
        gia: 350000,
        tenmonan: "csd"
      },
      {
        cuahang: 6,
        loaimonan: 12,
        mamonan: 12,
        hinhanh: null,
        gia: 3000,
        tenmonan: "sadas"
      },
      {
        cuahang: 6,
        loaimonan: 14,
        mamonan: 15,
        hinhanh: null,
        gia: 5000,
        tenmonan: "asd"
      }
    ],
    thoigiangiaohang: "08:30:00",
    macuahang: 6,
    matkhau: "ABC",
    tencuahang: "ABC",
    email: "ABC@gmail.com",
    thoigianphucvu: "08:30:00",
    dienthoai: "0948787324",
    hinhanh: "",
  },
  {
    khuvuc: 123,
    monans: [],
    thoigiangiaohang: "08:30:00",
    macuahang: 7,
    matkhau: "ABC",
    tencuahang: "abbc",
    email: "ABC@gmail.com",
    thoigianphucvu: "08:30:00",
    dienthoai: "0948787324",
    hinhanh: "",
  },

]

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const listShop = (props) => {
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      // onRefresh();
    });
  }, []);

  const [listShop, setListShop] = useState(DATA_TEST);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const toggleLoading = (stt) => {
    LOADING = stt;
    setLoading(stt);
  };

  const getListCancelled = async () => {
    toggleLoading(true);
    let res = await dataService.getListCancelled({
      skip: 0,
      limit: LIMIT_DATA
    });
    toggleLoading(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    if (!res || res.code != 0) return;
    if (res.data.orderInfos.length < LIMIT_DATA) {
      CAN_LOAD_MORE = false;
    }
    setListCancelled(res.data.orderInfos);
  }

  const onRefresh = async () => {
    CAN_LOAD_MORE = true;
    LOADING = true;
    setListCancelled([]);
    setRefreshing(true);
    await getListCancelled();
    setRefreshing(false);
  };

  const loadMore = async () => {
    if (LOADING || !CAN_LOAD_MORE) return;
    toggleLoading(true);
    let res = await dataService.getListCancelled({
      skip: listCancelled.length,
      limit: LIMIT_DATA
    });
    toggleLoading(false);
    if (!res || res.code != 0) return;
    if (res.data.orderInfos.length < LIMIT_DATA) {
      CAN_LOAD_MORE = false;
    }
    setListCancelled(listCancelled.concat(res.data.orderInfos));
  }

  const toOrderDetail = async (item) => {
    props.navigation.navigate("Agent", { data: item })
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={listShop}
        onEndReachedThreshold={0.3}
        onEndReached={loadMore}
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
          loading ?
            <View>
              {
                [1, 2, 3, 4].map((item) =>
                  <SkeletonPlaceholder key={item} >
                    <SkeletonPlaceholder.Item
                      width={"94%"}
                      alignSelf={"center"}
                      marginTop={20}
                    >
                      <SkeletonPlaceholder.Item width={400} height={20} borderRadius={10} marginVertical={5} />
                      <SkeletonPlaceholder.Item width={300} height={20} borderRadius={10} />
                      <SkeletonPlaceholder.Item width={200} height={20} borderRadius={10} marginVertical={5} />
                      <SkeletonPlaceholder.Item width={250} height={20} borderRadius={10} />
                      <SkeletonPlaceholder.Item width={200} height={20} borderRadius={10} marginVertical={5} alignSelf="flex-end" />
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder>
                )
              }
            </View>
            : listShop.length > 0 ? (
              <View
                style={{ height: 40, width: "100%", alignItems: "center", justifyContent: "center" }}
              >
                <Text style={{ fontSize: 16, marginTop: 20 }}>- Hết -</Text>
              </View>
            ) : null
        }
        ListEmptyComponent={
          (!loading || !refreshing) && (
            <View
              style={{
                height: Layout.window.height,
                width: '100%',
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon
                size={50}
                name="list-alt"
                color={Color.GRAY}
              />
              <Text
                style={{ fontSize: 18, marginTop: 10, color: Color.Primary, fontWeight: '700' }}
              >Danh sách rỗng</Text>
            </View>
          )
        }
        keyExtractor={(item, index) => index + ''}
        renderItem={({ item, index }) =>
          <View style={styles.cardItemWrapper}>
            <TouchableOpacity
              style={styles.cardItem}
              onPress={() => toOrderDetail(item)}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "pink"
                }}
              />
              <View>
                <Text>{item.tencuahang}</Text>
                <Text>{item.thoigianphucvu}</Text>
                <Text>{item.thoigiangiaohang}</Text>
                <Text>{item.dienthoai}</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      >
      </FlatList>
    </View>
  );
}


const styles = StyleSheet.create({

  cardItemWrapper: {
    width: Layout.screen.width,
    padding: 10,
    borderRadius: 20,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: '#fff',

  },
  cardItem: {
    paddingLeft: 5,
    paddingTop: 10,
    flex: 1,
    flexDirection: "row"

  },
  cardText1: {
    fontSize: 18,
    fontWeight: "700"
  },
  cardText2: {
    fontSize: 16,
  },
  cardTextDate: {
    fontSize: 14,
    fontWeight: "400",
    alignSelf: "flex-end",
    marginRight: 10
  },
});

export default listShop;
