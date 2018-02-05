/*
 * @Author: lyc 
 * @Date: 2017-11-03 18:02:50 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-01-31 11:14:26
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
    /* 时间格式化 */
    formatDate: (date) => {
        if(!date instanceof Date){
            date = new Date(date)
        }
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return [year, month, day].map(utils.formatNumber).join('-');
    },
    formatNumber: (n) => {
        n = n.toString();
        return n[1] ? n : '0' + n
    }

}
export default utils