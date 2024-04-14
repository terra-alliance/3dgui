import { OrthographicCamera, View } from "@react-three/drei"
import { Slider } from "./components/Slider"
import { Select } from "./components/Select"
import { Route, Routes } from "react-router-dom"
import { state, compmap } from "./global"
import { createElement } from "react"
import { Flex, Box } from "@react-three/flex"

export function Code(p) {
  return (
    <View track={p.view}>
      <OrthographicCamera makeDefault position={[0, 0, 1000]} />
      <ambientLight />
      <pointLight decay={0} intensity={13} position={[0, 0, 1000]} />
      <Menu />
    </View>
  )
}

function Menu() {
  return (
    <Routes>
      <Route path='/button' element={<ButtonMenu />} />
      <Route path='/slider' element={<Slider scale={[400, 15, 5]} text={"Size:"} min={0} max={100} step={1} />} />
      <Route path='/checkbox' element={null} />
      <Route path='/rating' element={null} />
      <Route path='/text' element={null} />
    </Routes>
  )
}

function ButtonMenu() {
  const height = 100
  return (
    <>
      {buttonMenu.map(({ component, ...p }, i) =>
        createElement(compmap[component], {
          font: state.button.font.use(),
          textColor: "hsl(" + state.texthue.use() * 360 + ", 100%, 50%)",
          bodyColor: "hsl(" + state.bodyhue.use() * 360 + ", 100%, 50%)",
          position: [0, -i * height + (buttonMenu.length - 1) * (height / 2), 0],
          key: i,
          ...p,
        })
      )}
    </>
  )
}

const buttonMenu = [
  {
    component: "select",
    text: "Font:",
    size: 0.3,
    options: [
      "Futura",
      "Jura",
      "TimeBurner",
      "Alien League",
      "PixelMono",
      "My Comic Font",
      "Smothy Bubble",
      "Mermaid",
      "Halloween Secret",
    ],
    onChange: state.button.font.set,
  },
  {
    component: "slider",
    scale: [380, 15, 5],
    text: "Size:",
    start: 1,
    min: 0.2,
    max: 2,
    step: 0.01,
    onChange: state.button.size.set,
  },
  {
    component: "slider",
    scale: [380, 15, 5],
    text: "Width:",
    start: 265,
    min: 50,
    max: 400,
    step: 1,
    onChange: state.button.width.set,
  },
  {
    component: "slider",
    scale: [380, 15, 5],
    text: "Opacity:",
    start: 0.3,
    min: 0.1,
    max: 0.9,
    step: 0.01,
    onChange: state.button.opacity.set,
  },
  {
    component: "slider",
    scale: [380, 15, 5],
    text: "Size:",
    start: 1,
    min: 0.2,
    max: 2,
    step: 0.01,
    onChange: state.button.size.set,
  },
  {
    component: "hueslider",
    scale: [380, 15, 5],
    text: "Body Hue:",
    start: 0.66,
    min: 0,
    max: 1,
    step: 0.01,
    onChange: state.bodyhue.set,
  },
  {
    component: "hueslider",
    scale: [380, 15, 5],
    text: "Text Hue:",
    start: 0.66,
    min: 0,
    max: 1,
    step: 0.01,
    onChange: state.texthue.set,
  },
]

function Element() {
  return (
    <Routes>
      <Route
        path='/button'
        element={
          <Flex justify='center' alignItems='center'>
            <Box centerAnchor height={100} r>
              <Select
                text='Font:'
                size={0.3}
                onChange={state.button.font.set}
                options={["Futura", "Cocomat", "Jura"]}
              />
            </Box>
          </Flex>
        }
      />
    </Routes>
  )
}
