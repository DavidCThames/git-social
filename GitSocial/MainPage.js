import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Picker} from 'react-native';
import { Surface } from 'react-native-paper';
import SnapkitModule from "./SnapkitModule.js";
import Leaderboard from './Leaderboard.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';

const homeIcon = (<Icon name="user-circle" size={20} color="#f4f4f4" />);
export default class MainPage extends Component {

    static navigationOptions = {
        header: null,
        tabBarIcon: homeIcon,
    };
    constructor(props) {
      super(props);
      this.state = {
        repoName: "",
        user: "",
        sort: "",
        numCommits: "",
        numAdditions: "",
        base64Image: "",
        pickRepo: [],
        repoWheel: "",
        leaderboardArr: [],
        badgeArr: []
      };

      this.sendSticker = this.sendSticker.bind(this);
      this.pullData = this.pullData.bind(this);
      this.pullBoard = this.pullBoard.bind(this);
      this.fetchAll = this.fetchAll.bind(this);
      this.populateAllData = this.populateAllData.bind(this);
      this.pickerChange = this.pickerChange.bind(this);
      this.setStateFromRepoObject = this.setStateFromRepoObject.bind(this);
      this.populateSingleRepo = this.populateSingleRepo.bind(this);

      this.populateAllData();
    }
  
    sendSticker() {
        SnapkitModule.sendImage(this.state.base64Image);
    }

   async pullData() {
        let requestString = this.state.repoName + "/user/" + 
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

    async populateAllData() {
        let allData = await this.fetchAll();
        if (allData.repo_names.length === 0) {
            return;
        }

        let repoName = allData.repo_names[0];
        let repo = allData.repos[repoName];
        this.setStateFromRepoObject(repoName, repo);
        this.setState({
            pickRepo: allData.repo_names,
        })
    }

    setStateFromRepoObject(repoName, repo) {
        let badges = [];

        for(var badge in repo.badge_imgs) {
            badges.push(repo.badge_imgs[badge].replace("b'", "").replace("'",""));
        }

        this.setState({
            repoName: repoName,
            sort: "month",
            user: global.user,
            numCommits: repo.commits,
            numAdditions: repo.deletes + repo.additions,
            base64Image: repo.image.replace("b'", "").replace("'",""),
            repoWheel: repoName,
            leaderboardArr: repo.contributors,
            badgeArr: badges
        });

        global.leaderboardArr = repo.contributors;
        global.badges = badges;

    }

    async populateSingleRepo(repoName) {
        try {
            let response = await fetch("http://git-social.com/api/v1/userone/" + 
                            repoName + "/user/" + this.state.user + "/" + this.state.sort);
            
            let newRepo = await response.json();
            this.setStateFromRepoObject(repoName, newRepo);
        }
        catch(error) {
            console.error(error);
        }
    }

    async pickerChange(itemValue, itemIndex) {
        this.setState({repoWheel: itemValue});
        await this.populateSingleRepo(itemValue);

    }

    async fetchAll() {
        try {
          let response = await fetch("http://git-social.com/api/v1/userall/user/" + global.user + "/month/");
          let responseJson = await response.json();
          return responseJson;
        }
        catch(error) {
          console.error(error);
          return null;
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
                    onValueChange={this.pickerChange}>
                        {
                            this.state.pickRepo.map((rowData, rowIndex) => (
                                <Picker.Item label={rowData} value={rowData} />
                            ))
                        }
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