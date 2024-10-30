import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure you have react-native-vector-icons installed



export const UpdateButton = ({data, onPress }) => {
  return (
    <TouchableOpacity style={styles.updateButton} onPress={onPress}>
      <Icon name="edit" size={20} color="#fff" style={styles.icon} />
      <Text style={styles.buttonText}>Update</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5bc0de', // Blue color for update
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
