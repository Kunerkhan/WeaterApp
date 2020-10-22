
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { NavigationContainer, BaseRouter } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import Home from './screens/Home';
import Search from './screens/Search';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#00aaff" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon:({color}) => {
              let iconName;
              if(route.name === "Home")
              {
                iconName = "home-outline";
              }
              else if(route.name === "Search")
              {
                iconName = "cloud-search-outline";
              }
              return <MaterialCommunityIcons name={iconName} size={25} color={color} />
            }
          })}
          tabBarOptions = {{
            activeTintColor: "white",
            inactiveTintColor: "gray",
            activeBackgroundColor:"#00aaff",
            inactiveBackgroundColor:"#00aaff"
          }}
          >

          <Tab.Screen name="Home" component={ Home } initialParams={{city: "Bishkek"}}/>
          <Tab.Screen name="Search" component={ Search } />

        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
