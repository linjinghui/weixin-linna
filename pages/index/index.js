//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showCarlist: false,
    goods: [
      { name: '招牌炙烤鸡胸餐', desc: '高温熏制的鸡胸满满都是烟熏的香味，瞬时高温把肉汁都', price: '', saleNum: '', favorite: '' }, 
      { name: '烟熏烘烤鸡胸餐', desc: '凑满减单点不送哦，每单限一份哦~~', price: '', saleNum: '', favorite: '' },
      { name: '招牌鸡胸沙拉', desc: '土豆、培根、生菜、面包、西红柿、豌豆、玉米、西兰', price: '', saleNum: '', favorite: '' },
      { name: '土豆培根餐', desc: '紫薯中含还有丰富的蛋白质、硒和铁是人体抗疲劳、抗', price: '', saleNum: '', favorite: '' },
      { name: '黑椒菲力', desc: '食用菌的蛋白质及微量元素，如锌、钛、硒等含量', price: '', saleNum: '', favorite: '' },
      { name: '北海道金枪鱼沙拉', desc: '', price: '', saleNum: '', favorite: '' },
      { name: '十色鸡肉沙拉', desc: '', price: '', saleNum: '', favorite: '' },
      { name: '北海道金枪鱼沙拉', desc: '', price: '', saleNum: '', favorite: '' },
      { name: '烤南瓜', desc: '', price: '', saleNum: '', favorite: '' },
      { name: '多味菌菇类', desc: '', price: '', saleNum: '', favorite: '' },
      { name: '新西兰鸡腿餐', desc: '', price: '', saleNum: '', favorite: '' }
    ],

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  toggleCarlist: function (e) {
    this.setData({
      showCarlist: !this.data.showCarlist
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
