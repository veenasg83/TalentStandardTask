let path = require('path');
let webpack = require('webpack');

var talentApiHost, identityApiHost, profileApiHost, mode;

setUpApI = function () {
    let env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'dev';

    switch (env) {
        case 'production':
            talentApiHost = "'https://talentstandardtask.azurewebsites.net/talent'";
            identityApiHost = "'https://talentstandardtask.azurewebsites.net/identity'";
            profileApiHost = "'https://talentstandardtask.azurewebsites.net/profile'";
            mode = 'production';
            console.log(talentApiHost);
            break;
        default:
            talentApiHost = "'http://localhost:51689'";
            identityApiHost = "'http://localhost:60998'";
            profileApiHost = "'http://localhost:60290'";
            mode = 'development';
            break;
    }

};
setUpApI();

module.exports = {
    context: __dirname,
    entry: {
        homePage: './ReactScripts/Home.js'
    },
    output:
    {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },

    plugins: [
        new webpack.DefinePlugin({
            _API_Talent_: talentApiHost,
            _API_Identity_: identityApiHost,
            _API_Profile_: profileApiHost,

        })
    ],

    watch: true,
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env', 'babel-preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules'
                ]
            }
        ]
    }
}