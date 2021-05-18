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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const LIMIT_DATA = 10;
let LOADING = true;
let CAN_LOAD_MORE = true;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const NotificationScreen = (props) => {
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      onRefresh();
    });
  }, []);

  const [listNoti, setListNoti] = useState([]);
  let [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const toggleLoading = (stt) => {
    LOADING = stt;
    setLoading(stt);
  };

  const getListNoti = async () => {
    toggleLoading(true);
    let res = await dataService.getListNotification({
      skip: 0,
      limit: LIMIT_DATA
    });
    toggleLoading(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    if (!res || res.code != 0) return;
    if (res.data.length < LIMIT_DATA) {
      CAN_LOAD_MORE = false;
    }
    setListNoti(res.data);
  };

  const onRefresh = async () => {
    CAN_LOAD_MORE = true;
    LOADING = true;
    setListNoti([]);
    setRefreshing(true);
    // await getListNoti();
    setRefreshing(false);
  };

  const loadMore = async () => {
    if (LOADING || !CAN_LOAD_MORE) return;
    toggleLoading(true);
    let res = await dataService.getListNotification({
      skip: listNoti.length,
      limit: LIMIT_DATA
    });
    toggleLoading(false);
    if (!res || res.code != 0) return;
    if (res.data.length < LIMIT_DATA) {
      CAN_LOAD_MORE = false;
    }
    setListNoti(listNoti.concat(res.data));
  };

  const updateAllIsRead = async () => {
    let res = await dataService.updateNotiAllIsRead({});
    if (res.code == 0) {
      getListNoti();
      setListNoti(res.data);
    }
  };

  const updateIsRead = async (id) => {
    let res = await dataService.updateNotiIsRead({
      id
    });
    if (res.code == 0) {
      getListNoti();
      setListNoti(res.data);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View>
        <FlatList
          data={listNoti}
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
          ListHeaderComponent={
            listNoti?.length > 0 && (
              <TouchableOpacity
                style={styles.headerFlat}
                onPress={() => updateAllIsRead()}
              >
                <Icon size={24} name="check" color={Color.Primary} />
                <Text style={styles.textHeader}>Đánh dấu tất cả đã đọc</Text>
              </TouchableOpacity>
            )
          }
          ListFooterComponent={
            loading ? (
              <View>
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                  <SkeletonPlaceholder key={item}>
                    <SkeletonPlaceholder.Item
                      width={'94%'}
                      alignSelf={'center'}
                    >
                      <SkeletonPlaceholder.Item
                        width={100}
                        height={26}
                        borderRadius={10}
                        marginVertical={5}
                      />
                      <SkeletonPlaceholder.Item
                        width={300}
                        height={26}
                        borderRadius={10}
                      />
                      <SkeletonPlaceholder.Item
                        width={200}
                        height={26}
                        borderRadius={10}
                        marginVertical={5}
                        alignSelf="flex-end"
                      />
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder>
                ))}
              </View>
            ) : listNoti?.length > 0 ? (
              <View
                style={{
                  height: 40,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
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
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon size={50} name="list-alt" color={Color.GRAY} />
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
            <TouchableOpacity
              style={[
                styles.cardItem,
                {
                  backgroundColor: item.isRead == '0' ? Color.GRAY : Color.GRAY3
                }
              ]}
              onPress={() => updateIsRead(item.id)}
              disabled={item.isRead == '1'}
            >
              <Text style={styles.titleNoti}>{item.title}</Text>
              <Text style={styles.bodyNoti}>{item.body}</Text>
              <Text style={styles.createDate}>
                {moment(item.createdAt).format('DD/MM/YYYY - hh:mm:ss')}
              </Text>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  titleNoti: {
    fontSize: 18,
    fontWeight: '700'
  },
  bodyNoti: {
    fontSize: 16
  },
  createDate: {
    fontSize: 14,
    fontWeight: '400',
    alignSelf: 'flex-end',
    marginRight: 10
  },
  headerFlat: {
    height: 60,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textHeader: {
    fontSize: 18,
    color: Color.Primary,
    marginHorizontal: 10
  }
});

export default NotificationScreen;
