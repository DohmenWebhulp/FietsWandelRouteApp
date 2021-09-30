import React, { Component} from 'react';
import { View, Text, TextInput, SafeAreaView, Button, FlatList, ScrollView, AppRegistry } from 'react-native';
import MapView from 'react-native-maps';
import * as stylist from '../resources/styles/Styles';
import API from '../lib/API.js';
class Aanrading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,  
            isError: false,   
            data: [],
        }
    }

    componentDidMount() {
        let url1 = "https://cockpit.educom.nu/api/collections/get/Fietsroute?token=9d13205f131c93ba9b696c5761a0d5";
        let url2 = "https://cockpit.educom.nu/api/collections/get/Tussenstops?token=9d13205f131c93ba9b696c5761a0d5";
        this.fetchData(url1)
        this.fetchData(url2)
        this.setState({
            isLoaded: true,
        })
    }

    fetchData(url) {
        API.fetchData(url)
        .then( result => {
            //console.warn(this.state.route);
            this.setState({
                isLoaded: false,
                data: result.data,
            });
        })
    }
    
    renderAnItem(item){
        return(
            <View key={item.item._id} style={stylist.styling}>
                <Text style={stylist.textstyle}>{item.item.Plaatsnaam}</Text> 
                <Text style={stylist.textstyle}>{item.item.Straatnaam}</Text>
                <Text style={stylist.textstyle}>Afstand: {item.item.Afstand} km</Text>
            </View>
        )
    }

    renderContent() {

        //Alleen de tussenstops die bij de aangeklikte route horen moeten getoond worden.
        
        /*var datas = this.state.data.filter((item) => item.Route_id == this.state.route._id);
        var cumArray = this.calculateCumulativeDistances(datas);
        for(var i = 1; i < datas.length; i++){
            //Rond afstand af naar één cijfer achter de komma.
             var round = Math.round(10*cumArray[i-1])/10;
             datas[i]["Afstand"] = round;
        }*/
        //console.warn(datas);
        if(this.state.isLoaded) {
            return(
                <View>
                </View>
            )
        }
    }

    //De afstanden tussen 2 opeenvolgende tussenstops worden berekent en op een cumulatieve manier opgeteld.
    //Dit levert een array met afstanden tot dusverre voor elke tussenstop.
    calculateCumulativeDistances(datas){
        var distances = [];
        for(var i = 0; i < datas.length; i++){
            for(var j = 0; j < datas.length; j++){
                if(j - i == 1){
                    var dist = this.calculateDistance(datas[i], datas[j]);
                    distances.push(dist);
                }
            }
        }
        const cumulativeSum = (sum => value => sum += value)(0);
        var cumDistances = distances.map(cumulativeSum);
        return cumDistances;      
    }

    //Functie die de afstand berekent tussen 2 tussenstops. Dit onder de aanname dat 
    //de aarde plat is op een relatief kleine schaal. Het is dus een benadering en niet exact.
    calculateDistance(stop1, stop2){
        var deltaL = Math.abs(stop1.Lengtegraad - stop2.Lengtegraad)*(Math.PI/180);
        var deltaB = Math.abs(stop1.Breedtegraad - stop2.Breedtegraad)*(Math.PI/180);
        var radiusB = 6371;
        var radiusL = Math.sin(stop1.Lengtegraad)*radiusB;
        var dist = Math.sqrt(Math.pow(deltaL*radiusL, 2)+Math.pow(deltaB*radiusB, 2)); //Pythagoras
        return dist;
    }

    render() {
        return(
            <View style={stylist.styling}>
                { this.renderContent() }
            </View>
        )
    }

}

export {Aanrading};