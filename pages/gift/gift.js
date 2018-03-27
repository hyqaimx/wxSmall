// pages/gift/gift.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    showDialog:false,
    currentInfo:{},
    sendPhone:'',
    sendAddress:'',
    sendAddressDetail:''
  },

  //自定义函数
  //点击显示弹窗
  showDialog:function(el){
    var that=this;
    var currentId = el.currentTarget.dataset.id;//获取自定义id
    var newArray=that.data.list;//拷贝数组
    var newObject//初始化变量
    for(var i=0;i<newArray.length;i++){
      var testId=newArray[i].id;
      if(testId==currentId){
        newObject = newArray[i]//获取到对应id的对象的信息
      }
    }
    that.setData({
      showDialog: true,
      currentInfo: newObject
    })
  },
  //点击隐藏弹窗
  hideDialog:function(){
    var that=this;
    that.setData({
      showDialog: false
    })
  },
  onInputName: function (res) {
    var that = this;
    that.setData({
      sendName: res.detail.value
    })
  },
  //监听电话信息输入
  onInputPhone:function(res){
    var that=this;
    that.setData({
      sendPhone:res.detail.value
    })
  },
  //地址选择事件
  bindaddressChange:function(res){
    var that=this;
    that.setData({
      sendAddress: res.detail.value[0] + res.detail.value[1] + res.detail.value[2]
    })
  },
  wxaddress: function (res) {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        that.setData({
          sendName: res.userName,
          sendPhone: res.telNumber,
          sendAddress: res.provinceName + res.cityName + res.countyName,
          sendAddressDetail: res.detailInfo,
        })
      }
    })
  },
  //监听详细地址输入
  onInputAddress:function(res){
    var that = this;
    that.setData({
      sendAddressDetail: res.detail.value
    })
  },
  //用户确认兑换
  confirm:function(){
    var that=this;
    var name = that.data.sendName;
    var phone=that.data.sendPhone;
    var address=that.data.sendAddress;
    var addressDetail=that.data.sendAddressDetail;
    if (name == "" || name == null) {
      wx.showToast({
        title: '用户名不能为空',
        image: '/resource/images/error.png',
        mask: true
      })
    } else if(phone==""||phone==null){
      wx.showToast({
        title: '联系方式不能为空',
        image:'/resource/images/error.png',
        mask:true
      })
    }else if(address==''||address==null){
      wx.showToast({
        title: '请选择地址',
        image: '/resource/images/error.png',
        mask: true
      })
    } else if (addressDetail == '' || addressDetail==null){
      wx.showToast({
        title: '请填写详细地址',
        image: '/resource/images/error.png',
        mask: true
      })
    }else{
      app.util.request({
        url: 'entry/wxapp/order',
        data: {
          id: that.data.currentInfo.id,
          dianliang_num: that.data.currentInfo.num,
          name: name,
          phone: phone,
          address: address,
          addressDetail: addressDetail,
          m: 'wencu',
        },
        success: function(res){
          console.log(res);
          wx.showToast({
            title: '兑换成功',
            icon:'success',
            mask:true,
            success:function(){
              that.setData({
                showDialog:false
              })
            }
          })
        },
        fail: function(res){
          wx.showToast({
            title: '兑换失败',
            image:'/resource/images/error.png',
            mask: true
          })
        },
        complete: function(res){

        },
        cachetime: "10"
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
      'url': 'entry/wxapp/lipin',
      data: {
        m: 'wencu',
      },
      success: function (res) {
        that.setData({
          list: res.data.data.list,
          dianliang: res.data.data.dianliang,
          avatar: res.data.data.avatar,
          nickname: res.data.data.nickname
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