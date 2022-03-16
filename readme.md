## qiankun 微应用

[文档地址](https://qiankun.umijs.org/zh/guide)

### 作用

取代 iframe，实现多项目融合。

### 获取微应用

1. 配置 js 地址
2. 配置 html 地址
   > 将 html 拿到后，分别解析出外链的 css 与 script 地址，再使用 fetch 获取地址数据。获取 css 后转换成 style 标签。script 内容字符串做改造后使用 eval 执行


#### css 隔离

2 种方式

1. 使用 Shadow Dom
2. 改造 css 内容，增加一个特殊的选择器，类似 scoped 样式效果。

#### js 隔离

原因：避免各子应用间变量相互影响
原理：对 script 标签内容做改造，再通过 proxy+闭包实现  
改造前：

```
window.a = 1
console.log(window.$)
```

改造后：

```
(function(window, self, globalThis){
  with(window){;
    window.a = 1
    console.log(window.$)
  }
}).bind(window.proxy)(window.proxy,window.proxy, window.proxy)
```
当子应用获取全局变量数据时，先获取自己app的变量，在获取父app的变量。

#### 内存泄漏
改造子应用的 setInterval addEventListenner等
事件，定时等必须要在mount之后注册才行。
类似如下：
```
const nativeSetInterval  = window.setInterval
const ids = []
window.setInterval = (fn, time) => {
  const id = nativeSetInterval(fn, time)
  ids.push(id)
  return id
}


```
在unmount的钩子中卸载掉。
```
ids.forEach(id => clearInterval(id))
```

#### 配置
1. 钩子函数相关
由于要调用子应用的钩子函数（bootstrap，mount,unmount，update）,必须要拿到子应用的钩子函数。
子应用必须添加如下配置:
如此，便可以使用proxy['micApp'].mount 访问到子应用的mount钩子并调用。

```
module.exports = {
  output: {
    library: `micApp`,
    //library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageName}`,
  },
};
```

2. 子应用获取不到静态资源
原因：静态资源地址为非全路径（http开头），导致资源域名或者端口错误。

直接将img图片打包成base64
webpack 配置如下
```
  config.module.rule('fonts').use('url-loader').loader('url-loader').options({}).end();
  config.module.rule('images').use('url-loader').loader('url-loader').options({}).end();
```

```
if(window.__POWERED_BY_QIANKUN__) {
  // js中动态获取静态资源的地址
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

其中：`__INJECTED_PUBLIC_PATH_BY_QIANKUN__`是子应用真实的publickPuth

### h5路由问题
由于h5路由的实现方法，其主动改变url地址，会造成地址错乱。  
因此需要配置适合子应用的前缀路径，让其保持前缀路径不变。  
例如：`https://localhost/mic-app/home`
主应用中，设置路径为/mic-app时，加载子应用。
子应用中，设置mic-app为前缀，保持不变。（baseURL:'mic-app'）
