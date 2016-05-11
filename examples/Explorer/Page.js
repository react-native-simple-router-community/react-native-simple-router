import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import LeftCorner from './components/LeftCorner';
import RightCorner from './components/RightCorner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    padding: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});

export default class Page extends React.Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    const features = [
      {
        method: 'toRoute',
        route: {
          component: Page,
          name: 'toRoute()',
        },
      },
      {
        method: 'replaceRoute',
        route: {
          component: Page,
          name: 'replaceRoute()',
        },
      },
      {
        method: 'resetToRoute',
        route: {
          component: Page,
          name: 'resetToRoute()',
        },
      },
      {
        method: 'toRoute',
        route: {
          component: Page,
          name: 'Random headerStyle',
          headerStyle: {
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          },
        },
      },
      {
        method: 'toRoute',
        route: {
          component: Page,
          name: '(Android) Random StatusBar color',
          statusBarProps: {
            animated: true,
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          },
        },
      },
      {
        method: 'toRoute',
        route: {
          component: Page,
          name: 'Hide StatusBar',
          statusBarProps: {
            animated: true,
            hidden: true,
          },
        },
      },
      {
        method: 'toRoute',
        route: {
          component: Page,
          name: 'Hide NavBar',
          hideNavigationBar: true,
        },
      },
      {
        method: 'toRoute',
        route: {
          component: Page,
          name: 'Hide NavBar & StatusBar',
          hideNavigationBar: true,
          statusBarProps: {
            animated: true,
            hidden: true,
          },
        },
      },
      {
        method: 'toRoute',
        route: {
          component: Page,
          name: 'Custom Components \n Left and right corners',
          leftCorner: LeftCorner,
          rightCorner: RightCorner,
        },
      },
    ];

    this.state = {
      dataSource: ds.cloneWithRows(features),
    };

    this.selectedRow = {};
    features.forEach((feature) => {
      this.selectedRow[feature.route.name] = this.onPressRow.bind(this, feature);
    });

    this.renderRow = this.renderRow.bind(this);
  }

  onPressRow(feature) {
    this.props[feature.method](feature.route);
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight onPress={this.selectedRow[rowData.route.name]}>
        <View>
          <View style={styles.row}>
            <Text>{rowData.route.name}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}
