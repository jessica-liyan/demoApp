import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import BaseComponent from '../base/BaseComponent'
import {getNavigator} from '../route';

export default class ReadPage extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {
      type: 'read'
    }
  }

  getNavigationBarProps() {
    return {
      hideLeftButton: true,
      leftButtonImage: require('../image/back.png'),
      rightButtonImage: require('../image/search.png'),
      title: '阅读'
    };
  }

  renderBody () {
    return (
      <View>
        <Text>read books</Text>
        <ActivityIndicator color={'red'}/>
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
});
