var app = getApp();
var name = 'top';
var flag = true;
Page({
  data:{
    // 判断loading
    hidden:true,
    // 新闻列表
    news:[],
    // 
    flag:1,
    menu:[{
        name:"头条",
        value:"top",
        active:true
    },{
        name:"社会",
        value:"shehui",
        active:false
    },{
        name:"国内",
        value:"guonei",
        active:false
    },{
        name:"国际",
        value:"guoji",
        active:false
    },{
        name:"娱乐",
        value:"yule",
        active:false
    },{
        name:"体育",
        value:"tiyu",
        active:false
    },{
        name:"军事",
        value:"junshi",
        active:false
    },{
        name:"科技",
        value:"keji",
        active:false
    },{
        name:"财经",
        value:"caijing",
        active:false
    },{
        name:"时尚",
        value:"shishang",
        active:false
    }]
  },
  bindMenu:function(e){
    name = e.target.dataset.name;
    // 循环
    var tmp = this.data.menu.map(function (arr, index) {
        if(arr.value == name){
            arr.active = true;
        }else{
            arr.active = false;
        }
        return arr;
    });
    this.setData({
        menu : tmp
    });    
    this.getNews(name);
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getNews(name);  
  },
  getNews:function(name){
    // 设置loading显示
    this.setData({hidden:false});
    // 请求数据返回结果不一致 需要显示不同信息
    flag = name == "top" ? 1 : 0;
    var _this = this;
    // 获取新闻列表
    wx.request({
        url : 'http://v.juhe.cn/toutiao/index',
        data : {
            type : name,
            key  : app.globalData.appkey
        },
        success : function(res){
            if(!res.data.error_code){
                var data = res.data.result.data;
                var title = flag ? data[0].type : data[0].category;
                wx.setNavigationBarTitle({
                    title : title
                });
                _this.setData({
                    news : data,
                    hidden : true,
                    flag : flag
                });
            }
        }
    })
  }
})