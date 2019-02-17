import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default class LoginPage extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
      super(props);
  
      this.state = {
        loggedIn: false,
        loggingIn: false,
        loginText: "",
        passwordText: "",
        visibleText: ""
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

                <View style={styles.login_container}>
                    <TextInput
                        mode="outlined"
                        label="Email"
                        value={this.state.text}
                        onChangeText={text => this.setState({ text })}
                    />
                </View>
                

                <View style={styles.loginbutton_container}>
                    <Button 
                        loading={this.state.loggingIn} 
                        mode="contained" 
                        onPress={() => this.setState({loggingIn: true})}
                        style={{width: 200}}
                    >

                        Login
                    </Button>
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
    login_container: {
        width: 200,
        marginBottom: 10,
    }
});