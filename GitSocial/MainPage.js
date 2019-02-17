import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import SnapkitModule from "./SnapkitModule.js";

export default class MainPage extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
      super(props);
      this.state = {
        owner: "facebook",
        repo: "react-native",
        user: "fkgozali",
        sort: "week",
        numCommits: "",
        numAdditions: "",
        base64Image: "",
      };

      this.sendSticker = this.sendSticker.bind(this);
      this.pullData = this.pullData.bind(this);

      this.pullData();
    }
  
    sendSticker() {
        SnapkitModule.sendImage(this.state.base64Image);
    }

    async pullData() {
        let requestString = this.state.owner + "/" + this.state.repo + "/user/" + 
                            this.state.user + "/sticker/" + this.state.sort;
        try {
            let response = await fetch("http://git-social.com/api/v1/" + requestString);
            let responseJson = await response.json();
            this.setState({
                base64Image: responseJson.image.replace("b'", "").replace("'",""),
                numAdditions: responseJson.deletes + responseJson.additions,
                numCommits: responseJson.commits
            });
        }
        catch(error) {
            console.error(error);
        }
    }
  
    render() {
        return (
            <View style={styles.app_container}>
                <View style={styles.text_container}> 
                <Text style={styles.commit_text}> Number of commits: {this.state.numCommits} </Text> 
                <Text style={styles.commit_text}> Number of additions: {this.state.numAdditions} </Text> 
                </View>
                <View>
                <Button
                    disabled={this.state.base64Image === ""}
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