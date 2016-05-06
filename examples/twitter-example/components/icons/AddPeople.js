import React, {PropTypes} from "react";
import { StyleSheet, TouchableHighlight, Image } from 'react-native';

import FindPeoplePage from '../../pages/FindPeoplePage';

const propTypes = {
  toRoute: PropTypes.func.isRequired,
};

class AddPeopleIcon extends React.Component {
  constructor(props) {
    super(props);

    this.styles = StyleSheet.create({
      icon: {
        width: 25,
        height: 18,
        marginTop: 5,
        marginLeft: 8,
      },
    });

    this.goToAddPage = this.goToAddPage.bind(this);
  }

  goToAddPage() {
    this.props.toRoute({
      name: 'Find people',
      component: FindPeoplePage,
    });
  }

  render() {
    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.goToAddPage}>
        <Image source={require('../../images/add_people_icon.png')} style={this.styles.icon} />
      </TouchableHighlight>
    );
  }
}

AddPeopleIcon.propTypes = propTypes;

export default AddPeopleIcon;
