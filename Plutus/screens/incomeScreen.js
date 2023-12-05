import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, Picker } from 'react-native';
let userEmail = localStorage.getItem('email');

const IncomeScreen = ({ navigation }) => {
  const [incomeName, setIncomeName] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeDate, setIncomeDate] = useState('');
  const [incomeList, setIncomeList] = useState('');

  function retrieveIncomes() {
    fetch('http://3.17.169.64:3000/incomes/all?email=' + userEmail, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status !== 'error') {
          setIncomeList(json);
        } else {
          alert('Failed to retrieve incomes');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An unexpected error occurred. Please try again later.');
      });
  }

  useEffect(() => {
    retrieveIncomes();
  }, []);

  const handleAddIncome = () => {
    if (!incomeName || !incomeAmount || !incomeDate) {
      alert('Please fill in all the fields.');
      return;
    }

    const incomeData = {
      email: userEmail,
      amount: parseFloat(incomeAmount),
      currency: 'usd',
      method: 'credit_card',
      incomeDate: incomeDate,
      type: incomeName,
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
        if (json.status === 'income_add_success') {
          retrieveIncomes();
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
      <View style={styles.topBar}>
        <Text style={styles.viewIncomesText}>View Incomes</Text>
      </View>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {/* Top Bar */}

        {/* Left Section */}
        <View style={styles.leftSection}>
          <TimeComponent />
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
          {/* Income Input Section */}
          <View style={styles.inputSection}>
            <Text style={styles.inputTitle}>Add New Income</Text>
            <TextInput
              style={styles.input}
              placeholder="Income Name"
              value={incomeName}
              onChangeText={(text) => setIncomeName(text)}
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

            <TouchableOpacity style={styles.addButton} onPress={() => handleAddIncome()}>
              <Text style={styles.addButtonText}>Add Income</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => retrieveIncomes()}>
              <Text style={styles.addButtonText}>Refresh income list</Text>
            </TouchableOpacity>
          </View>

          {/* Edit Income Section */}
          <View style={styles.editSection}>
            <Text style={styles.inputTitle}>Edit Incomes</Text>
            <IncomeList data={incomeList} />
          </View>
        </View>
      </View>
    </View>
  );
};

// INCOME LIST EDITOR CODE
const IncomeList = ({ data, onDeleteItem }) => {
  const IncomeItem = ({ item }) => (
    <View style={{ flexDirection: "column", justifyContent: "space-evenly", borderColor: "#69DC9E", borderWidth: 3, borderRadius: 20 }}>
      <Text style={{ fontSize: 30 }}>{item.type}</Text>
      <Text style={{ fontSize: 30 }}>amount: ${item.amount}</Text>
      <TouchableOpacity onPress={() => onDeleteItem(item.incomeId)} style={{ fontSize: 15, padding: 10, alignSelf: "flex-start" }}>
        <Text style={{ borderColor: "red", borderWidth: 3, borderRadius: 20 }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  function onDeleteItem(id) {
    let deleteURL = 'http://3.17.169.64:3000/incomes/delete?email=' + userEmail + '&incomeIds=' + id;
    console.log(deleteURL);
    fetch(deleteURL, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <IncomeItem item={item} />}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 2 }} />
        )}
      />
    </ScrollView>
  );
};

// END OF INCOME LIST CODE

const TimeComponent = () => {
  const [selectedInterval, setSelectedInterval] = useState('Today');
  const [data, setData] = useState('');
  const IncomeItem = ({ item }) => (
    <View style={{ flexDirection: "column", justifyContent: "space-evenly", borderColor: "#000000", borderWidth: 3, borderRadius: 20 }}>
      <Text style={{ fontSize: 30 }}>{item.type}</Text>
      <Text style={{ fontSize: 30 }}>amount ${item.amount}</Text>
    </View>
  );

  useEffect(() => {
    const fetchData = async () => {
      let newData = [];
      let today = getTodaysDate();
      let week = getOneWeekAgo();
      let month = getOneMonthAgo();
      switch (selectedInterval) {
        case 'Daily':
          let res = await fetch('http://3.17.169.64:3000/incomes/bydaterange?email=' + userEmail + '&startDate=' + today + '&endDate=' + today, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          newData = await res.json();
          break;
        case 'Weekly':
          let res2 = await fetch('http://3.17.169.64:3000/incomes/bydaterange?email=' + userEmail + '&startDate=' + week + '&endDate=' + today, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          newData = await res2.json();
          break;
        case 'Monthly':
          let res3 = await fetch('http://3.17.169.64:3000/incomes/bydaterange?email=' + userEmail + '&startDate=' + month + '&endDate=' + today, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          newData = await res3.json();
          break;
        default:
          break;
      }
      setData(newData);
    };

    fetchData();
  }, [selectedInterval]);

  return (
    <View>
      <Text style={styles.inputTitle}>Select a timeframe</Text>
      <Picker
        selectedValue={selectedInterval}
        onValueChange={(itemValue) => setSelectedInterval(itemValue)}
        style={{ margin: 6, alignSelf: "flex-start" }}
      >
        <Picker.Item label="Today" value="Daily" />
        <Picker.Item label="Last 7 days" value="Weekly" />
        <Picker.Item label="Last 30 days" value="Monthly" />
      </Picker>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <FlatList
          data={data}
          extraData={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <IncomeItem item={item} />}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          ItemSeparatorComponent={() => (
            <View style={{ height: 2 }} />
          )}
        />
      </ScrollView>
    </View>
  );
};

// Helper date functions
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
  viewIncomesText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  leftSection: {
    flex: 1,
    backgroundColor: '#69DC9E',
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
    margin: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
  },
  editSection: {
    flex: 1,
  },
});

export default IncomeScreen;


