import React, { StyleSheet, Text, TouchableHighlight, Image, View, PropTypes } from 'react-native';

const propTypes = {
  goToTweet: PropTypes.func.isRequired,
  text: PropTypes.string,
  user: PropTypes.object,
};

class Tweet extends React.Component {
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      tweetContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#DAE6F0',
        paddingTop: 4,
        paddingBottom: 10,
      },
      avatar: {
        backgroundColor: 'gray',
        width: 50,
        height: 50,
        marginLeft: 10,
        borderRadius: 4,
      },
      userContainer: {
        flexDirection: 'row',
      },
      username: {
        marginLeft: 4,
        fontSize: 13,
        color: '#8999a5',
        marginTop: 2,
      },
      name: {
        fontWeight: '600',
        fontSize: 15,
      },
      text: {
        marginTop: 5,
      },
      rightContainer: {
        flex: 1,
        padding: 10,
      },
    });
    this.goToTweet = this.goToTweet.bind(this);
  }

  goToTweet() {
    this.props.goToTweet(this.props);
  }

  render() {
    const {
      text,
      user,
    } = this.props;

    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.goToTweet}>
        <View style={this.styles.tweetContainer}>
          <Image source={{ uri: user.avatar }} style={this.styles.avatar} />
          <View style={this.styles.rightContainer}>
            <View style={this.styles.userContainer}>
              <Text style={this.styles.name}>{user.name}</Text>
              <Text style={this.styles.username}>@{user.username}</Text>
            </View>
            <Text style={this.styles.text}>{text}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

Tweet.propTypes = propTypes;

export default Tweet;
