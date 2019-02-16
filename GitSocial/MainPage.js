import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import SnapkitModule from "./SnapkitModule.js";

export default class MainPage extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
      super(props);
      this.sendSticker = this.sendSticker.bind(this);
    }
  
    sendSticker() {
      SnapkitModule.requestImage("http://git-social.com/api/v1/ArchiveTeam/ArchiveBot/user/ivan/sticker/week");
    }
  
    render() {
        return (
            <View style={styles.app_container}>
                <View style={styles.text_container}> 
                <Text style={styles.commit_text}> Number of commits: 4 </Text> 
                </View>
                <View>
                <Button
                    onPress={this.sendSticker}
                    title="Add Snapchat Sticker"
                    color="#841584"
                />
                </View>
            </View>
        );
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