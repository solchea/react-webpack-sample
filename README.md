# react-webpack-sample

A simple sample project using react, webpack and react-router.

### Installation

```sh
$ git clone git@github.com:solchea/react-webpack-sample.git
$ cd react-webpack-sample
$ npm install

# run the hot-reload webpack-dev-server with the following:

$ npm run dev

# in a separate tab, run the sever

$ NODE_ENV=development npm start
```

And as long as ports 8080 and 3000 are available, you should be able to load the site at:

http://localhost:3000

If you want to play around and pull some data via JSONP, you can use the following end-point:

https://data.sfgov.org/resource/wwmu-gmzc.json?$jsonp=[callback]
