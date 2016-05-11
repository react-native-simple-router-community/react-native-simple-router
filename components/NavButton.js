import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const propTypes = {
  backButtonComponent: PropTypes.func,
  onPress: PropTypes.func.isRequired,
};

class NavButton extends React.Component {
  constructor(props) {
    super(props);

    this.styles = StyleSheet.create({
      navbarText: {
        color: 'white',
        fontSize: 16,
        margin: 10,
        fontWeight: '600',
        textAlign: 'center',
        alignItems: 'center',
      },
    });

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress();
  }

  render() {
    let backButton;
    let BackButton;

    if (this.props.backButtonComponent) {
      BackButton = this.props.backButtonComponent;
      backButton = <View><BackButton /></View>;
    } else {
      backButton = <Text style={this.styles.navbarText}>Back</Text>;
    }

    return (
      <TouchableHighlight onPress={this.onPress} underlayColor="transparent">
        {backButton}
      </TouchableHighlight>
    );
  }
}

NavButton.propTypes = propTypes;

export default NavButton;
