import React from 'react';
import {View} from 'react-native';

import Message from './Message';
import Loading from './Loading';
import ConfirmBox from './ConfirmBox';
import Progress from './Progress';

export default function UiContainer() {
  return (
    <View style={{position: 'absolute'}}>
      <Loading />
      <Message />
      <ConfirmBox />
      <Progress />
    </View>
  );
}
