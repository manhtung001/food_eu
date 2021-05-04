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
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
import Layout from '../../constants/Layout';
import moment from 'moment';
import Color from '../../constants/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import helpers from '../../globals/helpers';


class Agent extends Component {

  //////ANIMATION////////////////////
  _scrollY = new Animated.Value(0);

  //////ANIMATION////////////////////

  toCofirm = () => {
    this.props.navigation.navigate("Cofirm",)
  }

  render() {
    const { data } = this.props.route.params;

    let min = this._scrollY.interpolate({
      inputRange: [-10, 0, 100, 200],
      outputRange: [0, 0, 0, 200],
    });

    let translateY = Animated.diffClamp(min, 0, 100).interpolate({
      inputRange: [0, 100],
      outputRange: [0, 46],
    });


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View>
          <Animated.FlatList
            bounces={true}
            bouncesZoom={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: this._scrollY,
                    },
                  },
                },
              ],
              {
                useNativeDriver: true,
              },
            )}
            contentContainerStyle={{
              paddingBottom: 50,
            }}
            keyExtractor={(item, index) => index + ''}
            data={data.monans}
            ListHeaderComponent={
              <View>
                <View
                  style={{
                    width: Layout.screen.width,
                    height: Layout.screen.height / 4,
                    backgroundColor: "pink"
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
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10
                }}
                key={item.mamonan}
              >
                <View
                  style={{
                    width: 90,
                    height: 90,
                    backgroundColor: "pink"
                  }}
                />
                <View
                  style={{
                    flex: 1
                  }}>
                  <Text>{item.tenmonan}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flex: 1,
                      alignItems: "flex-end"
                    }}
                  >
                    <Text>{item.gia}</Text>
                    <Text>+</Text>
                  </View>
                </View>
              </View>
            )}
          />
          <View style={[styles.wrapTab]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: "center"
              }}
            >
              <View
                style={{
                  width: 70,
                  height: 70,
                  backgroundColor: "pink"
                }}
              />
              <Text>GIA</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.toCofirm()}
            >
              <Text>GIAO HANG</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    );
  }

}


const styles = StyleSheet.create({
  wrapTab: {
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: Color.Primary,
    position: 'absolute',
    bottom: 0,
    justifyContent: "space-between",
    alignItems: "center"
  },
});


export default Agent;
