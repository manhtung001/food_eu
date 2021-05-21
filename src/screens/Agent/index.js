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
  Dimensions,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
import Layout from '../../constants/Layout';
import moment from 'moment';
import Color from '../../constants/Color';
import helpers from '../../globals/helpers';
import BottomSheet from 'reanimated-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';

const Agent = (props) => {
  const sheetRefCofirm = React.useRef(null);
  const sheetRefCart = React.useRef(null);
  const [currentFood, setCurrentFood] = useState('');
  const [dataFood, setDataFood] = useState([]);
  const [infoShop, setInfoShop] = useState([]);
  let [currentFoodCount, setCurrentFoodCount] = useState(1);

  const [currentCart, setCurrentCart] = useState(props.cart);
  const { data } = props.route.params;

  const toCofirm = () => {
    props.navigation.navigate('Cofirm');
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setCurrentCart(props.cart);
  }, [props.cart]);

  const getData = async () => {
    helpers.showLoading();
    let res = await dataService.getProductByIdShop(data);
    helpers.hideModal();
    if (res) {
      setInfoShop(res);
      setDataFood(res.productResponseList);
    }
  };

  const onChangeCount = (status, data) => {
    let tmp = currentCart;
    let tmp2 = tmp.map((item, index) => {
      if (item.idShop == data.idShop && item.id == data.id) {
        if (status == 'de' && item.count >= 1) {
          if (item.count == 1) {
            helpers.showComfirm({
              content: `Bạn có chắc chắn muốn xoá ${item.productName} của cửa hàng ${item.shopName} ra khỏi giỏ hàng?`,
              onOk: () => {
                item.count -= 1;
                helpers.setCurrentCart(tmp2);
              }
            });
          } else {
            item.count -= 1;
          }
        } else if (status == 'in') item.count += 1;
      }
      return item;
    });
    helpers.setCurrentCart(tmp2);
  };

  const onCountTotalMoney = (data) => {
    let tmp = data;
    let total = 0;
    tmp.length > 0 &&
      tmp.forEach((item) => {
        total += parseInt(item.price) * item.count;
      });
    return total;
  };

  const renderContentCofirm = () => (
    <View
      style={[
        styles.groupWrapper,
        {
          justifyContent: 'space-between'
        }
      ]}
    >
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingVertical: 10,
            backgroundColor: Color.GRAY3,
            marginBottom: 30
          }}
        >
          <TouchableOpacity
            onPress={() => {
              sheetRefCofirm.current.snapTo(0);
              setCurrentFoodCount(1);
            }}
          >
            <Ionicons
              name="close"
              size={30}
              style={{
                marginRight: 4
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 22,
              fontFamily: helpers.fonts('regular')
            }}
          >
            Thêm món mới
          </Text>
          <View
            style={{
              width: 50,
              height: 1
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%'
          }}
        >
          <FastImage
            style={{ width: 90, height: 90, marginLeft: 10 }}
            source={{
              uri: currentFood.linkImage,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View
            style={{
              flex: 1,
              marginLeft: 10
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontFamily: helpers.fonts('regular')
              }}
            >
              {currentFood.productName}
            </Text>
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
                  fontFamily: helpers.fonts('regular')
                }}
              >
                {helpers.formatMoney(parseFloat(currentFood.price))}đ
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 20,
                  justifyContent: 'space-between',
                  width: 120,
                  alignItems: 'center'
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    let tmp = currentFoodCount;
                    tmp >= 2 && setCurrentFoodCount((tmp -= 1));
                  }}
                >
                  <AntDesign name="minuscircle" size={30} color={Color.GRAY} />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: helpers.fonts('regular')
                  }}
                >
                  {currentFoodCount}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    let tmp = currentFoodCount;
                    setCurrentFoodCount((tmp += 1));
                  }}
                >
                  <AntDesign
                    name="pluscircle"
                    size={30}
                    color={Color.Primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopColor: Color.GRAY,
          borderTopWidth: 1,
          padding: 10,
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: helpers.fonts('bold')
          }}
        >
          {helpers.formatMoney(
            parseFloat(currentFood.price) * currentFoodCount
          )}
          đ
        </Text>
        <TouchableOpacity
          onPress={() => {
            let data = {
              ...currentFood,
              idShop: infoShop.idShop,
              count: currentFoodCount
            };
            addToCart(data);
          }}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 20,
            borderRadius: 30,
            borderColor: Color.Primary,
            borderWidth: 1
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontFamily: helpers.fonts('regular'),
              color: Color.Primary
            }}
          >
            Thêm vào giỏ hàng
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContentCart = () => {
    return (
      <View style={styles.groupWrapper}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingVertical: 10,
            backgroundColor: Color.GRAY3,
            marginBottom: 30,
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              sheetRefCart.current.snapTo(0);
            }}
          >
            <Ionicons
              name="close"
              size={30}
              style={{
                paddingHorizontal: 12
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 22,
              fontFamily: helpers.fonts('regular')
            }}
          >
            Giỏ hàng
          </Text>
          <TouchableOpacity
            onPress={() => {
              helpers.showComfirm({
                title: 'Xoá tất cả món',
                content: 'Bạn có muốn xoá tất cả món trong giỏ hàng?',
                onOk: () => helpers.setCurrentCart([]),
                textOk: 'Xoá tất cả'
              });
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: helpers.fonts('regular'),
                color: Color.Primary,
                marginRight: 10
              }}
            >
              Xoá hết
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {currentCart.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 30,
                  paddingLeft: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: Color.GRAY,
                  paddingBottom: 14
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: helpers.fonts()
                    }}
                  >
                    {item.productName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: helpers.fonts()
                    }}
                  >
                    Tên cửa hàng: {item.shopName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: helpers.fonts()
                    }}
                  >
                    {helpers.formatMoney(parseFloat(item.price))}đ
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginRight: 20,
                    justifyContent: 'space-between',
                    width: 100,
                    alignItems: 'center'
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      onChangeCount('de', item);
                    }}
                  >
                    <AntDesign
                      name="minuscircle"
                      size={26}
                      color={Color.GRAY}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 22,
                      fontFamily: helpers.fonts('regular')
                    }}
                  >
                    {item.count}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      onChangeCount('in', item);
                    }}
                  >
                    <AntDesign
                      name="pluscircle"
                      size={26}
                      color={Color.Primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const addToCart = (data) => {
    let tmp = currentCart;
    let check = true;
    let tmp3 = tmp.map((item, index) => {
      if (data.idShop == item.idShop && data.id == item.id) {
        item.count += data.count;
        check = false;
      }
      return item;
    });
    if (check) {
      let tmp2 = tmp.concat(data);
      helpers.setCurrentCart(tmp2);
    } else {
      helpers.setCurrentCart(tmp3);
    }
    setCurrentFoodCount(1);
    sheetRefCofirm.current.snapTo(0);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View>
        <BottomSheet
          ref={sheetRefCofirm}
          snapPoints={[0, Dimensions.get('window').height / 1.15]}
          borderRadius={10}
          renderContent={renderContentCofirm}
          zIndex={4}
        />
        <View
          style={{
            zIndex: 2
          }}
        >
          <BottomSheet
            ref={sheetRefCart}
            snapPoints={[0, Dimensions.get('window').height / 1.15]}
            borderRadius={10}
            renderContent={renderContentCart}
            zIndex={3}
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
                  width: '100%',
                  height: 200
                }}
              />
            }
            keyExtractor={(item, index) => index + ''}
            data={dataFood}
            ListHeaderComponent={
              <View>
                <FastImage
                  style={{
                    width: Layout.screen.width,
                    height: Layout.screen.height / 4
                  }}
                  source={{
                    uri: infoShop.linkImage,
                    priority: FastImage.priority.normal
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />

                <View
                  style={{
                    marginLeft: 10
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10
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
                        fontFamily: helpers.fonts('bold')
                      }}
                    >
                      {infoShop.shopName}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      marginTop: 4,
                      fontFamily: helpers.fonts()
                    }}
                  >
                    SĐT: {infoShop.phoneNumber}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      marginTop: 4,
                      fontFamily: helpers.fonts()
                    }}
                  >
                    Email: {infoShop.email}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      marginTop: 4,
                      fontFamily: helpers.fonts()
                    }}
                  >
                    Khu vực: {infoShop.are}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
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
                key={item.id}
              >
                <FastImage
                  style={{ width: 90, height: 90, marginLeft: 10 }}
                  source={{
                    uri: item.linkImage,
                    priority: FastImage.priority.normal
                  }}
                  resizeMode={FastImage.resizeMode.contain}
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
                      fontFamily: helpers.fonts('regular')
                    }}
                  >
                    {item.productName}
                  </Text>
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
                        fontFamily: helpers.fonts('regular')
                      }}
                    >
                      {helpers.formatMoney(parseFloat(item.price))}đ
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentFood(item);
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
                marginRight: 4
              }}
            />
            <Text
              style={{
                fontSize: 26,
                fontFamily: helpers.fonts('bold'),
                marginLeft: 6
              }}
            >
              {helpers.formatMoney(onCountTotalMoney(currentCart))}đ
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Color.Primary,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 8
            }}
            onPress={() => toCofirm()}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: helpers.fonts('regular'),
                color: Color.WHITE,
                marginHorizontal: 10
              }}
            >
              Giao hàng
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          style={{
            position: 'absolute',
            top: 20,
            left: 10,
            zIndex: 2
          }}
        >
          <Ionicons
            name="arrow-back"
            size={40}
            color={Color.Primary}
            style={{
              marginRight: 4
            }}
          />
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
    height: Dimensions.get('window').height / 1.15,
    borderTopStartRadius: 20,
    overflow: 'hidden',
    zIndex: 10
  }
});

const mapStateToProps = (state) => ({
  cart: state.userState?.cart
});

export default connect(mapStateToProps)(Agent);
