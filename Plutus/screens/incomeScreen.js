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
      const response = await fetch('http://3.17.169.64:3000/incomes/monthly', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // Add any additional headers or parameters if needed
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch monthly income. Status: ${response.status}`);
      }
  
      const result = await response.json();
      setMonthlyIncome(result.totalMonthlyIncome);
    } catch (error) {
      console.error(error);
      // Handle error, show alert to the user
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  
  const fetchAllIncomes = async () => {
    try {
      const response = await fetch('http://3.17.169.64:3000/incomes/all', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // Add any additional headers or parameters if needed
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch all incomes. Status: ${response.status}`);
      }
  
      const result = await response.json();
      setAllIncomes(result);
    } catch (error) {
      console.error(error);
      // Handle error, show alert to the user
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  
  const handleAddIncome = async () => {
    try {
      // Check if any of the required fields are empty
      if (!incomeType || !incomeAmount || !incomeDate) {
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
        // You can add other fields based on your backend API requirements
      };
  
      // Make a POST request to the backend API
      const response = await fetch('http://3.17.169.64:3000/incomes/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incomeData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add income. Status: ${response.status}`);
      }
  
      const json = await response.json();
  
      // Handle the response from the backend
      if (json.status === 'income_add_success') {
        // Refresh the monthly income and all incomes
        fetchMonthlyIncome();
        fetchAllIncomes();
      } else {
        // Handle other response statuses or show an error message to the user
        alert(`Failed to add income. Error: ${json.message}`);
      }
    } catch (error) {
      console.error(error);
      // Handle error, show alert to the user
      alert('An unexpected error occurred. Please try again later.');
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
        <View style={styles.monthlyIncomeBox}>
          <Text style={styles.monthlyIncomeTitle}>Monthly Income</Text>
          <Text style={styles.monthlyIncomeAmount}>{monthlyIncome}</Text>
        </View>

        {/* Display All Incomes */}
        <ScrollView style={styles.allIncomesContainer}>
          {allIncomes.map((income) => (
            <View key={income.incomeId} style={styles.incomeItem}>
              <Text>{income.type}</Text>
              <Text>{income.amount}</Text>
              <Text>{income.incomeDate}</Text>
            </View>
          ))}
        </ScrollView>
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
  },
  monthlyIncomeBox: {
    backgroundColor: '#69DC9E',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  monthlyIncomeTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  monthlyIncomeAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  allIncomesContainer: {
    flex: 1,
  },
  incomeItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#000103',
    padding: 10,
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
