import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
 let userEmail = localStorage.getItem('email');
// HomeScreen component
export const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
 
 
  const fetchMonthlyExpenses = async () => {
    try{
    // Fetch the monthly income from the backend
    const response = await fetch('http://3.17.169.64:3000/expenses/all?email=' + userEmail);
    const result = await response.json();
    // Update the value of monthly income
    setMonthlyExpenses(result.reduce((total, expense) => total + expense.amount, 0));
  } catch (error) {
    console.error('Error fetching monthly expenses:', error);
  }
  }; 
  fetchMonthlyExpenses(); 
  const fetchMonthlyIncome = async () => {
    try {
      // Fetch the monthly income from the backend
      const response = await fetch('http://3.17.169.64:3000/incomes/all?email=' + userEmail);
      const result = await response.json();
      // Update the value of monthly income
      setMonthlyIncome(result.reduce((total, income) => total + income.amount, 0));
    } catch (error) {
      console.error('Error fetching monthly income:', error);
    }
  };
  fetchMonthlyIncome();
  return (
<View style={{backgroundColor: "#69DC9E"}}>
<Text style={styles.welcomeText}>Welcome Back!</Text>
    {/* Left side suggested budget amounts */ }
<View style = {styles.budgetContainer}>
      {/* Monthly Budget Component */}
<View style = {styles.dailyB}>
<BudgetComponent title="Monthly Income: " amount={`$${monthlyIncome}`} />
</View>
 
      {/* Weekly Budget Component */}
<View style = {styles.dailyB}>
<BudgetComponent title="Suggested Weekly Spend: " amount={`$${(monthlyIncome / 4).toFixed(2)}`} />
</View>
 
      {/* Daily Budget Component */}
<View style = {styles.dailyB}>
<BudgetComponent title="Suggested Daily Spend: " amount={`$${(monthlyIncome / 31).toFixed(2)}`} />
</View>
 
      <View style = {styles.dailyB}>
<BudgetComponent2 eTitle="Total Monthly Expenses: " eAmount={`$${monthlyExpenses}`} />
</View>
</View>
 
 
      {/* Circle Button in the Top Right Corner */}
<TouchableOpacity
        style={styles.circleButton}
        onPress={() => setModalVisible(!modalVisible)}
>
<Text style={styles.buttonText}>+</Text>
</TouchableOpacity>
 
      {/* Modal for Options */}
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
>
<View style={styles.modalView}>
<TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: '#000103' }}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate('Edit Income');
            }}
>
<Text style={styles.textStyle}>Income</Text>
</TouchableOpacity>
 
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: '#000103' }}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate('Add Expense');
            }}
>
<Text style={styles.textStyle}>Expenses</Text>
</TouchableOpacity>
 
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: '#000103' }}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate('Settings');
            }}
>
<Text style={styles.textStyle}>Settings</Text>
</TouchableOpacity>
<TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: '#000103' }}
            onPress={() => {
              navigation.navigate('Login');
            }}
>
<Text style={styles.textStyle}>Logout</Text>
</TouchableOpacity>
</View>
</Modal>
 
       
</View>

  );
};
 
 
const BudgetComponent = ({ title, amount }) => {
  return (
<View style={styles.budgetContainer}>
<Text style={styles.budgetTitle}>{title}</Text>
<Text style={styles.budgetAmount}>{amount}</Text>
</View>
  );
};
 
const BudgetComponent2 = ({ eTitle, eAmount }) => {
  return (
<View style={styles.budgetContainer}>
<Text style={styles.budgetTitle}>{eTitle}</Text>
<Text style={styles.expenseAmount}>{eAmount}</Text>
</View>
  );
};
 
const styles = StyleSheet.create({ 
  welcomeText: {
    fontSize: 48, 
    alignSelf: 'flex-start', 
    marginLeft: 50, 
    marginTop: 30, 
    marginBottom: '2%', 
  },
  budgetContainer: {
    flexDirection: 'column',
  }, 
  dailyB: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    width: '30%',
    height: '40%',
    borderWidth: 0.7,
    borderColor: '#E4E4E4',
    backgroundColor: '#fff',
    shadowColor: '#E4E4E4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    marginTop: 10,
    marginRight: 10,
    marginLeft: '5%', // Adjust the marginLeft value
    marginBottom: 20,
    outline: 'none',
  },
  budgetTitle: {
    fontSize: 24, 
    fontWeight: 'bold',
  },
 
  budgetAmount: {
    fontSize: 24, 
    color: '#32DE84', 
  },
  expenseAmount: {
    fontSize: 24, 
    color: '#D2122E'
  },
 
  // Circle Button
  circleButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#000103',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
 
  // Modal Styles
  modalView: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'white',
    width: '25%',
    height: '100%',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#000103',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
 
export default HomeScreen;