/* 
      * * *   V I E W   A L L   B O O K S  * * *

    Use of the function ViewAllBooks to show the list of the books
    from the database.
    
 */

import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView } from 'react-native';
//import the library to use sqlite
import * as SQLite from 'expo-sqlite';
//open he data base
const db = SQLite.openDatabase('db.db');

  export default function ViewAllBooks() {
  let [flatListItems, setFlatListItems] = useState([]);

 //function to select the values on data base.
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_books',
        [],
        //callBack to send the query to data base and bring the rows found
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };

  // return the value received from the sql query
  let listItemView = (item) => {
    return (
      <View
        key={item.book_id}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text>Book id: {item.book_id}</Text>
        <Text>Book name: {item.book_name}</Text>
        <Text>Author: {item.author}</Text>
        <Text>Category: {item.category}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
        
      </View>
    </SafeAreaView>
  );
};
