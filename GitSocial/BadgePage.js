import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { TextInput, Button, Surface } from 'react-native-paper';
import Leaderboard from './Leaderboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import SnapkitModule from "./SnapkitModule.js";

const badgeIcon = (<Icon name="certificate" size={20} color="#f4f4f4" />);
export default class BadgePage extends Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: badgeIcon,
    };
    constructor(props) {
      super(props);
  
      this.state = {
          badges: []
      };
      this.createBadges = this.createBadges.bind(this);
      this.renderRow = this.renderRow.bind(this);
    }

    componentDidMount () {
      this.props.navigation.addListener('willFocus', (route) => { 
          this.setState({badges: global.badges});
      });
    }
    
    renderRodw(encStr1, encStr2) {
      if (encStr2) {
        console.log("googf");
        return (
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={()=>console.log("1")}>
              <Image style={{width: 150, height: 150}} source={{uri: encStr1}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>()=>console.log("2")}>
              <Image style={{width: 150, height: 150}} source={{uri: encStr2}}/>
            </TouchableOpacity>
          </View>
        );
      }
      else {
        return (
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={()=>console.log("1")}>
              <Image style={{width: 150, height: 150,}} source={{uri: encStr1}}/>
            </TouchableOpacity>
          </View>
        );
      }
    }

    renderRow(rowData, index) {
      // if (rowData) {
      //   console.log("googf");
        return (
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Image style={{width: 150, height: 150}} source={{uri: "data:image/png;base64," + rowData}}/>
            </View>
            <View>
              <Image style={{width: 150, height: 150}} source={{uri: "data:image/png;base64," + rowData}}/>
            </View>
          </View>
        );
      // }
      // else {
      //   return (
      //     <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
      //       <TouchableOpacity onPress={()=>console.log("1")}>
      //         <Image style={{width: 150, height: 150,}} source={{uri: encStr1}}/>
      //       </TouchableOpacity>
      //     </View>
      //   );
      // }
    }

    createBadges() {
        let badgesComp = []
        if (this.state.badges.length === 0) {
          return badgesComp;
        }
        // Outer loop to create parent
        console.log("hello");
        console.log(this.state.badges);
        console.log(this.state.badges.length);
        for (let i = 0; i < this.state.badges.length; i++) {
          console.log(i);
          let str1 = "data:image/png;base64," + this.state.badges[i];
          let str2;
          if (i + 1 >= this.state.badges.length) {
            str2 = "";
          }
          else {
            str2 = "data:image/png;base64," + this.state.badges[i+1];
          }
          badgesComp.push(this.renderRow(str1, str2));
        }
        return badgesComp;
      }

    render() {
        if(this.state.badges.length < 2) {
          return (
            <View>
              <Text>d</Text>
            </View>
          )
        }
        return (
            <View style={{alignItems: "center", justifyContent: 'center'}}>
                {this.state.badges.map((rowData, index)=>(
                  <TouchableOpacity onPress={()=>{
                    SnapkitModule.sendImage(rowData);
                  }}>
                    <Image style={{width: 100, height: 100, marginBottom: 10}} source={{uri: "data:image/png;base64," + rowData}}/>
                  </TouchableOpacity>
                ))}
                {/* {this.state.badges.map(this.renderRow)} */}
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