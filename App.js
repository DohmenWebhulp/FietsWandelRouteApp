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
import Coordinaten from '../views/Coordinaten';

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
      isLoaded: false,
      data: []           	 
    }
    
  }

  componentDidMount() {
     this.fetchData(); 
     this.postData();
     //alert(this.state.isLoaded);  
  }

  fetchData() {
    let url1 = "https://cockpit.educom.nu/api/collections/get/Fietsroute?token=9d13205f131c93ba9b696c5761a0d5";
    //let url2 = "https://cockpit.educom.nu/api/collections/get/Coordinaten?token=9d13205f131c93ba9b696c5761a0d5";
    //let url3 = "https://cockpit.educom.nu/api/collections/get/Gebruiker?token=9d13205f131c93ba9b696c5761a0d5";
    API.fetchData(url1)
    .then( result => {
        this.setState({
            isLoaded: true,
            data: result
          });
    })
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
      <Provider store={ store }>
         <View style={{ flex: 1, flexDirection: "column", padding: 
               20, justifyContent: "center" }}>
                 {this.renderContent()}
                 </View>
       </Provider>
     )
   }
    renderContent(){
      const Stack = createStackNavigator();
      var datas=[
        {
            routeNaam: "Rondje Sittard",
            _mby: "4f8cd03d653838e3ad0000cd",
            _by: "4f841d6931326469e40001d5",
            _id: "4fa64b2b33393488b3000312",
            Id: "1",
            Afstand: "10",
            Omschrijving: "Een mooie wandeling door heel Sittard",
            Record_Type: "W",
            Gebruiker_id: "1"
        },
        {
            routeNaam: "Fietsen Zuid-Limburg",
            Id: "2",
            Afstand: "40",
            Omschrijving: "Een fietstocht door de Zuid-Limburgse heuvels",
            Record_Type: "F",
            Gebruiker_id: "1",
            _mby: "4f8cd03d653838e3ad0000cd",
            _by: "4f8cd03d653838e3ad0000cd",
            _id: "1adbc3ce313930505c0000b4"
        }
      ];
      if(this.state.isLoaded){
          return(
            <View>
              {datas.map(item => ( 
                <View key={item._id} style={stylist.styling}>
                    <Text>
                      <Text style={stylist.textstyle}>{item.routeNaam}</Text> 
                      <Text style={stylist.textstyle}>{item.Afstand}</Text>
                    </Text>
                    <Text>{item.Omschrijving}</Text>
                </View>
              ))}
            <ReduxHead />
            <ReduxFoot />
            <NavigationContainer>
                    <Stack.Navigator screenOptions={{headerShown: false}}>
                        <Stack.Screen name="Coordinaten" component={ Coordinaten }/>           
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        )
      }else{
        return(<View><Text>Applyddd a real spinner here</Text></View>)
      }
    }
}
