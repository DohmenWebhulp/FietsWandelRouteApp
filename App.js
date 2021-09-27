/*import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/

import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Navigator from './app/stacks/appStack.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Coordinaten } from './app/views/Coordinaten.js';
import { Homepage } from './app/views/Homepage.js';
import { Provider } from "react-redux";
import API from "./app/lib/API.js";
import * as stylist from "./app/resources/styles/Styles.js";

import ReduxFoot from "./app/components/ReduxFoot";
import ReduxHead from "./app/components/ReduxHead";
import store from "./app/redux/store";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      data: []           	 
    }
    
  }

  componentDidMount() {
     this.postData();
     //alert(this.state.isLoaded);  
  }

  postData(){
    let url = "https://cockpit.educom.nu/api/collections/save/Fietsroute?token=9d13205f131c93ba9b696c5761a0d5";
    var data2 = {
      routeNaam: "Nieuwe Route 2",
      Afstand: "50",
      Omschrijving: "Een nieuw aangelegde route langs de maas",
      Record_Type: "F",
      Gebruiker_id: "1",
      _id: "4b23e989643430e3ed000317"
    }
    API.postData(url, data2)
    .then(response => {
      console.log(response);
});
  }

   render() {
     return(
         <View style={{ flex: 1, flexDirection: "column", padding: 
               20, justifyContent: "center" }}>
                 {this.renderContent()}
         </View>
     )
   }
    renderContent(){
      const Stack = createStackNavigator();
      
      if(this.state.isLoaded){
          return(
            <NavigationContainer style={stylist.styling}>
                    <Stack.Navigator screenOptions={{headerShown: false}}>
                        <Stack.Screen name="Homepage" component={ Homepage }/>   
                        <Stack.Screen name="Coordinaten" component={ Coordinaten}/>        
                    </Stack.Navigator>
                </NavigationContainer>
        )
      }else{
        return(<View><Text>Apply a real spinner here</Text></View>)
      }
    }
}
