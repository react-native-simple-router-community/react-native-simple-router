import React, { StyleSheet, View } from 'react-native';

export default class RightCorner extends React.Component {
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      button: {
        width: 100,
        height: 50,
        backgroundColor: 'orange',
      },
    });
  }

  render() {
    return (
      <View style={this.styles.button} />
    );
  }
}
