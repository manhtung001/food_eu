import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
} from 'react-native';

import Colors from '../constants/Color';
import helper from '../globals/helpers';

import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('screen');
const ios = Platform.OS === 'ios';

function ConfirmBox(props) {
  let {
    titlebntHuy,
    titlebntOK,
    contentConf,
    titleConf,
    nameUI,
    confirmImgUrl,
  } = props;
  const onOK = () => {
    props.btnOK ? props.btnOK() : null;
    helper.hideModal();
  };
  const onCancer = () => {
    props.btnHuy ? props.btnHuy() : null;
    helper.hideModal();
  };
  if (nameUI !== 'comfirmBox') {
    return null;
  }
  return (
    <View style={styles.container}>
      <Animatable.View
        animation="bounceIn"
        iterationCount={1}
        direction="alternate"
        style={styles.content}>
        <View style={styles.top}>
          <Text style={styles.title}>{titleConf}</Text>
        </View>
        {confirmImgUrl && (
          // <Animatable.View
          //   animation="pulse"
          //   easing="ease-out"
          //   iterationCount="infinite">

          <FastImage
            source={confirmImgUrl}
            style={styles.img}
            resizeMode="contain"
          />
          // </Animatable.View>
        )}
        <View>
          <Text style={styles.txtContent}>{contentConf}</Text>
        </View>
        <View style={styles.wrapBottom}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={onCancer}
            style={styles.btCancer}>
            <Text>{titlebntHuy ? titlebntHuy : 'Huỷ'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={onOK}
            style={styles.btOke}>
            <Text style={styles.txtOke}>
              {titlebntOK ? titlebntOK : 'Tiếp tục'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    contentConf: state.UiReducer.confirmContent,
    titleConf: state.UiReducer.confirmTitle,
    btnHuy: state.UiReducer.onConfirmCancel,
    btnOK: state.UiReducer.onConfirmOk,
    titlebntHuy: state.UiReducer.confirmCancelText,
    titlebntOK: state.UiReducer.confirmOkText,
    nameUI: state.UiReducer.nameUI,
    confirmImgUrl: state.UiReducer.confirmImgUrl,
  };
};
export default connect(mapStateToProps)(ConfirmBox);

const styles = StyleSheet.create({
  container: {
    width,
    height,
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
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 4,
  },
  title: {
    fontWeight: ios ? '600' : '700',
    fontSize: 16,
  },
  txtContent: {
    fontSize: 15,
    alignSelf: 'center',
    lineHeight: 23,
    width: '90%',
    textAlign: 'center',
  },
  wrapBottom: {
    flexDirection: 'row',
    marginTop: 22,
    borderTopWidth: 1,
    borderColor: '#e3e3e6',
    justifyContent: 'center',
  },
  btCancer: {
    flex: 1,
    padding: 12,
    borderRightWidth: 1,
    borderColor: '#e3e3e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btOke: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtOke: {
    fontWeight: ios ? '600' : '700',
    color: Colors.Primary,
  },
});
