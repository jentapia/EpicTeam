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
              title="Find a user"
              onPress={() => navigation.navigate('logUser')}
            />

      <Button
              title="Register a book"
              onPress={() => navigation.navigate('RegisterBook')}
            />
      <Button
              title="View all books"
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
  
  next_button: {
    height: 50,
    marginBottom: 30,
    marginTop: 30,
  },
});
