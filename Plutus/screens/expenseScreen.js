import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, Picker } from 'react-native';
let userEmail = localStorage.getItem('email');
const ExpenseScreen = ({ navigation }) => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseList, setExpenseList] = useState('');
   function retreiveExpenses() {
    fetch('http://3.17.169.64:3000/expenses/all?email=' + userEmail, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // Handle the response from the backend
        if (json.status !== 'error') {
          setExpenseList(json)
          } else {
          // Handle other response statuses or show an error message to the user
          alert('Failed to retreive expenses');
        }})
      .catch((error) => {
        console.error(error);
        // Handle error, show an alert to the user
        alert('An unexpected error occurred. Please try again later.');
      });
    }
  useEffect(() => {
    console.log("hey")
    retreiveExpenses();
  },[])
  const handleAddExpense = () => {
    

    // Check if any of the required fields are empty
    if (!expenseName || !expenseAmount || !expenseDate) {
      // Handle error, show an alert to the user
      alert('Please fill in all the fields.');
      return;
    }
 
    const expenseData = {
      email: userEmail, 
      amount: parseFloat(expenseAmount), 
      currency: 'usd',
      method: 'credit_card', //can be credit_card or debit_card
      expenseDate: expenseDate,
      type: expenseName
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
          retreiveExpenses();
        } else {
          // Handle other response statuses or show an error message to the user
          alert(`Failed to add expense. Error: ${json.message}`);
        }})
      .catch((error) => {
        console.error(error);
        // Handle error, show alert to the user
        alert('An unexpected error occurred. Please try again later.');
      });
    };
 
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.viewExpensesText}>View Expenses</Text>
      </View>
      <View style={{flexDirection:"row", flex:1}}>
      {/* Top Bar */}
      
 
      {/* Left Section */}
      <View style={styles.leftSection}>
        <TimeComponent/>
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
         
          <TouchableOpacity style={styles.addButton} onPress={() => {handleAddExpense()}}>
            <Text style={styles.addButtonText}>Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={() => {retreiveExpenses()}}>
            <Text style={styles.addButtonText}>Refresh expense list</Text>
          </TouchableOpacity>
      
        </View>
 
        {/* Edit Expense Section */}
        {/* This is just a placeholder for the edit section */}
        <View style={styles.editSection}>
          <Text style={styles.inputTitle}>Edit Expenses</Text>
          <ExpenseList data={expenseList}/>
        </View>
      </View>
      </View>
    </View>
  );
};
 
//EXPENSE LIST EDITOR CODE
const ExpenseList = ({ data, onDeleteItem }) => {
  const ExpenseItem = ({ item }) => (
    <View style={{flexDirection: "column", justifyContent: "space-evenly", borderWidth: 3, borderRadius: 20, backgroundColor:"white"}}>
      <Text style={{fontSize: 30}}>{item.type}</Text>
      <Text style={{fontSize: 30}}>amount: ${item.amount}</Text>
      <TouchableOpacity onPress={() => onDeleteItem(item.expenseId)} style={{fontSize: 15, padding:10, alignSelf:"flex-start"}}>
        <Text style={{borderColor: "red", borderWidth: 3, borderRadius: 20}}>Delete</Text>
      </TouchableOpacity>
    </View>
  )
  function onDeleteItem(id) {
    let deleteURL = 'http://3.17.169.64:3000/expenses/delete?email=' + userEmail + '&expenseIds=' + id
    console.log(deleteURL);
    fetch(deleteURL, {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  }
   return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ExpenseItem item={item} />}
      contentContainerStyle={{
    flexGrow: 1,
    }}
    ItemSeparatorComponent={() => (
              <View style={{ height: 2 }} />
            )}
    />
    </ScrollView>
  )}
 

//END OF EXPENSE LIST CODE


const TimeComponent = () => {
  const [selectedInterval, setSelectedInterval] = useState('Today');
  const [data, setData] = useState('');
   const ExpenseItem = ({ item }) => (
    <View style={{flexDirection: "column", justifyContent: "space-evenly", borderColor: "#000000", borderWidth: 3, borderRadius: 20, backgroundColor:"white"}}>
      <Text style={{fontSize: 30}}>{item.type}</Text>
      <Text style={{fontSize: 30}}>amount ${item.amount}</Text>
      
    </View>
  )
  useEffect(() => {
    
    // Fetch or generate data based on the selected interval
    const fetchData = async () => {
      // Replace this with your logic to fetch data based on the selected interval
      let newData = [];
      let today = getTodaysDate();
      let week = getOneWeekAgo();
      let month = getOneMonthAgo();
      switch (selectedInterval) {
        
        case 'Daily':
        
         let res =await fetch('http://3.17.169.64:3000/expenses/bydaterange?email=' + userEmail + '&startDate=' + today + '&endDate=' + today,{
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },  
})
newData = await res.json()
          break;
        case 'Weekly':
            let res2 =await fetch('http://3.17.169.64:3000/expenses/bydaterange?email=' + userEmail + '&startDate=' + week + '&endDate=' + today,{
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },  
})
newData = await res2.json()

          break;
        case 'Monthly':
           let res3 =await fetch('http://3.17.169.64:3000/expenses/bydaterange?email=' + userEmail + '&startDate=' + month + '&endDate=' + today,{
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },  
})
newData = await res3.json()
          break;
        default:
          break;
      }
      setData(newData)
    };
    
    fetchData();
  }, [selectedInterval]);
  console.log(data);
  return (
    <View>
      {/* Dropdown to select interval */}
      <Text style={styles.inputTitle}>Select a timeframe</Text>
      <Picker
        selectedValue={selectedInterval}
        onValueChange={(itemValue) => setSelectedInterval(itemValue)}
        style = {{margin:6, alignSelf: "flex-start"}}
      >
        <Picker.Item label="Today" value="Daily" />
        <Picker.Item label="Last 7 days" value="Weekly" />
        <Picker.Item label="Last 30 days" value="Monthly" />
      </Picker>

      {/* FlatList to display data based on the selected interval */}
     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <FlatList
      data={data}
      extraData={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ExpenseItem item={item} />}
      contentContainerStyle={{
    flexGrow: 1,
    }}
    ItemSeparatorComponent={() => (
              <View style={{ height: 2}} />
            )}
    />
    </ScrollView>
    </View>
  );
};
//helper date functions
function getTodaysDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
function getOneWeekAgo() {
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  const year = oneWeekAgo.getFullYear();
  const month = String(oneWeekAgo.getMonth() + 1).padStart(2, '0');
  const day = String(oneWeekAgo.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
function getOneMonthAgo() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const year = thirtyDaysAgo.getFullYear();
  const month = String(thirtyDaysAgo.getMonth() + 1).padStart(2, '0');
  const day = String(thirtyDaysAgo.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
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
    backgroundColor: '#69DC9E',
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
 
export default ExpenseScreen;

