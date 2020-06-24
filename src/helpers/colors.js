const hexToRgb = (colorString) => {
  let c= colorString.substring(1).split('');
  if(c.length === 3){
      c= [c[0], c[0], c[1], c[1], c[2], c[2]];
  }
  c= '0x'+c.join('');
  return `rgb(${(c>>16)&255}, ${(c>>8)&255}, ${c&255})`
}

const convertColor = (colorString) => {
  switch (colorType(colorString)) {
    case 'hex':
      return hexToRgb(colorString)
    case 'rgb':
    default:
      return colorString
  }
}

const extractCompose = (colorString) => colorString.split(',').map(value => Number(value.replace(/\D/g,'')))

const colorType = (colorString) => {
  // Test if color is present on the theme provider (if YEP return TRUE)

  // Test if is a valid hexadecimal color
  if(hex_color_regex.test(colorString)) {
    return 'hex'
  }

  // Test if is a valid RGB or RGBA color
  if(rgb_regex.test(colorString)) {
    return 'rgb'
  }

  return false
}

const isValidColor = (colorString) => !!colorType(colorString)

const generatePalette = (colorString, paletteLength = 10) => {
  const colorMain = convertColor(colorString)
  const [r, g, b] = extractCompose(colorMain)
  const colorPalette = Array.from({length: paletteLength})

  const isValid = isValidColor(colorString)

  if(!isValid) return []

  colorPalette.forEach((_, index, arr) => {
    const middle = Math.round((arr.length) / 2)
    if(!index) return colorPalette.splice(middle, 1, colorMain)
    if(middle - index >= 0 && middle + index <= paletteLength) {
      colorPalette.splice(middle + index, 1, `rgb(${r + (35 * index)}, ${g + (35 * index)}, ${b + (35 * index)})`)
      colorPalette.splice(middle - index, 1, `rgb(${r - (35 * index)}, ${g - (35 * index)}, ${b - (35 * index)})`)
    }
  })



  return colorPalette
}



const rgb_regex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
const hex_color_regex = /^#[0-9a-f]{3}([0-9a-f]{3})?$/;

export {colorType,isValidColor, generatePalette}