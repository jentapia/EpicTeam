import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');


export default function Home({route, navigation}) {

  const {email, password} = route.params;

  return (
    
    <View style={styles.container}>
      
      <Text>Hello, {email}. Welcome</Text>
      <Text>Your password: {password} is not secure.</Text>

    
      <Button
              title="Find a user" style={styles.goButton}
              onPress={() => navigation.navigate('logUser')}
            />

      <Button
              title="Register a book" style={styles.goButton}
              onPress={() => navigation.navigate('RegisterBook')}
            />
      <Button
              title="View all books" style={styles.goButton}
              onPress={() => navigation.navigate('ViewAllBooks')}
            />
      
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
  
  goButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "deepskyblue",
  },
});
