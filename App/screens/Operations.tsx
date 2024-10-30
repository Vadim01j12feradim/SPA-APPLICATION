import React from 'react';
import { View } from 'react-native';
import { UpdateButton } from './UpdateButton';
import { DeleteButton } from './DeleteButton';


export const Operations = ({ data, onPress,onPressDrop }) => {
  return (
    <View>
      <UpdateButton data={data} onPress={onPress}></UpdateButton>
      <DeleteButton data={data} onPress={onPressDrop}></DeleteButton>
    </View>
  );
};

