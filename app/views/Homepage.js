import React, { Component} from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import * as stylist from '../resources/styles/Styles';

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
        this.setState({
            isLoaded: true
        })
    }


    renderContent({ navigation}) {
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
        if(this.state.isLoaded) {
            return(
                <View>
                {datas.map(item => ( 
                  <View key={item._id} style={stylist.styling}>
                      <Text>
                        <Text style={stylist.textstyle}>{item.routeNaam}</Text> 
                        <Text style={stylist.textstyle}>{item.Afstand}</Text>
                      </Text>
                      <Text>{item.Omschrijving}</Text>
                      <Button title="Coordinaten" 
                        onPress={this.props.navigation.navigate("Coordinaten").bind(this)}/>
                  </View>
                ))}
                </View>
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