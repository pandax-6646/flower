import {
  preOrderRequest,
  orderRequest
} from '../../api/index.js'

// const chooseLocation = requirePlugin('chooseLocation'); // 导入插件

Page({
  data: {
    preOrderId: '0a2c3d00fe8c11ebba568d675e0e6495',

    address: '',
    latitude: '',
    longitude: '',

    // 控制底部收货运动面板
    show: false,
    userInfo: [{
      name: '熊**',
      phone: '187****4724',
    }],
    title: '收货手机和姓名'
  },

  onLoad: function (options) {
    // this.setData({
    //   preOrderId: options.preOrderId
    // });
  },


  //  生命周期函数--监听页面显示
  onShow: function () {


    // this.getCurrAddress();

  },

  //  获取用户地址信息
  getAddress() {
    const key = 'XBZBZ-OBG63-LOD3N-3QR5Q-X6Z2Q-BFBIR'; //使用在腾讯位置服务申请的key
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

  // 显示底部收货运动面板
  showSheet() {
    this.setData({
      show: true
    })
  },

  // 关闭底部收货运动面板
  onClose() {
    this.setData({
      show: false
    })
  },

  // 选中的收货运动面板
  onSelect(event) {
    this.setData({
      show: false,
      title: this.data.userInfo[0].name
    })
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
  },





  // 支付按钮
  pay() {
    orderRequest.createOrder().then(res => {

      let obj = res.result;
      wx.requestPayment({
        // 时间戳
        timeStamp: obj.timeStamp,
        // 随机字符串
        nonceStr: obj.nonceStr,
        // 统一下单接口返回的 prepay_id 参数值
        package: obj.package,
        // 签名类型
        signType: obj.signType,
        // 签名
        paySign: obj.paySign,

        total_fee: obj.total_fee,
        // 支付成功的回调
        success(res) {
          console.log(res);
        },
        // 支付失败的回调
        fail(err) {
          console.log(err,'sdsdsdsdsddsd');
        },
      });




    })

  }



  // ,
  // "plugins": {
  //   "chooseLocation": {
  //     "version": "1.0.5",
  //     "provider": "wx1a4e63fdc266444b"
  //   }
  // },
  // "permission": {
  //   "scope.userLocation": {
  //     "desc": "你的位置信息将用于小程序定位"
  //   }
  // },
  // "sitemapLocation": "sitemap.json"
})