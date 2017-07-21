import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {getNavigator} from '../route';

export default class SearchItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      type: ''
    }
  }

  componentDidMount () {
    this.setState({
      type: this.props.type
    })
    this.checkType = this.checkType.bind(this)
  }

  fetchItem (text) {
    this.setState({
      text: text
    })
  }

  checkType () {
    switch (this.props.type) {
      case 'read': 
        return '搜索图书';
      case 'music': 
        return '搜索音乐';
      case 'movie': 
        return '搜索电影';
    }
  }

  render() {
    const {title} = this.props;
    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.input}
          inlineImageLeft="ic_menu_black_24dp"
          placeholder={this.checkType()}
          placeholderTextColor={'#999'}
          selectionColor={'#5CACEE'}
          autoFocus={true}
          onChangeText={(text) => this.setState({text: text})}
        />
        <TouchableOpacity style={styles.cancel}>
          <Text onPress={this.cancel} style={styles.cancelText}>取消</Text>
        </TouchableOpacity>
      </View>
    )
  }

  cancel () {
    getNavigator().pop();
  }
}

const windowWidth = Dimensions.get('window').width;
const inputWidth = windowWidth - 50
const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    position: 'relative'
  },
  input: {
    width: inputWidth,
    height: 50,
    borderWidth: 0,
  },
  cancel: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelText: {
    fontSize: 16,
    color: '#999'
  }
});
