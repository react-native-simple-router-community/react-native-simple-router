import React from "react";
import { StyleSheet, View } from 'react-native';

export default class RightCorner extends React.Component {
  render() {
    return (
      <View style={styles.button} />
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'orange',
  },
}); 
