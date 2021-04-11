import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import login from './screens/Login';
import Home from './screens/Home';
import logInUser from './screens/dbUsers';
import logUser from './screens/logUser';
import RegisterBook from './screens/RegisterBook';
import ViewAllBooks from './screens/ViewAllBooks';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={login} options={{ title: 'EpicLib' }}/>
        <Stack.Screen name="Home" component={Home} options={{ title: 'EpicLib' }}/>
        <Stack.Screen name="dbUsers" component={logInUser} options={{ title: 'EpicLib' }}/>
        <Stack.Screen name="logUser" component={logUser} options={{ title: 'EpicLib' }}/>
        <Stack.Screen name="RegisterBook" component={RegisterBook} options={{ title: 'EpicLib' }}/>
        <Stack.Screen name="ViewAllBooks" component={ViewAllBooks} options={{ title: 'EpicLib' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

