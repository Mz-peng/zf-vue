> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [www.cnblogs.com](https://www.cnblogs.com/L-xmin/p/13032414.html)

相关阅览[#](#128980131)
-------------------

[官网 Vue.js 服务器端渲染指南（英文）](https://ssr.vuejs.org/#why-ssr)

[官网 静态化 (预渲染)](https://zh.nuxtjs.org/guide#%E9%9D%99%E6%80%81%E5%8C%96)

[官网 nuxtServerInit 方法](https://zh.nuxtjs.org/guide/vuex-store#nuxtserverinit-%E6%96%B9%E6%B3%95)

[官网 API: middleware 属性](https://zh.nuxtjs.org/api/pages-middleware)

[官网 API: asyncData 方法](https://zh.nuxtjs.org/api/)

[官网 API: validate 方法](https://zh.nuxtjs.org/api/pages-validate/#validate-%E6%96%B9%E6%B3%95)

[官网 API: fetch 方法](https://zh.nuxtjs.org/api/pages-fetch)

Nuxt.js 简介[#](#724974048)
-------------------------

Nuxt.js 是一个基于 Vue.js 的轻量级应用框架, 可用来创建服务端渲染 (SSR) 应用, 也可充当静态站点引擎生成静态站点应用, 具有优雅的代码结构分层和热加载等特性。

[![](https://img2020.cnblogs.com/blog/1019981/202006/1019981-20200611135255007-486223841.png)](https://img2020.cnblogs.com/blog/1019981/202006/1019981-20200611135255007-486223841.png)

### 服务端渲染（SSR）[#](#2172664134)

利用 SSR（Server-Side Rendering），Node.js 服务器 将基于 Vue 的组件渲染成 HTML 并传输到客户端，而不是纯 javascript。 与传统的 Vue SPA 相比，使用 SSR 将带来巨大的 SEO（搜索引擎优化） 提升、更好的用户体验和更多的机会。

### 生成静态站点[#](#988972123)

Nuxt.js 支持基于 Vue 应用程序生成静态站点。这是 “两全其美” 的， 因为你不要服务器，但是仍能获得 SEO 的好处，这是因为 Nuxt 将预先渲染所有页面，并且包括必要的 HTML。

支持 Vue.js 应用的静态化算是 Nuxt.js 的一个创新点，通过 `nuxt generate` 命令实现。该命令依据应用的路由配置将每一个路由静态化成为对应的 HTML 文件。

[![](https://img2020.cnblogs.com/blog/1019981/202006/1019981-20200603094536558-1856233455.png)](https://img2020.cnblogs.com/blog/1019981/202006/1019981-20200603094536558-1856233455.png)

静态化可以让你在任何一个静态站点服务商托管你的 Web 应用。

我们进一步考虑下电商应用的场景，利用 nuxt generate，是不是可以将应用静态化后部署在 CDN 服务器，每当一个商品的库存发生变化时，就重新静态化下，更新下商品的库存。但是如果用户访问的时候恰巧更新了呢？我们可以通过调用电商的 API ，保证用户访问的是最新的数据。这样相对于传统的电商应用来说，这种静态化的方案可以大大节省服务器的资源。

NUxt.js 流程图[#](#2775263851)
---------------------------

### nuxtServerInit 服务器初始化[#](#3508019506)

在 Nuxt.js 中只有 page 里的组件有 fetch 和 asyncData 方法，所以当我们使用 layout 布局页面时如果组件需要请求数据，就无法渲染了，解决方法是在 nuxtServerInit 方法里初始化组件内的数据。

如果你使用_状态树模块化_的模式，只有主模块（即 store/index.js）适用设置该方法（其他模块设置了也不会被调用）。

实际上 nuxtServerInit 用于在服务端操作 store 的，实质上就是一个 Action。

### middleware 中间件运行[#](#285705211)

这个函数可以使用在 nuxt.config.js、layouts、pages 中使用，会在页面初始化之前被调用。

[示例 官网 中间件](https://zh.nuxtjs.org/api/pages-middleware/)

### validate() 校验参数[#](#1589199184)

可以让你在动态路由对应的页面组件中配置一个校验方法用于校验动态路由参数的有效性。比如对路由参数验证失败，判定为一个非法参数后，跳转到 404 页面或者一个提醒页面。

[示例 官网 validate](https://zh.nuxtjs.org/api/pages-validate/#validate-%E6%96%B9%E6%B3%95)

### asyncData() 和 fetch()[#](#1718883997)

#### asyncData()[#](#1529002694)

asyncData 方法会在组件（限于页面组件）每次加载之前被调用。它可以在服务端或路由更新之前被调用。在这个方法被调用的时候，第一个参数被设定为当前页面的上下文对象，你可以利用 asyncData 方法来获取数据并返回给当前组件。

> 通俗解释：asyncData 其实是运行在 page 页面加载前的一个方法，这个方法只能在页面组件中使用，这个方法的作用很多，比如：ajax 数据请求、操作 state 数据、页面重定向等等。

这里涉及到一点，单纯用 vue 的时候，可以用在 created 生命周期阶段进行 ajax 数据的请求，只是这样的话查看源代码的时候就看不到这些数据。也就实现了服务端渲染

[![](https://img2020.cnblogs.com/blog/1019981/202006/1019981-20200602171645482-108258.png)](https://img2020.cnblogs.com/blog/1019981/202006/1019981-20200602171645482-108258.png)

[![](https://img2020.cnblogs.com/blog/1019981/202006/1019981-20200602171658184-1575217903.png)](https://img2020.cnblogs.com/blog/1019981/202006/1019981-20200602171658184-1575217903.png)

#### fetch()[#](#3612397178)

asyncData 既可以充应用的状态树（store）数据，也可以设置组件的数据。

fetch 方法用于在渲染页面前填充应用的状态树（store）数据， 与 asyncData 方法类似，不同的是它不会设置组件的数据。

### render[#](#2759536955)

渲染页面

流程图图示[#](#3993139985)
---------------------

下图阐述了 Nuxt.js 应用一个完整的服务器请求到渲染（或用户通过 切换路由渲染页面）的流程：

[![](https://img2020.cnblogs.com/blog/1019981/202006/1019981-20200602165403033-1561978350.png)](https://img2020.cnblogs.com/blog/1019981/202006/1019981-20200602165403033-1561978350.png)
