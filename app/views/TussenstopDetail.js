import React, { Component} from 'react';
import { View, Text, SafeAreaView, Button, FlatList, ScrollView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as stylist from '../resources/styles/Styles';
import API from '../lib/API.js';
import Calculations from '../lib/Calculations.js';

class TussenstopDetail extends Component {

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
        var datas = this.state.data.filter((item) => item.Route_id == this.state.route._id);
        var cumArray = Calculations.calculateCumulativeDistances(datas);
        var data = Calculations.roundUpDistance(datas, cumArray);

        if(this.state.isLoaded) {
            return(
                <ScrollView>
                    <Button title="Homepage" onPress={() => this.props.navigation.goBack()}></Button>
                    <FlatList data={data}
                    renderItem={(item) => this.renderAnItem(item)}
                    keyExtractor={ item => item._id.toString()}/>
                </ScrollView>
            )
        }
    }

    render() {
        return(
            <View>
                { this.renderContent() }
            </View>
        )
    }
}
export {TussenstopDetail};