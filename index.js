import React, {
  StyleSheet,
  Navigator,
  StatusBarIOS,
  View,
  Platform,
  PropTypes,
  Text,
} from 'react-native';

import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

import NavBarContainer from './components/NavBarContainer';
import * as Styles from './styles';
import aspect from 'aspect-js';

const propTypes = {
  backButtonComponent: PropTypes.func,
  bgStyle: PropTypes.object,
  borderBottomWidth: PropTypes.number,
  borderColor: PropTypes.string,
  customAction: PropTypes.func,
  firstRoute: PropTypes.object.isRequired,
  handleBackAndroid: PropTypes.bool,
  headerStyle: View.propTypes.style,
  hideNavigationBar: PropTypes.bool,
  noStatusBar: PropTypes.bool,
  rightCorner: PropTypes.func,
  statusBarColor: PropTypes.string,
  titleStyle: Text.propTypes.style,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

class Router extends React.Component {
  constructor(props) {
    super(props);

    this.onForward = this.onForward.bind(this);
    this.onBack = this.onBack.bind(this);
    this.customAction = this.customAction.bind(this);
    this.renderScene = this.renderScene.bind(this);

    this.onDidFocus = this.onDidFocus.bind(this);
    this.onWillFocus = this.onWillFocus.bind(this);

    this.onWillPop = this.onWillPop.bind(this);
    this.onDidPop = this.onDidPop.bind(this);

    this.onWillPush = this.onWillPush.bind(this);
    this.onDidPush = this.onDidPush.bind(this);

    this.onWillResetTo = this.onWillResetTo.bind(this);
    this.onDidResetTo = this.onDidResetTo.bind(this);

    this.onWillReplace = this.onWillReplace.bind(this);
    this.onDidReplace = this.onDidReplace.bind(this);

    this.onWillPopToTop = this.onWillPopToTop.bind(this);
    this.onDidPopToTop = this.onDidPopToTop.bind(this);

    this.state = {
      route: {
        name: null,
        index: null,
      },
    };
    this.emitter = new EventEmitter();
  }

  componentWillMount() {
    this.state.route = this.props.firstRoute;
  }

  componentDidMount() {
    this.refs.navigator.navigationContext.addListener('willfocus', (event) => {
      const route = event.data.route;
      this.setState({ route });
      this.emitter.emit('willFocus', route.name);
    });

    this.refs.navigator.navigationContext.addListener('didfocus', (event) => {
      const route = event.data.route;
      this.emitter.emit('didFocus', route.name);
    });

    aspect.before(this.refs.navigator, 'pop', () => {
      this.onWillPop();
    });
    aspect.after(this.refs.navigator, 'pop', () => {
      this.onDidPop();
    });

    aspect.before(this.refs.navigator, 'push', (route) => {
      this.onWillPush(route);
    });
    aspect.after(this.refs.navigator, 'push', (route) => {
      // temporary hack to fix bug in aspect library
      this.onDidPush(route || arguments[1]);
    });

    aspect.before(this.refs.navigator, 'resetTo', (route) => {
      this.onWillResetTo(route);
    });
    aspect.after(this.refs.navigator, 'resetTo', (route) => {
      // temporary hack to fix bug in aspect library
      this.onDidResetTo(route || arguments[1]);
    });

    aspect.before(this.refs.navigator, 'replace', (route) => {
      this.onWillReplace(route);
    });
    aspect.after(this.refs.navigator, 'replace', (route) => {
      // temporary hack to fix bug in aspect library
      this.onDidReplace(route || arguments[1]);
    });

    aspect.before(this.refs.navigator, 'popToTop', () => {
      this.onWillPopToTop();
    });
    aspect.after(this.refs.navigator, 'popToTop', () => {
      this.onDidPopToTop();
    });
  }

  onBack(navigator) {
    if (this.state.route.index > 0) {
      navigator.pop();
    }
  }

  onForward(nextRoute, navigator) {
    navigator.push(
      Object.assign(nextRoute, { index: this.state.route.index + 1 || 1 })
    );
  }

  onWillPop() {
    this.emitter.emit('willPop');
  }

  onDidPop() {
    this.emitter.emit('didPop');
  }

  onWillPush(route) {
    this.emitter.emit('willPush', route);
  }

  onDidPush(route) {
    this.emitter.emit('didPush', route);
  }

  onWillResetTo(route) {
    this.emitter.emit('willResetTo', route);
  }

  onDidResetTo(route) {
    this.emitter.emit('didResetTo', route);
  }

  onWillReplace(route) {
    this.emitter.emit('willReplace', route);
  }

  onDidReplace(route) {
    this.emitter.emit('didReplace', route);
  }

  onWillPopToTop() {
    this.emitter.emit('willPopToTop');
  }

  onDidPopToTop() {
    this.emitter.emit('didPopToTop');
  }

  setRightProps(props) {
    this.setState({ rightProps: props });
  }

  setLeftProps(props) {
    this.setState({ leftProps: props });
  }

  setTitleProps(props) {
    this.setState({ titleProps: props });
  }

  customAction(opts) {
    this.props.customAction(opts);
  }

  configureScene(route) {
    return route.sceneConfig || Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    const goForward = (nextRoute) => {
      navigator.push(
        Object.assign(nextRoute, { index: this.state.route.index + 1 || 1 })
      );
      this.emitter.emit('push', nextRoute);
    };

    const replaceRoute = (nextRoute) => {
      navigator.replace(
        Object.assign(nextRoute, { index: this.state.route.index || 0 })
      );
      this.emitter.emit('replace', nextRoute);
    };

    const resetToRoute = (nextRoute) => {
      navigator.resetTo(
        Object.assign(nextRoute, { index: 0 })
      );
      this.emitter.emit('resetTo', nextRoute);
    };

    const goBackwards = () => {
      this.onBack(navigator);
    };

    const goToFirstRoute = () => {
      navigator.popToTop();
      this.emitter.emit('popToTop');
    };

    const setRightProps = (props) => {
      this.setState({ rightProps: props });
    };

    const setLeftProps = (props) => {
      this.setState({ leftProps: props });
    };

    const setTitleProps = (props) => {
      this.setState({ titleProps: props });
    };

    const customAction = (opts) => {
      this.customAction(opts);
    };

    const Content = route.component;

    // Remove the margin of the navigation bar if not using navigation bar
    const extraStyling = {};
    if (this.props.hideNavigationBar) {
      extraStyling.marginTop = 0;
    }

    let margin;
    if (route.trans) {
      margin = 0;
    } else if (this.props.hideNavigationBar || route.hideNavigationBar) {
      margin = this.props.noStatusBar ? 0 : 20;
    } else {
      margin = Styles.NAV_BAR_HEIGHT;
    }

    return (
      <View
        style={[styles.container, this.props.bgStyle, extraStyling, { marginTop: margin }]}
      >
        <Content
          name={route.name}
          index={route.index}
          data={route.data}
          toRoute={goForward}
          toBack={goBackwards}
          routeEmitter={this.emitter}
          replaceRoute={replaceRoute}
          resetToRoute={resetToRoute}
          reset={goToFirstRoute}
          setRightProps={setRightProps}
          setLeftProps={setLeftProps}
          setTitleProps={setTitleProps}
          customAction={customAction}
          {...route.passProps}
        />
      </View>
    );
  }

  render() {
    let navigationBar;
    // Status bar color
    if (Platform.OS === 'ios') {
      if (this.props.statusBarColor === 'black') {
        StatusBarIOS.setStyle(0); // "Default" style according to StatusBarIOS.js
      } else {
        StatusBarIOS.setStyle(1); // "light-content" style according to StatusBarIOS.js
      }
    } else if (Platform.OS === 'android') {
      // no android version yet
    }

    if (!this.props.hideNavigationBar) {
      navigationBar = (
        <NavBarContainer
          style={this.props.headerStyle}
          navigator={navigator}
          currentRoute={this.state.route}
          backButtonComponent={this.props.backButtonComponent}
          rightCorner={this.props.rightCorner}
          titleStyle={this.props.titleStyle}
          borderBottomWidth={this.props.borderBottomWidth}
          borderColor={this.props.borderColor}
          toRoute={this.onForward}
          toBack={this.onBack}
          leftProps={this.state.leftProps}
          rightProps={this.state.rightProps}
          titleProps={this.state.titleProps}
          customAction={this.customAction}
          handleBackAndroid={this.props.handleBackAndroid}
        />
      );
    }

    return (
      <Navigator
        ref="navigator"
        initialRoute={this.props.firstRoute}
        navigationBar={navigationBar}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    );
  }
}

Router.propTypes = propTypes;

export default Router;
