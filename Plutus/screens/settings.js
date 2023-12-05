import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
let userEmail = localStorage.getItem('email');
let userPassword = localStorage.getItem('password');
const SettingsScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleDeleteAccount = () => {
    Alert.alert(
      'Are you sure?',
      'This action is irreversible. Do you really want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteAccount() },
      ]
    );
  };

  const deleteAccount = async () => {
    // Implement your logic to delete the account here
    // This could involve making a DELETE request to your server
    // and handling the response accordingly
    // Example:
    // try {
    //   const response = await fetch('your-delete-account-endpoint', {
    //     method: 'DELETE',
    //     headers: {
    //       'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    //     },
    //   });
    //   // Handle the response
    // } catch (error) {
    //   console.error('Error deleting account:', error);
    // }
    navigation.navigate("Login");
  };

  const handleUpdateUserInfo = async () => {
     try {
      const response = await fetch('http://3.17.169.64:3000/auth/update', {
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
       // Handle the response
     } catch (error) {
       console.error('Error updating user information:', error);
     }
  };

  return (
    <View style = {{flexDirection:"column", justifyContent: "space-evenly", flex: 1, backgroundColor: "#69DC9E"}}>
      <Text style={{fontSize: 40}}>Delete Account</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => {handleDeleteAccount()}}>
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