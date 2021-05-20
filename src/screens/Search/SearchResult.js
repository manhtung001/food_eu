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

const TopTab = createMaterialTopTabNavigator();

let LOADING = false;
let CAN_LOAD_MORE = true;
const LIMIT_DATA = 20;

export default function SearchResult(props) {
  const [keySearch, setKeySearch] = useState(props.route.params.keySearch);
  const [listCategory, setListCategory] = useState([]);
  const [listName, setListName] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {}, []);

  const followCategory = () => {
    return (
      <SafeAreaView>
        <Text>followCategory</Text>
      </SafeAreaView>
    );
  };
  const followName = () => {
    return (
      <SafeAreaView>
        <Text>followName</Text>
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
