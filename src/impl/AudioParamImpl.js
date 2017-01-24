"use strict";

function insertEvent(timeline, eventItem) {
  const { time } = eventItem;

  if (timeline.length === 0 || timeline[timeline.length - 1].time < time) {
    timeline.push(eventItem);
    return;
  }

  let pos = 0;
  let replace = 0;

  while (pos < timeline.length) {
    if (timeline[pos].time === time && timeline[pos].type === eventItem.type) {
      replace = 1;
      break;
    }
    if (time < timeline[pos].time) {
      break;
    }
    pos += 1;
  }

  timeline.splice(pos, replace, eventItem);
}

module.exports = { insertEvent };
