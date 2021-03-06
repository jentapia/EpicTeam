/* 
      * * *   H O M E    P A G E * * *

    Main page where the Screen names are defined
    for navigation and some syles defined.
    
 */


import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import Constants from 'expo-constants';
//library of sqlite
import * as SQLite from 'expo-sqlite';
//open data base.
const db = SQLite.openDatabase('db.db');

//home page of the user with Admin role.
export default function Home({route, navigation}) {
 //parameters sent from the login page.
  const {email, password} = route.params;
 
  //buttons to navigate in the pages. 
  return (
    
    <View style={styles.container}>
      
      <Text style={styles.mytext}>Hello, {email}. Welcome</Text>
      <Text>Your password: {password} is not secure.</Text>
      
      {/* button to test user books view */}
      <TouchableOpacity onPress={() => navigation.navigate('UserSearchBook')}>
        <Text style={styles.testing_button}>User View</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.goBtn} onPress={() => navigation.navigate('FindUser')}>
      <Text style={styles.text} >Find a user</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.goBtn} onPress={() => navigation.navigate('DeleteUser')}>
        <Text style={styles.text} >Delete a User</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.goBtn} onPress={() => navigation.navigate('RegisterBook')}>
        <Text style={styles.text} >Register a book</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.goBtn} onPress={() => navigation.navigate('ViewAllBooks')}>
        <Text style={styles.text} >View all books</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.goBtn} onPress={() => navigation.navigate('DeleteBook')}>
        <Text style={styles.text} >Delete a Book</Text>
      </TouchableOpacity>
    
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  goBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "deepskyblue",
  },
  mytext: {
    color: '#111825',
    fontSize: 18,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  text: {
    color: '#ffffff',
  },
  testing_button: {
    height: 30,
    marginTop: 10,
    color: "grey",
  },
});
