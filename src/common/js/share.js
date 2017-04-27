/**
 * Created by wujincun on 17/4/26.
 */
wx.config({

});

wx.ready(function () {
  wx.onMenuShareAppMessage({
    title: '互联网之子',
    desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
    link: 'http://movie.douban.com/subject/25785114/',
    imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
    trigger: function (res) {
      // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
      $('.mask').hide();
    },
    success: function (res) {
    },
    cancel: function (res) {
    },
    fail: function (res) {
    }
  });
  wx.onMenuShareTimeline({
    title: '互联网之子',
    link: 'http://movie.douban.com/subject/25785114/',
    imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
    trigger: function (res) {
      $('.mask').hide();
    },
    success: function (res) {
    },
    cancel: function (res) {
    },
    fail: function (res) {
    }
  });
  wx.onMenuShareQQ({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    success: function () {
      // 用户确认分享后执行的回调函数
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
    }
  });
});

wx.error(function (res) {

});
