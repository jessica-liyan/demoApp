import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import NavigationBar from './NavigationBar';
import {getNavigator} from '../route';

export default class BaseComponent extends Component {
  constructor (props) {
    super(props)
    this.renderNavigationBar = this.renderNavigationBar.bind(this)
    this.renderBody = this.renderBody.bind(this)
    this.onLeftPressed = this.onLeftPressed.bind(this)
    this.onRightPressed = this.onRightPressed.bind(this)
  }

  render () {
    return (
      <View style={[this.props.style]}>
        {this.renderNavigationBar()}
        {this.renderBody()}
      </View>
    )
  }

  // 子类可以重写
  getNavigationBarProps() {
    return null;
  }

  // 子类可以重写
  renderBody () {
    return null;
  }

  onLeftPressed() {
    getNavigator().pop();
  }

  onRightPressed() {
    console.log('onRightPressed');
  }
  
  renderNavigationBar () {
    let navigationBarProps = this.getNavigationBarProps()
    return (
      <NavigationBar 
        navigationBarProps={navigationBarProps}
        onLeftPressed={this.onLeftPressed}
        onRightPressed={this.onRightPressed}
      />
    )
  }
}