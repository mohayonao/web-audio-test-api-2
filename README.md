# web-audio-test-api
[![Build Status](https://img.shields.io/travis/mohayonao/web-audio-test-api-2.svg?style=flat-square)](https://travis-ci.org/mohayonao/web-audio-test-api-2)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://mohayonao.mit-license.org/)

> Web Audio API for CI

## Features

- :white_check_mark: change api specification
- :white_check_mark: type check assertion
- :white_check_mark: basic validation
- :construction_worker: test audio graph
- :construction_worker: test internal parameters
- :construction_worker: provide best practice (strictly validation)

## Installation

```sh
$ npm install web-audio-test-api@beta
```

## API

- `createAPI(config: string|object): api`
  - `spec:string` name of specification (e.g. "safari")
  - `spec:object` specification object
- `api.install([target: object]): api`
  - `target: object` target object to install api - _default: **global**_
- `api.uninstall([target: object]): api`
  - `target: object` target object to uninstall api - _default: **global**_
- `api.get(apiPath: string): any`
  - `apiPath: string` path of api configuration (e. g. "/AudioNode/connect/selective")
- `api.set(apiPath: string, value: any): any`
  - `apiPath: string` path of api configuration
  - `value: any` value to set

## Quick Example

```js
require("web-audio-test-api").createAPI("chrome:55").install();

const audioContext = new AudioContext();
const oscillator = new OscillatorNode(audioContext, { frequency: 880 });
const gain = new GainNode(audioContext, { gain: 0.5 });

oscillator.connect(gain).connect(audioContext.destination);
```

```js
require("web-audio-test-api").createAPI("safari:10").install();

const audioContext = new webkitAudioContext();
const oscillator = audioContext.createOscillator();
const gain = audioContext.createGain();

oscillator.frequency.value = 880;
oscillator.connect(gain); // safari 10 returns void, so cannot chain the next.

gain.gain.value = 0.5;
gain.connect(audioContext.destination);
```

## Support specifications

| name              | released   | add    | remove | move   | change |
|-------------------|:----------:|:------:|:------:|:------:|:------:|
| **chrome:55**     | 2016-12-01 |      - |      - |      - |      - |
| **firefox:50**    | 2016-11-15 |      - |      - |      - |      - |
| **safari:10**     | 2016-09-20 |      - |      - |      - |      - |
| **edge:38**       | 2016-08-02 |      - |      - |      - |      - |
| **[spec:201512]** | 2015-12-08 |     13 |      3 |     20 |     10 |
| [spec:draft]      |          - |     29 |     10 |      5 |     19 |

[spec:201512]: https://www.w3.org/TR/2015/WD-webaudio-20151208/
[spec:draft]: https://webaudio.github.io/web-audio-api/

## License
MIT
