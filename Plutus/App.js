import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Landing Page/loginScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './screens/homeScreen';
import { NewUser } from './screens/Account Creation/newUser';
const Tab = createNativeStackNavigator();
export default function App() {
  return (
    
      
      <NavigationContainer>
        
      <Tab.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name ="New User" component={NewUser} />
      </Tab.Navigator>
    </NavigationContainer>
      
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
