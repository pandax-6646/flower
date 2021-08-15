import {
  baseUrl
} from "../utils/config.js";

/**
 * 封装请求
 * url：请求地址
 * data：请求参数
 * method: 请求类型
 */
 const request = (url, data, method) => {
  // 获取token,登录时存的
  let token = wx.getStorageSync("token");
  url = baseUrl + url;
  return new Promise((resolve, reject) => {
    // 请求
    wx.request({
      url,
      method,
      data,
      header: {
        "user-token": token
      },
      success: res => {
        if (res.data.code == 666) {
          resolve(res.data);
        } else if (res.data.code == 603) {
          wx.showModal({
            title: "提示",
            content: "登录已过期，是否重新登录",
            success(res) {
              if (res.confirm) {
                // 跳转到个人中心页面
                wx.switchTab({
                  url: "/pages/my/my"
                });
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            }
          });
        } else {
          reject(res.data.msg);
        }
      },
      fail: err => {
        console.log(err);
        reject("网络异常");
      }
    });
  });
};

const get = (url, data) => {
  return request(url, data, "get");
};

const post = (url, data) => {
  return request(url, data, "post");
};

export default {
  get,
  post
};