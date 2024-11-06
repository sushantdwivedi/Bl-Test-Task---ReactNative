import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Image,
  StatusBar,
} from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  console.log('isAuthenticated', isAuthenticated);
  useEffect(() => {
    const checkAuthStatus = async () => {
      const userData = await AsyncStorage.getItem('user');
      setIsAuthenticated(!!userData);
    };
    checkAuthStatus();
  }, []);

  if (isAuthenticated === null) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{headerShown: false, animation: 'slide_from_right'}}
            />
            <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
              options={{
                headerShown: false,

                animation: 'slide_from_right',
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={() => ({
                headerShown: false,
                animation: 'slide_from_right',
              })}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={() => ({
                headerShown: false,
                animation: 'slide_from_right',
              })}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{headerShown: false, animation: 'slide_from_right'}}
            />
            <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
              options={{
                headerShown: false,

                animation: 'slide_from_right',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const LoadingScreen = () => (
  <View style={styles.container}>
    <StatusBar backgroundColor="#1C7EF2" barStyle="light-content" />

    <Image
      source={require('../assets/Splash0001.png')} // Replace with your image path
      style={styles.loadingImage}
    />
    {/* <ActivityIndicator size="large" color="#4CAF50" /> */}
    {/* <Text style={styles.loadingText}>Loading...</Text> */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#4CAF50',
  },

  loadingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    // marginBottom: 20,
  },
});

export default AppNavigator;
