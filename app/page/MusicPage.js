import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import NavigationBar from '../base/NavigationBar'
import {getNavigator} from '../route';
import MovieListDetail from '../component/MovieListDetail'
import FlexibleText from '../component/FlexibleText'
import ScrollableTabView, {ScrollableTabBar,DefaultTabBar} from 'react-native-scrollable-tab-view';

const navigationBarProps = {
  hideLeftButton:true,
  title:'音乐',
  leftButtonImage:require('../image/back.png'),
  rightButtonImage:require('../image/search.png')
}

export default class ReadPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'music',
      test: false
    }
    this.state.initial = this.state.test == true ? 0 : 1
    this.state.numberOfLines = 2
    this.state.expandText = '展开'
  }

  onChange () {
    if(this.state.expandText == '展开'){
      this.setState({
        numberOfLines: null,
        expandText: '收起'
      })
    } else {
      this.setState({
        numberOfLines: 2,
        expandText: '展开'
      })
    }
  }

  render () {
    const {initial} = this.state
    return (
      <View style={styles.container}>
        <NavigationBar 
          navigationBarProps={navigationBarProps}
          onLeftPressed={() => {getNavigator().pop()}}
          onRightPressed={() => {getNavigator().push({name: 'SearchItem',params: {type: this.state.type}})}}
        />
        <Text numberOfLines={1}>这是一个测试单行省略号的文段这是一个测试单行省略号的文段这是一个测试单行省略号的文段</Text>
        <Text numberOfLines={2}>这是一个测试单行省略号的文段这是一个测试单行省略号的文段这是一个测试单行省略号的文段这是一个测试单行省略号的文段这是一个测试单行省略号的文段这是一个测试单行省略号的文段</Text>
        <Text numberOfLines={this.state.numberOfLines}>本文档为需要快速了解豆瓣API的用户提供一个概览本文档为需要快速了解豆瓣API的用户提供一个概览本文档为需要快速了解豆瓣API的用户提供一个概览本文档为需要快速了解豆瓣API的用户提供一个概览本文档为需要快速了解豆瓣API的用户提供一个概览本文档为需要快速了解豆瓣API的用户提供一个概览,更为完整的豆瓣API信息请参阅《豆瓣API参考手册》。如果你编写了一个有趣的API应用,欢迎发布到API小组让更多豆友</Text>
        <Text onPress={this.onChange.bind(this)}>{this.state.expandText}</Text>
        <ScrollableTabView
          initialPage={initial}
          tabBarBackgroundColor ='#fff'
          tabBarUnderlineStyle={styles.line}
          tabBarInactiveTextColor='#666'
          tabBarActiveTextColor='#5CACEE'
          renderTabBar={() => <DefaultTabBar style={{height: 40}}/>}
        >
          <Text tabLabel='Tab1'/>
          <Text tabLabel='Tab2'/>
          <Text tabLabel='Tab3'/>
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
