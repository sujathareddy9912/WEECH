export function containsFace({outside, inside}) {
  const outsideMaxX = outside.minX + outside.width;
  const insideMaxX = inside.minX + inside.width;

  const outsideMaxY = outside.minY + outside.height;
  const insideMaxY = inside.minY + inside.height;

  if (inside.minX < outside.minX) {
    return false;
  }
  if (insideMaxX > outsideMaxX) {
    return false;
  }
  if (inside.minY < outside.minY) {
    return false;
  }
  if (insideMaxY > outsideMaxY) {
    return false;
  }

  return true;
}
