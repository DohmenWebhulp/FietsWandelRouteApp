import React, { Component} from 'react';
import { View, Text, SafeAreaView } from 'react-native';
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
        this.setState({
            isLoaded: true
        })
    }


    renderContent() {
        if(this.state.isLoaded) {
            return(
                <View>
                  <Text style={ Styles.textstyle }>
                    Coordinaten
                  </Text>
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

export default Coordinaten;