import React, { useState } from 'react';
import styled from 'styled-components';

import {colorType, isValidColor, generatePalette} from './helpers/colors'

const App = () => {
  const [colorBase, setColorBase] = useState('')
  const [colorsQt, setColorsQt] = useState(3)

  return (
    <Container>
      <input
        placeholder='insira a cor base'
        value={colorBase}
        onChange={e => setColorBase(e.target.value)}
      />
      <input
        type='number'
        placeholder='insira a quantidade de cores'
        value={colorsQt}
        onChange={e => setColorsQt(e.target.value)}
      />
      <ColorsPreview>
        {generatePalette(colorBase, colorsQt).map(color => (
          <div key={color} style={{backgroundColor: color}} />
        ))}
      </ColorsPreview>

      <p>{colorType(colorBase)}</p>
      {isValidColor(colorBase) && generatePalette(colorBase, colorsQt)}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;

  input {
    margin: 10px;
    width: 200px;
  }
`

const ColorsPreview = styled.div`
  height: 100px;
  width: 100%;
  display: flex;

  div {
    flex: 1;
    height: 100%;
  }
`

export default App;
