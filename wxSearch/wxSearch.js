// 定义数据格式

/***
 * 
 * "wxSearchData":{
 *  configconfig:{
 *    style: "wxSearchNormal"
 *  },
 *  view:{
 *    hidden: true,
 *    searchbarHeght: 20
 *  }
 *  keys:[],//自定义热门搜索
 *  his:[]//历史搜索关键字
 *  value
 * }
 * 
 * 
 */
var __keysColor = [];

var __mindKeys = [];

function initColors(colors){
    __keysColor = colors;
}

function initMindKeys(keys){
    __mindKeys = keys;
}

function init(that, barHeight, keys, isShowKey, isShowHis, callBack) {
    var temData = {};
    var view = {
        barHeight: barHeight,
        isShow: false
    }
    
    if(typeof(isShowKey) == 'undefined'){
        view.isShowSearchKey = true;
    }else{
        view.isShowSearchKey = isShowKey;
    }

    if(typeof(isShowHis) == 'undefined'){
        view.isShowSearchHistory = true;
    }else{
        view.isShowSearchHistory = isShowHis;
    }
    temData.keys = keys;
    wx.getSystemInfo({
        success: function(res) {
            var wHeight = res.windowHeight;
            view.seachHeight = wHeight-barHeight;
            temData.view = view;
            that.setData({
                wxSearchData: temData
            });
        }
    })
    
    if (typeof (callBack) == "function") {
        callBack();
    }
    
    getHisKeys(that);
}

function wxSearchInput(e, that, callBack){
    var temData = that.data.wxSearchData;
    var text = e.detail.value;
    var mindKeys = [];
    if(typeof(text) == "undefined" || text.length == 0){
        
    }else{
        for(var i = 0; i < __mindKeys.length; i++){
            var mindKey = __mindKeys[i];
            if(mindKey.indexOf(text) > -1){
                mindKeys.push(mindKey);
            }
        }
    }
    temData.value = text;
    temData.mindKeys = mindKeys;
    that.setData({
        wxSearchData: temData
    });
}

function wxSearchFocus(e, that, callBack) {
    var temData = that.data.wxSearchData;
    temData.view.isShow = true;
    that.setData({
        wxSearchData: temData
    });
    //回调
    if (typeof (callBack) == "function") {
        callBack();
    }
    // if(typeof(temData) != "undefined"){
    //   temData.view.hidden= false;
    //   that.setData({
    //     wxSearchData:temData
    //   });
    // }else{

    // }
}
function wxSearchBlur(e, that, callBack) {
    var temData = that.data.wxSearchData;
    temData.value = e.detail.value;
    that.setData({
        wxSearchData: temData
    });
    if (typeof (callBack) == "function") {
        callBack();
    }
}

function wxSearchHiddenPancel(that){
    var temData = that.data.wxSearchData;
    temData.view.isShow = false;
    that.setData({
        wxSearchData: temData
    });
}

function wxSearchKeyTap(e, that, callBack) {
    //回调
    var temData = that.data.wxSearchData;
    temData.value = e.target.dataset.key;
    that.setData({
        wxSearchData: temData
    });
    if (typeof (callBack) == "function") {
        callBack();
    }
}
function getHisKeys(that) {
    var value = [];
    try {
        value = wx.getStorageSync('wxSearchHisKeys')
        if (value) {
            // Do something with return value
            // console.log('Do something with return value');
            var temData = that.data.wxSearchData;
            // console.log('temData:'+temData);
            temData.his = value;
            // console.log('temData.his:'+temData.his);
            that.setData({
                wxSearchData: temData
            });
            // console.log('wxSearchData:'+wxSearchData);
            
        }
    } catch (e) {
        // Do something when catch error
        console.log("出错了");
    }
    
}
function wxSearchAddHisKey(that) {
    wxSearchHiddenPancel(that);
    var text = that.data.wxSearchData.value;
    console.log("搜索框text文本是："+text);
    if(typeof(text) == "undefined" || text.length == 0){return;}
    var value = wx.getStorageSync('wxSearchHisKeys');
    if(value){
        if(value.indexOf(text) < 0){
            value.unshift(text);
        }
        wx.setStorage({
            key:"wxSearchHisKeys",
            data:value,
            success: function(){
                getHisKeys(that);
            }
        })
    //    接下来是进行比赛页面的跳转
        wx.request({
        url: 'https://teaming.malateam.cn/src/query_competition.php',
        data: {
            competition_name: text//比赛名称
        },
        success(res) {
            console.log("搜索框结果:"+res.data.data[0].name); // 测试输出
           //id存在
            if (res.data.code==0) {
                console.log("成功查到该比赛了");
                var com_id = res.data.data[0].id;//这里获得返回的id值
                wx.navigateTo({
                  url: '/pages/college/competition/detail/detail?id='+com_id,
                })
            } else {
            //此处一个弹框提示（提示用户学院数据获取失败）
            wx.showModal({
                title: 'fail',
                content: '查询失败',
                showCancel: false, //不显示取消按钮，只能确定
                success(res) {
                }
            }) //
            }
        }
    })
        // console.log("这是热搜有的词汇");
    }else{
        value = [];
        value.push(text);
        wx.setStorage({
            key:"wxSearchHisKeys",
            data:value,
            success: function(){
                getHisKeys(that);
            }
        })
        console.log("这是热搜没有的词汇");
    }
    
    
}
function wxSearchDeleteKey(e,that) {
    var text = e.target.dataset.key;
    var value = wx.getStorageSync('wxSearchHisKeys');
    value.splice(value.indexOf(text),1);
    wx.setStorage({
        key:"wxSearchHisKeys",
        data:value,
        success: function(){
            getHisKeys(that);
        }
    })
}
function wxSearchDeleteAll(that){
    wx.removeStorage({
        key: 'wxSearchHisKeys',
        success: function(res) {
            var value = [];
            var temData = that.data.wxSearchData;
            temData.his = value;
            that.setData({
                wxSearchData: temData
            });
        } 
    })
}



module.exports = {
    init: init,
    initColor: initColors,
    initMindKeys: initMindKeys,
    wxSearchInput: wxSearchInput,
    wxSearchFocus: wxSearchFocus,
    wxSearchBlur: wxSearchBlur,
    wxSearchKeyTap: wxSearchKeyTap,
    wxSearchAddHisKey:wxSearchAddHisKey,
    wxSearchDeleteKey:wxSearchDeleteKey,
    wxSearchDeleteAll:wxSearchDeleteAll,
    wxSearchHiddenPancel:wxSearchHiddenPancel
}