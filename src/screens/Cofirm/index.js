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


const Cofirm = (props) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
        >
          <Text>back</Text>
        </TouchableOpacity>
        <Text>Xac nhan don hang</Text>
        <View
          style={{ width: 40, height: 1 }}
        />
      </View>
      <ScrollView>

      </ScrollView>
      <TouchableOpacity
        style={{
          width: '96%',
          backgroundColor: Color.Primary,
          position: 'absolute',
          bottom: 0,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          padding: 18,
          borderRadius: 50,
          marginBottom: 10
        }}
      >
        <Text>dat hang</Text>
      </TouchableOpacity>
    </SafeAreaView>

  );
}


const styles = StyleSheet.create({
});


export default Cofirm;
