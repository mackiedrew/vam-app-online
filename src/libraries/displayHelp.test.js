import { getPixelWidth } from './displayHelp'

describe('getPixelWidth(elementID)', () => {

  it('returns -1 when no elementID is provided', () => {
    expect(getPixelWidth()).toEqual(-1)
  })

  it('returns -1 when the element does not exist', () => {
    expect(getPixelWidth('THIS_ID_SHOULDNT_EXIST')).toEqual(-1)
  })

 

  it('returns a number greater or equal to 0 when the element exists', () => {
    const testWidth = 55
    const testId = 'fake-123'
    const testDiv = document.createElement('div')
    testDiv.innerHTML = 'My name is Jest, and I tend to test. Isn\'t that the best?'
    testDiv.setAttribute('id', testId)
    testDiv.style.width= testWidth
    document.body.appendChild(testDiv)
    console.log(testDiv)
    const pixelWidth = getPixelWidth(testId)
    expect(pixelWidth).toBeGreaterThan(-1)
  })

  it('accurately finds width of element in pixels', () => {
    const pixelWidth = getPixelWidth(testId)
    expect(pixelWidth).toEqual(testWidth)
  })

})