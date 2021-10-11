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
                <Text>
                    <Text style={stylist.textstyle}>{item.routeNaam}</Text> 
                    <Text style={stylist.textstyle}>{item.Afstand}</Text>
                </Text>
                <Text>{item.Omschrijving}</Text>
                <Button title="Tussenstopinfo" 
                    onPress={() => this.props.navigation.navigate('TussenstopDetail', { item: item})}/>
            </View>
        )
    }

    renderContent() {
        if(this.state.isLoaded) { 
            return(
                <ScrollView>
                    <FlatList data={this.state.data}
                    renderItem={({item}) => this.renderAnItem(item)}
                    />
                    <Button title="Aanrading" 
                                onPress={() => this.props.navigation.navigate('Aanrading')}/>
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

export { Homepage};