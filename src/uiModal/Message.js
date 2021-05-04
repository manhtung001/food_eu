import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';

import helper from '../globals/helpers';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('screen');
import * as Animatable from 'react-native-animatable';

function MessageBox(props) {
  let {titleMes, contentMess, nameClose, nameUI} = props;
  const hideUi = () => {
    helper.hideModal();
    if (props.callBack) {
      props.callBack();
    }
  };
  if (nameUI !== 'message') {
    return null;
  }
  return (
    <View style={styles.container}>
      <Animatable.View
        animation="bounceIn"
        iterationCount={1}
        direction="alternate"
        style={styles.content}>
        <View style={styles.title}>
          <Text style={styles.titleTxt}>
            {titleMes ? titleMes : 'Thông báo'}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.contentTxt}>{contentMess}</Text>
        </ScrollView>
        <View style={styles.wrapBt}>
          <TouchableOpacity onPress={hideUi} style={styles.bt}>
            <Text style={styles.txtClose}>
              {nameClose ? nameClose : 'Đóng'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    contentMess: state.UiReducer.messageContent,
    nameUI: state.UiReducer.nameUI,
    titleMes: state.UiReducer.messageTitle,
    callBack: state.UiReducer.funcMsg,
    nameClose: state.UiReducer.nameClose,
  };
};
export default connect(mapStateToProps)(MessageBox);

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    width: '76%',
    backgroundColor: 'white',
    borderRadius: 10,
    maxHeight: height * 0.7,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
  },
  titleTxt: {
    fontWeight: '500',
    fontSize: 16,
    color: '#616161',
  },
  contentTxt: {
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%',
    marginTop: 8,
  },
  wrapBt: {
    marginTop: 20,
    justifyContent: 'center',
  },
  bt: {
    alignSelf: 'center',
    height: 35,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    minWidth: 80,
  },
  txtClose: {
    fontWeight: '500',
    fontSize: 16,
    color: '#757575',
  },
});
