import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import BaseComponent from '../base/BaseComponent'
import {getNavigator} from '../route';
import {getFetch, postFetch} from '../api/apiHelper'
import LoadingManage from './LoadingManage'

export default class MovieListDetail extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {
      type: 'movie',
      city: '武汉',
      movieList: [],
      loadingStatus: 'loading'
    }
    this.FetchMovieList = this.FetchMovieList.bind(this)
  }

  componentDidMount () {
    this.FetchMovieList(this.props.tabLabel)
  }

  FetchMovieList (tabLabel) {
    switch (tabLabel) {
      case '院线热映':
        return postFetch({
          path: 'movie/in_theaters',
          params: {
            city: this.state.city
          },
          callback: res => {
            console.log(res.subjects)
            this.setState({
              movieList: res.subjects,
              loadingStatus: 'success'
            })
          }
        })
      case '即将上映':
        return postFetch({
          path: 'movie/coming_soon',
          callback: res => {
            console.log(res.subjects)
            this.setState({
              movieList: res.subjects,
              loadingStatus: 'success'
            })
          }
        })
    }
  }

  getNavigationBarProps() {
    return {
      hideNav:true,
      leftButtonImage: require('../image/back.png'),
      rightButtonImage: require('../image/share.png'),
      title: '电影'
    };
  }

  getName (arr) {
    let str = ''
    for(let item of arr){
      str += item.name + '/'
    }
    return str
  }

  renderBody () {
    const {movieList, loadingStatus} =  this.state
    if(loadingStatus === 'success'){
      return (
        <FlatList
          data={movieList}
          extraData={this.state}
          renderItem={({item, index}) => (
            <TouchableOpacity key={index} style={styles.row} onPress={() => getNavigator().push({name: 'MovieDetail',params: {id: item.id}})}>
              <Image source={{uri: item.images.large}} style={{width:80,height:100}} resizeMode="cover"/>
              <View style={styles.txtWrap}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.tips}>导演：{this.getName(item.directors)}</Text>
                <Text style={styles.tips}>主演：{this.getName(item.casts)}</Text>
                <Text style={styles.tips}>{item.collect_count}人看过</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )
    } else {
      return <LoadingManage status={loadingStatus}/>
    }
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
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ededed',
    borderStyle: 'solid',
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  txtWrap:{
    paddingLeft: 20
  },
  title:{
    fontSize: 16,
    color: '#333',
    paddingBottom: 10
  },
  tips:{
    fontSize: 12,
    color: '#999'
  },
});
