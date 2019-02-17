import React, {Component} from 'react';
import { ScrollView} from 'react-native';
import { DataTable } from 'react-native-paper';

export default class Leaderboard extends Component {
    constructor(props) {
      super(props);
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
                    this.props.arr.map((rowData, index) => (
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