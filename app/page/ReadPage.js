import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import BaseComponent from '../base/BaseComponent'
import {getNavigator} from '../route';

export default class ReadPage extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {
      type: 'read',
      modalVisible: false
    }
  }

  getNavigationBarProps() {
    return {
      hideLeftButton: true,
      leftButtonImage: require('../image/back.png'),
      rightButtonImage: require('../image/search.png'),
      title: '阅读'
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderBody () {
    return (
      <View>
        <Text>read books</Text>
        <ActivityIndicator color={'red'}/>
        <TouchableHighlight onPress={() => {this.setModalVisible(true)}}>
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
        </Modal>
      </View>
    )
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
});
