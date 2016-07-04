import React, { PropTypes } from 'react';
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NavButton from './NavButton';
import * as Styles from '../styles';

const propTypes = {
  backButtonComponent: PropTypes.func,
  borderBottomWidth: PropTypes.number,
  borderColor: PropTypes.string,
  customAction: PropTypes.func,
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  goToFirstRoute: PropTypes.func.isRequired,
  leftProps: PropTypes.object,
  replaceRoute: PropTypes.func.isRequired,
  resetToRoute: PropTypes.func.isRequired,
  rightCorner: PropTypes.func,
  rightProps: PropTypes.object,
  route: PropTypes.object.isRequired,
  titleProps: PropTypes.object,
  titleStyle: Text.propTypes.style,
  willDisappear: PropTypes.bool,
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Styles.NAV_BAR_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: Styles.NAV_BAR_PADDING_TOP,
  },
  navbarText: {
    color: 'white',
    fontSize: 17,
    margin: 10,
    marginTop: Styles.NAV_BAR_TEXT_MARGIN_TOP,
    marginBottom: Styles.NAV_BAR_TEXT_MARGIN_TOP,
    fontWeight: '600',
    textAlign: Styles.NAV_BAR_TEXT_ALIGN,
    alignItems: 'center',
  },
  corner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonTextLeft: {
    marginLeft: 10,
  },
  buttonTextRight: {
    marginRight: 10,
  },
});

class NavBarContent extends React.Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.replaceRoute = this.replaceRoute.bind(this);
    this.resetToRoute = this.resetToRoute.bind(this);
    this.goToFirstRoute = this.goToFirstRoute.bind(this);
    this.customAction = this.customAction.bind(this);

    this.state = {
      opacity: this.props.willDisappear ? new Animated.Value(1) : new Animated.Value(0),
    };

    this.doAnimation = this.doAnimation.bind(this);
  }

  componentDidMount() {
    // componentWillReceiveProps is not called on initial render, ensure animation is.
    this.doAnimation();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.route !== this.props.route) {
      this.state.opacity.setValue(this.props.willDisappear ? 1 : 0);
      this.doAnimation();
    } else if (newProps.route === this.props.route) {
      this.state.opacity.setValue(1);
    }
  }

  doAnimation() {
    setTimeout(() => {
      Animated.timing(
        this.state.opacity,
        {
          fromValue: this.props.willDisappear ? 1 : 0,
          toValue: this.props.willDisappear ? 0 : 1,
          duration: 300,
          easing: Easing.easeOutQuad,
        }
      ).start();
    }, 0);
  }

  goBack() {
    if (!this.props.willDisappear) {
      this.props.goBack();
    }
  }

  goForward(route) {
    this.props.goForward(route);
  }

  replaceRoute(nextRoute) {
    this.props.replaceRoute(nextRoute);
  }

  resetToRoute(nextRoute) {
    this.props.resetToRoute(nextRoute);
  }

  goToFirstRoute(nextRoute) {
    this.props.goToFirstRoute(nextRoute);
  }

  customAction(opts) {
    this.props.customAction(opts);
  }

  render() {
    const transitionStyle = {
      opacity: this.state.opacity,
    };

    let leftCorner;
    let LeftCorner;
    let rightCorner;
    let RightCorner;
    let titleComponent;
    let leftCornerContent;
    let rightCornerContent;
    let titleContent;
    let TitleComponent;
    let trans;
    const width = this.props.borderBottomWidth ? this.props.borderBottomWidth : 0;
    const color = this.props.borderColor ? this.props.borderColor : null;

    /**
     * Set leftCorner
     * (defaults to "Back"-button for routes with index > 0)
     */

    if (this.props.route.leftCorner) {
      LeftCorner = this.props.route.leftCorner;
      leftCornerContent = (
        <LeftCorner
          toRoute={this.goForward}
          toBack={this.goBack}
          replaceRoute={this.replaceRoute}
          resetToRoute={this.resetToRoute}
          goToFirstRoute={this.goToFirstRoute}
          customAction={this.customAction}
          {...this.props.leftProps}
          {...this.props.route.leftCornerProps}
        />
      );
    } else if (this.props.route.index > 0) {
      leftCornerContent = (
        <NavButton
          onPress={this.goBack}
          backButtonComponent={this.props.backButtonComponent}
          {...this.props.route.backButtonProps}
        />
      );
    }

    if (Platform.OS === 'ios' || this.props.route.leftCorner || this.props.route.index > 0) {
      leftCorner = (
        <View style={styles.corner}>
          {leftCornerContent}
        </View>
      );
    }

    /**
     * Set rightCorner
     */

    if (this.props.route.rightCorner || this.props.rightCorner) {
      RightCorner = this.props.route.rightCorner || this.props.rightCorner;
      rightCornerContent = (
        <RightCorner
          toRoute={this.goForward}
          toBack={this.goBack}
          replaceRoute={this.replaceRoute}
          resetToRoute={this.resetToRoute}
          goToFirstRoute={this.goToFirstRoute}
          customAction={this.customAction}
          {...this.props.rightProps}
          {...this.props.route.rightCornerProps}
        />
      );
    }

    if (Platform.OS === 'ios' || this.props.route.rightCorner || this.props.route.index > 0) {
      rightCorner = (
        <View style={styles.corner}>
          {rightCornerContent}
        </View>
      );
    }

    /**
     * Set title message
     */

    if (this.props.route.titleComponent) {
      TitleComponent = this.props.route.titleComponent;
      titleContent = (
        <TitleComponent
          toRoute={this.goForward}
          toBack={this.goBack}
          replaceRoute={this.replaceRoute}
          resetToRoute={this.resetToRoute}
          goToFirstRoute={this.goToFirstRoute}
          customAction={this.customAction}
          {...this.props.titleProps}
          {...this.props.route.titleProps}
        />
      );
    } else {
      titleContent = (
        <Text
          style={[
            styles.navbarText,
            this.props.titleStyle,
            this.props.route.titleStyle,
          ]}
          numberOfLines={1}
        >
          {this.props.route.name}
        </Text>
      );
    }

    titleComponent = (
      <View style={{ flex: 6 }}>
        {titleContent}
      </View>
    );

    if (this.props.route.trans === true) {
      trans = { backgroundColor: 'transparent', borderBottomWidth: 0 };
    } else {
      trans = {};
    }

    return (
      <Animated.View
        style={
          [
            styles.navbar,
            transitionStyle,
            this.props.route.headerStyle,
            { borderBottomWidth: width, borderColor: color },
            trans,
          ]
        }
      >
        {leftCorner}
        {titleComponent}
        {rightCorner}
      </Animated.View>
    );
  }
}

NavBarContent.propTypes = propTypes;

export default NavBarContent;
