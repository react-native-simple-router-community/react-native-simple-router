import React from "react";
import { StyleSheet } from 'react-native';

import Router from '../../index';

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

const statusBarProps = {
  backgroundColor: '#1b6298',
};

export default class TwitterApp extends React.Component {
  render() {
    return (
      <Router
        firstRoute={firstRoute}
        headerStyle={styles.header}
        backButtonComponent={BackButton}
        rightCorner={SearchAndCompose}
        statusBarProps={statusBarProps}
      />
    );
  }
}
