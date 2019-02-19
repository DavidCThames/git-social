import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TextInput, Button, Surface } from 'react-native-paper';
import Leaderboard from './Leaderboard';
import Icon from 'react-native-vector-icons/FontAwesome';

const trophyIcon = (<Icon name="trophy" size={20} color="#f4f4f4" />);
export default class LeaderboardPage extends Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: trophyIcon
    };
    constructor(props) {
      super(props);
  
      this.state = {
          arr: []
      }
    }

    componentDidMount () {
        this.props.navigation.addListener('willFocus', (route) => { 
            this.setState({arr: global.leaderboardArr});
        });
    } 
    
    render() {
        return (
            <View>
                <Leaderboard arr={this.state.arr}/>
            </View>
        );
    }
  }
  

const styles = StyleSheet.create({
    app_container: {
      flex: 1,
      //justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    commit_text: {
      fontSize: 25,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    surface: {
      padding: 20,
      height: 150,
      width: 600,
      top: 0,
      backgroundColor: '#6200EE',
      alignItems: 'center',
      justifyContent: 'flex-end',
      elevation: 4,
    },
    login_container: {
        width: 250,
        marginBottom: 10,
    }
});