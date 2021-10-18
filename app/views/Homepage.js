import React, { Component} from 'react';
import { ScrollView, View, Text, SafeAreaView, Button, FlatList } from 'react-native';
import * as stylist from '../resources/styles/Styles';
import API from '../lib/API.js';
import Calculations from '../lib/Calculations';

class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,  
            isError: false,   
            data: this.props.data
        }
    }

    componentDidMount() {
        this.fetchData(); 
    }

    fetchData() {

        let url1 = "https://cockpit.educom.nu/api/collections/get/Fietsroute?token=9d13205f131c93ba9b696c5761a0d5";

        API.fetchData(url1)
        .then( result => {
            //console.warn(result);
            this.setState({
                isLoaded: true,
                data: result.data
            });
        })
    }

    renderAnItem(item){
        return(
            <View key={item._id} style={stylist.styling}>
                <Text style={stylist.textstyle}>{item.routeNaam}</Text> 
                <Text>{item.Omschrijving}</Text>
                <View style={{margin: 10}}>
                    <Button title="Details" 
                        onPress={() => this.props.navigation.navigate('TussenstopDetail', { item: item})}/>
                </View>
            </View>
        )
    }

    renderContent() {
        if(this.state.isLoaded) { 
            return(
                <FlatList data={this.state.data}
                renderItem={({item}) => this.renderAnItem(item)}
                ListHeaderComponent={<View><Text style={stylist.textstyle2}>Routelijst</Text></View>}
                ListFooterComponent={<View style={stylist.buttonstyle}><Button title="Aanrading" 
                color='green'
                keyExtractor={ item => item._id.toString()}
                onPress={() => this.props.navigation.navigate('Aanrading')}/>
                <Button title="Route Toevoegen" color='brown' keyExtractor={ item => item._id.toString()}
                onPress={() => this.props.navigation.navigate('RouteToevoegen')}/></View>}
                />
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

export { Homepage};