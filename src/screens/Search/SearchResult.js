import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TextInput,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Animated,
  Platform,
  SafeAreaViewBase,
  Text
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import dataService from '../../network/dataService';
import helpers from '../../globals/helpers';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createFilter } from 'react-native-search-filter';


const TopTab = createMaterialTopTabNavigator();


const KEYS_TO_FILTERS_1 = ['productName'];
const KEYS_TO_FILTERS_2 = ['categoryProductName'];

export default function SearchResult(props) {
  const [keySearch, setKeySearch] = useState(props.route.params.keySearch);
  const [listAll, setListAll] = useState([]);

  useEffect(() => {
    getListAll()
  }, []);

  const getListAll = async () => {
    let res = await dataService.getListSearchAll();
    if (res) {
      setListAll(res)
    }
  }

  const followCategory = () => {
    const filteredFollowCategory = listAll.filter(createFilter(keySearch, KEYS_TO_FILTERS_2))
    return (
      <SafeAreaView
        style={styles.container}
      >
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
          data={filteredFollowCategory}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginTop: 20,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: Color.GRAY3
              }}
              key={item.id}
              onPress={() => {
                props.navigation.navigate('Agent', { data: item.idShop })
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: 'pink',
                  marginLeft: 10
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
                    fontSize: 18,
                    fontFamily: helpers.fonts('regular')
                  }}
                >
                  Loại: {item.categoryProductName}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: helpers.fonts('regular')
                  }}
                >
                  Tên: {item.productName}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: helpers.fonts('regular')
                  }}
                >
                  Tên cửa hàng: {item.shopName}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: helpers.fonts('regular')
                  }}
                >
                  Giá: {helpers.formatMoney(parseFloat(item.price))}đ
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  };
  const followName = () => {
    const filteredFollowName = listAll.filter(createFilter(keySearch, KEYS_TO_FILTERS_1))
    return (
      <SafeAreaView
        style={styles.container}
      >
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
          data={filteredFollowName}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginTop: 20,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: Color.GRAY3
              }}
              key={item.id}
              onPress={() => {
                props.navigation.navigate('Agent', { data: item.idShop })
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: 'pink',
                  marginLeft: 10
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
                    fontSize: 18,
                    fontFamily: helpers.fonts('regular')
                  }}
                >
                  Loại: {item.categoryProductName}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: helpers.fonts('regular')
                  }}
                >
                  Tên: {item.productName}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: helpers.fonts('regular')
                  }}
                >
                  Tên cửa hàng: {item.shopName}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: helpers.fonts('regular')
                  }}
                >
                  Giá: {helpers.formatMoney(parseFloat(item.price))}đ
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.header}>
        <TouchableOpacity
          style={{ justifyContent: 'center' }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} style={styles.iconBack} />
        </TouchableOpacity>
        <View style={styles.wrapInput}>
          <Ionicons name="search" style={styles.iconSearch} />
          <View width={10} />
          <View style={styles.input}>
            <Text style={styles.textInput}>{keySearch}</Text>
          </View>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons name="close-outline" style={styles.iconSearch} />
          </TouchableOpacity>
        </View>
      </View>

      <TopTab.Navigator
        tabBarOptions={{
          activeTintColor: Color.Primary,
          inactiveTintColor: Color.GRAY,
          indicatorStyle: { backgroundColor: Color.Primary }
        }}
        lazy={true}
      >
        <TopTab.Screen name="Tìm theo loại món ăn" component={followCategory} />
        <TopTab.Screen name="Tìm theo tên món ăn" component={followName} />
      </TopTab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: Color.Primary,
  },
  safearea: {
    backgroundColor: Color.Primary
  },
  header: {
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 3,
    paddingRight: 10,
    backgroundColor: Color.Primary
  },
  iconBack: { fontSize: 36, color: Color.WHITE },
  wrapInput: {
    backgroundColor: '#fff',
    height: 44,
    borderRadius: 8,
    width: Layout.window.width * 0.85,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconSearch: {
    fontSize: 22,
    color: 'grey'
  },
  input: {
    height: 44,
    width: '80%',
    justifyContent: 'center'
  },
  textInput: {
    fontSize: 16
  },
  txtPopular: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 15,
    marginLeft: 10
  },
  wrapHotKey: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  hotKey: {
    backgroundColor: '#DDDDDD',
    borderRadius: 6,
    padding: 10,
    marginRight: 8,
    marginTop: 6
  },
  flastListDropDownSearch: {
    zIndex: 1,
    maxHeight: Layout.window.height * 0.4,
    width: Layout.window.width,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingBottom: 16
    // backgroundColor: Color.Primary,
  },
  cardItem: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: '#b8b8b8',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  nameCard: {
    alignSelf: 'center',
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 11,
    color: 'gray'
  },
  nameCardFiltered: {
    alignSelf: 'center',
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 11,
    color: Color.Primary
  }
});
