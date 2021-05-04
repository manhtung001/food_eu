/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
  Image,
  Keyboard
} from 'react-native';

import helpers from './../../globals/helpers';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [passWord, setPassWord] = useState('');

  const login = async (phone, password, token) => {
    Keyboard.dismiss();
    if (phone.trim() && passWord.trim()) {
      let data = {
        phone,
        password
      }
      let dataDebug = {
        phone: '0356798938',
        password: '123456'
      }
      helpers.showLoading()
      let res = await helpers.login(data);
      helpers.hideModal()
      if (res.code == 0) {
        navigation.replace('RootTab');
      } else {
        helpers.showMessage({ content: res.message })
      }
    } else {
      helpers.showMessage({ content: 'Vui lòng nhập số điện thoại và mật khẩu' })
    }
  }

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: "row",
        marginTop: 50,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        marginBottom: 10
      }} >
        <Image
          source={require('../../assets/shipperBackgroud.png')}
          style={{
            width: 260,
            aspectRatio: 600 / 563,
          }}
        />
        <View>
          <Text style={styles.logo}>MEGA</Text>
          <Text style={styles.logo}>SHIP</Text>
        </View>

      </View>
      <View style={styles.inputwrapper}>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="số điện thoại"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={text => setPhone(text)}
          />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="mật khẩu"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={text => setPassWord(text)}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          login(phone, passWord);
        }}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>


    </View>
  );
}

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 52,
    color: "#fb5b5a",
  },
  inputwrapper: {
    width: "90%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: '#dedede',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    overflow: "hidden"
  },
  inputView: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#fb5b5a"
  },
  inputText: {
    height: 50,
    color: "black"
  },
  forgot: {
    color: "#fb5b5a",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  }
});

