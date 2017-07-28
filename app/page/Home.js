import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import HomePage from './HomePage';
import ReadPage from './ReadPage';
import MusicPage from './MusicPage';
import MoviePage from './MoviePage';
import TabBar from '../component/TabBar';

const tabBarResources = [
  [require('../image/home.png'), require('../image/home_active.png')],
  [require('../image/reading.png'), require('../image/reading_active.png')],
  [require('../image/music.png'), require('../image/music_active.png')],
  [require('../image/movie.png'), require('../image/movie_active.png')]
];

export default class Home extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <ScrollableTabView 
        renderTabBar={() => {
          return <TabBar tabBarResources={tabBarResources}/>
        }}
        tabBarPosition='bottom'
        initialPage={0}
        style={styles.container}
      >
        <HomePage />
        <ReadPage />
        <MusicPage />
        <MoviePage />
      </ScrollableTabView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
    backgroundColor:'#f5f5f5'
  }
});
