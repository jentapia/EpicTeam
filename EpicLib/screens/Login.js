import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export default function login({ navigation }) {
  const [users, setUsers] = React.useState(null);
  var userTest = {
    id: 1,
    email: 'test@test.com',
    passwd: '1234',
    role: 'admin'
  }

  var userTest2 = {
    id: 2,
    email: 'mitzy',
    passwd: '123456',
    role: 'user'
  }

  React.useEffect(() => {

      db.transaction(tx => {
    
        tx.executeSql(
          "create table if not exists users (id_user integer primary key not null, email text, password text, role text);",
          []
        );
    
        tx.executeSql(
          "insert into users (id_user, email, password, role) values (?, ?, ?, ?)",
          [userTest.id, userTest.email, userTest.passwd, userTest.role]
        );

        tx.executeSql(
          "insert into users (id_user, email, password, role) values (?, ?, ?, ?)",
          [userTest2.id, userTest2.email, userTest2.passwd, userTest2.role]
        );

        tx.executeSql(
          "insert into users (id_user, email, password, role) values (3, 'jentap', '1234', 'user')",
          []
        );
    
        tx.executeSql(
          "select * from users",
          [],
          (_, { rows: { _array } }) => setUsers(_array),
          () => console.log("error fetching")
        );
    
      });
        
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logo-epic.png')} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity onPress={() => navigation.navigate('dbUsers')}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn} onPress={ () => navigation.navigate('Home', {email: email, password: password})}>
        <Text style={styles.loginText} >LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "lightskyblue",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "deepskyblue",
  },
});