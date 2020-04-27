# cross-domain-demo
模拟跨域及实现跨域

## JSONP

```
<script>
  function showData(ret){
    console.log(ret)
  }
</script>
<script src = "http://api.jirengu.com/weather.php?callback=showData"></script>
```
后端返回的参数：例如{"city":"beijing"}会当做`showData()`函数的参数，所以只需提前封装好`showData()`函数即可。其中`<script src = "http://api.jirengu.com/weather.php?callback=showData"></script>`会当做js来执行，因为使用`script`标签，可以在页面引入JS文件。

- JSONP总结：

JSONP是通过script标签加载数据的方式获取数据当做JS代码来执行，提前在页面上声明一个函数，函数名通过接口传参的方式传给后台，后台解析到函数名在原始数据上（包裹）这个函数名，发送给前端。换句话说，JSONP需要对应接口的后端的匹配才能实现。


- 后端重点代码：

```
var cb = req.query.callback;
	if(cb){
		res.send(cb + '('+ JSON.stringify(data) + ')');
	}else{
		res.send(data);
	}
```

## CORS

CORS全程是跨域资源共享，是一种ajax跨域请求资源的方式，支持现代浏览器，IE支持10以上，实现方式简单，当你使用`XMLHttpRequest`发送请求时，浏览器发现该请求不符合同源策略，会给该请求加一个请求头：`Origin`，后台进行一系列的处理，如果确定接收请求则在返回结果中加一个响应头：`Access-Control-Allow-Origin`，浏览器判断响应头中是否包含有`Origin`的值，如果有则浏览器会处理响应，我们就可以拿到响应数据，如果不包含，浏览器直接驳回，这时我们无法拿到响应数据。
  真正的处理在后端，前端就是发送一个ajax请求。
  
  ```
  res.header("Access-Control-Allow-Origin", "http://a.jrg.com:8080"); 
	//res.header("Access-Control-Allow-Origin", "*"); 
	res.send(data);
  //*表示任何域下都可以接受
  ```
  ## 降域
  
  不同域下的iframe操作。
  在a.htnl 中访问b.html，虽然可以正常显示，但是无法操作及获取其内容。所以，需要降域
  ```
  document.domain = "lll.com"
  //a.lll.com  b.lll.com
  ```
  
  ## postMessage
  
  不需要降域，在b.html 中监听meassage事件，在a.html使用postMessage，达到可以跨域。
  a.html
  ```
  $('.main input').addEventListener('input', function(){
	console.log(this.value);
	window.frames[0].postMessage(this.value,'*');
  })

  ```
  
  
  b.html
  ```
  window.addEventListener('message',function(e) {
		$('#input').value = e.data
    console.log(e.data);
  });
  
  ```

## 同源策略

浏览器出于安全方面的考虑，只允许与本域下的接口交互，不同源的客户端脚本在没有明确授权的情况下，不能读写对方的资源。

- 同域指的是：
1. 同协议：http
2. 同域名： jirengu.com
3. 同端口：:8080
