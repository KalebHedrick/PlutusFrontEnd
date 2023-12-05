import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const IncomeScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [incomeDate, setIncomeDate] = useState('');
  const [type, setType] = useState('');

  const handleAddIncome = () => {
    if (!amount || !incomeDate || !type) {
      alert('Please fill in all the fields.');
      return;
    }

    const incomeData = {
      email: 'planwithplutus@gmail.com',
      amount: parseFloat(amount),
      currency: 'usd',
      incomeDate: incomeDate,
      type: type,
    };

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
        if (json.status === 'income_add_success') {
          navigation.navigate('IncomeDetails', { incomeId: json.id });
        } else {
          alert(`Failed to add income. Error: ${json.message}`);
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An unexpected error occurred. Please try again later.');
      });
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.viewIncomesText}>View Incomes</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <Text style={styles.inputTitle}>Add New Income</Text>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Income Date (YYYY-MM-DD)"
          value={incomeDate}
          onChangeText={(text) => setIncomeDate(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Income Type"
          value={type}
          onChangeText={(text) => setType(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddIncome}>
          <Text style={styles.addButtonText}>Add Income</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topBar: {
    backgroundColor: '#000103',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  viewIncomesText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  inputSection: {
    padding: 20,
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
  },
  addButtonText: {
    color: '#FFFFFF',
  },
});

export default IncomeScreen;
