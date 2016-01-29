import React, { StyleSheet, Image } from 'react-native';

export default class BackButton extends React.Component {
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      backButton: {
        width: 10,
        height: 17,
        marginLeft: 10,
        marginTop: 3,
        marginRight: 10,
      },
    });
  }
  render() {
    return (
      <Image source={require('../images/back_button.png')} style={this.styles.backButton} />
    );
  }
}
