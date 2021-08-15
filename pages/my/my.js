// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    token: '',
  },

  onShow(options) {
    let token = wx.getStorageSync('token');
    this.setData({
      token
    })
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        let {
          encryptedData,
          iv,
          userInfo
        } = res;
        this.login(encryptedData, iv, userInfo);
      },
      error: (error) => {
        console.log(error);
      }
    })
  },

  getLoginCode() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (result) => {
          resolve(result.code);
        },
        fail: (res) => {
          reject(res);
        }
      })
    })
  },

  // 登录后台服务器
  async login(iv, encryptedData, userInfo) {
    let code = await this.getLoginCode();
    let res = await app.$post('/user/wxlogin', {
      code,
      iv,
      encryptedData,
      userInfo
    })
    let token = res.result.token;
    this.setData({
      token
    })
    wx.setStorageSync('token', token)
  },

  logout() {
    wx.setStorageSync('token', '');
    this.setData({
      token: ''
    });
  }
})