import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TextInput,
  Animated,
  Platform,
  LayoutAnimation,
  UIManager,
  Text
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import helpers from '../../globals/helpers';

// fake data search

const hotKeys = [
  { id: 0, name: 'Cà phê' },
  { id: 1, name: 'Đồ ăn' },
  { id: 2, name: 'Trà sữa' }
];

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SearchScreen(props) {
  const [keySearch, setKeySearch] = useState('');

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safearea} />
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
          <TextInput
            style={styles.input}
            placeholder={'Nhập từ khoá'}
            placeholderTextColor="#BCBCBC"
            value={keySearch}
            onChangeText={(text) => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
              setKeySearch(text);
            }}
            autoCorrect={false}
            onSubmitEditing={() => {
              props.navigation.navigate('SearchResult', { keySearch });
            }}
          />
          <TouchableOpacity onPress={() => setKeySearch('')}>
            <Ionicons name="close-outline" style={styles.iconSearch} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <Text style={styles.txtPopular}>Từ khoá phổ biến</Text>
        <View style={styles.wrapHotKey}>
          {hotKeys.map((item, index) => (
            <TouchableOpacity
              key={'hotKey' + index}
              style={styles.hotKey}
              onPress={() =>
                props.navigation.navigate('SearchResult', {
                  keySearch: item.name
                })
              }
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
