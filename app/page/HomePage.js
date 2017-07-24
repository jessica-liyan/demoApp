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
import getFetch from '../api/apiHelper'

/*从缓存获取数据   从网络获取数据
  行点击后的透明度的变化
  下拉更新，上拉加载
  点击行，进入详情页，当前数据存在缓存中？将id存储在缓存中 
  详情页通过路径获得数据  /book/detail/${id}
*/

export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      bookList: [],
      refreshing: true,
      hasMore: false
    }
    this.fetchData()
    this.onEndReached = this.onEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
  }

  // 首页数据加载
  fetchData () {
    getFetch({
      path: 'book/search',
      params: {
        q: 'java',
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

  // 触底加载下一页数据，如何显示正在加载中
  onEndReached(){
    console.log('到底了',`当前是第${this.state.index}页`)
    const count = 5;
    const start = (this.state.index + 1)*count;
    getFetch({
      path: 'book/search',
      params: {
        q: 'java',
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
        style={styles.section}
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
  container: {
    height: 50,
    backgroundColor: '#DD4C35',
    flexDirection: 'row',
  },
  touchableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
