npm init -y
npm install lodash
npm install --save-dev webpack webpack-cli

npm run build

npm install --save-dev css-loader style-loader sass-loader
npm install --save-dev webpack-bundle-analyzer
npm install --save-dev webpack-dev-server

"dev": "webpack serve --mode development"
ou
"dev": "webpack serve --mode production"
