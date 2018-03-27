// pages/index/index.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showlog: true,
    lists: [
      { id: 1, name: '戒台寺', imgSrc: "/resource/images/logo1.png" },
      { id: 2, name: '潭拓寺', imgSrc: "/resource/images/logo2.png" },
      { id: 3, name: '牡丹书院', imgSrc: "/resource/images/logo1.png" },
      { id: 4, name: '白瀑寺', imgSrc: "/resource/images/logo2.png" },
      { id: 5, name: '龙门涧', imgSrc: "/resource/images/logo1.png" },
      { id: 6, name: '百花山', imgSrc: "/resource/images/logo2.png" },
    ],
    catalog: [
      { id: 1, name: '山村仿古', imgSrc: '/resource/images/1111.png' },
      { id: 3, name: '古道寻幽', imgSrc: '/resource/images/3333.png' },
      { id: 5, name: '永定溯源', imgSrc: '/resource/images/5555.png' },
      { id: 7, name: '古寺祈福', imgSrc: '/resource/images/7777.png' },
      { id: 6, name: '休闲新城', imgSrc: '/resource/images/6666.png' }
      // { id: 2, name: '革命', imgSrc: '/resource/images/2222.png' },
      // { id: 4, name: '煤业', imgSrc: '/resource/images/4444.png' },
      
    ],
    slide:[]
  },
  bindReplaceInput: function (e) {
    var that = this
    var keyword = e.detail.value
    app.util.request({
      'url': 'entry/wxapp/shop',
      data: {
        keyword: keyword,
        m: 'wencu',
      },
      success: function (res) {
        that.setData({
          shopInfo: res.data.data
        })
      }
    })
  },
  //自定义函数
  //获取焦点时事件
  showConfirm:function(){
    var that=this;
    that.setData({
      showConfirm:true
    })
  },
  //失去焦点事件
  hideConfirm:function(){
    var that = this;
    that.setData({
      showConfirm: false
    })
  },
  hide() {
    this.setData({
      showlog: false
    })
  },
  //请求后台
  resItem: function (e) {
    app.util.request({
      url: "",
      data: e.currentTarget.dataset.id,
      success: function (res) {

      }
    })
  },
  //跳转详情
  // toDetail(e) {
  //   app.util.request({
  //     url: "",
  //     data: e.currentTarget.dataset.item,
  //     success: function () {

  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight
        })
      },
    })
    var userInfo = app.globalData.userInfo;
    app.util.request({
      'url': 'entry/wxapp/slide',
      data: {
        m: 'wencu',
      },
      success: function (res) {
        console.log(res);
        that.setData({
          slide: res.data.data
        })
      }
    })    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    app.util.request({
      'url': 'entry/wxapp/shop',
      data: {
        m: 'wencu',
      },
      success: function (res) {
        console.log(res);
        that.setData({
          lists: res.data.data
        })
      }
    }) 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})