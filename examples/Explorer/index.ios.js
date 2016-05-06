import React, {PropTypes} from "react";
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';

import Router from 'react-native-simple-router';
import Page from './Page';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3b5999',
  },
});

const firstRoute = {
  name: 'Explorer',
  component: Page,
};

class Explorer extends React.Component {
  render() {
    return (
      <Router
        firstRoute={firstRoute}
        headerStyle={styles.header}
        ref={'router'}
      />
    );
  }
}

AppRegistry.registerComponent('Explorer', () => Explorer);
