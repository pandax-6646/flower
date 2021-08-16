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
    let params = {}

    Promise.all([this.getCode(), this.getUserInfo()]).then(res => {
      params.code = res[0].code;
      params.iv = res[1].iv;
      params.encryptedData = res[1].encryptedData;
      params.userInfo = res[1].userInfo;


      userRequest.wxLogin(params).then(res => {
        wx.setStorageSync({
          key: "token",
          data: res.result.token,
        })
        this.setData({
          token: res.result.token,
        })


      }).catch(err => {
        wx.showToast({
          title: "请先绑定开发者",
          icon: 'error ',
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
  }


})










































// // index.js
// // 获取应用实例
// const app = getApp();

// Page({
//   data: {
//     token: '',
//   },

//   onShow(options) {
//     let token = wx.getStorageSync('token');
//     this.setData({
//       token
//     })
//   },
//   getUserProfile(e) {
//     wx.getUserProfile({
//       desc: '展示用户信息',
//       success: (res) => {
//         let {
//           encryptedData,
//           iv,
//           userInfo
//         } = res;
//         this.login(encryptedData, iv, userInfo);
//       },
//       error: (error) => {
//         console.log(error);
//       }
//     })
//   },

//   getLoginCode() {
//     return new Promise((resolve, reject) => {
//       wx.login({
//         success: (result) => {
//           resolve(result.code);
//         },
//         fail: (res) => {
//           reject(res);
//         }
//       })
//     })
//   },

//   // 登录后台服务器
//   async login(iv, encryptedData, userInfo) {
//     let code = await this.getLoginCode();
//     let res = await app.$post('/user/wxlogin', {
//       code,
//       iv,
//       encryptedData,
//       userInfo
//     })
//     let token = res.result.token;
//     this.setData({
//       token
//     })
//     wx.setStorageSync('token', token)
//   },

//   logout() {
//     wx.setStorageSync('token', '');
//     this.setData({
//       token: ''
//     });
//   }
// })