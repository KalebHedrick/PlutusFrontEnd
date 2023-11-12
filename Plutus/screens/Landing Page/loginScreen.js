import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add api implementation for login here
    console.log("hi)");
    console.log('Email:', email);
    console.log('Password:', password);
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Plutus</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} backgroundColor={"#DDDDDD"} flex={1} onPress={() => {navigation.navigate('Home')} }><Text style={styles.loginText}>Login</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100vh',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#69DC9E',
    
  },
  title: {
    fontSize: 64,
    marginBottom: 20,
  },
  input: {
    
    height: "5%",
    width: "20%",
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#000103",
    color: "#FFFFFF",
    borderRadius: 50,
    width: '5%',
    height: "5%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: "#FFFFFF"
  }
});

export default Login;