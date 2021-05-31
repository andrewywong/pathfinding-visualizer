export function isStartPos(posX, posY, start) {
  return posX === start.x && posY === start.y;
}

export function isFinishPos(posX, posY, finish) {
  return posX === finish.x && posY === finish.y;
}

export function isStartOrFinishPos(posX, posY, start, finish) {
  return isStartPos(posX, posY, start) || isFinishPos(posX, posY, finish);
}
