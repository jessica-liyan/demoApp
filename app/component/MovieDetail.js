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
import NavigationBar from '../base/NavigationBar'
import LoadingManage from './LoadingManage'
import {getNavigator} from '../route';
import {getFetch} from '../api/apiHelper'

// 电影分享功能  扫二维码  拍照功能  登录功能
// 向上移动的时候，改变title
// 超出隐藏功能  多行展开折叠功能
// 海报当成背景的样式
// 下拉刷新功能抽取  

const navigationBarProps = {
  title:'电影',
  leftButtonImage:require('../image/back.png'),
  rightButtonImage:require('../image/share.png'),
  navigationBar: {backgroundColor: 'rgba(0,0,0,0.8)'}
}

export default class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      data: null,
      photos: [],
      loadingStatus: 'loading',
      numberOfLines: 4,
      expandText: '...展开'
    }
    console.log(this.props.id)
    this.FetchMovieDetail = this.FetchMovieDetail.bind(this)
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

  onExpand () {
    if(this.state.expandText == '...展开'){
      this.setState({
        numberOfLines: null,
        expandText: '收起'
      })
    } else {
      this.setState({
        numberOfLines: 4,
        expandText: '...展开'
      })
    }
  }

  render () {
    const {data, loadingStatus, photos} = this.state;
    if(loadingStatus === 'success'){
      return (
        <View style={styles.app}>
          <NavigationBar 
            navigationBarProps={navigationBarProps} 
            onLeftPressed={() => {getNavigator().pop()}}
            onRightPressed={() => {getNavigator().push({name: 'SearchItem',params: {type: this.state.type}})}}
          />
          <ScrollView style={styles.main}>
            <View style={styles.header}>
              <Image source={{uri: data.images.large}} style={{width:140,height:200}} resizeMode="cover"/>
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.tips}>{data.year}/{data.genres.join('/')}</Text>
              <Text style={styles.tips}>上映时间：{data.title}({data.countries.join(',')})</Text>
              <Text style={styles.tips}>片长：{data.title}</Text>
              <Text style={[styles.tips, styles.subPad]}>简介</Text>
              <View style={{position:'relative'}}>
                <Text style={styles.normal} numberOfLines={this.state.numberOfLines}>{data.summary}</Text>
                <Text style={styles.expandText} onPress={this.onExpand.bind(this)}>{this.state.expandText}</Text>
              </View>
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
        </View>
      )
    } else {
      return <LoadingManage status={loadingStatus}/>
    }
  }
}

// footer是绝对定位，顶部header是固定的，中间的scrollview的高度？
// footer高度是60，header高度是50，中间的高度为什么是height- 80
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  main:{
    height: height - 50,
  },
  header:{
    height: 220,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content:{
    padding:15
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
    width: width - 30,
    fontSize: 14,
    color: '#666',
    lineHeight: 24
  },
  expandText:{
    fontSize: 14,
    color: '#5CACEE',
    backgroundColor: '#fff',
    position:'absolute',
    right:10,
    bottom:0
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
