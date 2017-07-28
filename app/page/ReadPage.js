import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ActivityIndicator,
  TouchableHighlight,
  ScrollView,
  Dimensions
} from 'react-native';
import NavigationBar from '../base/NavigationBar'
import {getNavigator} from '../route';

const navigationBarProps = {
  title:'阅读',
  leftButtonImage:require('../image/back.png'),
  rightButtonImage:require('../image/search.png')
}

export default class ReadPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'read',
      modalVisible: false
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render () {
    return (
      <View style={styles.app}>
        <NavigationBar 
          navigationBarProps={navigationBarProps} 
          onLeftPressed={() => {getNavigator().pop()}}
          onRightPressed={() => {getNavigator().push({name: 'SearchItem',params: {type: this.state.type}})}}
        />
        <ScrollView contentContainerStyle={styles.main}>
          <Text style={styles.info}>这是一个测试文段</Text>
          <Text style={styles.info}>这是一个测试文段</Text>
          {/* <TouchableHighlight onPress={() => {this.setModalVisible(true)}}>
            <Text>Show Modal</Text>
          </TouchableHighlight>
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
            <View style={{flex:1,alignItems:'center',justifyContent: 'center',backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
              <View style={{width:200,height:200,backgroundColor:'#fff',padding:20,borderRadius:8}}>
                <Text>Hello World!</Text>
                <TouchableHighlight onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal> */}
        </ScrollView>
      </View>
    )
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  app:{
  },
  main:{
    height: height - 50,
    paddingBottom:60
  },
  info:{
    backgroundColor:'#ccc',
    lineHeight:500,
  }
});
