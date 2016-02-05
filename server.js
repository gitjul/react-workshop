import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import { match, RoutingContext } from 'react-router';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Routes from './src/routes';
import Express from 'express';
import http from 'http';

import config from './webpack/development.config.js';
import DefaultConfig from './webpack/default.config.js';
//config.entry.unshift("webpack-dev-server/client?http://localhost:1337", "webpack/hot/dev-server");

const port = 1337;
const ip = '127.0.0.1';

const compiler = webpack(config);
const app = Express();

app.use(Express.static(DefaultConfig.Dist));

//app.use(WebpackHotMiddleware(compiler, {
  //path: '/__webpack_hmr'
//}));

app.use(WebpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    stats: { chunks: false }
}));

const indexHtml = (renderProps) => {
  const app = ReactDOMServer.renderToString(
    <RoutingContext {...renderProps} />);
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Lunars School of Witchcraft and Wizardry</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href='https://fonts.googleapis.com/css?family=Dosis:400,300,700' rel='stylesheet' type='text/css'>
      <link rel="shortcut icon" type="image/png" href="/favicon.ico"/>
      <link href="/bundle.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
      <div id="app">${app}</div>
      <script src="/bundle.js" type="text/javascript"></script>
    </body>
  </html>
  `;
}

app.use((req, res) => {
  console.log(req.url);
  match({ routes: Routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const html = indexHtml(renderProps);
      res.send(html);
    } else {
      res.status(404).send('Not found');
    }
  })
});

http.createServer(app).listen(port, ip, function (err) {
    if(err) {
      return console.log(err);
    }
    console.log('Listening at ' + ip + ':' + port);
});
