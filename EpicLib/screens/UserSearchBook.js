import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

  export default function UserSearchBook({navigation}) {
  let [flatListItems, setFlatListItems] = useState([]);
  let [inputBookName, setInputBookName] = useState('');
 
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
                setFlatListItems(temp);
                }
                return(
                            
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flex: 1 }}>
                    <FlatList
                        data={flatListItems}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => listItemView(item)}
                    />
                    </View>
        
                </View>

                );
            }
            else {
                alert('Book not found');
            }
        }
      );
    });
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.book_id}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text style={styles.bookTitle}>{item.book_name}</Text>
        <Text style={styles.bookDetails}>Book id: {item.book_id}</Text>
        <Text style={styles.bookDetails}>Author: {item.author}</Text>
        <Text style={styles.bookDetails}>Cathegory: {item.cathegory}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
           
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        
        <View style={{ flex: 1 }}>
        <Mytextinput
            placeholder="Enter Book Name"
            onChangeText={
              (inputBookName) => setInputBookName('%'+inputBookName+'%')
            }
            style={{ padding: 10 }}
          />
        <Mybutton title="Search Book" customClick={searchBook} />
        
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