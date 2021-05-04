import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import Colors from '../constants/Color';

const {width, height} = Dimensions.get('screen');

function ProgressUpdate(props) {
  let {nameUI, progress} = props;
  if (nameUI !== 'progress') return null;
  return (
    <View style={styles.container}>
      {/* <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={[Colors.Light, Colors.Primary]}
        style={styles.linearGradient}>
        <Text style={styles.title}>Cập nhật ứng dụng</Text>
        <LottieView
          style={styles.lottie}
          source={require('../../assets/json/settings.json')}
          loop
          autoPlay
          speed={0.8}
        />
        <Text style={{color: '#fff', marginTop: 12, marginBottom: 12}}>
          {' '}
          {progress}/ 100
        </Text>
        <View style={styles.bar}>
          <View style={[styles.bgLoad, {width: `${progress}%`}]} />
        </View>
        <Text style={styles.txtUpdate}>
          Khi cập nhật thành công ứng dụng sẽ khởi động lại trong giây lát. Vui
          lòng không tắt ứng dụng.
        </Text>
      </LinearGradient> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    position: 'absolute',
    zIndex: 10,
  },
  linearGradient: {
    width,
    height,
    paddingTop: 24,
    paddingLeft: 20,
    paddingRight: 20,
  },
  lottie: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  bgLoad: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  bar: {
    borderWidth: 1,
    borderColor: '#fff',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  txtUpdate: {color: '#fff', marginTop: 24, lineHeight: 20},
});
const mapStateToProps = (state) => {
  return {
    nameUI: state.UiReducer.nameUI,
    progress: state.UiReducer.progress,
  };
};
export default connect(mapStateToProps)(ProgressUpdate);
