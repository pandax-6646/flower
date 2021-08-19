import {
  cartRequest,
  preOrderRequest
} from '../../api/index.js'

Page({
  data: {
    cartGoodsList: [],
    isEdit: false,
    isShowEmpty: true,
    // 商品总价格
    priceAll: 0,

    // 全选按钮
    selectAllBtn: {
      value: 'selectAll',
      checked: false
    }
  },

  onShow() {
    if (wx.getStorageSync('token')) {
      wx.hideTabBar();
      this.getCartGoodsListData();
    } else {

      wx.showModal({
        title: '提示',
        content: '是否去登录登录',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/my'
            })
          }
        }
      });
    }
  },

  // 回退页面
  backPage() {
    wx.switchTab({
      url: "/pages/index/index",
    });
  },

  // 获取购物车商品列表
  getCartGoodsListData() {
    let cartGoodsList = [];
    cartRequest.getCartGoodsList().then(res => {
      if (res.code == 666) {
        if (res.carts.length != 0) {


          cartGoodsList = res.carts.map(item => {
            return {
              ...item,
              checked: true,
            }
          })

          this.setData({
            cartGoodsList,
            isShowEmpty: false,
            [`selectAllBtn.checked`]: true
          })

          // 计算商品总价格
          this.getPriceAll();
        } else {
          wx.showToast({
            title: '先去添加商品吧',
            icon: 'none',
            duration: 1000
          });
        }
      }
    }).catch(err => {
      console.log(err);
    })
  },

  // 编辑按钮
  editBtn() {
    if (this.data.cartGoodsList.lenght == 0) {
      return wx.showToast({
        title: `请先去添加商品吧`,
        icon: 'worning',
        duration: 1000
      })
    }
    this.setData({
      isEdit: !this.data.isEdit,
    })
  },

  // 修改商品数量
  changeGoodsNum(event) {
    let {
      cartId,
      step,
      buyNum
    } = event.target.dataset

    // 当前修改的商品的数量为 1 时商品数量只能 ++
    if (buyNum == 1 && Number(step) < 0) return;

    // 计算商品总价格
    this.getPriceAll();

    // 更新页面该商品购买数量
    let index = null;
    this.data.cartGoodsList.forEach((item, i) => {
      if (item.cartId == cartId) {
        index = i;
      };
    })
    this.setData({
      [`cartGoodsList[${index}].buyNum`]: this.data.cartGoodsList[index].buyNum + Number(step)
    })


    // 发送请求修改该商品的数量
    let params = {
      cartId,
      buyNum: buyNum + Number(step)
    }
    cartRequest.changeGoodsNumInfo(params).then(res => {
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 500
      })
    }).catch(err => {
      console.log(err)
    });

    // 更新购物车里的商品总件数
    wx.setStorageSync("cartGoodsListAllNum", wx.getStorageSync('cartGoodsListAllNum') + Number(step))
  },

  // 全选按钮逻辑
  selectAll(e) {
    let len = e.detail.value.length
    this.data.cartGoodsList.forEach((goods, index) => {
      this.setData({
        [`cartGoodsList[${index}].checked`]: !len == 0,
      })
    });

    // 计算商品总价格
    this.getPriceAll();
  },

  // 选中商品的逻辑
  checkboxChange(e) {
    const items = this.data.cartGoodsList;
    const values = e.detail.value;

    for (let i = 0; i < items.length; i++) {
      items[i].checked = false;

      for (let j = 0; j < values.length; j++) {
        if (values[j] == items[i].flowerId) {
          items[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      cartGoodsList: items
    });


    // 判断当前商品选中后是否满足全选
    if (values.length == items.length) {
      this.setData({
        [`selectAllBtn.checked`]: true
      })
    } else {
      this.setData({
        [`selectAllBtn.checked`]: false
      })
    }

    // 计算商品总价格
    this.getPriceAll();
  },

  // 计算商品总价格
  getPriceAll() {
    let priceAll = 0;
    this.data.cartGoodsList.forEach(goods => {
      if (goods.checked) {
        priceAll += goods.price * goods.buyNum
      }
    })

    this.setData({
      priceAll,
    })
  },

  // 删除商品按钮
  delBtn() {
    let selectGoodsList = this.data.cartGoodsList.filter(goods => goods.checked).map(goods => goods.cartId);
    if (selectGoodsList.length != 0) {
      wx.showModal({
        title: '提示',
        content: '是否删除选中的商品',
        success: (res) => {
          if (res.confirm) {

            this.runDelGoods(() => {
              wx.showToast({
                title: `删除成功`,
                icon: 'success',
                duration: 1000
              });
            });

          } else {
            wx.showToast({
              title: '已取消',
              icon: 'info',
              duration: 1000
            });
          }
        },
      })
    } else {
      wx.showToast({
        title: "请先选中要删除的商品",
        icon: 'none',
        duration: 1000
      });
    }
  },


  /**
   * 执行删除商品操作逻辑
   * @showToastHandle 弹窗的函数
   * */
  runDelGoods(showToastHandle) {
    // 获取所有选中的商品 cartId 列表
    let selectGoodsList = this.data.cartGoodsList.filter(goods => goods.checked);
    let selectCartIdList = selectGoodsList.map(goods => goods.cartId);

    // 发送请求，删除后台数据
    cartRequest.delCartGoods({
      cartId: selectCartIdList
    }).then(res => {
      if (res.code == 666) {
        // 显示弹窗
        showToastHandle && showToastHandle();

        // 更新 Storge 里购物车里的商品总件数
        let num = 0
        selectGoodsList.forEach(goods => {
          num += goods.buyNum;
        })
        wx.setStorageSync("cartGoodsListAllNum", wx.getStorageSync('cartGoodsListAllNum') - num)

        // 更新页面上的数据
        let cartGoodsList = this.data.cartGoodsList.filter(goods => !goods.checked)

        // 小程序不支持 forEach 的链式操作
        cartGoodsList.forEach(goods => goods.checked = true)

        this.setData({
          cartGoodsList,
          [`selectAllBtn.checked`]: true
        })
        this.getPriceAll();


        // 当购物车列表为空时
        if (this.data.cartGoodsList.length == 0) {
          this.setData({
            isEdit: false,
            [`selectAllBtn.checked`]: false,
            isShowEmpty: true
          })
        }
      }
    }).catch(err => {
      console.log(err);
    })
  },


  // 生成预订单按钮
  preOrderBtn() {
    // 获取所有选中的商品 cartId 列表
    let selectGoodsList = this.data.cartGoodsList.filter(goods => goods.checked)
    let selectCartIdList = selectGoodsList.map(goods => goods.cartId);

    if (selectCartIdList.length != 0) {
      let params = {
        cartId: selectCartIdList,
        totalPrice: this.data.priceAll
      }

      preOrderRequest.addPreOrder(params).then(res => {
        if (res.code == 666) {

          wx.navigateTo({
            url: `/pages/pay/pay?preOrderId=${res.result.preOrderId}`,
            success: () => {

              // 调用删除商品的函数
              this.runDelGoods();
            }
          });
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
      wx.showToast({
        title: "请先去选一些商品",
        icon: 'none',
        duration: 1000
      });
    }
  }
})