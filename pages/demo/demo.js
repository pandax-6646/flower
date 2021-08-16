const {
  textareaProps
} = require("../../vant/field/props");

Page({

  data: {

  },




  getUserInfo(a) {

    wx.getUserProfile({



      // 获取用户信息时显示弹窗，但必须要说明获取用户信息用途
      desc: 'sdsdfsdf',
      success(res) {
        console.log(res);
        console.log(a)
      }
    })


  },


  onShow() {



  }
})