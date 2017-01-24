"use strict";

class AudioNodeInput {
  constructor({ node, index }) {
    this.node = node;
    this.index = index|0;
    this.outputs = [];
  }

  connectFrom(output) {
    /* istanbul ignore else */
    if (!this.outputs.includes(output)) {
      this.outputs.push(output);
    }
  }

  disconnectFrom(output) {
    const index = this.outputs.indexOf(output);

    /* istanbul ignore else */
    if (index !== -1) {
      this.outputs.splice(index, 1);
    }
  }
}

module.exports = AudioNodeInput;
