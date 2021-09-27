import React, { Component} from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import * as Styles from '../resources/styles/Styles';

class Coordinaten extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,  
            isError: false,   
            data: this.props.data
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        let url2 = "https://cockpit.educom.nu/api/collections/get/Tussenstops?token=9d13205f131c93ba9b696c5761a0d5";
        //let url3 = "https://cockpit.educom.nu/api/collections/get/Gebruiker?token=9d13205f131c93ba9b696c5761a0d5";
        API.fetchData(url2)
        .then( result => {
            this.setState({
                isLoaded: true,
                data: result
            });
        })
    }

    renderContent() {
        var datas=[
            {
                "Plaatsnaam": "Sittard",
                "Straatnaam": "Rijksweg Noord",
                "Lengtegraad": "51.0089375",
                "Breedtegraad": "5.863428",
                "Route_id": "1",
                "_id": "875fdcc230306568e1000029"
            },
            {
                "Plaatsnaam": "Sittard",
                "Straatnaam": "Heistraat",
                "Lengtegraad": "51.0098307",
                "Breedtegraad": "5.8629685",
                "Route_id": "1",
                "_id": "876d416a35386263f50000a0"
            },
            {
                "Plaatsnaam": "Sittard",
                "Straatnaam": "Pater Chevalierstraat",
                "Lengtegraad": "51.0093484",
                "Breedtegraad": "5.8642749",
                "Route_id": "1",
                "_id": "879aa1d8373031656800012d"
            },
            {
                "Plaatsnaam": "Sittard",
                "Straatnaam": "Geldersestraat",
                "Lengtegraad": "51.0071917",
                "Breedtegraad": "5.8651984",
                "Route_id": "1",
                "_id": "87b92804373563d22300002d"
            },
            {
                "Plaatsnaam": "Sittard",
                "Straatnaam": "Heistraat",
                "Lengtegraad": "51.0089872",
                "Breedtegraad": "5.8670236",
                "Route_id": "1",
                "_id": "87dfb37b326137c674000157"
            },
            {
                "Plaatsnaam": "Sittard",
                "Straatnaam": "Overhoven",
                "Lengtegraad": "51.0071585",
                "Breedtegraad": "5.8691491",
                "Route_id": "1",
                "_id": "87ee4b8438383235b1000281"
            },
            {
                "Plaatsnaam": "Sittard",
                "Straatnaam": "Pater Schreursstraat",
                "Lengtegraad": "51.0056407",
                "Breedtegraad": "5.8672583",
                "Route_id": "1",
                "_id": "87f7edb3336262e4ff0003d5"
            },
            {
                "Plaatsnaam": "Sittard",
                "Straatnaam": "Geldersestraat",
                "Lengtegraad": "51.0070086",
                "Breedtegraad": "5.8649533",
                "Route_id": "1",
                "_id": "88068804623463127e000390"
            },
            {
                "Plaatsnaam": "Sittard",
                "Straatnaam": "Rijksweg Noord",
                "Lengtegraad": "51.0065429",
                "Breedtegraad": "5.8640154",
                "Route_id": "1",
                "_id": "881464f631633983600000dd"
            },
            {
                "Plaatsnaam": "Sittard",
                "Straatnaam": "Tunnelstraat",
                "Lengtegraad": "51.0059144",
                "Breedtegraad": "5.8562853",
                "Route_id": "2",
                "_id": "886fe33a61353610fb000322"
            },
            {
                "Plaatsnaam": "Limbricht",
                "Straatnaam": "Provincialeweg",
                "Lengtegraad": "51.0098698",
                "Breedtegraad": "5.839796",
                "Route_id": "2",
                "_id": "888b374d336638c2d7000271"
            },
            {
                "Plaatsnaam": "Limbricht",
                "Straatnaam": "Beukenboomsweg",
                "Lengtegraad": "51.0198396",
                "Breedtegraad": "5.8276387",
                "Route_id": "2",
                "_id": "8898fbe4326662366e00018f"
            },
            {
                "Plaatsnaam": "Guttecoven",
                "Straatnaam": "Einighauserweg",
                "Lengtegraad": "51.0156464",
                "Breedtegraad": "5.8199633",
                "Route_id": "2",
                "_id": "88a38b7934303687d40003cb"
            },
            {
                "Plaatsnaam": "Einighausen",
                "Straatnaam": "Brandstraat",
                "Lengtegraad": "51.0056634",
                "Breedtegraad": "5.8223993",
                "Route_id": "2",
                "_id": "88cc1260643135803d0002d6"
            },
            {
                "Plaatsnaam": "Einighausen",
                "Straatnaam": "Heistraat",
                "Lengtegraad": "50.9978214",
                "Breedtegraad": "5.8243313",
                "Route_id": "2",
                "_id": "88f5d36d663239694d00032b"
            },
            {
                "Plaatsnaam": "Einighausen",
                "Straatnaam": "Urmonderbaan",
                "Lengtegraad": "50.9923865",
                "Breedtegraad": "5.8268351",
                "Route_id": "2",
                "_id": "8905f356346536619d0000be"
            },
            {
                "Plaatsnaam": "Sittard",
                "Straatnaam": "Bergerweg",
                "Lengtegraad": "50.9946514",
                "Breedtegraad": "5.8371363",
                "Route_id": "2",
                "_id": "890ffdaa3032656bb6000311"
            },
            {
                "Plaatsnaam": "Sittard",
                "Straatnaam": "Poststraat",
                "Lengtegraad": "50.998721",
                "Breedtegraad": "5.8513626",
                "Route_id": "2",
                "_id": "891e83f36563311c9e000075"
            },
            {
                "Plaatsnaam": "Sittard",
                "Straatnaam": "Klaverstraat",
                "Lengtegraad": "51.0037307",
                "Breedtegraad": "5.8566106",
                "Route_id": "2",
                "_id": "892b7c716361337e4f0001ec"
            },
            {
                "Plaatsnaam": "Sittard",
                "Straatnaam": "Lupinestraat",
                "Lengtegraad": "51.00427",
                "Breedtegraad": "5.8560156",
                "Route_id": "2",
                "_id": "89397c7a33323674f60001f5"
            },
            {
                "Plaatsnaam": "Sittard",
                "Straatnaam": "Tunnelstraat",
                "Lengtegraad": "51.0059128",
                "Breedtegraad": "5.8577505",
                "Route_id": "2",
                "_id": "894551426666310310000061"
            }
        ],
        // Hoe routeData vanuit Homepage over te hevelen?
        if(this.state.isLoaded) {
            return(
                <View>
                    {datas.filter((item) => item.Route_id == routeData._id)}
                  <Text style={ Styles.textstyle }>
                    Coordinaten
                  </Text>
                  <Button title="Homepage" onPress={() => this.props.navigation.goBack()}></Button>
                </View>
            )
        }
      
    }

    render() {
        return(
            <View style={Styles.styling}>
                { this.renderContent() }
            </View>
        )
    }

}

export {Coordinaten};
