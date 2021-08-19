import { preOrderRequest, orderRequest } from "../../api/index.js";

// const chooseLocation = requirePlugin('chooseLocation'); // 导入插件

Page({
  data: {
    preOrderId: "",

    address: "收货地址",
    latitude: "",
    longitude: "",

    // 控制底部收货运动面板
    show: false,
    userInfo: [
      {
        name: "熊**",
        phone: "187****4724",
      },
    ],
    title: "收货手机和姓名",

    goodsList: [],
    allPrice: 0,
  },

  onLoad: function (options) {
    this.setData({
      preOrderId: options.preOrderId,
    });
  },

  //  生命周期函数--监听页面显示
  onShow: function () {
    // this.getCurrAddress();
    this.getPreOrderDetailInfo();
  },

  //  获取用户地址信息
  getAddress() {
    const key = "TMBBZ-5GYCP-AFQDK-L2QCS-K3323-HFBAX"; //使用在腾讯位置服务申请的key
    const referer = "花间小程序"; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
    });
    const category = "生活服务,娱乐休闲";
    wx.navigateTo({
      url:
        "plugin://chooseLocation/index?key=" +
        key +
        "&referer=" +
        referer +
        "&location=" +
        location +
        "&category=" +
        category,
    });
  },

  // 显示底部收货运动面板
  showSheet() {
    this.setData({
      show: true,
      title: this.data.userInfo.name,
    });
  },

  // 关闭底部收货运动面板
  onClose() {
    this.setData({
      show: false,
    });
  },

  // 选中的收货运动面板
  onSelect(event) {
    this.setData({
      show: false,
      title: this.data.userInfo[0].name,
    });
  },

  // 获取预订单信息
  getPreOrderDetailInfo() {
    let params = {
      preOrderId: this.data.preOrderId,
    };
    preOrderRequest
      .getPreOrderDetail(params)
      .then((res) => {
        if (res.code == 666) {
          this.setData({
            goodsList: res.result.carts,
            allPrice: res.result.totalPrice * 100,
          });
        }
      })
      .catch((err) => {
        wx.showToast({
          title: "请求失败",
          icon: "error",
          duration: 1000,
        });
      });
  },

  // 获取用户当前位置的信息
  getCurrAddress() {
    wx.getLocation({
      type: "wgs84",
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        });
      },
    });

    // 选址结束后, 点击确认返回本页面, 下面的代码就能获取选中的地址信息
    const location = chooseLocation.getLocation();
    this.setData({
      address: location && location.name,
    });
  },

  // 支付按钮
  pay() {
    orderRequest.createOrder().then((res) => {
      // 不能用解构赋值
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
          wx.showToast({
            title: "支付成功",
            icon: "success",
            duration: 1000,
          });
        },
        // 支付失败的回调
        fail(err) {
          wx.showToast({
            title: "支付失败",
            icon: "error",
            duration: 1000,
          });
          wx.switchTab({
            url: "/pages/cart/cart",
          });
        },
      });
    });
  },
});
