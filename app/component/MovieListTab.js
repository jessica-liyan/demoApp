import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import BaseComponent from '../base/BaseComponent'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import MovieListDetail from './MovieListDetail'

export default class MovieListTab extends BaseComponent {
  constructor (props) {
    super(props)
    console.log('tab',props)
    this.state = {
      type: '',
      initialPage: 0
    }
  }

  componentDidMount () {
    this.setState({
      type: this.props.type
    })
    switch (this.props.type){
      case 'new':
        return this.setState({
          initialPage: 0
        })
      case 'coming':
        return this.setState({
          initialPage: 1
        })
    }
  }

  getNavigationBarProps() {
    return {
      leftButtonImage: require('../image/back.png'),
      rightButtonImage: require('../image/search.png'),
      title: '电影'
    };
  }

  renderBody () {
    const {initialPage} =  this.state
    return (
      <View>
        <Text>导演</Text>
        <ScrollableTabView initialPage={0} style={{flex:1}}>
          <MovieListDetail tabLabel="院线热映" />
          <MovieListDetail tabLabel="即将上映" />
        </ScrollableTabView>
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
