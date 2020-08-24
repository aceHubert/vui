const Bundler = require('parcel-bundler');
const Path = require('path');

const port = 8000;

const entryFile = Path.join(__dirname, '../dev/index.html');
const options = {};

(async function() {
  // 使用提供的入口文件路径和选项初始化 bundler
  const bundler = new Bundler(entryFile, options);

  // 运行 bundler，这将返回主 bundle
  // 如果你正在使用监听模式，请使用下面这些事件，这是因为该 promise 只会触发一次，而不是每次重新构建时都触发
  const bundle = await bundler.serve(port);
})();
