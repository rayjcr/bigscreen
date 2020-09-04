/* eslint-disable */
import fetch from '@/utils/fetch'
import {hex_md5} from '@/utils/md5';

const apiName = '/rat/EventHandle'
// const apiName = '/rat/EventHandle'


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 * http://i.yd-jxt.com/v2/rat/EventHandle?
 * 'http://192.168.0.3:8888/Rat/EventHandle?'
 */




export function axGet(_cmd, _param,) {
  return fetch({
    url: apiName,
    method: 'get',
    params: {
      json: JSON.stringify(urlFun(_cmd, _param)),
    }
  })
}
export function axPost(_cmd, _param) {
  return fetch({
    url: apiName,
    method: 'post',
    data: {
      json: JSON.stringify(urlFun(_cmd,_param)),
    },
    transformRequest: [function (data) {
      let ret = ''
      for(let it in data){
          ret += encodeURIComponent(it) + '=' +encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
} 
/* json function */
export function urlFun (_cmd,_param) {
  var _time = new Date().getTime() + ''
  var _uuid = guid()
  var _noce = noce()
  var _key  = 'HTXFV-FH8YX-VCY69-JJGBK-7R6XP'
  var _appJson={
      "AppId":1,
      "Cmd":_cmd,
      "Ver":"1.0.0",
      "UnixTime":_time,
      "SessionId": _uuid,
      "Noce":_noce,
      "AppKey":_key,
      "SKey":md5('1',_cmd,_time,_noce,_key,_uuid),
      "JsonParts":_param,
  }
  return _appJson
}

function md5 (appid,cmd,unixTime,noce,key,sessionId) {
  return  hex_md5("Company=hzty&Ver=1.0.0&Methord=MD5&AppID=" + appid + "&Cmd=" + cmd + "&UnixTime=" + unixTime + "&Noce=" + noce + "&AppKey=" + key + "&SessionId=" + sessionId)
}
function guid () {
  function S4 () {
      return (((1+Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())
}
function noce () {
  return parseInt(Math.random() * 100)
}
