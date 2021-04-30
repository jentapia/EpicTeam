import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Mybutton from './components/Mybutton';
import * as SQLite from 'expo-sqlite'; //expo-sqlite library that provides access to an SQLite DB 

const db = SQLite.openDatabase('db.db'); //Open a database, creating it if it doesn't exist, and return a Database object.

/* The login function shows a screen with a form to enter a user and password, a button to create a user and a button to log in.
  Also, the users and table_books tables are created and a user and 10 books are inserted from a json file.
  The validation of a valid user is also done in this function.
 */
export default function login({ navigation }) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const booksData = require('./components/books.json'); //the data of the json file is storaged in a constant
  
  // variable userTest: contains a user with 4 attributes to insert into the users table.
  var userTest = {
    id: 2,
    email: 'test',
    password: '1234',
    role: 'admin'
  }
  // useEffect allows to carry out secondary effects on components, does not need to be called to execute the code inside
  React.useEffect(() =>{
    db.transaction(function (txn) {
      txn.executeSql(
        //Query to ask if table users is in the DB, if it doesn't exist, the users table is created 
        "SELECT name FROM sqlite_master WHERE type='table' AND name='users'", 
        [],
        function (tx, res){
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) { //if there are no query results, the table is created
            tx.executeSql('DROP TABLE IF EXISTS users', []); // The table users is dropped if exists in the DB 

            // Creating the users table. Be a valid user it is necessary to interact with the Application.
            // The users table is created with 4 attributes: id, email, password and role.
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS users (id_user integer primary key AUTOINCREMENT, email TEXT, password TEXT, role TEXT);",
              []
            );
            tx.executeSql(
              "insert into users (email, password, role) values (?, ?, ?)",
              [userTest.email, userTest.password, userTest.role]
            );
          }
        }
      );   
    });
           
    db.transaction(function (txn) {
      //Query to ask if the table_books table is in the DB, if it doesn't exist, the table_books table is created
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_books'", //Query to ask if table table_books is in the DB
        [],
        function (tx, res){
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
      
            tx.executeSql('DROP TABLE IF EXISTS table_books', []);
            
            // Creating the table table_books.
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS table_books (book_id INTEGER PRIMARY KEY AUTOINCREMENT, book_name TEXT, author TEXT, cathegory TEXT)",
              []
            );
            // Inserting books into the table_books table using a for-loop to go through the books array that contains the data for each book.
            for (let i = 0; i < booksData.length; i++){
              tx.executeSql(
                "insert into table_books (book_name, author, cathegory) values (?, ?, ?)",
                [booksData[i].Book_name, booksData[i].Author, booksData[i].Cathegory]
              );}
          }
        }
      );
    });
  }, []);
    
  
  /* validUser is a function to validate a user, if the user is in the database and the password is correct, the application goes to next screen
    Also, send alerts if the user does not fill a field.
   */
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
    
    // query to the database to validate the user
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM users where email LIKE ? and password = ?',
          [email, password],
          (tx, results) => {
            var len = results.rows.length;
            var temp = "";
            console.log('len', len);
            if (len > 0) {
              temp = results.rows.item(0);
              console.log(temp);

              if (temp.role == 'admin'){
                // if the role of the user is admin, the app goes to the Home screen and send two parameters
                return navigation.navigate('Home', {email: email, password: password});
  
                }
  
                else{
                // if the role of the user is not admin, the app goes to the UserSearchBook screen
                  return navigation.navigate('UserSearchBook');
                }
                
            }  else {
              alert('Not valid User');
            }
          }
      );
    });
  };

 // screen login
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logo-epic.png')} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          //set the characters in lowercase on the keyboard
          autoCapitalize="none" 
          //it shows email syntax on the keyboard
          keyboardType="email-address"
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

      {/* testing button, shows all users registered in the database */}
      <TouchableOpacity onPress={() => navigation.navigate('ListUsers')}>
        <Text style={styles.testing_button}>Testing</Text>
      </TouchableOpacity>

      {/* button that sends the user to the RegisterNewUser screen */}
      <TouchableOpacity onPress={() => navigation.navigate('RegisterNewUser')}>
        <Text style={styles.forgot_button}>Don't you have an account? Click here?</Text>
      </TouchableOpacity>
 
      <Mybutton title= "LOGIN" customClick={validUser}/>

    </View>
  );
}
// styles constants
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
 
  testing_button: {
    height: 30,
    marginBottom: 30,
    color: "lightgrey",
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