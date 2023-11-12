import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableHighlight } from 'react-native';

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
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate('AddIncome');
            }}
          >
            <Text style={styles.textStyle}>Add New Income Data</Text>
          </TouchableHighlight>

          {/* Add other options similarly */}
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
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 8,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
