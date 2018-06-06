<p align="center">
  <img src="https://res.cloudinary.com/cleartrip/image/upload/w_100,h_100/v1528096238/LogoMakr_0iLhlw_hcw6hu.png" width="100px">
</p>
<h3 align="center">
  CloudUp
</h3>

<p align="center">
  A Electron application on uploading images to your cloudinary account based on React, React Router, Webpack, React Hot Loader for rapid application development
</p>

---

<img src="https://res.cloudinary.com/cleartrip/image/upload/v1528285553/cloudUp_newTheme_l8cwyx.gif" width="50%" style="margin-left:24%">

## Installation

CloudUp is currently in beta. Please feel free to report any bugs or error you may come across.

<a href="https://github.com/eeshdarthvader/CloudUp/releases/download/0.0.2/CloudUp-0.0.1-mac.zip">
  <img src="https://www.dropbox.com/s/q16jtzvdtenyl3x/button.svg?raw=1" width="200">
</a>

<sub><strong>v0.0.1 Beta</strong></sub>

#### Development setup

* **Note: requires a node version >= 7 and an npm version >= 4.**

First, clone the repo via git:

```bash
git clone --depth=1 https://github.com/eeshdarthvader/CloudUp.git your-project-name
```

And then install dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```

**Note**: If you can't use [yarn](https://github.com/yarnpkg/yarn), run `npm install`.

Add your Cloudinary preset and api secret key in config file 
```bash
vi app/utils/cloudinaryAccount.js
```

```bash
const CloudinaryConfig = {
	upload_preset: <your_preset>,
	api_key: <your api key>
};
```


## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ npm run dev
```

Alternatively, you can run the renderer and main processes separately. This way, you can restart one process without waiting for the other. Run these two commands **simultaneously** in different console tabs:

```bash
$ npm run start-renderer-dev
$ npm run start-main-dev
```

## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://www.electron.build/multi-platform-build) for dependencies.

Then,

```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

To run End-to-End Test

```bash
$ npm run build
$ npm run test-e2e
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:

```bash
DEBUG_PROD=true npm run package
```

### Module Structure

This boilerplate uses a [two package.json structure](https://github.com/electron-userland/electron-builder/wiki/Two-package.json-Structure). This means, you will have two `package.json` files.

1.  `./package.json` in the root of your project
1.  `./app/package.json` inside `app` folder

### Which `package.json` file to use

**Rule of thumb** is: all modules go into `./package.json` except native modules. Native modules go into `./app/package.json`.

1.  If the module is native to a platform (like node-postgres), it should be listed under `dependencies` in `./app/package.json`
2.  If a module is `import`ed by another module, include it in `dependencies` in `./package.json`. See [this ESLint rule](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md). Examples of such modules are `material-ui`, `redux-form`, and `moment`.
3.  Otherwise, modules used for building, testing and debugging should be included in `devDependencies` in `./package.json`.

## CSS Modules

This boilerplate is configured to use [css-modules](https://github.com/css-modules/css-modules) out of the box.

All `.css` file extensions will use css-modules unless it has `.global.css`.

If you need global styles, stylesheets with `.global.css` will not go through the
css-modules loader. e.g. `app.global.css`

If you want to import global css libraries (like `bootstrap`), you can just write the following code in `.global.css`:

```css
@import '~bootstrap/dist/css/bootstrap.css';
```

## Sass support

If you want to use Sass in your app, you only need to import `.sass` files instead of `.css` once:

```js
import './app.global.scss'
```

## Contributing

Crimp is built on web technologies using [Electron](https://electron.atom.io/) and [React](https://reactjs.org/). Incase, you wish to contribute please submit a [Issue](https://github.com/eeshdarthvader/CloudUp/issues) first outlining the changes you would like to make.

&nbsp;

## Licensing

This project is licensed under [MIT license](https://opensource.org/licenses/MIT).

&nbsp;

## Made by

Eesh Tyagi – [@\EtEesh](https://twitter.com/EtEesh) 🇮🇳
