
import axios from 'axios'

/**/
function Http () {}

// token properties
Http.prototype.token = ''
Http.prototype.contentType = 'application/json;charset=utf-8'

/**
 * http get method
 */
Http.prototype.get = function (url, getdata, callback) {
  if (callback === null || callback === undefined) {
    callback = (r) => {}
  }
  if (getdata !== undefined && getdata !== null) {
    var params = Object.keys(getdata).map(function (key) { // same to qs.stringify(a)
      return encodeURIComponent(key) + '=' + encodeURIComponent(getdata[key])
    }).join('&')
    if (url === undefined) { // impossible
      url = '/api'
    }
    url += '?' + params
  }

  let getpara = {
    method: 'get',
    url: url,
    headers: {
      'Authorization': ' ' + this.token,
      'content-type': this.contentType
    }
  }

  axios(getpara)
    .then(response => {
      try {
        let res = response.data
        if (typeof response.data === 'string') {
          try {
            res = JSON.parse(response.data)
          } catch (e) {
          }
        }
        callback(res)
      } catch (e) {
        console.log('http-get callback failed', e)
      }
    }).catch(err => {
      console.log(err)
      let res = {
        code: 404
      }
      callback(res)
    })
}

/**
 * http post
 */
Http.prototype.post = function (url, data, callback) {
  if (callback === null || callback === undefined) {
    callback = (r) => {}
  }
  if (data === undefined || data === null) {
    data = {}
  }
  let postdata = data
  if (this.contentType.indexOf('application/json') < 0) {
    postdata = JSON.stringify(data)
  }

  let postpara = {
    method: 'post',
    url: url,
    data: postdata,
    headers: {
      'Authorization': ' ' + this.token,
      'content-type': this.contentType
    }
  }

  axios(postpara)
    .then(response => {
      try {
        let res = response.data
        if (typeof response.data === 'string') {
          try {
            res = JSON.parse(response.data)
          } catch (e) {
          }
        }
        callback(res)
      } catch (e) {
        console.log('http-post callback failed', e)
      }
    }).catch(err => {
      console.log(err)
      let res = {
        code: 404
      }
      callback(res)
    })
}

var http = new Http()

// http or https
// import http from 'thislib.js'
// Vue.prototype.$http = http
// this.$http.get("/login", {}, function (res) {
//      this.$http.token = res.token
// })

export default http
