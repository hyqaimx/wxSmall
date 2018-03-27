//app.js
App({
  onLaunch: function () {
    var that = this;
    that.util.getUserInfo(function (response) {
      that.globalData.userInfo = response.wxInfo;
    })
  },
  onHide: function () {

  },
  onError: function (msg) {

  },
  util: require('resource/we7/resource/js/util.js'),
  tabBar: {},
  globalData: {
    userInfo: null
  },
  siteInfo: require('siteinfo.js')
})