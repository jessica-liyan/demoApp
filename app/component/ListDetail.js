import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class ReadPage extends BaseComponent {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.setState({
      id: this.props.id
    })
  }

  renderBody () {
    return (
      <View style={styles.container}>
        <Text>{this.state.id}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
