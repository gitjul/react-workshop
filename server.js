import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from './webpack/development.config.js';
config.entry.unshift("webpack-dev-server/client?http://localhost:1337", "webpack/hot/dev-server");

const port = 1337;
const ip = '127.0.0.1';
const app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    stats: { chunks: false }
}).listen(port, ip, function (err) {
    if(err) {
      return console.log(err);
    }
    console.log('Listening at ' + ip + ':' + port);
});
