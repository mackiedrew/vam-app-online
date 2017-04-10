/**
 * Finds the display width of an element on the client side, in pixels, provided the element ID.
 * @param {String} elementId The HTML id="[ID]" property of the element you want the width of.
 */
export const getPixelWidth = (elementId) => {
  // Select the element from the document by ID
  const element = document.getElementById(elementId)
  console.log(element)
  if (!elementId || !element) {
    return -1
  }
  // Find the current width in pixels as seen by the client
  const pixelWidth = element.clientWidth
  console.log(pixelWidth)
  return pixelWidth
}
