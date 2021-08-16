import {
  preOrderRequest
} from '../../api/index.js'
Page({
  data: {
    preOrderId: 'c345f100fe7d11ebba568d675e0e6495'
  },

  onLoad: function (options) {
    this.setData({
      preOrderId: options.preOrderId
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let params = {
      preOrderId: this.data.preOrderId
    }
    preOrderRequest.getPreOrderDetail(params).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err)
    })
  },
})