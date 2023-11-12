import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
});