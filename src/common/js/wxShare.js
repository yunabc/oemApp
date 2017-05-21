/**
 * Created by wujincun on 17/4/26.
 */

export function wxShare(option,pageUrl){
  let title= "信金融";
  let desc = "点击邀请注册";
  let url = location.origin+'/app/static/xinjrlogo.jpg'
  console.log(option)
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: option.appId, // 必填，公众号的唯一标识
      timestamp: option.timestamp, // 必填，生成签名的时间戳
      nonceStr: option.nonceStr, // 必填，生成签名的随机串
      signature: option.signature,// 必填，签名，见附录1
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'scanQRCode'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function () {
      console.log('ready')
      wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: pageUrl+'?userInviterId=' + option.userInviterId + '#/register',
        imgUrl: url,
        trigger: function (res) {
          // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回

        },
        success: function (res) {
        },
        cancel: function (res) {
        },
        fail: function (res) {
        }
      });
      wx.onMenuShareTimeline({
        title: title,
        link: pageUrl+'?userInviterId=' + option.userInviterId + '#/register',
        imgUrl: url,
        trigger: function (res) {
        },
        success: function (res) {
        },
        cancel: function (res) {
        },
        fail: function (res) {
        }
      });
      wx.onMenuShareQQ({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: pageUrl+'?userInviterId=' + option.userInviterId + '#/register',
        imgUrl: url, // 分享图标
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
  }



