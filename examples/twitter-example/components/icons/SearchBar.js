import React from "react";
import { StyleSheet, TextInput } from 'react-native';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.styles = StyleSheet.create({
      input: {
        backgroundColor: '#3f88bf',
        width: 220,
        height: 32,
        marginTop: 6,
        paddingLeft: 10,
        color: 'white',
        borderRadius: 4,
      },
    });
  }

  render() {
    return (
      <TextInput style={this.styles.input} placeholder="Search Twitter" />
    );
  }
}
