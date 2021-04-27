import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList } from 'react-native';

import * as SQLite from 'expo-sqlite'; // expo-sqlite library 

const db = SQLite.openDatabase('db.db'); //Open a database, creating it if it doesn't exist, and return a Database object.

// listUser: function that lists all users in the database
export default function listUser() {
  //variable that stores the result returned by the query
  let [flatListItems, setFlatListItems] = useState([]);
  
  useEffect(() => {
    db.transaction((tx) => {
      //query to the database
      tx.executeSql('SELECT * FROM users', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i)); //saving each row of the result returned by the query (using a for-loop to go through)
        setFlatListItems(temp);
      });
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
      />
    );
  };

  //variable that returns a view with the data of each user
  let listItemView = (item) => {
    return (
      <View
        key={item.id_user}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text>Id: {item.id_user}</Text>
        <Text>Email: {item.email}</Text>
        <Text>PW: {item.password}</Text>
        <Text>Role: {item.role}</Text>
      </View>
    );
  };
  // screen ListUsers
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
     <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          EpicTeam
        </Text>
      </View>
    </SafeAreaView>
  );
}

