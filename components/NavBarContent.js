import React, { StyleSheet, Text, View, Animated, Easing, PropTypes } from 'react-native';
import NavButton from './NavButton';

const propTypes = {
  backButtonComponent: PropTypes.func,
  borderBottomWidth: PropTypes.number,
  borderColor: PropTypes.string,
  customAction: PropTypes.func,
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  leftProps: PropTypes.object,
  rightCorner: PropTypes.func,
  rightProps: PropTypes.object,
  route: PropTypes.object.isRequired,
  titleProps: PropTypes.object,
  titleStyle: PropTypes.any.isRequired,
  willDisappear: PropTypes.bool,
};

class NavBarContent extends React.Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.customAction = this.customAction.bind(this);

    this.state = {
      opacity: this.props.willDisappear ? new Animated.Value(1) : new Animated.Value(0),
    };

    this.styles = StyleSheet.create({
      navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 64, // Default iOS navbar height
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 13,
      },
      navbarText: {
        color: 'white',
        fontSize: 17,
        margin: 10,
        marginTop: 14,
        fontWeight: '600',
        textAlign: 'center',
        alignItems: 'center',
      },
      corner: {
        flex: 1,
        justifyContent: 'center',
      },

      alignLeft: {
        alignItems: 'flex-start',
      },
      alignRight: {
        alignItems: 'flex-end',
      },
      buttonTextLeft: {
        marginLeft: 10,
      },
      buttonTextRight: {
        marginRight: 10,
      },
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.route !== this.props.route) {
      this.state.opacity.setValue(this.props.willDisappear ? 1 : 0);

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
  }

  goBack() {
    if (!this.props.willDisappear) {
      this.props.goBack();
    }
  }

  goForward(route) {
    this.props.goForward(route);
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
    let width;
    let color;

    /**
     * Set leftCorner
     * (defaults to "Back"-button for routes with index > 0)
     */

    if (this.props.route.leftCorner) {
      LeftCorner = this.props.route.leftCorner;
      leftCornerContent = (
        <LeftCorner
          toRoute={this.goForward}
          customAction={this.customAction}
          {...this.props.leftProps}
          {...this.props.route.leftCornerProps}
        />
      );
    } else if (this.props.route.index > 0) {
      leftCornerContent = (
        <NavButton onPress={this.goBack} backButtonComponent={this.props.backButtonComponent} />
      );
    }

    leftCorner = (
      <View style={[this.styles.corner, this.styles.alignLeft]}>
        {leftCornerContent}
      </View>
    );

    /**
     * Set rightCorner
     */

    if (this.props.route.rightCorner || this.props.rightCorner) {
      RightCorner = this.props.route.rightCorner || this.props.rightCorner;
      rightCornerContent = (
        <RightCorner
          toRoute={this.goForward}
          customAction={this.customAction}
          {...this.props.rightProps}
          {...this.props.route.rightCornerProps}
        />
      );
    }

    rightCorner = (
      <View style={[this.styles.corner, this.styles.alignRight]}>
        {rightCornerContent}
      </View>
    );

    /**
     * Set title message
     */

    if (this.props.route.titleComponent) {
      TitleComponent = this.props.route.titleComponent;
      titleContent = <TitleComponent {...this.props.titleProps} />;
    } else {
      titleContent = (
        <Text style={[this.styles.navbarText, this.props.titleStyle]} numberOfLines={1}>
          {this.props.route.name}
        </Text>
      );
    }

    titleComponent = (
      <View style={{ flex: 3 }}>
        {titleContent}
      </View>
    );

    if (this.props.route.trans === true) {
      trans = { backgroundColor: 'transparent', borderBottomWidth: 0 };
    } else {
      trans = {};
    }

    width = this.props.borderBottomWidth ? this.props.borderBottomWidth : 0;
    color = this.props.borderColor ? this.props.borderColor : null;

    return (
      <Animated.View
        style={
          [
            this.styles.navbar,
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
