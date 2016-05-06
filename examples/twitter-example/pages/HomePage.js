import React, {PropTypes} from "react";
import { StyleSheet, ScrollView } from 'react-native';

import Tweet from '../components/Tweet';
import TweetPage from '../components/TweetBig';

const propTypes = {
  toRoute: PropTypes.func.isRequired,
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
      },
    });
    this.state = {
      tweets: [
        {
          key: 1,
          text: 'The React Native Router is awesome!',
          user: {
            name: 'Tristan Edwards',
            username: 't4t5',
            avatar: 'https://pbs.twimg.com/profile_images/497658257276538880/KrPEaVDu_400x400.jpeg',
          },
        },
        {
          key: 2,
          text: 'Hello world!',
          user: {
            name: 'Leonard Pauli',
            username: 'LeonardPauli',
            avatar: 'https://pbs.twimg.com/profile_images/436581173871927296/txEzObgk_400x400.jpeg',
          },
        },
      ],
    };
    this.goToTweet = this.goToTweet.bind(this);
  }

  goToTweet(tweetData) {
    this.props.toRoute({
      name: 'Tweet',
      component: TweetPage,
      data: tweetData,
    });
  }

  render() {
    const Tweets = this.state.tweets.map((tweetData) => {
      return <Tweet {...tweetData} onPress={this.goToRoute} goToTweet={this.goToTweet} />;
    });

    return (
      <ScrollView style={this.styles.container}>
        {Tweets}
      </ScrollView>
    );
  }
}

HomePage.propTypes = propTypes;

export default HomePage;
