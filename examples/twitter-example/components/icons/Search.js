import React, {PropTypes} from "react";
import { TouchableHighlight, Image, StyleSheet } from 'react-native';

const propTypes = {
  goToSearch: PropTypes.func.isRequired,
};

class SearchIcon extends React.Component {
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      icon: {
        width: 21,
        height: 21,
        marginTop: 4,
        marginRight: 15,
      },
    });

    this.goToSearch = this.goToSearch.bind(this);
  }

  goToSearch() {
    this.props.goToSearch();
  }

  render() {
    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.goToSearch}>
        <Image source={require('../../images/search_icon.png')} style={this.styles.icon} />
      </TouchableHighlight>
    );
  }
}

SearchIcon.propTypes = propTypes;

export default SearchIcon;
