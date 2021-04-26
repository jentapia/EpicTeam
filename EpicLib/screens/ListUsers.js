import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList } from 'react-native';

//from Jen
 import * as SQLite from 'expo-sqlite';
 const db = SQLite.openDatabase('db.db');


export default function listUser() {

  const [users, setUsers] = useState(null);
  let [flatListItems, setFlatListItems] = useState([]);
  
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM users', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
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

