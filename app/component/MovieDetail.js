import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import BaseComponent from '../base/BaseComponent'
import LoadingManage from './LoadingManage'
import {getNavigator} from '../route';
import {getFetch} from '../api/apiHelper'

// 电影分享功能
// 向上移动的时候，改变title
// 海报当成背景的样式
// 正在上映和即将上映的标签页
// 下拉刷新功能抽取
export default class MovieDetail extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      data: null,
      photos: [],
      loadingStatus: 'loading'
    }
    console.log(this.props.id)
    this.FetchMovieDetail = this.FetchMovieDetail.bind(this)
    this.getNavigationBarProps = this.getNavigationBarProps.bind(this)
  }

  componentDidMount () {
    this.FetchMovieDetail(this.props.id)
  }

  FetchMovieDetail (id) {
    getFetch({
      path:  `movie/subject/${id}`,
      callback: (data) => {
        console.log(data,data.id)
        this.setState({
          data: data,
          loadingStatus: 'success'
        })
      }
    })
    // 剧照photos，影评列表reviews，需要权限
    getFetch({
      path:  `movie/subject/${id}/photos`,
      callback: (res) => {
        this.setState({
          photos: res
        })
      }
    })
  }

  getNavigationBarProps() {
    return {
      leftButtonImage: require('../image/back.png'),
      rightButtonImage: require('../image/search.png'),
      navigationBar:{
        backgroundColor: 'rgba(0,0,0,0.8)'
      },
      title: '电影'
    };
  }

  renderBody () {
    const {data, loadingStatus, photos} = this.state;
    if(loadingStatus === 'success'){
      return (
        <ScrollView style={styles.scrollHeight}>
          <View style={styles.header}>
            <Image source={{uri: data.images.large}} style={{width:140,height:200}} resizeMode="cover"/>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.tips}>{data.year}/{data.genres.join('/')}</Text>
            <Text style={styles.tips}>上映时间：{data.title}({data.countries.join(',')})</Text>
            <Text style={styles.tips}>片长：{data.title}</Text>
            <Text style={[styles.tips, styles.subPad]}>简介</Text>
            <Text style={styles.normal} numberOfLines={4} selectable>{data.summary}</Text>
            <Text style={[styles.tips, styles.subPad]}>影人</Text>
            <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
              {
                data.casts.map((item, index) => {
                  return (
                    <TouchableOpacity key={index}>
                      <Image source={{uri: item.avatars.large}} style={{width:120,height:160}} resizeMode="contain"/>
                      <Text style={styles.txt}>{item.name}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
        </ScrollView>
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

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  scrollHeight:{
    height: height - 50,
  },
  header:{
    height: 220,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content:{
    padding:20
  },
  title:{
    fontSize: 20,
    color: '#333',
    paddingVertical: 10
  },
  tips:{
    fontSize: 14,
    color: '#999'
  },
  subPad:{
    paddingTop:20,
    paddingBottom:10,
  },
  normal:{
    fontSize: 14,
    color: '#666',
    lineHeight: 24
  },
  scrollContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10
  },
  txt:{
    fontSize: 14,
    color: '#333',
    paddingVertical: 5,
    paddingLeft: 5
  }
});
