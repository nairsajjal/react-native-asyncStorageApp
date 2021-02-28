/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@user_key';

const App = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if(data !== null){
        // Do something
        const value = JSON.parse(data);
        retrievedData = value;
        setUserData(value);
        //console.log(data);
        //console.log(userData);
        //console.log(retrievedData);
      }

    }catch(e){
      console.log('Error while fetching data');
    }
  }
  const storeData = async () => {
    try{
      const userData = {
        username : `${username}`,
        password : `${password}`,
        email : `${email}`,
        phone : `${phone}`,
        dob : `${dob}`
      }
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      alert('Data stored in db!')
    }catch(e){
      console.log('Error while storing data');
    }
  }
  const removeData = async () => {
    try{
      await AsyncStorage.clear();
      alert('Storage Cleared');
      setUserData({});
    }catch(e){
      console.log(e);
      alert('An error occured while deleting all data!');
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.userInputView}>
        <TextInput style={styles.textInput} value={username} placeholder="Username" onChangeText={(e) => setUsername(e)}/>
        <TextInput style={styles.textInput} value={password} placeholder="Password" onChangeText={(e) => setPassword(e)}/>
        <TextInput style={styles.textInput} value={email} placeholder="Email" onChangeText={(e) => setEmail(e)}/>
        <TextInput style={styles.textInput} value={phone} placeholder="Phone" onChangeText={(e) => setPhone(e)}/>
        <TextInput style={styles.textInput} value={dob} placeholder="Date of Birth" onChangeText={(e) => setDob(e)}/>
        <Button  onPress={() => { storeData(); getData()}} title="Submit" color="lightgreen"/>
        <Button  onPress={removeData} title="Clear Data" color="#DC143C"/>
      </View>
      <View style={styles.textHeaderView}>
        <Text style={styles.text}>Previous User Data</Text>
      </View>
      <View style={styles.prevUserDataView}>
        <Text style={styles.text}>Username: {userData.username}</Text>
        <Text style={styles.text}>Password: {userData.password}</Text>
        <Text style={styles.text}>Email: {userData.email}</Text>
        <Text style={styles.text}>Phone: {userData.phone}</Text>
        <Text style={styles.text}>Date of Birth: {userData.dob}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
   flex:1,
 },
 userInputView: {
  padding:10,
  margin: 10,
 },
 textInput: {
  borderWidth: 1,
  marginBottom:10,
  padding: 10,
 },
 prevUserDataView: {
  padding:10,
  margin:10,
  backgroundColor:'#d3d3d3',
  borderRadius:10
 },
 textHeaderView:{
  padding:5,
  margin:10,
 },
 text:{
   fontSize:16
 }
});

export default App;
