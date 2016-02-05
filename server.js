import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import { match, RoutingContext } from 'react-router';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Routes from './src/routes';

import config from './webpack/development.config.js';
config.entry.unshift("webpack-dev-server/client?http://localhost:1337", "webpack/hot/dev-server");

const port = 1337;
const ip = '127.0.0.1';

const compiler = webpack(config);
const app = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    stats: { chunks: false }
});

app.use(WebpackHotMiddleware(compiler, {
  path: '/__webpack_hmr'
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

app.listen(port, ip, function (err) {
    if(err) {
      return console.log(err);
    }
    console.log('Listening at ' + ip + ':' + port);
});
