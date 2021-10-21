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
            dataStart: [],
            dataEind: [],
            dataStops: [],
            dataRoutes: [],
            route: '',
            omschrijving: '',
            startplaats: '',
            startstraat: '',
            eindplaats: '',
            eindstraat: '',
            record: '',
            radius: 0,
            route_id: '',
            postedRoute: false,
            postedStop: false
        }
    }

    componentDidMount() {
    }

    //Hier wordt met behulp van de Geocode API de coordinaten opgehaald van de opgegeven locatie.

    getGeocode(){
        
        var url1 = "https://maps.googleapis.com/maps/api/geocode/json?address=+"+this.state.startplaats+",+"+this.state.startstraat+",+NL&key=AIzaSyC5LpRoZZqJw7doPNk_2nZRtt1-cDraVfU"
        var url2 = "https://maps.googleapis.com/maps/api/geocode/json?address=+"+this.state.eindplaats+",+"+this.state.eindstraat+",+NL&key=AIzaSyC5LpRoZZqJw7doPNk_2nZRtt1-cDraVfU"
        //var url = "https://maps.googleapis.com/maps/api/geocode/json?address=+Limbricht,+Beukenboomsweg,+NL&key=AIzaSyC5LpRoZZqJw7doPNk_2nZRtt1-cDraVfU"
        API.fetchGeocodeTwice(url1, url2)
        .then( result => {
            //console.warn(result)
            this.setState({
                dataStart: result.start.geometry.bounds,
                dataEind: result.eind.geometry.bounds,
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
            var coordsStart = Calculations.calculateCoordinates(this.state.dataStart.northeast.lat,this.state.dataStart.southwest.lat,
                                              this.state.dataStart.northeast.lng,this.state.dataStart.southwest.lng);
            var coordsEind = Calculations.calculateCoordinates(this.state.dataEind.northeast.lat,this.state.dataEind.southwest.lat,
                                                this.state.dataEind.northeast.lng,this.state.dataEind.southwest.lng);
            var datasStart = {
                "Plaatsnaam": this.state.startplaats,
                "Straatnaam": this.state.startstraat,
                "Lengtegraad": coordsStart.lat,
                "Breedtegraad": coordsStart.lng,
                "Route_id": this.state.route_id
            }
            var datasEind = {
                "Plaatsnaam": this.state.eindplaats,
                "Straatnaam": this.state.eindstraat,
                "Lengtegraad": coordsEind.lat,
                "Breedtegraad": coordsEind.lng,
                "Route_id": this.state.route_id
            }
            var datas = [datasStart, datasEind];
            API.postData(url, datas)
            .then(result => {
                console.warn(result)
                this.setState({
                    postedStop: true
                })
            })
        }
    }

    /*addFields(){
        this.setState({extraFields: true});
    }

    extraStops(){
        if(this.state.extraFields){
            //this.setState({extraFields: false});
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
    }*/

    renderContent() {
        if(this.state.isLoaded) {
            return(
                <View>
                    <Text style={stylist.textstyle2}>Voeg nieuwe Route toe:</Text>
                    <View style={stylist.margins}>
                        <Text>Routenaam</Text>
                        <TextInput style={stylist.textfield} placeholder="Routenaam"
                        onChangeText={(text) => {this.setState({route: text})}}></TextInput>
                    </View>
                    <View style={stylist.margins}>
                        <Text>Omschrijving</Text>
                        <TextInput style={stylist.textfield} placeholder="Omschrijving"
                        onChangeText={(text) => {this.setState({omschrijving: text})}}></TextInput>
                    </View>
                    <View style={stylist.margins}>
                        <Text>Fietsen of Wandelen?</Text>
                        <TextInput style={stylist.textfield} placeholder="F of W?"
                        onChangeText={(text) => {this.setState({record: text})}}></TextInput>
                    </View>
                    <View style={stylist.margins}>
                        <Text>Startplaats</Text>
                        <TextInput style={stylist.textfield} placeholder="Plaatsnaam"
                        onChangeText={(text) => {this.setState({startplaats: text})}}></TextInput>
                    </View>
                    <View style={stylist.margins}>
                        <Text>Startstraat</Text>
                        <TextInput style={stylist.textfield} placeholder="Straatnaam"
                        onChangeText={(text) => {this.setState({startstraat: text})}}></TextInput>
                    </View>
                    <View style={stylist.margins}>
                        <Text>Eindplaats</Text>
                        <TextInput style={stylist.textfield} placeholder="Plaatsnaam"
                        onChangeText={(text) => {this.setState({eindplaats: text})}}></TextInput>
                    </View>
                    <View style={stylist.margins}>
                        <Text>Eindstraat</Text>
                        <TextInput style={stylist.textfield} placeholder="Straatnaam"
                        onChangeText={(text) => {this.setState({eindstraat: text})}}></TextInput>
                    </View>
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
                {this.renderContent()}
            </ScrollView>
        )
    }
}

export {RouteToevoegen};