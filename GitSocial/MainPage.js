import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Picker} from 'react-native';
import { Surface } from 'react-native-paper';
import SnapkitModule from "./SnapkitModule.js";
import Leaderboard from './Leaderboard.js';

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
        pickRepo: [],
        repoWheel: "",
        leaderboardArr: []
      };

      this.sendSticker = this.sendSticker.bind(this);
      this.pullData = this.pullData.bind(this);
      this.pullBoard = this.pullBoard.bind(this);

      this.pullData();
      this.pullBoard();
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

    async pullBoard() {
        try {
            let response = await fetch("http://git-social.com/api/v1/UVA-CS3240-S19/project-103-justintime/leaderboard/commits/week");
            let responseJson = await response.json();
            console.log(responseJson)
            this.setState({
                leaderboardArr: responseJson.contributors
            });
        }
        catch(error) {
            console.error(error);
        }
    }
  
    render() {
        return (
            
            <View style={styles.app_container}>

                <Surface style={{backgroundColor: '#000000', width: 600, height: 77, position: 'absolute', opacity: .1}}>
                
                </Surface>

                <Surface style={styles.surfaceBanner}>
                    
                  <Picker
                    prompt="Choose a Repository"
                    selectedValue={this.state.repoWheel}
                    style={{height: 75, width: 200, color: '#ffffff'}}
                    itemStyle={{color: '#ffffff', fontSize: 40, fontFamily: 'roboto'}}
                    onValueChange={(itemValue, itemIndex) =>
                    this.setState({repoWheel: itemValue})
                      }>
                        
                        <Picker.Item label="Repo1" value="f1" />
                        <Picker.Item label="Repo2: Electric Repoloo" value="f2" />
                        <Picker.Item label="Repo3: Before the Repo" value="f3" />
                        <Picker.Item label="Repo4: The Reponing" value="f4" />
                  </Picker>
                    
                </Surface>

                
                <View style={{height: 150}}></View>
                <Surface style={styles.surface}>
                <View style={styles.text_container}> 
                <Text style={styles.commit_text}> Number of commits: {this.state.numCommits} </Text> 
                <Text style={styles.commit_text}> Number of additions: {this.state.numAdditions} </Text> 
                </View>
                </Surface>
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
      //justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    surfaceBanner: {
      padding: 20,
      height: 75,
      width: 600,
      top: 0,
      backgroundColor: '#6200EE',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4
    },
    surface: {
      padding: 20,
      height: 150,
      width: 300,
      top: 0,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4
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