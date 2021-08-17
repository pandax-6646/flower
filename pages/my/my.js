import {
  userRequest
} from '../../api/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
  },

  onShow() {
    let token = wx.getStorageSync('token');
    if (token) {
      this.setData({
        token
      })
    }
  },


  // 用户登录
  login() {
    // 请求参数
    let params = {};

    Promise.all([this.getCode(), this.getUserInfo()]).then(res => {
      params.code = res[0].code;
      params.iv = res[1].iv;
      params.encryptedData = res[1].encryptedData;
      params.userInfo = res[1].userInfo;

      userRequest.wxLogin(params).then(res => {
        if (res.code == 666) {
          console.log(res.result)
          wx.setStorageSync("token", res.result.token)
          this.setData({
            token: res.result.token,
          })

          wx.showToast({
            title: '登录成功',
            duration: 1000
          });
        }

      }).catch(err => {
        wx.showToast({
          title: err,
          icon: 'error',
          duration: 1000
        });
      })
    })
  },

  // 获取微信的 code 信息
  getCode() {
    return new Promise((resolve, reject) => {
      wx.login({
        timeout: 10000,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },

  // 获取微信用户信息用于登录
  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({

        // 获取用户信息时显示弹窗，但必须要说明获取用户信息用途
        desc: '就不告诉你',
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        }
      })
    })
  },

  // 登出
  logout() {
    wx.showModal({
      title: '提示',
      content: '是否退出登录',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync({
            'token': '',
            'cartGoodsListAllNum': ""
          });

          this.setData({
            token: ''
          });
        } else {
          wx.showToast({
            title: '已取消',
            duration: 1000
          });
        }
      }
    })
  }
})