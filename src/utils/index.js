/*
 * @Author: lyc 
 * @Date: 2017-11-03 18:02:50 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-01-10 11:07:59
 */
import axios from 'axios'
import route from '../router'
var utils = {
	/**
	 * [封装get和post请求函数]
	 * @url 请求地址
	 * @params 请求的参数
	 * @success 请求回调
	 * @error 请求失败回调
	 */
    httpGet: (url, params) => {
        return axios.get(url, { params: params })
            .then(res => {
                if (res.data.code == 1000) {
                    route.push({ name: 'login' });
                    let err = new Error('登录超时');
                    throw err;
                } else {
                    return res;
                }
            }).catch(err => {
                console.log(err);
            });
    },
    httpPost: (url, params) => {
        return axios.post(url, params)
            .then(res => {
                if (res.data.code == 1000) {
                    route.push({ name: 'login' });
                    let err = new Error('登录超时');
                    throw err;
                } else {
                    return res;
                }
            }).catch(err => {
                console.log(err);
            });
    },

    API: process.env.API_URL,
    URL_WEBSITE: process.env.URL_WEBSITE,

}
export default utils