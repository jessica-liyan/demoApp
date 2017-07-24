import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text
} from 'react-native';

export default class EmptyPage extends Component {
  constructor (props) {
    super(props)
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image source={require('../image/back.png')} style={{width:30,height:30}}/>
          <Text style={{fontSize:14,color:'#fff',paddingTop:5}}>正在加载中</Text>
        </View>
      </View>
    )
  }
}

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex:1,
    height:height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    width: 100,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
