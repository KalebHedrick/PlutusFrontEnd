import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// HomeScreen component
export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Your Budget App</Text>

      {/* Daily Budget Component */}
      <BudgetComponent title="Daily Budget" amount="$50" />

      {/* Weekly Budget Component */}
      <BudgetComponent title="Weekly Budget" amount="$200" />

      {/* Monthly Budget Component */}
      <BudgetComponent title="Monthly Budget" amount="$1000" />
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