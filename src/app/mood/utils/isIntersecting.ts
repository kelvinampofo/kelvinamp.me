export function isIntersecting(
  firstElement: HTMLElement,
  secondElement: HTMLElement,
  tolerance = 0
) {
  const firstRect = firstElement.getBoundingClientRect();
  const secondRect = secondElement.getBoundingClientRect();

  return !(
    firstRect.right + tolerance < secondRect.left ||
    firstRect.left - tolerance > secondRect.right ||
    firstRect.bottom + tolerance < secondRect.top ||
    firstRect.top - tolerance > secondRect.bottom
  );
}
