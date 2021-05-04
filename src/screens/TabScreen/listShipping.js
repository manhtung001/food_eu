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
import Color from './../../constants/Color';
import Icon from 'react-native-vector-icons/FontAwesome';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const LIMIT_DATA = 10;
let LOADING = true;
let CAN_LOAD_MORE = true;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const listShipping = (props) => {
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      onRefresh();
    });
  }, []);

  const [listShipping, setListShipping] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const toggleLoading = (stt) => {
    LOADING = stt;
    setLoading(stt);
  };

  const getListShipping = async () => {
    toggleLoading(true);
    let res = await dataService.getListShipping({
      skip: 0,
      limit: LIMIT_DATA
    });
    toggleLoading(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    if (!res || res.code != 0) return;
    if (res.data.orderShippingInfos.length < LIMIT_DATA) {
      CAN_LOAD_MORE = false;
    }
    setListShipping(res.data.orderShippingInfos);
  }

  const onRefresh = async () => {
    CAN_LOAD_MORE = true;
    LOADING = true;
    setListShipping([]);
    setRefreshing(true);
    await getListShipping();
    setRefreshing(false);
  };

  const loadMore = async () => {
    if (LOADING || !CAN_LOAD_MORE) return;
    toggleLoading(true);
    let res = await dataService.getListShipping({
      skip: listShipping.length,
      limit: LIMIT_DATA
    });
    toggleLoading(false);
    if (!res || res.code != 0) return;
    if (res.data.orderShippingInfos.length < LIMIT_DATA) {
      CAN_LOAD_MORE = false;
    }
    setListShipping(listShipping.concat(res.data.orderShippingInfos));
  }

  const toOrderDetail = async (item) => {
    let data = {
      orderId: item.id,
      skip: 0,
      limit: LIMIT_DATA
    }
    let res = await dataService.getOrderDetail(data);
    if (res.code == 0) {
      props.navigation.navigate("OrderDetailScreen", { res, status: 'shipping', item })
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={listShipping}
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
            : listShipping.length > 0 ? (
              <View
                style={{ height: 40, width: "100%", alignItems: "center", justifyContent: "center" }}
              >
                <Text style={{ fontSize: 16 }}>- Hết -</Text>
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
              <Text style={styles.cardText1}>{item.wardName} - {item.districtName} - {item.provinceName}</Text>
              <Text style={styles.cardText2}>Tên: {item.receiveName}</Text>
              <Text style={styles.cardText2}>SĐT: {item.receivePhone}</Text>
              <Text style={styles.cardText2}>Số tiền: {item.totalMoney} VNĐ</Text>
              <Text style={styles.cardTextDate}>{moment(item.createdAt).format("DD/MM/YYYY - hh:mm:ss")}</Text>
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
    width: Layout.screen.width / 1.05,
    padding: 10,
    borderRadius: 20,
    elevation: 10,
    marginTop: 14,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  cardItem: {
    paddingLeft: 15,
    paddingTop: 10,
    flex: 1
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

export default listShipping;
