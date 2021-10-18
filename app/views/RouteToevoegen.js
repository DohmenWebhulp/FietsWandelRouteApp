import React, { Component} from 'react';
import { View, Text, TextInput, SafeAreaView, Button, FlatList, ScrollView, AppRegistry } from 'react-native';
import MapView from 'react-native-maps';
import * as stylist from '../resources/styles/Styles';
import API from '../lib/API.js';
import Calculations from '../lib/Calculations.js';
import Geocoder from 'react-native-geocoding';
import { Label } from 'native-base';

class RouteToevoegen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true, 
            isSend: false, 
            isError: false,  
            data: [], 
            dataStops: [],
            dataRoutes: [],
            route: '',
            omschrijving: '',
            stops: [],
            startplaats: '',
            startstraat: '',
            record: '',
            radius: 0,
            route_id: '',
            extraFields: false,
            postedRoute: false,
            postedStop: false
        }
    }

    componentDidMount() {
    }

    //Hier wordt met behulp van de Geocode API de coordinaten opgehaald van de opgegeven locatie.

    getGeocode(){
        
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=+"+this.state.startplaats+",+"+this.state.startstraat+",+NL&key=AIzaSyC5LpRoZZqJw7doPNk_2nZRtt1-cDraVfU"
        //var url = "https://maps.googleapis.com/maps/api/geocode/json?address=+Sittard,+Beukenboomsweg,+NL&key=AIzaSyC5LpRoZZqJw7doPNk_2nZRtt1-cDraVfU"
        API.fetchGeocode(url)
        .then( result => {
            //console.warn(result.data.results[0].geometry.bounds)
            this.setState({
                data: result.data.results[0].geometry.bounds,
                isSend: true
            });
        });
    }

    //Hier wordt de routeinformatie opgeslagen in Cockpit aan de hand van de ingevulde tekstvelden.

    postRoute(){
        if(this.state.isSend && !this.state.postedRoute){
            var url = "https://cockpit.educom.nu/api/collections/save/Fietsroute?token=9d13205f131c93ba9b696c5761a0d5"
            var datas = {
                "routeNaam": this.state.route,
                "Omschrijving": this.state.omschrijving,
                "Record_Type": this.state.record
            }
            API.postData(url, datas)
            .then(result => {
                //console.warn(result)
                this.setState({
                    route_id: result._id,
                    postedRoute: true
                })
            })
        }
    }

    //Hier worden de gemiddelde coordinaten berekend van de opgehaalde geocoded tussenstop.
    //De tussenstop met informatie wordt vervolgens opgeslagen in cockpit CMS.

    postTussenstop(){
        if(this.state.postedRoute && !this.state.postedStop){
            var url = "https://cockpit.educom.nu/api/collections/save/Tussenstops?token=9d13205f131c93ba9b696c5761a0d5";
            var coords = Calculations.calculateCoordinates(this.state.data.northeast.lat,this.state.data.southwest.lat,
                                              this.state.data.northeast.lng,this.state.data.southwest.lng);
            var datas = {
                "Plaatsnaam": this.state.startplaats,
                "Straatnaam": this.state.startstraat,
                "Lengtegraad": coords.lat,
                "Breedtegraad": coords.lng,
                "Route_id": this.state.route_id
            }
            API.postData(url, datas)
            .then(result => {
                console.warn(result)
                this.setState({
                    postedStop: true
                })
            })
        }
    }

    addFields(){
        this.setState({extraFields: true});
    }

    extraStops(){
        if(this.state.extraFields){
            this.setState({extraFields: false});
            return(
                <View>
                    <View style={{margin: 10}}>
                            <Text>Plaatsnaam</Text>
                            <TextInput style={stylist.textfield} placeholder="Plaatsnaam"
                            onChangeText={(text) => {this.setState({plaats: text})}}></TextInput>
                        </View>
                        <View style={{margin: 10}}>
                            <Text>Straatnaam</Text>
                            <TextInput style={stylist.textfield} placeholder="Straatnaam"
                            onChangeText={(text) => {this.setState({straat: text})}}></TextInput>
                    </View>
                </View>
            )
        }
    }

    renderContent() {
        if(this.state.isLoaded) {
            return(
                <View>
                    <Text style={stylist.textstyle2}>Voeg nieuwe Route toe:</Text>
                    <View style={{margin: 10}}>
                        <Text>Routenaam</Text>
                        <TextInput style={stylist.textfield} placeholder="Routenaam"
                        onChangeText={(text) => {this.setState({route: text})}}></TextInput>
                    </View>
                    <View style={{margin: 10}}>
                        <Text>Omschrijving</Text>
                        <TextInput style={stylist.textfield} placeholder="Omschrijving"
                        onChangeText={(text) => {this.setState({omschrijving: text})}}></TextInput>
                    </View>
                    <View style={{margin: 10}}>
                        <Text>Fietsen of Wandelen?</Text>
                        <TextInput style={stylist.textfield} placeholder="F of W?"
                        onChangeText={(text) => {this.setState({record: text})}}></TextInput>
                    </View>
                    <View style={{margin: 10}}>
                        <Text>Plaatsnaam</Text>
                        <TextInput style={stylist.textfield} placeholder="Plaatsnaam"
                        onChangeText={(text) => {this.setState({startplaats: text})}}></TextInput>
                    </View>
                    <View style={{margin: 10}}>
                        <Text>Straatnaam</Text>
                        <TextInput style={stylist.textfield} placeholder="Straatnaam"
                        onChangeText={(text) => {this.setState({startstraat: text})}}></TextInput>
                    </View>
                    {this.extraStops()}
                    <Button title='+ tussenstop' onPress={() => {this.addFields()}}></Button>
                    <Button title='Route Toevoegen' onPress={() => {this.getGeocode()}}></Button>
                    {this.postRoute()}
                    {this.postTussenstop()}
                </View>
            )
        }else{
            <Text>Spinner</Text>
        }
    }
    render() {  
        return(
            <ScrollView>
                { this.renderContent() }
            </ScrollView>
        )
    }
}

export {RouteToevoegen};