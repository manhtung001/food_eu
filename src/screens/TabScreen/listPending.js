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
  Alert,
  FlatList,
  RefreshControl,
  LayoutAnimation,
  UIManager
} from 'react-native';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
import Layout from '../../constants/Layout';
import moment from 'moment';
import Color from './../../constants/Color';
import Icon from 'react-native-vector-icons/FontAwesome';
import helpers from '../../globals/helpers';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const LIMIT_DATA = 10;
let LOADING = true;
let CAN_LOAD_MORE = true;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const listPendingScreen = (props) => {

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      onRefresh();
    });
  }, []);

  const [listPending, setListPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const toggleLoading = (stt) => {
    LOADING = stt;
    setLoading(stt);
  };

  const getListPending = async () => {
    toggleLoading(true);
    let res = await dataService.getListPending({
      skip: 0,
      limit: LIMIT_DATA
    });
    toggleLoading(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    if (!res || res.code != 0) return;
    if (res.data.orderPendingInfos.length < LIMIT_DATA) {
      CAN_LOAD_MORE = false;
    }
    setListPending(res.data.orderPendingInfos);
  }

  const onRefresh = async () => {
    CAN_LOAD_MORE = true;
    LOADING = true;
    setListPending([]);
    setRefreshing(true);
    await getListPending();
    setRefreshing(false);
  };

  const loadMore = async () => {
    if (LOADING || !CAN_LOAD_MORE) return;
    toggleLoading(true);
    let res = await dataService.getListPending({
      skip: listPending.length,
      limit: LIMIT_DATA
    });
    toggleLoading(false);
    if (!res || res.code != 0) return;
    if (res.data.orderPendingInfos.length < LIMIT_DATA) {
      CAN_LOAD_MORE = false;
    }
    setListPending(listPending.concat(res.data.orderPendingInfos));
  }

  const toOrderDetail = async (item) => {
    let data = {
      orderId: item.id,
      skip: 0,
      limit: LIMIT_DATA
    }
    let res = await dataService.getOrderDetail(data);
    if (res.code == 0) {
      props.navigation.navigate("OrderDetailScreen", { res, status: 'pending', item })
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={listPending}
        style={{
          flex: 1,
        }}
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
            : listPending.length > 0 ? (
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
    </View >
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
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    elevation: 22,
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



export default listPendingScreen;