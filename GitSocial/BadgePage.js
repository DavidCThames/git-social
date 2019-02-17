import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { TextInput, Button, Surface } from 'react-native-paper';
import Leaderboard from './Leaderboard';
import Icon from 'react-native-vector-icons/FontAwesome';

const badgeIcon = (<Icon name="certificate" size={20} color="#f4f4f4" />);
export default class BadgePage extends Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: badgeIcon,
    };
    constructor(props) {
      super(props);
  
      this.state = {
          base64Icon: ""
      };
      this.createBadges = this.createBadges.bind(this);

      this.createBadges();
    }
    
    createBadges = () => {
        let badges = []
        // Outer loop to create parent
        for (let i = 0; i < 3; i++) {
          this.setState({
              base64Icon: "http://git-social.com/api/v1/badge/0" + i
          });
          badges.push(<Image style={{width: 100, height: 50}} source={{url: base64Icon}} />)
          badges.push(<Button
            /*disabled={this.state.base64Image === ""}
            onPress={this.sendSticker}*/
            title="Add Snapchat Sticker"
            color="#841584"
        />)
        }
        return badges
      }

    render() {
        return (
            <View>
                {this.createBadges()}
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