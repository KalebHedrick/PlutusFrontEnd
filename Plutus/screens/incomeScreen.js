import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const IncomeScreen = ({ navigation }) => {
    const [incomeType, setIncomeType] = useState('');
    const [incomeAmount, setIncomeAmount] = useState('');
    const [incomeDate, setIncomeDate] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [allIncomes, setAllIncomes] = useState([]);
  
    useEffect(() => {
      // Fetch and update monthly income
      fetchMonthlyIncome();
  
      // Fetch and update all incomes
      fetchAllIncomes();
    }, []); // Empty dependency array ensures that this effect runs once after the initial render
  
    const fetchMonthlyIncome = async () => {
      try {
        // Add logic to fetch the monthly income from the backend
        const response = await fetch('/incomes/all?email=planwithplutus@gmail.com');
        const result = await response.json();
        // Update the value of monthly income
        setMonthlyIncome(result.reduce((total, income) => total + income.amount, 0));
      } catch (error) {
        console.error('Error fetching monthly income:', error);
      }
    };
  
    const fetchAllIncomes = async () => {
      try {
        // Add logic to fetch all incomes from the backend
        const response = await fetch('/incomes/all?email=planwithplutus@gmail.com');
        const result = await response.json();
        // Update the value of all incomes
        setAllIncomes(result);
      } catch (error) {
        console.error('Error fetching all incomes:', error);
      }
    };
  
    const handleAddIncome = async () => {
      // Add logic to handle adding income
      // You can use the values of incomeType, incomeAmount, and incomeDate
  
      // Check if any of the required fields are empty
      if (!incomeType || !incomeAmount || !incomeDate) {
        // Handle error, show an alert to the user
        alert('Please fill in all the fields.');
        return;
      }
  
      try {
        // Make a POST request to add income to the backend
        const response = await fetch('/incomes/add', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'planwithplutus@gmail.com',
            amount: parseFloat(incomeAmount),
            currency: 'usd', // default currency
            incomeDate,
            type: incomeType,
          }),
        });
  
        const result = await response.json();
        console.log(result);
  
        // After successfully adding income, fetch updated data
        fetchMonthlyIncome();
        fetchAllIncomes();
      } catch (error) {
        console.error('Error adding income:', error);
        // Handle error, show an alert to the user
        alert('Failed to add income. Please try again later.');
      }
    };

    return (
        <View style={styles.container}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <Text style={styles.viewIncomeText}>Viewing Income Details</Text>
          </View>
    
          {/* Left Section */}
          <View style={styles.leftSection}>
            {/* Monthly Income */}
            <View style={styles.monthlyIncomeBox}>
              <Text style={styles.incomeBoxTitle}>Monthly Income</Text>
              <Text style={styles.incomeBoxAmount}>${monthlyIncome.toFixed(2)}</Text>
            </View>
    
            {/* All Incomes */}
            <View style={styles.allIncomesBox}>
              <Text style={styles.incomeBoxTitle}>All Incomes</Text>
              {allIncomes.map((income) => (
                <Text key={income._id} style={styles.incomeBoxItem}>
                  {income.type}: ${income.amount.toFixed(2)}
                </Text>
              ))}
            </View>
          </View>
    
          {/* Right Section */}
          <View style={styles.rightSection}>
            {/* Income Input Section */}
            <View style={styles.inputSection}>
              <Text style={styles.inputTitle}>Add New Income</Text>
              <TextInput
                style={styles.input}
                placeholder="Income Type"
                value={incomeType}
                onChangeText={(text) => setIncomeType(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Income Amount"
                value={incomeAmount}
                onChangeText={(text) => setIncomeAmount(text)}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Income Date (YYYY-MM-DD)"
                value={incomeDate}
                onChangeText={(text) => setIncomeDate(text)}
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddIncome}>
                <Text style={styles.addButtonText}>Add Income</Text>
              </TouchableOpacity>
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
      viewIncomeText: {
        color: '#FFFFFF',
        fontSize: 18,
      },
      leftSection: {
        flex: 1,
        padding: 20,
        backgroundColor: '#69DC9E',
      },
      monthlyIncomeBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
      },
      incomeBoxTitle: {
        fontSize: 18,
        marginBottom: 10,
      },
      incomeBoxAmount: {
        fontSize: 24,
      },
      allIncomesBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
      },
      incomeBoxItem: {
        fontSize: 16,
        marginBottom: 5,
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
    });

export default IncomeScreen;
