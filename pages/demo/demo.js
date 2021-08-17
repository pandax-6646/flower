Page({
  data: {
    show: false,
    userInfo: [{
      name: '熊**',
      phone: '187****4724',
    }],
    title: '收货手机和姓名'
  },
  showSheet() {
    this.setData({
      show: true
    })
  },


  onClose() {
    this.setData({
      show: false
    })
  },


  onSelect(event) {
    console.log(event.detail);
    this.setData({
      show: false,
      title: this.data.userInfo[0].name
    })
  },



});