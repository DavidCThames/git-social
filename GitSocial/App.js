/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, NativeModules} from 'react-native';
import SnapkitModule from "./SnapkitModule.js";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor() {
    super()
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
            title="Add Snapchat Filter"
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
