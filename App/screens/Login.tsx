import axios from 'axios';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Avatar, useTheme } from 'react-native-paper';
import storeSession from '../tools/storeSession';
import encript from '../tools/encript';
const Login = ({ navigation }) => {

  //#region Declarations and initial values
  const url = "http://localhost:3000/"
  const [username, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const theme = useTheme();
  //#endregion

  const handleLogin = () => {

    const pass = encript.encryptPassword(password)
    const data = {username, password: pass}

    const urlTmp = url+'login'
    
    axios.post(urlTmp, data, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your_token_here'
      }
  })
    .then( async response => {  
      const res = response.data
      
      switch (res.code) {
        case 200:
   
          await storeSession.storeSession(res.data)
          navigation.navigate("Dashboard")
          break;
        case 300:
          alert("Credenciales no validas");
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
      <Avatar.Icon size={100} icon="account" style={styles.avatar} />
      <Text style={styles.title}>Welcome back!</Text>
      
      <TextInput
        label="Username"
        value={username}
        mode="outlined"
        onChangeText={text => setEmail(text)}
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
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('Register')} color={theme.colors.secondaryContainer}>
      Don't have an account?
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Login;