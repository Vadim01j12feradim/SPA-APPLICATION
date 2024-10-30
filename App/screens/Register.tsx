import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Avatar, useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

import encript from '../tools/encript';

const Register = ({ navigation }) => {
  //#region  declarations and initial values
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('viewer');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const theme = useTheme();
  const url = "http://localhost:3000/"
  //#endregion

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const data = {password:encript.encryptPassword(password), username,role}

    axios.post(url+'items', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your_token_here'
        }
    })
    .then(response => {
      const res = response.data
      switch (res.code) {
        case 200:
          navigation.navigate("Login")
          break;
        case 300:
          alert("El usuario ya existe");
          break;
      
        default:
          break;
      }
    })
    .catch(error => {
        console.error('Error posting data:', error.response ? error.response.data : error.message); // Handle the error
    });
  };

  return (
    <View style={styles.container}>
      <Avatar.Icon size={100} icon="account-plus" style={styles.avatar} />
      <Text style={styles.title}>Create an account</Text>

      <Text style={styles.label}>Select role</Text>
      <Picker
        selectedValue={role}
        onValueChange={(itemValue) => setRole(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Viewer" value="viewer" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>
      
      <TextInput
        label="User"
        value={username}
        mode="outlined"
        onChangeText={text => setUsername(text)}
        style={styles.input}
      />
     
      <TextInput
        label="Password"
        value={password}
        mode="outlined"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        style={styles.input}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        mode="outlined"
        secureTextEntry
        onChangeText={text => setConfirmPassword(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('Login')} color={theme.colors.secondaryContainer}>
      Do you already have an account? Login here
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    marginBottom: 15,
  },
  label: {
    marginTop: 15,
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    padding: 8,
  },
});

export default Register;

