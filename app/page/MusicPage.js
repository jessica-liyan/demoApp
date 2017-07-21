import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import BaseComponent from '../base/BaseComponent'
import {getNavigator} from '../route';

export default class ReadPage extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {
      type: 'music'
    }
  }

  getNavigationBarProps() {
    return {
      hideLeftButton: true,
      leftButtonImage: require('../image/back.png'),
      rightButtonImage: require('../image/search.png'),
      title: '音乐'
    };
  }

  renderBody () {
    return (
      <View style={styles.container}>
        <Text>read books</Text>
      </View>
    )
  }

  onRightPressed() {
    getNavigator().push({
      name: 'SearchItem',
      params: {
        type: this.state.type
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
