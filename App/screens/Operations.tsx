import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure you have react-native-vector-icons installed
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

