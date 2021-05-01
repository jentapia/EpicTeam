/* 
      * * *   U S E R   S E A R C H   B O O K  * * *

    UserSearchBook shows a screen with the list of books and a book finder
    The Select query to the DB ask for the name of the book or part of it.
    
 */

import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');


  export default function UserSearchBook() {
  let [flatListItems, setFlatListItems] = useState([]); // variable to storage the result of the query
  let [inputBookName, setInputBookName] = useState(''); //variable to storage the user input
 
  //Select for all books
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_books',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  //Select for books that contains the user input in their title
  let searchBook = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_books where book_name LIKE ?',
        [inputBookName],
        (tx, results) => {
            console.log('Results', results.rows.length);
            var temp = [];
            if (results.rows.length > 0) {
                for (let i = 0; i < results.rows.length; ++i){
                temp.push(results.rows.item(i));
                setFlatListItems(temp); //setting in the variable flatListItems the list of results from the query
                }
               
            }
            else {
                alert('Book not found');
            }
        }
      );
    });
  };
  //Format for displaying each book
  let listItemView = (item) => {
    return (
      <View
        key={item.book_id}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text style={styles.bookTitle}>{item.book_name}</Text>
        <Text style={styles.bookDetails}>Book id: {item.book_id}</Text>
        <Text style={styles.bookDetails}>Author: {item.author}</Text>
        <Text style={styles.bookDetails}>Category: {item.category}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
           
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        
        <View style={{ flex: 1 }}>
        
        {/* The user input is set to inputBookName with a % symbol at the beginning and end of the string 
            to query the database if the string is part of the title */}
        <Mytextinput
            placeholder="Enter Book Name"
            onChangeText={
              (inputBookName) => setInputBookName('%'+inputBookName+'%')
            }
            style={{ padding: 10 }}
          />

          {/* Calling to the searchBook function */}
        <Mybutton title="Search Book" customClick={searchBook} /> 
        
        {/* View of the list of all books and after the search of the user  */}
          <FlatList
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    bookTitle: {
      color: '#0080C1',
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 16,
      
      
    },
    bookDetails: {
      color: '#055984',
      
    }
  });