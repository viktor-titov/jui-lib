const fs = require("fs");
const webpack = require("webpack");
const path = require("path");
const { join, resolve } = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const getPackageJson = function (...args) {
  const packageJSON = JSON.parse(
    fs.readFileSync(join(__dirname, "../package.json")),
  );
  if (!args.length) {
    return packageJSON;
  }
  return args.reduce((out, key) => {
    out[key] = packageJSON[key];
    return out;
  }, {});
};

const {
  name: pkgName,
  version,
  description,
  license,
  author,
  repository,
  homepage,
} = getPackageJson(
  "name",
  "version",
  "description",
  "license",
  "author",
  "repository",
  "homepage",
);

const banner = ` Name: ${pkgName}
 Version: ${version}
 Description: ${description}
 Author: ${author}
 Homepage: ${homepage}
 Repository: ${repository.url}


 This source code is licensed under the ${license} license found in the LICENSE file in the root directory of this source tree.`;

const outputs = [
  {
    output: {
      path: resolve(__dirname, "dist"),
      filename: "[name].common.js",
      library: {
        type: "commonjs",
      },
    },
  },
  {
    output: {
      path: resolve(__dirname, "dist"),
      filename: "[name].umd.js",
      libraryTarget: "umd",
    },
  },
  {
    experiments: {
      outputModule: true,
    },
    output: {
      path: resolve(__dirname, "dist"),
      filename: "[name].esm.js",
      libraryTarget: "module",
    },
  },
  {
    output: {
      path: resolve(__dirname, "dist"),
      filename: "[name].min.js",
    },
  },
];

const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: "[contenthash].css",
  }),
  // Compress images
  //   new ImageMinimizerPlugin({
  //     minimizer: {
  //       implementation: ImageMinimizerPlugin.imageminMinify,
  //       options: {
  //         plugins: [
  //           ["gifsicle", { interlaced: true }],
  //           ["jpegtran", { progressive: true }],
  //           ["optipng", { optimizationLevel: 8 }],
  //           [
  //             "svgo",
  //             {
  //               plugins: [
  //                 {
  //                   name: "preset-default",
  //                   params: {
  //                     overrides: {
  //                       removeViewBox: false,
  //                       addAttributesToSVGElement: {
  //                         params: {
  //                           attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
  //                         },
  //                       },
  //                     },
  //                   },
  //                 },
  //               ],
  //             },
  //           ],
  //         ],
  //       },
  //     },
  //   }),
  new webpack.BannerPlugin(banner),
  new BundleAnalyzerPlugin(),
];

module.exports = {
  plugins,
  target: "web",
	entry: path.join(__dirname, "..", "src", "index.tsx"),
  mode: "production",
  experiments: {
    outputModule: true,
  },
  output: {
    path: resolve(__dirname, "..", "dist"),
    filename: "index.esm.js",
    libraryTarget: "module",
  },
  externals: [
    'lodash',
    // 'jquery',
    'moment',
    'moment-timezone',
    // 'slate',
    // 'emotion',
    // '@emotion/react',
    // '@emotion/css',
    // 'prismjs',
    // 'slate-plain-serializer',
    // 'slate-react',
    // 'react',
    // 'react-dom',
    // 'react-redux',
    // 'redux',
    // 'rxjs',
    // 'react-router',
    // 'react-router-dom',
    // 'd3',
    // 'angular',
    '@grafana/ui',
    '@grafana/runtime',
    '@grafana/data',
  ],

  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".json", ".css"],
    // fallback: {
    //   fs: false,
    // },
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // parallel: true, // Multi-threading
        extractComments: false,
      }),
    ],
  },

  module: {
    strictExportPresence: true, // Strict mod to avoid of importing non-existent objects
    rules: [
      // --- JS | TS USING BABEL
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // Using a cache to avoid of recompilation
          },
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", // translates css into CommonJS
            options: {
              esModule: true,
              // css modules
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]", // format of output
                namedExport: true, // named exports instead of default
              },
            },
          },
          {
            // autoprefixer
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      // --- S/A/SS
      {
        test: /\.(s[ac])ss$/i,
        use: ["sass-loader"],
      },
      // --- IMG
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/img/[hash][ext]",
        },
      },
    ],
  },
};
