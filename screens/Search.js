import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './Header';

export default Search = ({navigation}) => {

  const [ city, setCity ] = useState('');
  const [ cities, setCities ] = useState([]);

  const fetchCities = (text) => {
    setCity(text);
    fetch("https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query="+text+"&locationType=city&format=json")   
    .then(item => item.json())
    .then(cityData => {
      setCities(cityData.location.address);
    })
    .catch(error => {
      console.log(error.message);
    })
  }

  const btnClick = async() => {
    await AsyncStorage.setItem("newCity", city);
    navigation.navigate("Home",{ city:city} );
  }

  const listClick = async(cityName) => {
    setCity(cityName);
    await AsyncStorage.setItem("newCity", cityName);
    navigation.navigate('Home', { city: cityName });
  }

  return (
    
    <View style={{flex: 1}}>
        <Header name="Search Screen" />
        <TextInput 
          label="city name"
          theme={{colors: {primary: "#00aaff",}}}
          value={city}
          onChangeText={(text) => fetchCities(text)}
        />
        <Button 
          icon="content-save"
          mode="contained" 
          theme={{colors: {primary: "#00aaff",}}}
          style={{margin: 20}}
          onPress={() => btnClick()}>
          <Text style={{ color: "white" }}>Save Changes</Text>
        </Button>
        <FlatList 
          data={cities}
          renderItem={({item}) => {
            return(
              <Card
                style={{margin: 2, padding: 12}}
                onPress={() => listClick(item)}
              >
                  <Text>{item}</Text>
              </Card>
            )
          }}
          keyExtractor={item => item}
        />
    </View>
  );
};
