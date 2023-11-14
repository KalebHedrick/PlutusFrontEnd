import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add API implementation for login here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Plutus</Text>
      <Text style={styles.subtitle}>Please enter your login information below:</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.button}
        backgroundColor={'#C8FACD'} // Lighter green color
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

        {/* Space between login and create user button */ }
        <View style = {{ marginVertical: 5 }} />

      {/* Create button for new user */ }  
      <TouchableOpacity
        style = {styles.button}
        background={'#C8FACD'}
        onPress = {() => {
          navigation.navigate('New User'); 
        }}
        >
          <Text style ={styles.loginText}>New User</Text>
        </TouchableOpacity>

      {/* Bottom message */}
      <Text style={styles.bottomMessage}>
        Kudos to you for making a big step toward a strong financial future! 👏
      </Text>
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
    backgroundColor: '#C8FACD', // Lighter green color
  },
  title: {
    fontSize: 64,
    marginBottom: 10, // Move the title higher up
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    height: 30,
    width: '40%', // Adjusted width to half
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10, // Reduced margin
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#000103',
    borderRadius: 50,
    width: '20%', // Adjusted width to half
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#FFFFFF',
  },
  bottomMessage: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Login;
