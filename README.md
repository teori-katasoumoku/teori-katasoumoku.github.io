teori-katasoumoku.github.io
====

## Overview

[teori-katasoumoku.github.io](https://teori-katasoumoku.github.io)

## Requirement

- node.js 6+

## Recommendation

- [EditorConfig](http://editorconfig.org/)
- [riywo/ndenv](https://github.com/riywo/ndenv)
- [riywo/node-build](https://github.com/riywo/node-build)

## Install

``` console
$ git clone git@github.com:teori-katasoumoku/teori-katasoumoku.github.io.git
$ cd teori-katasoumoku.github.io
$ ndenv install
$ npm install
```

## Usage

Run following to show task list:

``` console
$ npm run
```

### Build

build task for production:

``` console
$ npm run build
```

### Develop

build & watch task for development:

``` console
$ npm start
```

### Deploy

このリポジトリは GitHub Pages site for users or organizations なので、
公開したいページは `master` branch に push する必要があります。

これは `source` branch に変更があったタイミングで CircleCI が勝手にやってくれます。

* https://circleci.com/gh/teori-katasoumoku/teori-katasoumoku.github.io

デプロイ対象となるファイルはビルド成果物のみで `public/` 以下のファイルが該当します。

## Licence

[LICENSE](./LICENSE)

## Author

[teori-katasoumoku](https://github.com/teori-katasoumoku)
