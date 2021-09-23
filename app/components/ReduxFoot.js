import React, { Component } from 'react';
import { View  } from 'react-native';
import { Container, Header, Content, Button, Text, Card } from 'native-base';

import { connect } from "react-redux";
import { updateTotal } from "../redux/actions";

import mapStateToProps from '../redux/map';


/// Here we need to fire off the dispatch (the reducer gets called)
function mapDispatchToProps(dispatch) {
    return {
      updateTotal: totalData => dispatch(updateTotal(totalData))
    };
  }

class ReduxFootClass extends Component {

    constructor(props) {
        super(props);       
        this.state = {
           counter: 0,
        }
    }

	/// Let's fire off the action!
    updateState() {
        let c =  this.state.counter + 1 ;
        this.props.updateTotal({ counter: c });
    }

    componentWillReceiveProps(props) {
       // console.warn(props);
        this.setState({
            counter: props.totalData.counter
        })
        
      }


    render() {
        return(
            <Card style={{ padding: 40 }}>
                <Text>ReduxFoot</Text>
                <Text>Total: { this.props.totalData.counter }</Text>
                <Button primary onPress={ () => this.updateState() }>
                  <Text> Update State </Text>
            	</Button>
            </Card>
        )
    }

}

//export default ReduxFoot -> the same wiring happens here
const ReduxFoot = connect(mapStateToProps, mapDispatchToProps)(ReduxFootClass);
export default ReduxFoot;