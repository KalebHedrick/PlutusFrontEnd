// DeleteAccountAlert.js
import React from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const DeleteAccountAlert = ({ visible, onClose, onYesPress, onNoPress }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>Are you sure you want to delete your account?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onYesPress}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onNoPress}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DeleteAccountAlert;
