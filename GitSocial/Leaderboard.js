import React, {Component} from 'react';
import { ScrollView} from 'react-native';
import { DataTable } from 'react-native-paper';

export default class Leaderboard extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        arr: [{username: "MattIggo", name: "Matt Iggo", commits: 0}, {username: "C4K3", name: "C4K3", commits: 0}, {username: "ethus3h", name: "Elliot Chandler", commits: 0}, {username: "garyrh", name: "garyrh", commits: 0}, {username: "nsapa", name: "Nicolas SAPA", commits: 0}, {username: "riking", name: "Kane York", commits: 0}, {username: "Frogging101", name: "John Brooks", commits: 0}, {username: "anarcat", name: "anarcat", commits: 0}, {username: "PeterBortas", name: "Peter Bortas", commits: 0}, {username: "DoomTay", name: null, commits: 0}, {username: "12As", name: null, commits: 0}, {username: "mback2k", name: "Marc H\u00f6rsken", commits: 0}, {username: "PressStartandSelect", name: "Start", commits: 0}, {username: "Asparagirl", name: "Brooke Schreier Ganz", commits: 0}, {username: "JesseWeinstein", name: null, commits: 0}, {username: "JustAnotherArchivist", name: null, commits: 0}, {username: "Sanqui", name: "Sanqui", commits: 0}, {username: "falconkirtaran", name: "Falcon Darkstar Momot", commits: 0}, {username: "chfoo", name: "Christopher Foo", commits: 0}, {username: "ivan", name: "Ivan Kozik", commits: 0}, {username: "yipdw", name: "David Yip", commits: 0}]
      }

    //   state.arr = props.arr;

    }
    
    render() {
        return (
            <ScrollView>
                <DataTable>
                <DataTable.Header>
                <DataTable.Title>Username</DataTable.Title>
                <DataTable.Title numeric>Commits</DataTable.Title>
                </DataTable.Header>
                {
                    this.state.arr.map((rowData, index) => (
                        <DataTable.Row>
                        <DataTable.Cell>{rowData.username}</DataTable.Cell>
                        <DataTable.Cell numeric>{rowData.commits}</DataTable.Cell>
                        </DataTable.Row>
                    ))
                }
                </DataTable>
            </ScrollView>
        );
    }
}