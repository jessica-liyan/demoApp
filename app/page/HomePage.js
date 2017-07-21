import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';
import ListItem from '../component/ListItem'

export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bookList: []
    }
    this.fetchData()
  }

  fetchData () {
    var bookPromise = fetch('https://api.douban.com/v2/book/search', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: 'java',
        count: 15
      })
    }).then(res => res.json()).then(res => {
      this.setState({
        bookList: res.books
      })
    })
  }

  render() {
    return (
      <FlatList
        style={styles.section}
        data={this.state.bookList}
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
  }
});
