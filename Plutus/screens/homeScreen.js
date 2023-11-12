import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

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

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableHighlight
          style={styles.modalOverlay}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#C8FACD' }}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('AddIncome');
              }}
            >
              <Text style={styles.textStyle}>Add New Income Data</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#C8FACD' }}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('AddBudgetCategory');
              }}
            >
              <Text style={styles.textStyle}>Add New Budget Category</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#C8FACD' }}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('UpdateProfile');
              }}
            >
              <Text style={styles.textStyle}>Update Profile Information</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#C8FACD' }}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('Settings');
              }}
            >
              <Text style={styles.textStyle}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#C8FACD' }}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('AddExpense');
              }}
            >
              <Text style={styles.textStyle}>Add New Expense Data</Text>
            </TouchableOpacity>
          </View>
        </TouchableHighlight>
      </Modal>

      {/* Circle Button */}
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  budgetContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    width: '100%',
  },
  budgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  budgetAmount: {
    fontSize: 16,
  },

// Modal Styles
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
},
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
  zIndex: 1, // Add zIndex to make sure the modal is above the other components
},
openButton: {
  backgroundColor: '#C8FACD',
  borderRadius: 8,
  padding: 10,
  marginBottom: 8,
  elevation: 2,
  zIndex: 2, // Add zIndex to make sure the button is above the modal
},
textStyle: {
  color: 'black',
  fontWeight: 'bold',
  textAlign: 'center',
},
// Circle Button Styles
circleButton: {
  position: 'absolute',
  bottom: 16,
  right: 16,
  backgroundColor: '#C8FACD',
  borderRadius: 50,
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 2,
  zIndex: 2, // Add zIndex to make sure the button is above the modal
},
buttonText: {
  color: 'black',
  fontSize: 24,
},
});


