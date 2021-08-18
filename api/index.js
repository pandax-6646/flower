import request from './request'



// 首页的请求
export const homeRequest = {

  // 获取轮播图列表
  getSwiperList() {
    return request.get('flower/getBanner')
  },

  /**
   * 获取商品分页列表
   * @params ={pageNum, pageSize}, params 非必须
   * */
  getGoodsList(params) {
    return request.get('flower/getList', params)
  },

  /**
   * 获取商品详情
   * @params ={flowerId}
   * 
   * */
  getGoodsDetail(params) {
    return request.get('flower/getDetail', params)
  },
}

// 购物车的请求
export const cartRequest = {
  /**
   * 添加商品到购物车
   * @params ={flowerId}
   * */
  addCartList(params) {
    return request.get('cart/addCart', params);
  },

  // 获取购物车商品列表
  getCartGoodsList() {
    return request.get('cart/getList');
  },

  /**
   * 修改商品数量
   * @params ={cartId, buyNum}
   * */
  changeGoodsNumInfo(params) {
    return request.get('cart/updateCart', params)
  },

  /**
   * 删除商品
   * @params ={cartId}, cartId 为数组
   * */
  delCartGoods(params) {
    return request.post('cart/delById', params)
  },
}


// 预订单页面请求
export const preOrderRequest = {
  /**
   * 添加预订单
   * @params ={cartId, totalPrice}
   * */
  addPreOrder(params) {
    return request.post('preOrder/add', params);
  },

  /**
   * 获取预订单详情
   * @params ={preOrderId }
   * */
  getPreOrderDetail(params) {
    return request.get('preOrder/getDetail', params);
  },


  // 获取预订单列表
  getPreOrderList() {
    return request.get('preOrder/all');
  }
}



// 个人中心页请求
export const userRequest = {

  /**
   * 微信登录
   * @code 
   * 
   * */
  wxLogin(params) {
    return request.post('user/wxlogin', params);
  }

}



export const orderRequest = {

  // 创建订单
  createOrder() {
    return request.post('order/create');
  }
}