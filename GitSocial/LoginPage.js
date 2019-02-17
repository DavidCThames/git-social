import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TextInput, Button, Surface } from 'react-native-paper';

const nothing = (<View></View>);
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
                
                {/*<Title style={{fontSize: 40, backgroundColor: '#6200EE', padding: 25, color: '#ffffff'}}>
                    Git Social
                </Title>*/}
                <Surface style={{backgroundColor: '#000000', width: 600, height: 152, position: 'absolute', opacity: .1}}>
                    
                </Surface>

                <Surface style={styles.surface}>
                    <Text style={{fontFamily: 'roboto', fontSize: 60, padding: 10, color: '#ffffff'}}>
                        Git Social
                    </Text>
                </Surface>

                <View style={{height: 150}}></View>

                <View style={styles.text_container}> 
                    <Text style={styles.commit_text}>Sign In</Text> 
                </View>
                
                <View style={styles.login_container}>
                    <TextInput
                        mode="outlined"
                        label="Email"
                        value={this.state.loginText}
                        onChangeText={loginText => this.setState({ loginText })}
                    />
                </View>
                
                <View style={styles.login_container}>
                    <TextInput
                        mode="outlined"
                        label="Password"
                        value={this.state.visibleText}
                        onChangeText={ (passwordText) => {
                            var vis = "";
                            for(var i = 0; i < passwordText.length; i++) {
                                vis += "*";
                            }
                            this.setState({ passwordText: passwordText, visibleText: vis })
                        }}
                    />
                </View>
                
                <View style={{height: 20}}></View>

                <View style={styles.loginbutton_container}>
                    <Button 
                        loading={this.state.loggingIn} 
                        mode="contained" 
                        onPress={() => this.login()}
                        style={{justifyContent: 'center',
                        alignItems: 'center', width: 200, height: 75, color: '#6200EE'}}>

                        Log In

                    </Button>
                </View>

            </View>
        )
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