/*

获取方式：打开  中国联通 app 【官方版】-> 首页的流量查询获取 Cookie
===================
[MITM]
hostname = m.client.10010.com

【Surge脚本配置】:
===================
[Script]
联通 headers = type=http-request,pattern=https:\/\/m\.client\.10010\.com\/mobileserviceimportant\/smart\/smartwisdomCommon,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/dompling/Script/master/10010/index.js,script-update-interval=0

===================
【Loon脚本配置】:
===================
[Script]
http-request https:\/\/m\.client\.10010\.com\/mobileserviceimportant\/smart\/smartwisdomCommon tag=联通 headers, script-path=https://raw.githubusercontent.com/dompling/Script/master/10010/index.js

===================
【 QX  脚本配置 】 :
===================

[rewrite_local]
https:\/\/m\.client\.10010\.com\/mobileserviceimportant\/home\/queryUserInfoSeven  url script-request-header https://raw.githubusercontent.com/dompling/Script/master/10010/index.js
 */

if ($request) GetCookie();

function GetCookie() {
  if ($request.url.indexOf('queryUserInfoSeven') > -1) {
    const cookie = $request.headers.Cookie;
    // $.log($request.headers);
    let encoder = new TextEncoder();
    let writeCookie = encoder.encode(cookie);
    if ($iCloud.writeFile(writeCookie, "10010/cookie.txt")) {
      console.log("Cookie 写入OK");
    } else {
      console.log("Cookie 写入NO");
    }
  }
}
$.done();
