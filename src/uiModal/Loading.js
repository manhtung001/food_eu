import React, {Component} from 'react';
import {TouchableOpacity, Dimensions, StyleSheet, View,Text} from 'react-native';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import helper from '../globals/helpers';

import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('screen');
// screen là cả thanh tab bar
// window là chỉ phần màn hình
// screen và window trên ios là bằng nhau

class Loading extends Component {
  render() {
    if (this.props.nameUI !== 'loading') return null;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => helper.hideModal()}
        style={styles.container}>
        <LottieView
          ref="loading"
          style={styles.lottie}
          source={require('./../assets/json/loading.json')}
          loop
          autoPlay
          speed={0.8}
        />
        <View style={styles.wrapImg}>
          <FastImage source={require('../../icon.png')} style={styles.img} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: 'rgba(1,1,1,0.6)',
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 108,
    height: 108,
    alignSelf: 'center',
  },
  wrapImg: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#fff',
    padding: 3,
  },
  img: {
    width: 50,
    height: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    nameUI: state.UiReducer.nameUI,
  };
};
export default connect(mapStateToProps)(Loading);
