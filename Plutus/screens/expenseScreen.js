import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
 
const ExpenseScreen = ({ navigation }) => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
 
  const handleAddExpense = () => {
    // Add logic to handle adding expense
    // You can use the values of expenseName, expenseAmount, and expenseDate
 
    // Check if any of the required fields are empty
    if (!expenseName || !expenseAmount || !expenseDate) {
      // Handle error, show an alert to the user
      alert('Please fill in all the fields.');
      return;
    }
 
    const expenseData = {
      email: 'planwithplutus@gmail.com', 
      amount: parseFloat(expenseAmount), 
      currency: 'usd',
      method: 'credit_card', //can be credit_card or debit_card
      expenseDate: expenseDate,
      // You can add other fields based on your backend API requirements
    };
 
    // Make a POST request to the backend API
    fetch('http://3.17.169.64:3000/expenses/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        // Handle the response from the backend
        if (json.status === 'expense_add_success') {
          navigation.navigate('ExpenseDetails', { expenseId: json.id });
        } else {
          // Handle other response statuses or show an error message to the user
          alert(`Failed to add expense. Error: ${json.message}`);
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
        <Text style={styles.viewExpensesText}>View Expenses</Text>
      </View>
 
      {/* Left Section */}
      <View style={styles.leftSection}>
        <View style={styles.categoryBox}>
          <Text style={styles.categoryText}>Daily Expenses</Text>
        </View>
        <View style={styles.categoryBox}>
          <Text style={styles.categoryText}>Weekly Expenses</Text>
        </View>
        <View style={styles.categoryBox}>
          <Text style={styles.categoryText}>Monthly Expenses</Text>
        </View>
      </View>
 
      {/* Right Section */}
      <View style={styles.rightSection}>
        {/* Expense Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputTitle}>Add New Expense</Text>
          <TextInput
            style={styles.input}
            placeholder="Expense Name"
            value={expenseName}
            onChangeText={(text) => setExpenseName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Expense Amount"
            value={expenseAmount}
            onChangeText={(text) => setExpenseAmount(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Expense Date (YYYY-MM-DD)"
            value={expenseDate}
            onChangeText={(text) => setExpenseDate(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
            <Text style={styles.addButtonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
 
        {/* Edit Expense Section */}
        {/* This is just a placeholder for the edit section */}
        <View style={styles.editSection}>
          <Text style={styles.inputTitle}>Edit Expenses</Text>
          {/* Add your logic for editing expenses here */}
        </View>
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  topBar: {
    flex: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  addButtonText: {
    color: '#FFFFFF',
  },
  editSection: {
    // Placeholder for the edit section
    // Add your styling as needed
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  topBar: {
    flex: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  addButtonText: {
    color: '#FFFFFF',
  },
  editSection: {
    // Placeholder for the edit section
    // Add your styling as needed
  },
});
 
export default ExpenseScreen;