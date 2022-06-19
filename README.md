# work1

>

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```



## proxy

used to fix cors problems

```
npm install http-proxy-middleware express
```



```js
// javascript

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
    '/',
    createProxyMiddleware({
        target: 'http://124.221.237.241:8081/',
        // target: 'http://127.0.0.1:5000',
        changeOrigin: true,
    })
);

app.listen(3000);
// proxy and change the base path from "/api" to "/secret"
// http://127.0.0.1:3000/api/foo/bar -> http://www.example.org/secret/foo/bar
```



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

