import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './Header';


const Home = (props) => {
    const [ info, setInfo ] = useState({
        name: "loading !!",
        temp: "loading",
        humidity: "loading",
        desc: "loading",
        icon: "loading"
    });

    useEffect(() => {
        getWeather();
       
    }, [props.route.params.city]);

    const getWeather = async() => {
        let myCity = await AsyncStorage.getItem("newCity");

        if(!myCity)
        {
            const { city } = props.route.params;
            myCity = city;
        }
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${myCity}&APPID=9f41c7d63d12e5cede5baac2eb027756&units=metric`)
        .then(data => data.json())
        .then(results => {
            console.log(results);
            setInfo({
                name: results.name,
                temp: results.main.temp,
                humidity: results.main.humidity,
                desc: results.weather[0].description,
                icon: results.weather[0].icon
            })
        })
        .catch(error => {
            alert(error.message);
          })
    };
    

    return(
        <View style={{flex: 1}}>
            <Header name="Weather App" />
            <View style={{alignItems: "center"}}>
                <Title
                style={{
                    color: "#00aaff",
                    marginTop: 30,
                    fontSize: 30
                }}>
                    {info.name || "Loading"}
                </Title>

                <Image
                    style={{
                        width: 120,
                        height: 120
                    }}
                    source={{uri:"https://openweathermap.org/img/w/"+info.icon+".png"}}
                    />
            </View>

            <Card
            style={{
                margin: 6,
                padding: 12
            }}>
                <Title style={{color: "#00aaff"}}>
                    Temperature: {info.temp || "Loading"}
                </Title>
            </Card>

            <Card
            style={{
                margin: 6,
                padding: 12
            }}>
                <Title style={{color: "#00aaff" }}>
                    Humidity: {info.humidity || "Loading"}
                </Title>
            </Card>

            <Card
            style={{
                margin: 6,
                padding: 12
            }}>
                <Title style={{color: "#00aaff"}}>
                    Description: { info.desc || "Loading"}
                </Title>
            </Card>

        </View>
    )
}

export default Home;