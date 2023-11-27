import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

// HomeScreen component
export const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Your Budget App</Text>

      {/* Daily Budget Component */}
      <BudgetComponent title="Daily Budget" amount="$50" />

      {/* Weekly Budget Component */}
      <BudgetComponent title="Weekly Budget" amount="$200" />

      {/* Monthly Budget Component */}
      <BudgetComponent title="Monthly Budget" amount="$1000" />

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
              navigation.navigate('AddIncome');
            }}
          >
            <Text style={styles.textStyle}>Add New Income Data</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: '#000103' }}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate('AddBudgetCategory');
            }}
          >
            <Text style={styles.textStyle}>Add New Budget Category</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: '#000103' }}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate('UpdateProfile');
            }}
          >
            <Text style={styles.textStyle}>Update Profile Information</Text>
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
              setModalVisible(!modalVisible);
              navigation.navigate('AddExpense');
            }}
          >
            <Text style={styles.textStyle}>Add New Expense Data</Text>
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

const styles = StyleSheet.create({
  // ... (remaining styles)

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
