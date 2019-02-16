import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class LoginPage extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
      super(props);
  
      this.state = {
        loggedIn: false
      }
  
      this.login = this.login.bind(this);
    }
  
    login() {
        const {navigate} = this.props.navigation;
        this.setState({loggedIn: true});
        navigate('Profile');
    }
    
    render() {
        return (
            <View style={styles.app_container}>
                <View style={styles.text_container}> 
                <Text style={styles.commit_text}> Login Page </Text> 
                </View>
                <View>
                <Button
                    onPress={this.login}
                    title="Login"
                    color="#841584"
                />
                </View>
            </View>
        )
    }
  }
  
  const styles = StyleSheet.create({
    app_container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    commit_text: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });