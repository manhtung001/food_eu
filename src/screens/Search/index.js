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
} from 'react-native';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
import Layout from '../../constants/Layout';
import moment from 'moment';
import Color from '../../constants/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import helpers from '../../globals/helpers';


const SearchScreen = (props) => {


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text>SearchScreen</Text>
    </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: "row",
    marginVertical: 10,
    paddingVertical: 5,
    width: '95%',
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
    borderBottomColor: Color.GRAY,
    borderBottomWidth: 1
  },
  backBtn: {
    marginTop: StatusBar.currentHeight,
    position: "absolute",
    top: 5,
    left: 5
  },
  titleHeader: {
    fontSize: 26,
    alignSelf: "center",
    marginVertical: 10,
    color: Color.Primary,
    fontWeight: "bold"
  },
  titleBody: {
    fontSize: 22,
    alignSelf: "center",
    marginVertical: 8,
    color: Color.Primary,
    fontWeight: "bold"
  },
  userInfoWrapper: {
    marginLeft: 16
  },
  userInfoText1: {
    fontSize: 18,
    fontWeight: "700"
  },
  userInfoText2: {
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "300",
    color: Color.DARK_GRAY,
  },
  cardDate: {
    alignSelf: "flex-end",
    marginRight: 20
  },
  Btn: {
    backgroundColor: Color.Primary,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
    height: 60,
    marginBottom: 30,
    marginTop: 20,
    borderRadius: 10
  },
  Btn2: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    alignSelf: "center",
    height: 60,
    marginBottom: 30,
    borderRadius: 10,
    margin: 10,
    marginTop: 20,
  },
  textBtn: {
    fontSize: 18,
    fontWeight: "bold",
    color: Color.LIGHT_GRAY
  },
  shippedView: {
    width: '100%',
    height: 70,
    alignItems: "center",
    justifyContent: "center"
  }

});


export default SearchScreen;
