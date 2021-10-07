import React, { Component} from 'react';
import { View, Text, SafeAreaView, Button, FlatList, ScrollView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as stylist from '../resources/styles/Styles';
import API from '../lib/API.js';
import Calculations from '../lib/Calculations.js';

class Coordinaten extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,  
            isError: false,   
            data: [],
            route: this.props.route.params.item
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        let url2 = "https://cockpit.educom.nu/api/collections/get/Tussenstops?token=9d13205f131c93ba9b696c5761a0d5";
        API.fetchData(url2)
        .then( result => {
            //console.warn(result);
            this.setState({
                isLoaded: true,
                data: result.data,
                route: this.props.route.params.item
            });
        })
    }

    render() {
        var datas = this.state.data.filter((item) => item.Route_id == this.state.route._id);
        var APIKEY_Google = "AIzaSyC5LpRoZZqJw7doPNk_2nZRtt1-cDraVfU";
        var coords = [];
        if(this.state.isLoaded){
            var origine = {latitude: parseFloat(datas[0].Lengtegraad),
                           longitude: parseFloat(datas[0].Breedtegraad)};
            var endpoint = {latitude: parseFloat(datas[datas.length-1].Lengtegraad), 
                            longitude: parseFloat(datas[datas.length-1].Breedtegraad)};
            for(var i = 1; i < datas.length - 1; i++){
                coords.push({latitude: parseFloat(datas[i].Lengtegraad), 
                             longitude: parseFloat(datas[i].Breedtegraad)})
            }
            return(
                <View>
                    <MapView style={stylist.map}>
                        {datas.map((marker) =>
                        (<Marker key={marker._id} draggable={true}
                            coordinate={{latitude: parseFloat(marker.Lengtegraad), 
                                        longitude: parseFloat(marker.Breedtegraad)}}
                            title={marker.Plaatsnaam}
                            description={marker.Straatnaam}/>))}
                        <MapViewDirections
                            origin={origine}
                            waypoints={coords}
                            destination={endpoint}
                            apikey={APIKEY_Google}
                            strokeWidth={3}
                        >
                        </MapViewDirections>
                    </MapView>
                </View>
            )
        }else{
            return(
                <Text>Apply a real spinner here</Text>
            )
        }
    }

}

export {Coordinaten};