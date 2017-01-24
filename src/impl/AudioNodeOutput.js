"use strict";

class AudioNodeOutput {
  constructor({ node, index }) {
    this.node = node;
    this.index = index|0;
    this.inputs = [];
  }

  connect(destination, input) {
    const target = destination._.inputs[input|0];

    /* istanbul ignore else */
    if (!this.inputs.includes(target)) {
      this.inputs.push(target);
      target.connectFrom(this);
    }
  }

  disconnect(...args) {
    const isTargetDisconnect =
      args.length === 1 ? target => target.node === args[0] :
      args.length === 2 ? target => target.node === args[0] && target.index === args[1] :
      () => true;

    for (let i = this.inputs.length - 1; i >= 0; i--) {
      const target = this.inputs[i];

      if (isTargetDisconnect(target)) {
        target.disconnectFrom(this);
        this.inputs.splice(i, 1);
      }
    }
  }

  isConnectedTo(...args) {
    const isTargetDisconnect =
      args.length === 1 ? target => target.node === args[0] :
      args.length === 2 ? target => target.node === args[0] && target.index === args[1] :
      () => false;

    return this.inputs.some(isTargetDisconnect);
  }
}

module.exports = AudioNodeOutput;
