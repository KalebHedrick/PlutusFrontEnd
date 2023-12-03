import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ExpenseScreen = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    email: '', // Set the user's email here
    amount: '',
    currency: 'usd', // Set the default currency or get it from user preferences
    expenseDate: '',
    type: '',
    payee: {
      name: '',
      description: '',
      category: '',
    },
  });

  // Fetch expenses from the backend when the component mounts
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    const user = ''; // Set the user ID or email
    // Make a GET request to fetch expenses for the user
    fetch(`http://3.17.169.64:3000/expenses/all?user=${user}`)
      .then(response => response.json())
      .then(data => setExpenses(data))
      .catch(error => console.error('Error fetching expenses:', error));
  };

  const addExpense = () => {
    // Make a POST request to add a new expense
    fetch('http://3.17.169.64:3000/expenses/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Expense added successfully:', data);
        // Refresh the expenses after adding a new one
        fetchExpenses();
        // Reset the newExpense state for the next entry
        setNewExpense({
          email: '',
          amount: '',
          currency: 'usd',
          expenseDate: '',
          type: '',
          payee: {
            name: '',
            description: '',
            category: '',
          },
        });
      })
      .catch(error => console.error('Error adding expense:', error));
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
            placeholder="Amount"
            value={newExpense.amount}
            onChangeText={text => setNewExpense({ ...newExpense, amount: text })}
          />
          {/* Add other TextInput components for each field in newExpense */}
          <TouchableOpacity style={styles.addButton} onPress={addExpense}>
            <Text style={styles.addButtonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>

        {/* Existing Expenses Section */}
        <View style={styles.existingExpensesSection}>
          <Text style={styles.inputTitle}>Existing Expenses</Text>
          {/* Render the expenses data */}
          {expenses.map(expense => (
            <View key={expense.id} style={styles.expenseItem}>
              <Text>{`Amount: ${expense.amount}`}</Text>
              <Text>{`Date: ${expense.expenseDate}`}</Text>
              {/* Display other relevant information */}
            </View>
          ))}
        </View>

        {/* Edit Expense Section (You can replace this with your logic) */}
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
  // Your styles go here
});

export default ExpenseScreen;
