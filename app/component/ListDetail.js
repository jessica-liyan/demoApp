import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import BaseComponent from '../base/BaseComponent'
import {getFetch} from '../api/apiHelper'

export default class ListDetail extends BaseComponent {
  constructor (props) {
    super(props)
    console.log(this.props.id)
    this.state = {
      id: '',
      data: {
        id:1,
        title: '图书',
        image: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3001304778,4021565056&fm=96',
        author: 'liyan',
        price: '$120',
        rating: {
          average: 7.8
        },
        summary: '会议认为，今年以来，面对复杂多变的国内外形势，各地区各部门按照中央经济工作会议部署，坚持稳中求进工作总基调，贯彻落实新发展理念，以推进供给侧结构性改革为主线，有效推进各项工作，保持了经济发展稳中向好态势。上半年经济运行在合理区间，主要指标好于预期，城镇就业平稳增加，财政收入、'
      }
    }
    this.FetchData = this.FetchData.bind(this)
    this.getNavigationBarProps = this.getNavigationBarProps.bind(this)
    this.FetchData()
  }

  componentDidMount () {
    this.setState({
      id: this.props.id
    })
  }

  FetchData () {
    getFetch({
      path:  `book/${this.props.id}`,
      callback: (data) => {
        console.log(data)
        this.setState({
          data
        })
      }
    })
  }

  getNavigationBarProps() {
    const {data} = this.state
    return {
      leftButtonImage: require('../image/back.png'),
      rightButtonImage: require('../image/search.png'),
      navigationBar:{
        backgroundColor: 'rgba(0,0,0,0.8)'
      },
      title: `${data.title}`
    };
  }

  renderBody () {
    const {data} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{uri: data.image}} style={{width:200,height:200}} resizeMode='contain'/>
        </View>
        <View style={{padding:20}}>
          <View style={styles.main}>
            <View style={{flex:2}}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={data.subtitle? styles.subtitle: styles.hide}>{data.subtitle}</Text>
              <Text style={data.author? styles.mini: styles.hide}>作者:{data.author}</Text>
              <Text style={data.publisher? styles.mini: styles.hide}>出版社:{data.publisher}</Text>
              <Text style={data.pubdate ? styles.mini: styles.hide}>出版时间:{data.pubdate}</Text>
            </View>
            <View style={{flex:1,paddingLeft:20}}>
              <View style={styles.ratingContainer}>
                <Text style={{fontSize:12,color:'#999'}}>豆瓣评分：</Text>
                <Text style={styles.title}>{data.rating.average}</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop:20}}>
            <Text style={styles.mini}>简介：</Text>
            <Text style={styles.normal} numberOfLines={4} selectable>{data.summary}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column'
  },
  header: {
    height: 200,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hide: {
    display:'none'
  },
  main:{
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  ratingContainer: {
    width: 80,
    height: 80,
    backgroundColor:'#f0f0f0',
    borderRadius: 4,
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'#ccc',
    shadowColor:'green',
    shadowOffset: {w: 10, h: 10},
    shadowOpacity: 0.8,
    shadowRadius: 5
  },
  title:{
    fontSize: 20,
    color: '#333',
    paddingVertical: 5
  },
  subtitle:{
    fontSize: 16,
    color: '#666',
    paddingVertical: 5
  },
  normal: {
    fontSize: 14,
    color: '#666',
    lineHeight: 24
  },
  mini:{
    fontSize: 12,
    color: '#999'
  }
});
