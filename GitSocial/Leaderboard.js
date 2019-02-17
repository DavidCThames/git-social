import React, {Component} from 'react';
import { ScrollView} from 'react-native';
import { DataTable } from 'react-native-paper';

export default class Leaderboard extends Component {
    constructor(props) {
      super(props);

      this.renderRow = this.renderRow.bind(this);
    }

    renderRow(rowData, index) {
        if (rowData.username.trim() === global.user.trim()) {
            return (
                <DataTable.Row style={{backgroundColor:"#faecc2"}}>
                <DataTable.Cell>{index + 1}</DataTable.Cell>
                <DataTable.Cell>{rowData.username}</DataTable.Cell>
                <DataTable.Cell numeric>{rowData.commits}</DataTable.Cell>
                </DataTable.Row>
            );
        }
        else {
            return (
                <DataTable.Row>
                <DataTable.Cell>{index + 1}</DataTable.Cell>
                <DataTable.Cell>{rowData.username}</DataTable.Cell>
                <DataTable.Cell numeric>{rowData.commits}</DataTable.Cell>
                </DataTable.Row>
            );
        }
    }
    
    render() {
        return (
            <ScrollView>
                <DataTable>
                <DataTable.Header>
                <DataTable.Title>Rank</DataTable.Title>
                <DataTable.Title>Username</DataTable.Title>
                <DataTable.Title numeric>Commits</DataTable.Title>
                </DataTable.Header>
                {
                    this.props.arr.map(this.renderRow)
                }
                </DataTable>
            </ScrollView>
        );
    }
}