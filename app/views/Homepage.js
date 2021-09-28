import React, { Component} from 'react';
import { View, Text, SafeAreaView, Button, FlatList } from 'react-native';
import * as stylist from '../resources/styles/Styles';
import API from '../lib/API.js';

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
        //let url2 = "https://cockpit.educom.nu/api/collections/get/Coordinaten?token=9d13205f131c93ba9b696c5761a0d5";
        //let url3 = "https://cockpit.educom.nu/api/collections/get/Gebruiker?token=9d13205f131c93ba9b696c5761a0d5";
        API.fetchData(url1)
        .then( result => {
            //console.warn(result);
            this.setState({
                isLoaded: true,
                data: result.data
            });
        })
    }

    renderContent() {
        if(this.state.isLoaded) {
            return(
                <FlatList data={this.state.data}
                renderItem={({item}) =>
                    (<View key={item._id} style={stylist.styling}>
                        <Text>
                            <Text style={stylist.textstyle}>{item.routeNaam}</Text> 
                            <Text style={stylist.textstyle}>{item.Afstand}</Text>
                        </Text>
                        <Text>{item.Omschrijving}</Text>
                        <Button title="Coordinaten" 
                            onPress={() => this.props.navigation.navigate('Coordinaten', { item: item})}/>
                    </View>)}
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