import store from 'react-native-simple-store';

const baseUrl = 'https://api.douban.com/v2/'

// path是相对路径 params参数对象，callback回调函数 
const getFetch = ({path, params, callback} = {}) => {
  let url = `${baseUrl}${path}`
  fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(res => res.json()).then(
    callback
  )
}


export default getFetch

