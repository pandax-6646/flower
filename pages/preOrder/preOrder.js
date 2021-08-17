import {
  preOrderRequest
} from '../../api/index.js'

const chooseLocation = requirePlugin('chooseLocation'); // 导入插件

Page({
  data: {
    preOrderId: '0a2c3d00fe8c11ebba568d675e0e6495',

    address: '',
    latitude: '',
    longitude: ''
  },

  onLoad: function (options) {
    // this.setData({
    //   preOrderId: options.preOrderId
    // });
  },


  //  生命周期函数--监听页面显示
  onShow: function () {


    this.getCurrAddress();

  },

  //  获取用户地址信息
  getAddress() {
    const key = 'TMBBZ-5GYCP-AFQDK-L2QCS-K3323-HFBAX'; //使用在腾讯位置服务申请的key
    const referer = '花间小程序'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: this.data.latitude,
      longitude: this.data.longitude
    });
    const category = '生活服务,娱乐休闲';
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
    });
  },



  // 获取预订单信息
  getPreOrderDetailInfo() {
    let params = {
      preOrderId: this.data.preOrderId
    }
    preOrderRequest.getPreOrderDetail(params).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err)
    })
  },



  // 获取用户当前位置的信息
  getCurrAddress() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })

    // 选址结束后, 点击确认返回本页面, 下面的代码就能获取选中的地址信息
    const location = chooseLocation.getLocation();
    this.setData({
      address: location ? location.name : '收货地址'
    })
  }
})