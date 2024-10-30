import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function NewItemButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>+ Add Car</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',  // Button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,            // Rounded corners
    alignItems: 'center',        // Center text
    shadowColor: '#000',         // Shadow for elevated look
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,                // For Android shadow
  },
  buttonText: {
    color: '#fff',               // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});
