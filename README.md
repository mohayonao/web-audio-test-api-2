# web-audio-test-api
[![Build Status](https://img.shields.io/travis/mohayonao/web-audio-test-api-2.svg?style=flat-square)](https://travis-ci.org/mohayonao/web-audio-test-api-2)

> Web Audio API for CI

:construction_worker: WIP

## Features

- :white_check_mark: type check
- :white_check_mark: basic validation
- :white_check_mark: change api specification
- :construction_worker: test audio graph
- :construction_worker: test internal parameters
- :construction_worker: recommend best practice (strictly validation)

## Installation

```sh
$ npm install web-audio-test-api@beta
```

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
| [spec:201112]     | 2011-12-15 |      - |      - |      - |      - |
| [spec:201203]     | 2012-03-15 |     11 |      0 |      0 |      0 |
| [spec:201208]     | 2012-08-02 |     14 |      5 |      0 |      0 |
| [spec:201212]     | 2012-12-13 |     14 |     30 |      0 |      0 |
| [spec:201310]     | 2013-10-10 |     10 |     18 |      0 |      2 |
| **[spec:201512]** | 2015-12-08 |     13 |      3 |     20 |     10 |
| [spec:draft]      |          - |     29 |     10 |      5 |     19 |

[spec:201112]: https://www.w3.org/TR/2011/WD-webaudio-20111215/
[spec:201203]: https://www.w3.org/TR/2012/WD-webaudio-20120315/
[spec:201208]: https://www.w3.org/TR/2012/WD-webaudio-20120802/
[spec:201212]: https://www.w3.org/TR/2012/WD-webaudio-20121213/
[spec:201310]: https://www.w3.org/TR/2013/WD-webaudio-20131010/
[spec:201512]: https://www.w3.org/TR/2015/WD-webaudio-20151208/
[spec:draft]: https://webaudio.github.io/web-audio-api/

## License
MIT
