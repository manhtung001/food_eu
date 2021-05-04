import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import helpers from './../../globals/helpers';
import Color from '../../constants/Color';
import Icon from 'react-native-vector-icons/AntDesign';

const Profile = (props) => {

  const logout = () => {
    helpers.showComfirm({
      title: 'Thông báo',
      content: 'Bạn có chắc chắn muốn đăng xuất?',
      textOk: 'Đồng ý',
      textCancer: 'Huỷ',
      onOk: () => {
        helpers.clearUser();
        props.navigation.replace('LoginScreen')
      }
    })

  }
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
    }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Color.Primary,
        }}
      />
      <View
        style={{
          flex: 5,
          backgroundColor: '#fff',
        }}
      >
        <View
          style={styles.avatar}
        >
          <Image
            source={{
              uri: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
            }}
            style={{
              width: 120,
              height: 120,
              marginRight: 20
            }}
          />
          <View
            style={{
              justifyContent: "center",
              borderLeftColor: Color.PLACEHOLDER,
              borderLeftWidth: 2,
              paddingLeft: 20
            }}
          >
            <Text
              style={{
                fontSize: 24,
                marginBottom: 10
              }}
            >{props.userInfo.name}</Text>
            <View style={{ flexDirection: 'row' }} >
              <Icon
                size={24}
                name="phone"
                color={Color.Primary}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginLeft: 5
                }}
              >{props.userInfo.phone}</Text>
            </View>
          </View>
        </View>
      </View>



      <TouchableOpacity
        style={{
          width: "60%",
          borderRadius: 20,
          backgroundColor: Color.Primary,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
          padding: 20,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20,
          flexDirection: "row"
        }}
        onPress={() => logout()}
      >
        <Icon
          size={24}
          name="logout"
          color={Color.WHITE}
        />

        <Text style={{ color: "white", fontSize: 18, marginLeft: 20 }} >Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  avatar: {
    marginTop: -50,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 10,
    marginHorizontal: 10,
    padding: 20,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});


const mapStateToProps = state => ({ userInfo: state.userState?.user, token: state.userState?.token })

export default connect(mapStateToProps)(Profile);
