import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
const LoginUrl = "http://3.17.169.64:3000/auth/create"
{/* Account Creation Component */ } 
export const NewUser = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState('');
    const [errorText, setErrorText] = useState(<></>);
    function createuser() {
      fetch(LoginUrl, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName
  }),
}).then(response => response.json())
    .then(json => {
      console.log(json);
      if (json.status == "create_account_success") {
        navigation.navigate('Login');
      }       
      else {
      setErrorText("Email is already in use, please reenter a new email")
      } 
    })
    .catch(error => {
      console.error(error);
    });
    }
    return(
    <View style = {styles.container}>
        
        {/* Logo */}
        <Image 
            source = {require('/assets/favicon.png')}
            style = {styles.logo}
            resizeMode = "contain"
        />

        <Text style = {styles.title}>Sign up to create an account</Text>
        {/* Link Back to Home Page */}
        <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Click here</Text>
        </TouchableOpacity>
        
      </View>
      <View style={{minHeight: "4%"}}>
      <Text style={styles.errtext}>{errorText}</Text>
      </View>
      <TextInput
        style= {styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        />

       <TextInput
        style= {styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        />

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
          createuser();
          
        }}
    >
         <Text style ={styles.newUserText}>New User</Text>
    </TouchableOpacity>
   

    
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
        backgroundColor: '#C8FACD', 
      },
      subtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20, 
      },
      logo: {
        width: 50, // adjust the width based on your preference
        height: 50, // adjust the height based on your preference
      },
      title: {
        fontSize: 48,
        marginBottom: 10, 
      },
      linkText: {
        textDecorationLine: 'underline', 
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
      newUserText: {
        color:'#FFFFFF',
      },
      errtext: {
        fontSize: 20,
        fontWeight: 'bold',
      }
});
  
export default NewUser; 