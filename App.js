import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import UserCard from './components/UserCard/UserCard';

const URL = 'https://jsonplaceholder.typicode.com/users';

export default function App() {

  const [loading, setLoading] = useState(true);
  const [userList, setUserList,] = useState([]);


  const fetchData = async () => {
    const response = await axios.get(URL)
    setLoading(false);
    setUserList(response.data);
  };
  const renderUser = ({ item }) => (<UserCard name={item.name} email={item.email} username={item.username} />
  );
  useEffect(() => {
    fetchData();
  }, []
  );
return (
  <View style={styles.container}>
    {
      loading ? (<ActivityIndicator size="large" />) : (
        <FlatList data={userList}
          renderItem={renderUser} />)}
    <Button title="Fetch Data" onPress={fetchData} />
    <StatusBar style="auto" />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
});
