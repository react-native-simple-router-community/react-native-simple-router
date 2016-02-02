import React, { StyleSheet } from 'react-native';

import Router from '../index';

import HomePage from './pages/HomePage';
import BackButton from './components/BackButton';
import SearchAndCompose from './components/icons/SearchAndCompose';
import AddPeople from './components/icons/AddPeople';

const firstRoute = {
  name: 'Home',
  component: HomePage,
  leftCorner: AddPeople,
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#5cafec',
  },
});

export default class TwitterApp extends React.Component {
  render() {
    return (
      <Router
        firstRoute={firstRoute}
        headerStyle={styles.header}
        backButtonComponent={BackButton}
        rightCorner={SearchAndCompose}
      />
    );
  }
}
