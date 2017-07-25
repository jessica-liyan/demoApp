import React, {Component} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const defaultNavigationHeight = 50;
const defaultNavigationBgColor = '#5CACEE'
const defaultButtonHeight = defaultNavigationHeight - 30;
const defaultNavigationBarProps = {
  hideNav: false,
  hideLeftButton: false,
  hideRightButton: false
}
const styles = StyleSheet.create({
  navigationBar: {
    height: defaultNavigationHeight,
    flexDirection: 'row',
    backgroundColor: defaultNavigationBgColor,
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 15 : 0
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: defaultNavigationHeight,
    right: defaultNavigationHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    color: '#fff'
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: defaultNavigationHeight,
    height: defaultNavigationHeight,
    justifyContent: 'center',
    alignItems : 'center'
  },
  rightButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: defaultNavigationHeight,
    height: defaultNavigationHeight,
    justifyContent: 'center',
    alignItems : 'center'
  },
  image: {
    width: defaultButtonHeight,
    height: defaultButtonHeight
  },
  rightTxt: {
    fontSize: 14,
    color: '#fff',
    marginRight: 10
  }
})
/*
  默认参数 hideNav hideLeftButton  hideRightButton (navigationBarProps对象中)
  必填参数  leftButtonImage  rightButtonImage  rightButtonText  title (navigationBarProps对象中)
  方法参数  onLeftPressed  onRightPressed
*/
export default class NavigationBar extends Component {
  constructor (props) {
    super(props)
    this.navigationBarProps = Object.assign({}, defaultNavigationBarProps, props.navigationBarProps)
    this.renderLeftButton = this.renderLeftButton.bind(this);
    this.renderRightButton = this.renderRightButton.bind(this);
  }

  // 渲染左侧按钮
  renderLeftButton () {
    if (this.navigationBarProps.hideLeftButton) {
      return null;
    }
    const {onLeftPressed} = this.props
    return (
      <TouchableOpacity onPress={onLeftPressed} style={styles.leftButton}>
        <Image source={this.navigationBarProps.leftButtonImage} style={styles.image}/>
      </TouchableOpacity>
    )
  }

  // 渲染右侧按钮
  renderRightButton () {
    if (this.navigationBarProps.hideRightButton) {
      return null;
    }
    const {onRightPressed} = this.props
    if (this.navigationBarProps.rightButtonImage){
      return (
        <TouchableOpacity onPress={onRightPressed} style={styles.rightButton}>
          <Image source={this.navigationBarProps.rightButtonImage} style={styles.image}/>
        </TouchableOpacity>
      )
    } else if (this.navigationBarProps.rightButtonText) {
      return (
        <TouchableOpacity onPress={onRightPressed} style={styles.rightButton}>
          <Text style={styles.rightTxt}>{this.navigationBarProps.rightButtonText}</Text>
        </TouchableOpacity>
      )
    } else {
      return null
    }
  }

  render () {
    if (this.navigationBarProps.hideNav) {
      return null
    }
    return (
      <View style={[styles.navigationBar,this.navigationBarProps.navigationBar]}>
        {this.renderLeftButton()}
        {this.renderRightButton()}
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>{this.navigationBarProps.title}</Text>
        </View>
      </View>
    )
  }
}



