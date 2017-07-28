import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar,DefaultTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../base/NavigationBar'
import {getNavigator} from '../route';
import MovieListDetail from './MovieListDetail'
import {getFetch, postFetch} from '../api/apiHelper'

const navigationBarProps = {
  title:'电影',
  leftButtonImage:require('../image/back.png'),
  rightButtonImage:require('../image/share.png')
}

export default class MovieListTab extends Component {
  constructor (props) {
    super(props)
    console.log('tab',props)
    this.state = {
      type: '',
      newMovieList: [],
      comingMovieList: [],
      city: '武汉',
      newLoadingStatus: 'loading',
      comingLoadingStatus: 'loading'
    }
    this.state.initialPage = this.props.type == 'new'? 0 : 1
    this.FetchMovieList = this.FetchMovieList.bind(this)
  }

  componentDidMount () {
    this.setState({
      type: this.props.type
    })
    this.FetchMovieList(this.props.type)
  }

  FetchMovieList(type){
    switch (type){
      case 'new':
        postFetch({
          path: 'movie/in_theaters',
          params: {
            city: this.state.city
          },
          callback: res => {
            console.log(res.subjects)
            this.setState({
              newMovieList: res.subjects,
              newLoadingStatus: 'success'
            })
          }
        })
      case 'coming':
        getFetch({
          path: 'movie/coming_soon',
          callback: res => {
            console.log(res.subjects)
            this.setState({
              comingMovieList: res.subjects,
              comingLoadingStatus: 'success'
            })
          }
        })
    }
  }

  render () {
    const {initialPage, newMovieList ,comingMovieList, newLoadingStatus, comingLoadingStatus} =  this.state
    return (
      <View style={styles.container}>
        <NavigationBar 
          navigationBarProps={navigationBarProps} 
          onLeftPressed={() => {getNavigator().pop()}}
          onRightPressed={() => {getNavigator().push({name: 'SearchItem',params: {type: this.state.type}})}}
        />
        <ScrollableTabView
          initialPage={initialPage}
          tabBarBackgroundColor ='#fff'
          tabBarUnderlineStyle={styles.line}
          tabBarInactiveTextColor='#666'
          tabBarActiveTextColor='#5CACEE'
          renderTabBar={() => <DefaultTabBar style={{height: 45}} tabStyle={{paddingBottom:0}} />}
        >
          <MovieListDetail tabLabel='院线热映' data={newMovieList} loadingStatus={newLoadingStatus}/>
          <MovieListDetail tabLabel='即将上映' data={comingMovieList} loadingStatus={comingLoadingStatus}/>
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  line:{
    height: 2,
    bottom: -1,
    backgroundColor:'#5CACEE'
  }
});
