// pages/wenjuan/wenjuan.js
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {
        id: 1, title: "您升级到Windows10手机预览版10149之前的版本是什么", 
        list: [{ name: '选项1', value: '0'},{ name: '选项2', value: '1' },{ name: '选项3', value: '2' }],open:true
      },
      { id: 2, title: "您升级到Windows10手机预览版10149之前的版本是什么", list: [{ name: '选项1', value: '0' }, { name: '选项2', value: '1' }],open:false},
      { id: 3, title: "您升级到Windows10手机预览版10149之前的版本是什么", list: [{ name: '选项1', value: '0'}, { name: '选项2', value: '1' }, { name: '选项3', value: '2' }, { name: '选项4', value: '3' }], open: false },
      { id: 4, title: "您升级到Windows10手机预览版10149之前的版本是什么", list: [{ name: '选项1', value: '0' }, { name: '选项2', value: '1' }], open: false },
      { id: 5, title: "您升级到Windows10手机预览版10149之前的版本是什么", list: [{ name: '选项1', value: '0' }, { name: '选项2', value: '1' }, { name: '选项3', value: '2' }], open: false }
    ]
  },

  radioChange: function (e) {
    var that=this;
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    let listVal=e.detail.value;
    let itemID=e.currentTarget.dataset.id;
    let Array=that.data.items;
    Array.forEach(function(item,index,Arr){
      if(item.id==itemID){
        item.list.forEach(function (item, index, Arr){
          if(item.value==listVal){
            item.checked=true;
          }else{
            item.checked = false;
          }
        })
        item.open=!item.open;
      }
      if(item.id==itemID+1){
        item.open = true;
      }
    })
    that.setData({
      items:Array
    })
  },
  openChoose(e){
    let that=this;
    let Array=that.data.items;
    let itemID=e.currentTarget.dataset.id;
    Array.forEach(function(item,index,arr){
      if(itemID==item.id){
        item.open=true
      }else{
        item.open = false
      }
    })
    that.setData({
      items:Array
    })
  },
  resquest(){
    let that=this;
    let itemArr=that.data.items;
    let requestArr=[];
    let requestFlag=true;
    for (let i = itemArr.length-1;i>=0;i--){
        let item={};
        item.id=itemArr[i].id;
        let falseNum=0;
        for (let j = 0; j < itemArr[i].list.length;j++){
          if (itemArr[i].list[j].checked){
            item.value = itemArr[i].list[j].value;
          }else{
            falseNum++;
          }
        }
        if (falseNum == itemArr[i].list.length){
          requestFlag = false;
          itemArr.forEach(function(item,index,arr){
            if(index==i){
              item.open=true
              wx.showToast({
                title: '有题未答',
                image: "/resource/images/error.png"
              })
            }else{
              item.open = false
            }
          })
        }
        requestArr.push(item);
    }
    that.setData({
      items: itemArr
    })
    console.log(requestArr);
    if (requestFlag){
      app.util.request({
        'url': '',
        data: requestArr,
        success(res) {
          console.log(res)
        }
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