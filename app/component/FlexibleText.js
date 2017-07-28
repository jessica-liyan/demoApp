import React, {Component,  PropTypes} from 'react'; 
import {
  StyleSheet,
  View,
  Text,
  Animated
} from 'react-native'; 

export default class FlexibleText extends Component {
  static propTypes = {  
    style: Text.propTypes.style,  
    expandTextStyle:Text.propTypes.style,  
    numberOfLines: PropTypes.number  
  } 
  
  constructor(props){
    super(props)
    this.state = {
      expanded: true, // 文字是否展开
      expandText: '展开', // 展开文字
      numberofLines: null,
      animation: new Animated.Value(), // 动画
      showExpandText:true,
      animation: new Animated.Value()
    }
    this.numberOfLines = props.numberOfLines
    this.measureFlag = true
    this.needExpand = true
  }

  onPress(){
    if(!this.state.expanded){
      this.setState({
        numberofLines: null,
        expandText: '收起',
        expanded: true
      })
    } else {
      this.setState({
        numberofLines: this.numberOfLines,
        expandText: '展开',
        expanded: false
      })
    }
  }

  onTextLayout (event) {
    console.log(event)
    if(this.state.expanded){
      this.setState({ // 展开的话是最大高度
        maxHeight : event.nativeEvent.layout.height 
      });
    } else {
      this.setState({ // 未展开的话是最小高度
        minHeight : event.nativeEvent.layout.height 
      });
    }
    let initialValue = this.state.minHeight,
        finalValue = this.state.maxHeight
    this.setState({ 
      expanded : !this.state.expanded
    }); 
    this.state.animation.setValue(initialValue); //Step 3 
    Animated.spring( //Step 4 
      this.state.animation, 
      { 
        toValue: finalValue 
      } 
    ).start(); //Step 5
  }

  _onTextLayout(event){  
    if(this.measureFlag){  
      if(this.state.expanded){  
        this.maxHeight = event.nativeEvent.layout.height; 
        console.log(this.maxHeight) //68
        this.setState({expanded:false,numberOfLines:this.numberOfLines});  
      }else{  
        this.mixHeight = event.nativeEvent.layout.height;  
        console.log(this.mixHeight) //34
        if(this.mixHeight == this.maxHeight){  
          this.needExpand = false;  
        }else{  
          this.needExpand = true;  
          this.setState({showExpandText:true})
          this.state.animation.setValue(this.mixHeight); //Step 3 
          Animated.spring( //Step 4 
            this.state.animation, 
            { 
              toValue: this.maxHeight
            } 
          ).start(); //Step 5
        }  
        this.measureFlag = false;  
      }  
    } 
  }  

  render(){
    return (
      <View
        style={[styles.container, this.props.textStyle, {height:this.state.animation}]}
      >
        <Text numberOfLines={this.state.numberOfLines} onLayout={this._onTextLayout.bind(this)}>{this.props.content}</Text>
        <Text style={[styles.expandTextStyle,this.props.expandTextStyle]} onPress={this.onPress.bind(this)}>
          {this.state.expandText}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    position:'relative'
  },
  expandTextStyle: {
    fontSize: 14,
    color: '#5CACEE',
    position:'absolute',
    right:0,
    bottom:0
  }
});
