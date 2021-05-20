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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../../constants/Color';
import helpers from './../../globals/helpers';
import { connect } from 'react-redux';

const EditProfile = ({ navigation, userInfo }) => {
  const [nameAccount, setNameAccount] = useState(userInfo.username);
  const [phone, setPhone] = useState(userInfo.phoneNumber);
  const [email, setEmail] = useState(userInfo.email);
  const [name, setName] = useState(userInfo.name);
  const [passWord, setPassWord] = useState('');
  const [passWordAgain, setPassWordAgain] = useState('');

  const changeInfoAccount = async () => {
    Keyboard.dismiss();
    if (passWordAgain != passWord) {
      helpers.showMessage({
        content: 'Mật khẩu thử lại không trùng. Vui lòng thử lại'
      });
    } else if (
      nameAccount.trim() &&
      phone.trim() &&
      email.trim() &&
      name.trim() &&
      passWordAgain.trim() &&
      passWord.trim()
    ) {
      let data = {
        user_name: nameAccount,
        pass_word: passWord,
        phone_number: phone,
        name: name,
        email: email
      };
      helpers.showLoading();
      // let res = await helpers.changeInfoAccount(data);
      helpers.hideModal();
      if (res.message == 'Đăng Ký Thành Công') {
        helpers.showMessage({
          content: res.message
        });
        navigation.goBack();
      } else {
        helpers.showMessage({
          content: 'Đã có lỗi xảy ra'
        });
      }
    } else {
      helpers.showMessage({
        content: 'Vui lòng thử lại'
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 10
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          marginBottom: 10
        }}
      >
        <View>
          <Text style={styles.logo}>Sửa thông tin</Text>
        </View>
      </View>
      <View style={styles.inputwrapper}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="tài khoản"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setNameAccount(text)}
            value={nameAccount}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="số điện thoại"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setPhone(text)}
            value={phone}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="email"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="tên"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setName(text)}
            value={name}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="mật khẩu"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setPassWord(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="nhập lại mật khẩu"
            placeholderTextColor="#003f5c"
            autoCorrect={false}
            onChangeText={(text) => setPassWordAgain(text)}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          changeInfoAccount();
        }}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Thay đổi</Text>
      </TouchableOpacity>
    </View>
  );
};


const mapStateToProps = (state) => ({
  userInfo: state.userState?.user,
});

export default connect(mapStateToProps)(EditProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 44,
    color: '#fb5b5a'
  },
  inputwrapper: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#dedede',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden'
  },
  inputView: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fb5b5a'
  },
  inputText: {
    height: 50,
    color: 'black'
  },
  forgot: {
    color: '#fb5b5a',
    fontSize: 11
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: 'white'
  }
});
