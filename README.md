react component

//安装运行服务
npm install --save browser-sync

//package.json
"dev": "browser-sync start --server --files *.*",

npm run dev

<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>
<script type="text/jsx;harmony=true" src="app.jsx"></script>

//react组件必须有且只有一个父级元素

//浏览器执行update，自动更新渲染DOM，react虚拟DOM
box.setState({comments: []})

//react渲染页面是会比较差异