import React, { StyleSheet, View } from 'react-native';

export default class RightCorner extends React.Component {
  render() {
    return (
      <View style={styles.button} />
    );
  }
}

var styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'orange',
  },
}); 
