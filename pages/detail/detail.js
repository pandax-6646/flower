import {
  homeRequest,
  cartRequest
} from '../../api/index.js'

Page({
  data: {
    flowerId: "",
    goodsInfo: {},

    // 购物车里的商品总件数
    cartGoodsListAllNum: 0
  },

  // 页面开始加载时执行
  onLoad(options) {
    this.setData({
      flowerId: options.flowerId
    })
  },


  onShow() {
    // 初始化购物车里的商品总件数
    let num = wx.getStorageSync('cartGoodsListAllNum');
    if (!num) {
      wx.setStorage({
        key: "cartGoodsListAllNum",
        data: this.data.cartGoodsListAllNum,
      })
    } else {
      this.setData({
        cartGoodsListAllNum: num
      })
    }

    // 加载中弹窗
    wx.showLoading({
      title: '加载中',
    });
    this.getGoodsDetailData();
  },


  // 请求商品详情
  getGoodsDetailData() {
    homeRequest.getGoodsDetail({
      flowerId: this.data.flowerId
    }).then(res => {

      if (res.code == 666) {
        wx.hideLoading();
        this.setData({
          goodsInfo: res.flower
        });
      }
    }).catch(err => {
      console.log(err);
    })
  },


  // 添加商品到购物车
  addCart() {
    cartRequest.addCartList({
      flowerId: this.data.flowerId
    }).then(res => {
      if (res.code == 666) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1000
        });





        // 更新购物车里的商品总件数
        this.setData({
          cartGoodsListAllNum: this.data.cartGoodsListAllNum - 0 + 1
        })

        // 更新 Storage 的数据
        wx.setStorage({
          key: "cartGoodsListAllNum",
          data: this.data.cartGoodsListAllNum,
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }
})