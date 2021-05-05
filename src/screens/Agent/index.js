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
import helpers from '../../globals/helpers';
import BottomSheet from 'reanimated-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Agent = (props) => {
  const sheetRefCofirm = React.useRef(null);
  const sheetRefCart = React.useRef(null);
  const [currentFood, setCurrentFood] = useState('');
  let [currentFoodCount, setCurrentFoodCount] = useState(1);

  const [currentCart, setCurrentCart] = useState([]);
  const { data } = props.route.params;

  const toCofirm = () => {
    props.navigation.navigate('Cofirm', { data: currentCart });
  };

  const onChangeCount = (status, data) => {
    let tmp = currentCart;
    let tmp2 = tmp.map((item, index) => {
      if (item.mamonan == data.mamonan) {
        if (status == "de" && item.soluong >= 2) item.soluong -= 1;
        else if (status == "in") item.soluong += 1
      }
      return item
    })
    setCurrentCart(tmp2)
  }

  const onCountTotalMoney = (data) => {
    let tmp = data;
    let total = 0;
    tmp.length > 0 && tmp.forEach((item) => {
      total += parseInt(item.gia) * item.soluong
    })
    return total;
  }

  const renderContentCofirm = () => (
    <View style={styles.groupWrapper}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginLeft: 20
        }}
      >
        <TouchableOpacity
          onPress={() => {
            sheetRefCofirm.current.snapTo(0);
            setCurrentFoodCount(1)
          }}
        ><Text>x</Text></TouchableOpacity>
        <Text>Them mom an</Text>
        <View
          style={{
            width: 90,
            height: 1,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%"
        }}
      >
        <View
          style={{
            width: 90,
            height: 90,
            backgroundColor: "green"
          }}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <Text>{currentFood.tenmonan}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "flex-end"
            }}
          >
            <Text>{currentFood.gia}</Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  let tmp = currentFoodCount;
                  tmp >= 2 && setCurrentFoodCount(tmp -= 1)
                }}
              >
                <Text>-</Text>
              </TouchableOpacity>
              <Text>{currentFoodCount}</Text>
              <TouchableOpacity
                onPress={() => {
                  let tmp = currentFoodCount;
                  setCurrentFoodCount(tmp += 1)
                }}
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
          alignItems: "flex-end",
        }}
      >
        <Text>{parseInt(currentFood.gia) * currentFoodCount}</Text>
        <TouchableOpacity
          onPress={() => {
            let data = {
              ...currentFood,
              soluong: currentFoodCount
            }
            let tmp = currentCart
            let tmp2 = tmp.concat(data);
            setCurrentCart(tmp2);
            setCurrentFoodCount(1)
            sheetRefCofirm.current.snapTo(0);
          }}
        >
          <Text>them vao gio hang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContentCart = () => {
    return (
      <View style={styles.groupWrapper}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 20
          }}
        >
          <TouchableOpacity
            onPress={() => {
              sheetRefCart.current.snapTo(0);
            }}
          ><Text>x</Text></TouchableOpacity>
          <Text>Gio hang</Text>
          <TouchableOpacity
            onPress={() => setCurrentCart([])}
          >
            <Text>xoa het</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {currentCart.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View>
                  <Text>{item.tenmonan}</Text>
                  <Text>{item.gia}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      onChangeCount("de", item)
                    }}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text>{item.soluong}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      onChangeCount("in", item)
                    }}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    )
  };

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
          zIndex={1}
        />
        <View
          style={{
            zIndex: 1
          }}
        >
          <BottomSheet
            ref={sheetRefCart}
            snapPoints={[
              0,
              Dimensions.get('window').height / 2,
              Dimensions.get('window').height / 1.3
            ]}
            borderRadius={10}
            renderContent={renderContentCart}
            zIndex={1}
          />
          <Animated.FlatList
            bounces={true}
            bouncesZoom={false}
            contentContainerStyle={{
              paddingBottom: 50
            }}
            ListFooterComponent={
              <View
                style={{
                  width: "100%",
                  height: 50
                }}
              />
            }
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
                <View
                  style={{
                    marginLeft: 10
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <Ionicons
                      name="md-shield-checkmark"
                      size={26}
                      color="#FF8C00"
                      style={{
                        marginRight: 4
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 26,
                        fontFamily: helpers.fonts("bold")
                      }}
                    >{data.tencuahang}</Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      marginTop: 4,
                      fontFamily: helpers.fonts()
                    }}
                  >SĐT: {data.dienthoai}</Text>
                  <Text
                    style={{
                      fontSize: 18,
                      marginTop: 4,
                      fontFamily: helpers.fonts()
                    }}
                  >Email: {data.email}</Text>
                  <Text
                    style={{
                      fontSize: 18,
                      marginTop: 4,
                      fontFamily: helpers.fonts()
                    }}
                  >Thời gian phục vụ: {data.thoigianphucvu}</Text>
                  <Text
                    style={{
                      fontSize: 18,
                      marginTop: 4,
                      fontFamily: helpers.fonts()
                    }}
                  >Thời gian giao hàng: {data.thoigiangiaohang}</Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    backgroundColor: Color.GRAY3,
                    height: 16,
                    marginVertical: 10
                  }}
                />
              </View>
            }
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  paddingBottom: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: Color.GRAY3
                }}
                key={item.mamonan}
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
                    flex: 1,
                    marginLeft: 16
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontFamily: helpers.fonts("regular")
                    }}
                  >{item.tenmonan}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flex: 1,
                      alignItems: 'flex-end'
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        fontFamily: helpers.fonts("regular")
                      }}
                    >{item.gia}đ</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentFood(item)
                        sheetRefCofirm.current.snapTo(2);
                      }}
                    >
                      <Ionicons
                        name="add-circle"
                        size={30}
                        color={Color.Primary}
                        style={{
                          marginRight: 4
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <TouchableOpacity
          style={[styles.wrapTab]}
          onPress={() => {
            sheetRefCart.current.snapTo(2);
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Ionicons
              name="md-cart-outline"
              size={50}
              color={Color.Primary}
              style={{
                marginRight: 4,
              }}
            />
            <Text
              style={{
                fontSize: 26,
                fontFamily: helpers.fonts("bold")
              }}
            >{onCountTotalMoney(currentCart)}đ</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Color.Primary,
              padding: 14,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => toCofirm()}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: helpers.fonts("regular"),
                color: Color.WHITE,
                marginHorizontal: 10
              }}
            >Giao hàng</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapTab: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Color.WHITE,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 5,
    borderTopColor: Color.GRAY,
    borderTopWidth: 1,
    padding: 5
  },
  groupWrapper: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height / 1.3,
    borderTopStartRadius: 26,
    overflow: 'hidden',
    zIndex: 1
  }
});

export default Agent;
