/*
 * @Author: lyc 
 * @Date: 2017-11-03 18:02:50 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2017-12-01 11:14:53
 */
import axios from 'axios'
var utils = {
	/**
	 * [封装get和post请求函数]
	 * @url 请求地址
	 * @params 请求的参数
	 * @success 请求回调
	 * @error 请求失败回调
	 */
    
    httpGet: (url, params) => {
        return new Promise((resolve, reject) => {
            axios.get(url, { params: params })
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    },
    httpPost: (url, params) => {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    },

    API: process.env.API_URL,
    URL_WEBSITE: process.env.URL_WEBSITE,

}
export default utils