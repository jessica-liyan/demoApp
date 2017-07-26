import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import BaseComponent from '../base/BaseComponent'
import {getNavigator} from '../route';
import {postFetch} from '../api/apiHelper'

export default class ReadPage extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {
      type: 'movie',
      city: '武汉',
      newMovie: [], // 院线热映
      comingMovie: [], // 即将上映
    }
    this.FetchNewMovie = this.FetchNewMovie.bind(this)
    this.FetchNewMovie()
  }

  getNavigationBarProps() {
    return {
      hideLeftButton: true,
      leftButtonImage: require('../image/back.png'),
      rightButtonImage: require('../image/search.png'),
      title: '电影'
    };
  }
  
  FetchNewMovie () {
    postFetch({
      path: 'movie/in_theaters',
      params: {
        city: this.state.city,
        count: 5
      },
      callback: res => {
        console.log(res.subjects)
        this.setState({
          newMovie: res.subjects
        })
      }
    })
    postFetch({
      path: 'movie/coming_soon',
      params: {
        count: 5
      },
      callback: res => {
        this.setState({
          comingMovie: res.subjects
        })
      }
    })
  }
  
  renderBody () {
    let {newMovie, comingMovie} = this.state;
    return (
      <View style={styles.main}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>院线热映</Text>
          <TouchableOpacity onPress={() => getNavigator().push({name: 'MovieListTab',params: {type: 'new'}})} style={styles.more}>
            <Text style={styles.moreTxt}>更多></Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal contentContainerStyle={styles.container}>
          {
            newMovie.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => getNavigator().push({name: 'MovieDetail',params: {id: item.id}})}>
                  <Image source={{uri: item.images.large}} style={{width:120,height:160}} resizeMode="contain"/>
                  <Text style={styles.txt}>{item.title}</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
        <View style={styles.titleBar}>
          <Text style={styles.title}>即将上映</Text>
          <TouchableOpacity onPress={() => getNavigator().push({name: 'MovieListTab',params: {type: 'coming'}})} style={styles.more}>
            <Text style={styles.moreTxt}>更多></Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal contentContainerStyle={styles.container}>
          {
            comingMovie.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => getNavigator().push({name: 'MovieDetail',params: {id: item.id}})}>
                  <Image source={{uri: item.images.large}} style={{width:120,height:160}} resizeMode="contain"/>
                  <Text style={styles.txt}>{item.title}</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
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
  main:{
    backgroundColor: '#fff'
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  titleBar:{
    position: 'relative'
  },
  title:{
    fontSize: 16,
    color: '#333',
    padding: 10,
  },
  more:{
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  moreTxt:{
    fontSize: 14,
    color: '#5CACEE',
  },
  txt:{
    fontSize: 14,
    color: '#333',
    paddingVertical: 5,
    paddingLeft: 5
  }
});
