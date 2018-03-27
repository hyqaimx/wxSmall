var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight:'',//获取手机的宽度
    //商家信息
    shopInfo: { id: 1, name: "龙门涧", phone: "010-61828185", address: "门头沟区清水镇燕家台村龙门涧景区", time: "9:00-17:00(周一到周五)", introduce: "龙门涧风景名胜区位于北京城的西部，其占地约20平方公里，距市区约90公里。龙门涧风景区以大峡谷为主景区。大峡谷全长15公里，为北京之最，且其中有数十个各具特色的景观。龙门涧地质结构奇特，被学者誉为我国“北方的地质博物馆”。" },
    dianliang: false
  },
  call() {
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.shopInfo.phone,
      success(res) {
        console.log(res);
      }
    })
  },
  openMap() {
    let that = this;
    wx.openLocation({
      latitude: 40.013891,
      longitude: 115.57953,
      name: that.data.shopInfo.name,
      address: that.data.shopInfo.address,
      success(res) {
        console.log(res);
      }, fail(res) {
        console.log(res)
      }
    })
  },
  activate() {
    let that = this;
    that.setData({
      logoActive: true
    })
  },
  onLoad: function (options) {
    var that = this;
    //设置轮播高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          width: res.windowWidth,
          height: res.windowWidth / 2
        })
      },
    })
    app.util.request({
      'url': 'entry/wxapp/detail',
      data: {
        id: options.id,
        m: 'wencu',
      },
      success: function (res) {
        that.setData({
          shopInfo: res.data.data,
          dianliang : res.data.data.dianliang
        })
      }
    })
  },
  //自定义函数 打开地图
  openMap:function(el){
    var that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = that.data.shopInfo.latitude
        var longitude = that.data.shopInfo.longitude
        wx.openLocation({
          latitude: Number(latitude),
          longitude: Number(longitude),
          name: that.data.shopInfo.title,
          address: that.data.shopInfo.address
        })
      }
    })
  },
  //拨打电话
  openPhone:function(el){
    var phoneNum=el.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phoneNum,
      success:function(res){
        console.log(res);
      },
      fail:function(res){
        wx.showToast({
          title: '拨号失败',
          image: "/resource/images/error.png",
          success: function (res) {
            setTimeout(function () {
              wx.hideToast()
            }, 3000)
          }
        })
      }
    })
  },
  dianliang: function () {
    var that = this;
    let flag=that.data.dianliang;
    if(!dianliang){
      app.util.request({
        'url': 'entry/wxapp/dianliang',
        data: {
          id: that.data.shopInfo.id,
          m: 'wencu',
        },
        success: function (res) {
          wx.showToast({
            title: '点亮成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            dianliang: true
          })
        }
      })
    }else{
      wx.showToast({
        title: '不能重复点亮',
        icon:"success",
        duration:2000
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
  onShareAppMessage: function (res) {
    var that = this
    return {
      title: that.data.shopInfo.title,
      path: '/pages/detail/detail?id='+that.data.shopInfo.id,
      success:function(res){
        wx.showToast({
          title: '转发成功',
          icon:"success",
          success:function(res){
            setTimeout(function(){
              wx.hideToast()
            },3000)
          }
        })
      },
      fail:function(res){
        var errMsg = res.errMsg.indexOf("cancel");
        if(errMsg== -1){
          wx.showToast({
            title: '转发失败',
            image: "/resource/images/cry.png",
            success: function (res) {
              setTimeout(function () {
                wx.hideToast()
              }, 3000)
            }
          })
        };
      }
    }
  }
})