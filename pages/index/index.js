//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    shopCar: {
      show: false,
      list: []
    },
    goods: [
      { id: 'good_1', name: '热销-招牌炙烤鸡胸餐', desc: '高温熏制的鸡胸满满都是烟熏的香味，瞬时高温把肉汁都', price: '1', saleNum: '2', favorite: '3%', type: '热销', num: 0 }, 
      { id: 'good_2', name: '烟熏烘烤鸡胸餐', desc: '凑满减单点不送哦，每单限一份哦~~', price: '4', saleNum: '5', favorite: '6%', type: '热销', num: 0 },
      { id: 'good_3', name: '招牌鸡胸沙拉', desc: '土豆、培根、生菜、面包、西红柿、豌豆、玉米、西兰', price: '7', saleNum: '8', favorite: '9%', type: '热销', num: 0 },
      { id: 'good_4', name: '土豆培根餐', desc: '紫薯中含还有丰富的蛋白质、硒和铁是人体抗疲劳、抗', price: '10', saleNum: '11', favorite: '12%', type: '热销', num: 0 },
      { id: 'good_5', name: '黑椒菲力', desc: '食用菌的蛋白质及微量元素，如锌、钛、硒等含量', price: '13', saleNum: '14', favorite: '15%', type: '热销', num: 0 },
      { id: 'good_6', name: '优惠-北海道金枪鱼沙拉', desc: '紫薯中含还有丰富的蛋白质、硒和铁是人体抗疲劳、抗', price: '16', saleNum: '17', favorite: '18%', type: '优惠', num: 0 },
      { id: 'good_7', name: '十色鸡肉沙拉', desc: '高温熏制的鸡胸满满都是烟熏的香味，瞬时高温把肉汁都', price: '19', saleNum: '20', favorite: '21%', type: '优惠', num: 0 },
      { id: 'good_8', name: '北海道金枪鱼沙拉', desc: '凑满减单点不送哦，每单限一份哦', price: '22', saleNum: '23', favorite: '24%', type: '优惠', num: 0 },
      { id: 'good_9', name: '推荐-烤南瓜', desc: '食用菌的蛋白质及微量元素，如锌、钛、硒等含量', price: '27', saleNum: '25', favorite: '26%', type: '推荐', num: 0},
      { id: 'good_10', name: '多味菌菇类', desc: '凑满减单点不送哦，每单限一份哦', price: '28', saleNum: '29', favorite: '30%', type: '推荐', num: 0 },
      { id: 'good_11', name: '新西兰鸡腿餐', desc: '高温熏制的鸡胸满满都是烟熏的香味，瞬时高温把肉汁都', price: '31', saleNum: '32', favorite: '33%', type: '推荐', num: 0 }
    ],
    leftNavData: {
      index: '',
      data: []
    },
    sectionScrollTop: 0,
    prscroll: {
      id: ''
    },
    totalGoodNum: 0,
    totalPrice: 0
  },
  onReady: function () {
    this.getLeftNavArr();
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 
  },
  toggleCarlist: function (e) {
    this.setData({
      'shopCar.show': !this.data.shopCar.show
    });
  },
  getLeftNavArr: function () {
    var arr = [];
    this.data.goods.map((item, index) => {
      if (JSON.stringify(arr).indexOf('"' + item.type + '"') < 0) {
        arr.push({ 'type': item.type, 'index': index });
      }
    });
    this.setData({ 'leftNavData.data': arr });
  },
  clkNavItem: function (e) {
    var index = e.currentTarget.dataset.index;
    var goodIndex = e.currentTarget.dataset.goodIndex;
    var goodId = this.data.goods[goodIndex]['id'];
    this.setData({
      sectionScrollTop: 200,
      'prscroll.id': goodId,
      'leftNavData.index': index
    });
  },
  clkGoodsItem: function (e) {
    // shopcar数组
    var arr = this.data.shopCar.list;
    var index = e.currentTarget.dataset.index;
    var goodInfo = this.data.goods[index];
    var type = e.currentTarget.dataset.type;
    var num = '';
    if (type === 'add') {
      num = ++goodInfo.num;
      this.setData({ 'totalGoodNum': this.data.totalGoodNum + 1 });
      this.setData({ 'totalPrice': this.data.totalPrice + parseFloat(goodInfo.price) });
    } else {
      num = --goodInfo.num;
      this.setData({ 'totalGoodNum': this.data.totalGoodNum - 1 });
      this.setData({ 'totalPrice': this.data.totalPrice - parseFloat(goodInfo.price) });
    }
    goodInfo.num = num < 0 ? 0 : num;

    if (JSON.stringify(arr).indexOf('"' + goodInfo.id + '"') < 0) {
      // 把当前商品加入购物车中
      var inShopCarIndex = this.data.shopCar.list.length;
      // 映射当前商品在商品列表中的下标
      goodInfo.inListIndex = index;
      // 映射商品在购物车中的下标
      goodInfo.inShopCarIndex = inShopCarIndex;
      this.setData({
        ['shopCar.list[' + inShopCarIndex + ']']: goodInfo
      });
    } else {
      // 根据 inShopCarIndex 在购物车中找到商品
      var inShopCarIndex = goodInfo.inShopCarIndex;
      if (goodInfo.num <= 0) {
        var data = this.data.shopCar.list.splice(inShopCarIndex, 1);
        this.setData({
          ['shopCar.list']: this.data.shopCar.list
        });
      } else {
        this.setData({
          ['shopCar.list[' + inShopCarIndex + ']']: goodInfo
        });
      }
    }
    
    this.setData({
      ['goods[' + index + ']']: goodInfo
    });
  },
  clkCarGoodItem: function (e) {
    var index = e.currentTarget.dataset.index;
    var carGoodInfo = this.data.shopCar.list[index];
    var type = e.currentTarget.dataset.type;
    var num = '';
    if (type === 'add') {
      num = ++carGoodInfo.num;
      this.setData({ 'totalGoodNum': this.data.totalGoodNum + 1 });
      this.setData({ 'totalPrice': this.data.totalPrice + parseFloat(carGoodInfo.price) });
    } else {
      num = --carGoodInfo.num;
      this.setData({ 'totalGoodNum': this.data.totalGoodNum - 1 });
      this.setData({ 'totalPrice': this.data.totalPrice - parseFloat(carGoodInfo.price) });
    }
    carGoodInfo.num = num < 0 ? 0 : num;

    // car good 操作
    if (carGoodInfo.num <= 0) {
      this.data.shopCar.list.splice(index, 1);
      this.setData({
        ['shopCar.list']: this.data.shopCar.list
      });
    } else {
      this.setData({
        ['shopCar.list[' + index + ']']: carGoodInfo
      }); 
    }

    // list good 操作
    var inListIndex = carGoodInfo.inListIndex;
    this.setData({
      ['goods[' + inListIndex + ']']: carGoodInfo
    });
  }
})
