import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList
} from 'react-native';
import ListItem from '../component/ListItem'
import EmptyPage from './EmptyPage'
import store from 'react-native-simple-store'
import {postFetch} from '../api/apiHelper'

export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      bookList: [{
        id:1,
        title: '这是一个测试',
        image: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3001304778,4021565056&fm=96',
        author: 'liyan',
        price: '$120'
      }],
      refreshing: true,
      hasMore: false
    }
    this.fetchData()
    this.onEndReached = this.onEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
  }

  // 首页数据加载
  fetchData () {
    postFetch({
      path: 'book/search',
      params: {
        q: '异形',
        count: 10
      },
      callback: (res) => {
        this.setState({
          bookList: res.books,
          refreshing: false,
          hasMore: res.books.length !== 0
        })
      }
    })
  }

  // 触底加载下一页数据
  onEndReached(){
    console.log('到底了',`当前是第${this.state.index}页`)
    const count = 15;
    const start = (this.state.index + 1)*count;
    postFetch({
      path: 'book/search',
      params: {
        q: '异形',
        count: count,
        start: start
      },
      callback: (res) => {
        console.log('到底了',this.state.bookList,res.books)
        let bookList = this.state.bookList.concat(res.books)
        this.setState({
          index: this.state.index + 1,
          bookList: bookList,
          hasMore: res.books.length !== 0
        })
      }
    })
  }

  // 顶部下拉刷新。如果设置onRefresh，则会在列表头部添加一个标准的RefreshControl控件，以便实现“下拉刷新”的功能。
  onRefresh(){
  }

  // 顶部状态栏和底部状态栏
  renderFooter(){
    if(this.state.refreshing){
      return null
    }
    if(this.state.hasMore){
      return (
        <View style={styles.loading}>
          <ActivityIndicator color={'#5CACEE'} size={30} animating={true}/>
          <Text style={styles.loadingTxt}>加载中...</Text>
        </View>
      )
    } else {
      return <Text style={styles.loadingTxt}>没有更多数据了</Text>
    }
  }

  render() {
    return (
      <FlatList
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        OnEndReachedThreshold={0.1}
        ListFooterComponent={this.renderFooter}
        data={this.state.bookList}
        extraData={this.state}
        renderItem={({item}) => (
          <ListItem data={item}/>
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  txt: {
    fontSize: 16,
    color: '#fff'
  },
  loading: {
    flexDirection:'row',
    paddingVertical:10,
    justifyContent:'center',
    alignItems:'center'
  },
  loadingTxt:{
    fontSize: 14,
    color: '#666',
    paddingLeft:10
  }
});
