import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
let userEmail = localStorage.getItem('email');
let userPassword = localStorage.getItem('password');
const SettingsScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
const [password, setPassword] = useState('');

  const deleteAccount = async () => {
     userEmail = localStorage.getItem('email');
 userPassword = localStorage.getItem('password');
    if (password == userPassword) {
     try {
       const response = await fetch('http://3.17.169.64:3000/auth/delete', {
         method: 'DELETE',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
         body: JSON.stringify({
    email: userEmail,
    password: userPassword,
  }),
       }).then(res => {res.json})
       .then(res => {
       navigation.navigate("Login");
       });
       // Handle the response
     } catch (error) {
       console.error('Error deleting account:', error);
     }
    }
    else {
      alert("Password does not match")
    }
  };

  const handleUpdateUserInfo =  () => {
     
      fetch('http://3.17.169.64:3000/auth/update', {
         method: 'PUT',
         headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
         body: JSON.stringify({
           email: userEmail,
           password: userPassword,
           firstName: firstName,
           lastName: lastName,
         }),
       });
      }
    

  return (
    <View style = {{flexDirection:"column", justifyContent: "space-evenly", flex: 1, backgroundColor: "#69DC9E"}}>
        <TouchableOpacity style={HBstyles.button} onPress={() => {navigation.navigate("Home")}}>
      <Text style={HBstyles.buttonText}>Go to {"Home"}</Text>
    </TouchableOpacity>
      <Text style={{fontSize: 40}}>Delete Account</Text>
      <TextInput
        placeholder="ENTER PASSWORD FOR ACCOUNT DELETION"
        value={password}
        onChangeText={setPassword}
        style={{height: 60, fontSize:30, backgroundColor: "white"}}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => {deleteAccount()}}>
            <Text style={styles.addButtonText}>DELETE ACCOUNT</Text>
          </TouchableOpacity>

      <Text style={{fontSize: 40}}>Update User Information</Text>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={{height: 60, fontSize:30, backgroundColor: "white"}}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={{height: 60, fontSize:30, backgroundColor: "white"}}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => {handleUpdateUserInfo()}}>
            <Text style={styles.addButtonText}>Update User Information</Text>
          </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
const HBstyles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  topBar: {
    height: "5%",
    width: "100%",
    backgroundColor: '#000103',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewExpensesText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  leftSection: {
    flex: 1,
    backgroundColor: '#69DC9E',
    
  },
  categoryBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  categoryText: {
    color: '#000103',
    fontSize: 16,
  },
  rightSection: {
    flex: 2,
    padding: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  addButton: {
    backgroundColor: '#000103',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    margin: 8
  },
  addButtonText: {
    color: '#FFFFFF',
  },
  editSection: {
    // Placeholder for the edit section
    // Add your styling as needed
    flex:1,
  },
});