/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect, useState, Component } from 'react';
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
  Animated,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
import Layout from '../../constants/Layout';
import moment from 'moment';
import Color from '../../constants/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import helpers from '../../globals/helpers';
import BottomSheet from 'reanimated-bottom-sheet';

const Agent = (props) => {
  const sheetRefCofirm = React.useRef(null);
  const sheetRefCart = React.useRef(null);
  const { data } = props.route.params;

  const toCofirm = () => {
    props.navigation.navigate('Cofirm');
  };

  const renderContentCofirm = () => (
    <View style={styles.groupWrapper}>
      <Text>renderContentCofirm</Text>
    </View>
  );

  const renderContentCart = () => (
    <View style={styles.groupWrapper}>
      <Text>renderContentCofirm</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View>
        <BottomSheet
          ref={sheetRefCofirm}
          snapPoints={[
            0,
            Dimensions.get('window').height / 2,
            Dimensions.get('window').height / 1.3
          ]}
          borderRadius={10}
          renderContent={renderContentCofirm}
        />
        <BottomSheet
          ref={sheetRefCart}
          snapPoints={[
            0,
            Dimensions.get('window').height / 2,
            Dimensions.get('window').height / 1.3
          ]}
          borderRadius={10}
          renderContent={renderContentCart}
        />
        <Animated.FlatList
          bounces={true}
          bouncesZoom={false}
          contentContainerStyle={{
            paddingBottom: 50
          }}
          keyExtractor={(item, index) => index + ''}
          data={data.monans}
          ListHeaderComponent={
            <View>
              <View
                style={{
                  width: Layout.screen.width,
                  height: Layout.screen.height / 4,
                  backgroundColor: 'pink'
                }}
              />
              <Text>{data.tencuahang}</Text>
              <Text>{data.dienthoai}</Text>
              <Text>{data.email}</Text>
              <Text>{data.thoigianphucvu}</Text>
              <Text>{data.thoigiangiaohang}</Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginTop: 10
              }}
              key={item.mamonan}
              onPress={() => {
                sheetRefCofirm.current.snapTo(2);
              }}
            >
              <View
                style={{
                  width: 90,
                  height: 90,
                  backgroundColor: 'pink'
                }}
              />
              <View
                style={{
                  flex: 1
                }}
              >
                <Text>{item.tenmonan}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                    alignItems: 'flex-end'
                  }}
                >
                  <Text>{item.gia}</Text>
                  <Text>+</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={[styles.wrapTab]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                width: 70,
                height: 70,
                backgroundColor: 'pink'
              }}
            />
            <Text>GIA</Text>
          </View>
          <TouchableOpacity onPress={() => toCofirm()}>
            <Text>GIAO HANG</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapTab: {
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: Color.Primary,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  groupWrapper: {
    backgroundColor: 'white',
    height: 700,
    borderRadius: 26,
    overflow: 'hidden'
  }
});

export default Agent;
