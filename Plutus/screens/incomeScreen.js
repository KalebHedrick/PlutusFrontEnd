import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const IncomeScreen = ({ navigation }) => {
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeDate, setIncomeDate] = useState('');
  const [incomeType, setIncomeType] = useState('');

  const handleAddIncome = () => {
    // Add logic to handle adding income
    // You can use the values of incomeAmount, incomeDate, and incomeType

    // Check if any of the required fields are empty
    if (!incomeAmount || !incomeDate || !incomeType) {
      // Handle error, show an alert to the user
      alert('Please fill in all the fields.');
      return;
    }

    const incomeData = {
      email: 'planwithplutus@gmail.com',
      amount: parseFloat(incomeAmount),
      currency: 'usd',
      incomeDate: incomeDate,
      type: incomeType,
    };

    // Make a POST request to the backend API
    fetch('http://3.17.169.64:3000/incomes/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(incomeData),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        // Handle the response from the backend
        if (json.status === 'income_add_success') {
          navigation.navigate('IncomeDetails', { incomeId: json.id });
        } else {
          // Handle other response statuses or show an error message to the user
          alert(`Failed to add income. Error: ${json.message}`);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error, show alert to the user
        alert('An unexpected error occurred. Please try again later.');
      });
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.viewIncomeText}>Viewing Income Details</Text>
      </View>

      {/* Split Screen */}
      <View style={styles.splitScreen}>
        {/* Left Section (Display Details) */}
        <View style={styles.leftSection}>
          {/* Add your logic for displaying income details here */}
        </View>

        {/* Right Section (Add New Income) */}
        <View style={styles.rightSection}>
          <View style={styles.inputSection}>
            <Text style={styles.inputTitle}>Add New Income</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Amount:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                value={incomeAmount}
                onChangeText={(text) => setIncomeAmount(text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Income Date:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter date (YYYY-MM-DD)"
                value={incomeDate}
                onChangeText={(text) => setIncomeDate(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Income Type:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter income type"
                value={incomeType}
                onChangeText={(text) => setIncomeType(text)}
              />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddIncome}>
              <Text style={styles.addButtonText}>Add Income</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    backgroundColor: '#000103',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  viewIncomeText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  splitScreen: {
    flex: 1,
    flexDirection: 'row',
  },
  leftSection: {
    flex: 1,
    backgroundColor: '#69DC9E',
    justifyContent: 'center',
    alignItems: 'center',
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
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
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
  },
  addButtonText: {
    color: '#FFFFFF',
  },
});

export default IncomeScreen;
