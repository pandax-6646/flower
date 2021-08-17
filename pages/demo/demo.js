Page({
  data: {
    userInfo: {
      name: '',
      phone: '',
    },
  },


  onSelect(event) {
    console.log(event.detail);
  },


  showActions(e) {


    wx.login({
      success(res) {
        if (res.code) {
          console.log(e);
          console.log(e.detail.iv);
          console.log(e.detail.encryptedData);

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })



    // wx.getUserProfile({
    //   desc: '用于填写收货的信息',
    //   success: (res) => {
    //     console.log(res)
    //     // this.setData({
    //     // show: false,
    //     // [`actions.name`]: res.userInfo.nickName
    //     // })
    //   }
    // })


















  }
});