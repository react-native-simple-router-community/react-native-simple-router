import React from 'react-native';

const {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Component,
} = React;

class NavButton extends Component {
  constructor(props) {
    super(props);

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
      backButton = <View><BackButton/></View>;
    } else {
      backButton = <Text style={styles.navbarText}>Back</Text>;
    }

    return (
      <TouchableHighlight onPress={this.onPress} underlayColor="transparent">
        {backButton}
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  navbarText: {
    color: 'white',
    fontSize: 16,
    margin: 10,
    fontWeight: '600',
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default NavButton;
