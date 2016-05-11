import React, { PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';

const propTypes = {
  toBack: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    padding: 5,
  },
});

class LeftCorner extends React.Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.toBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onPress}
          underlayColor={'transparent'}
        >
          <Image
            source={require('../images/ic_chevron_left_white.png')}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

LeftCorner.propTypes = propTypes;

export default LeftCorner;
