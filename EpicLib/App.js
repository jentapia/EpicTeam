/*
    * * * * * * * * *        E p i c L i b      * * * * * *
    
    EpicLib is a small prototype to demonstrate the interaction
    between REACT Native and SQLite functionality.
    
    EpicLib is based on a code from:
    Agrawal, Snehal. Aboutreact.com.
    https://aboutreact.com/example-of-sqlite-database-in-react-native/
    (2021)

    This program was made by Epic Team conformed by:

      - Danilo Anibal Pincheira Muñoz(2020408)
      - Jennifer Carolina Tapia Gallo (2020424)
      - Jose Alberto Cruz Sanchez (2019437)
      - María Eugenia Fajardo Rojas (2020429)
      - Mitzy Guadalupe Macias de la Torre (2020426)

    For the modules Mobile Development and Professional Practice in IT
    as a part of the Higher Diploma in Computing Sciences on CCT College
    with due date on May 1st, 2021.

    * * * * * * * * * * * * * * * * * * * * * * * * * * * 
*/

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import login from './screens/Login';
import Home from './screens/Home';
import listUser from './screens/ListUsers';
import findUser from './screens/FindUser';
import RegisterBook from './screens/RegisterBook';
import ViewAllBooks from './screens/ViewAllBooks';
import DeleteBook from './screens/DeleteBook';
import RegisterNewUser from './screens/RegisterNewUser';
import DeleteUser from './screens/DeleteUser';
import UserSearchBook from './screens/UserSearchBook';

// function to navigate around all the pages.
const Stack = createStackNavigator();

//every page implemented must be writen here in order to connect the app.
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={login} options={{ title: 'EpicLib' }}/>
        <Stack.Screen name="Home" component={Home} options={{ title: 'EpicLib' }}/>
        <Stack.Screen name="ListUsers" component={listUser} options={{ title: 'EpicLib' }}/>
        <Stack.Screen name="FindUser" component={findUser} options={{ title: 'EpicLib' }}/>
        <Stack.Screen name="RegisterBook" component={RegisterBook} options={{ title: 'EpicLib' }}/>
        <Stack.Screen name="ViewAllBooks" component={ViewAllBooks} options={{ title: 'EpicLib' }}/>
        <Stack.Screen name="DeleteBook" component={DeleteBook} options={{ title: 'EpicLib' }}/>
        <Stack.Screen name="RegisterNewUser" component={RegisterNewUser} options={{ title: 'EpicLib' }}/>    
        <Stack.Screen name="DeleteUser" component={DeleteUser} options={{ title: 'EpicLib' }}/>  
        <Stack.Screen name="UserSearchBook" component={UserSearchBook} options={{ title: 'EpicLib' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

