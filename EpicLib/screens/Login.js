import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";
import Mybutton from './components/Mybutton';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export default function login({ navigation }) {
  const [users, setUsers] = React.useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
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
          "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, email TEXT, passwd TEXT, role TEXT);",
          []
        );
        tx.executeSql(
          "insert into users (id_user, email, password, role) values (4, 'danilopincheiram@gmail.com', '1234567', admin)",
         
        );
      //  tx.executeSql(
        //  "insert into users (id_user, email, password, role) values (?, ?, ?, ?)",
       //   [userTest.id, userTest.email, userTest.passwd, userTest.role]
       // );
        //tx.executeSql(
         // "insert into users (id_user, email, password, role) values (?, ?, ?, ?)",
         // [userTest2.id, userTest2.email, userTest2.passwd, userTest2.role]
       // );
   
     //    tx.executeSql(
       //   "select * from users",
         // [],
          //(_, { rows: { _array } }) => setUsers(_array),
          //() => console.log("error fetching")
        //);
    
      //});
      //db.transaction(tx => {
        //tx.executeSql(
         // "insert into users (id_user, email, password, role) values (3, 'jentap', '4321', ?)",
         // [userTest2.role]
        //);
      });
             
      db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS table_books (book_id INTEGER PRIMARY KEY NOT NULL, book_name TEXT, author TEXT, cathegory TEXT)",
          []
        );

        tx.executeSql(
        "insert into table_books (book_id, book_name, author, cathegory) values (1, 'Papelucho', 'Marcela', ?)",
        [userTest.role]
      );

      });

  }, []);

  let validUser = () => {
    console.log(email, password);

    if (!email) {
      alert('Please fill Email');
      return;
    }
    if (!password) {
      alert('Please fill Password');
      return;
    }
    
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM users where email = ? and password = ?',
          [email, password],
          (tx, results) => {
            var len = results.rows.length;
            console.log('len', len);
            if (len > 0) {

              return navigation.navigate('Home', {email: email, password: password});
              
            }  else {
              alert('Not valid User');
            }
          }
      );
    });
  };

 
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

      <TouchableOpacity onPress={() => navigation.navigate('RegisterNewUser')}>
        <Text style={styles.forgot_button}>Don't you have an account? Click here?</Text>
      </TouchableOpacity>
 
      <Mybutton title= "LOGIN" customClick={validUser}/>

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