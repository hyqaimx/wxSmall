// pages/mine/mine.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNum: '0',
    icons:[ ],
    imgSize:{}
  },
  //自定义函数
  //页面跳转
  toRecord(){
    wx.navigateTo({
      url: '/pages/record/record',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          imgSize: { width: (res.screenWidth * 2) / 5 - 20, height: (res.screenWidth * 2) / 5 - 20}
        })
      },
    })
    app.util.request({
      'url': 'entry/wxapp/member',
      data: {
        m: 'wencu',
      },
      success: function (res) {
        that.setData({
          icons: res.data.data.icons,
          completeInfo: true,
          lightNum: res.data.data.lightNum,
           focus: true
        })
      }
    })
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        });
      },
      fail: function () {
        // 调用微信弹窗接口
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法正常使用的功能体验。请点击确定重新授权，或者删除小程序重新进入。',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                  res.authSetting = {
                    "scope.userInfo": true,
                  }
                }
              })
            }
          }
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