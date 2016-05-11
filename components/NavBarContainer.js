import React, { PropTypes } from 'react';
import {
  BackAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import NavBarContent from './NavBarContent';
import * as Styles from '../styles';

const propTypes = {
  backButtonComponent: PropTypes.func,
  borderBottomWidth: PropTypes.number,
  borderColor: PropTypes.string,
  currentRoute: PropTypes.object.isRequired,
  customAction: PropTypes.func,
  handleBackAndroid: PropTypes.bool,
  goToFirstRoute: PropTypes.func.isRequired,
  leftProps: PropTypes.object,
  navigator: PropTypes.object.isRequired,
  replaceRoute: PropTypes.func.isRequired,
  resetToRoute: PropTypes.func.isRequired,
  rightCorner: PropTypes.func,
  rightProps: PropTypes.object,
  style: View.propTypes.style,
  titleProps: PropTypes.object,
  titleStyle: Text.propTypes.style,
  toBack: PropTypes.func.isRequired,
  toRoute: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  navbarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Styles.NAV_BAR_HEIGHT,
  },
  navbarContainerHidden: {
    position: 'absolute',
    top: -Styles.NAV_BAR_HEIGHT,
    left: 0,
    right: 0,
    height: Styles.NAV_BAR_HEIGHT,
  },
});

class NavBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.replaceRoute = this.replaceRoute.bind(this);
    this.resetToRoute = this.resetToRoute.bind(this);
    this.goToFirstRoute = this.goToFirstRoute.bind(this);
    this.customAction = this.customAction.bind(this);

    this.state = {
      backButtonOpacity: 0,
      previousRoute: {}, // Keep previousRoute for smooth transitions
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !!this.props.handleBackAndroid) {
      BackAndroid.addEventListener('hardwareBackPress', () => {
        if (this.props.currentRoute.index > 0) {
          this.goBack();
          return true;
        }

        return false;
      });
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props && this.props.currentRoute.index !== newProps.currentRoute.index) {
      this.setState({
        previousRoute: this.props.currentRoute,
      });
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android' && !!this.props.handleBackAndroid) {
      BackAndroid.removeEventListener('hardwareBackPress');
    }
  }

  goBack() {
    this.props.toBack(this.props.navigator);
  }

  goForward(route) {
    this.props.toRoute(route, this.props.navigator);
  }

  replaceRoute(nextRoute) {
    this.props.replaceRoute(nextRoute, this.props.navigator);
  }

  resetToRoute(nextRoute) {
    this.props.resetToRoute(nextRoute, this.props.navigator);
  }

  goToFirstRoute(nextRoute) {
    this.props.goToFirstRoute(nextRoute, this.props.navigator);
  }

  customAction(opts) {
    this.props.customAction(opts);
  }

  // We render both the current and the previous navbar (for animation)
  render() {
    let trans;
    let navbarStyle;
    let navbarContent;

    if (this.props.currentRoute.trans) {
      trans = { backgroundColor: 'transparent' };
    } else {
      trans = {};
    }

    if (this.props.currentRoute.hideNavigationBar) {
      navbarStyle = styles.navbarContainerHidden;
    } else {
      navbarStyle = styles.navbarContainer;
    }

    if (this.props.currentRoute.trans) {
      navbarContent = (
        <NavBarContent
          route={this.state.previousRoute}
          backButtonComponent={this.props.backButtonComponent}
          rightCorner={this.props.rightCorner}
          titleStyle={this.props.titleStyle}
          willDisappear
          borderBottomWidth={this.props.borderBottomWidth}
          borderColor={this.props.borderColor}
          goBack={this.goBack}
          goForward={this.goForward}
          replaceRoute={this.replaceRoute}
          resetToRoute={this.resetToRoute}
          goToFirstRoute={this.goToFirstRoute}
          leftProps={this.props.leftProps}
          rightProps={this.props.rightProps}
          titleProps={this.props.titleProps}
          customAction={this.customAction}
        />
      );
    } else {
      navbarContent = (
        <NavBarContent
          route={this.props.currentRoute}
          backButtonComponent={this.props.backButtonComponent}
          rightCorner={this.props.rightCorner}
          titleStyle={this.props.titleStyle}
          borderBottomWidth={this.props.borderBottomWidth}
          borderColor={this.props.borderColor}
          goBack={this.goBack}
          goForward={this.goForward}
          replaceRoute={this.replaceRoute}
          resetToRoute={this.resetToRoute}
          goToFirstRoute={this.goToFirstRoute}
          leftProps={this.props.leftProps}
          rightProps={this.props.rightProps}
          titleProps={this.props.titleProps}
          customAction={this.customAction}
        />
      );
    }

    return (
      <View style={[navbarStyle, this.props.style, trans]}>
        {navbarContent}
      </View>
    );
  }
}

NavBarContainer.propTypes = propTypes;

export default NavBarContainer;
