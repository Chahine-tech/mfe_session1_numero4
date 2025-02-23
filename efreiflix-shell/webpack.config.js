/**
 * Configuration Webpack pour l'application Shell (Host Application)
 * 
 * Ce fichier configure l'application principale qui va héberger et orchestrer
 * les différents micro-frontends. En tant qu'application hôte, elle est responsable
 * de l'importation et de l'intégration des composants distants.
 * 
 * Points clés :
 * - Configuration du port de développement (3000)
 * - Déclaration des micro-frontends distants (remotes)
 * - Configuration du partage des dépendances
 * - Configuration de Babel pour la transpilation React
 */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require('path');

const getRemoteEntryUrl = (appName) => {
  if (process.env.NODE_ENV === 'production') {
    // Replace these URLs with your actual Vercel deployment URLs
    const urls = {
      breadcrumbs: 'https://efrei-breadcrumbs-g1-iota.vercel.app'
    };
    return `${urls[appName]}/remoteEntry.js`;
  }
  const ports = {
    breadcrumbs: 3005
  };
  return `http://localhost:${ports[appName]}/remoteEntry.js`;
};

module.exports = {
  entry: "./src/index.js",
  mode: process.env.NODE_ENV || "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
    clean: true,
  },
  devServer: {
    port: 3000,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        breadcrumbs: `breadcrumbs@${getRemoteEntryUrl('breadcrumbs')}`
      },
      shared: {
        react: { 
          singleton: true,
          requiredVersion: false,
          eager: true
        },
        "react-dom": { 
          singleton: true,
          requiredVersion: false,
          eager: true
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
}; 