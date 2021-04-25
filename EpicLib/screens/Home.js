import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import Constants from 'expo-constants';
//library of sqlite
import * as SQLite from 'expo-sqlite';
//open data base.
const db = SQLite.openDatabase('db.db');

//home page.
export default function Home({route, navigation}) {
 //parameters sent from the login page.
  const {email, password} = route.params;
 
  //buttons to navigate in the pages. 
  return (
    
    <View style={styles.container}>
      
      <Text>Hello, {email}. Welcome</Text>
      <Text>Your password: {password} is not secure.</Text>

      <TouchableOpacity style={styles.goBtn} onPress={() => navigation.navigate('logUser')}>
      <Text style={styles.text} >Find a user</Text>
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
    marginTop: 40,
    backgroundColor: "deepskyblue",
  },
  text: {
    color: '#ffffff',
  },
});
