import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from "react-redux";
import { Card } from 'native-base';

import mapStateToProps from '../redux/map';

/// lets call the class a little different for reasons of clarity
class ReduxHeadClass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    /// This is the actual life cycle function which "listens" to external state changes.
    componentWillReceiveProps(props) {
       // console.warn(props);
        this.setState({
            counter: props.totalData.counter
        })
        
      }

    render() {
        return(
            <Card style={{ padding: 40 }}>
                <Text>Redux Head</Text>
                <Text>Total: { this.state.counter }</Text>
            </Card>
        )
    }

}

//export default ReduxHead with the mapping!
const ReduxHead = connect(mapStateToProps)(ReduxHeadClass);
export default ReduxHead;