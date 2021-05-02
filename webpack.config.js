module.exports = {
    entry: './src/index.jsx',
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist',
    },
    module: {
      rules: [
        {
            test: /\.(js|jsx)$/,
            resolve: {
              "extensions":[
                ".js",
                ".jsx"
              ]
            },
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(gif|jpg|png)/,
          type: 'asset/resource'
        }
      ]
    }
  };