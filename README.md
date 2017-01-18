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

#### Chrome
- "chrome"
- "chrome:55"

#### Firefox
- "firefox"
- "firefox:50"

#### Safari
- "safari"
- "safari:10"

#### Edge
- "edge"
- "edge:38"

#### WG
- "spec"
- "spec:201112"
- "spec:201203"
- "spec:201208"
- "spec:201212"
- "spec:201310"
- "spec:201512"
- "spec:draft"

## License
MIT
