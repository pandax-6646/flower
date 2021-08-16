// pages/preOrder/preOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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