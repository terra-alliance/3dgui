import { useRef, useState, useEffect } from "react"
import { OrbitControls, OrthographicCamera, View } from "@react-three/drei"
import { Route, Routes, Navigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { Color } from "three"

import { Button } from "./components/Button"
import { Slider } from "./components/Slider"
import { Rating } from "./components/Rating"
import { Checkbox } from "./components/Checkbox"
import { state } from "./global"
import { ShaderButton } from "./components/ShaderButton"

export function Model(p) {
  const [orbit, setOrbit] = useState(true)
  const controls = useRef()
  const location = useLocation()

  useEffect(() => {
    switch (location.pathname) {
      case "/button":
        setOrbit(true)
        break
      case "/slider":
        setOrbit(false)
        controls.current?.reset()
        break
      case "/checkbox":
        setOrbit(false)
        controls.current?.reset()
        break
      case "/rating":
        setOrbit(false)
        controls.current?.reset()
        break
      case "/textfield":
        setOrbit(false)
        controls.current?.reset()
        break
    }
  }, [location])

  return (
    <View track={p.view}>
      <OrthographicCamera makeDefault position={[0, 0, 600]} />
      <OrbitControls ref={controls} makeDefault enabled={orbit} enablePan={false} />
      <ambientLight />
      <pointLight decay={0} intensity={14} position={[0, 0, 1000]} />
      <Element />
    </View>
  )
}

state.button.size.set(1.4)

function Element() {
  const bodyColor = new Color()
  bodyColor.setHSL(state.bodyhue.use(), 1, 0.2)
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/button' replace={true} />}></Route>
      <Route
        path='/button'
        element={
          <Button
            text='Button'
            position={[0, 0, 0]}
            width={state.button.width.use()}
            font={state.button.font.use()}
            size={state.button.size.use()}
            opacity={state.button.opacity.use()}
            bodyColor={bodyColor}
            textColor={"hsl(" + state.texthue.use() * 360 + ", 100%, 50%)"}
          />
        }
      />
      <Route
        path='/slider'
        element={
          <Slider
            scale={[400, 15, 5]}
            text={"Value:"}
            min={0}
            max={10}
            step={0.1}
            textColor={"hsl(" + state.texthue.use() * 360 + ", 100%, 50%)"}
          />
        }
      />
      <Route path='/rating' element={<Rating />} />
      <Route path='/checkbox' element={<Checkbox text='Checkbox' position={[0, 0, 0]} size={0.8} />} />
      <Route
        path='/shaderbutton'
        element={
          <ShaderButton
            text='Button'
            position={[0, 0, 0]}
            width={state.button.width.use()}
            font={state.button.font.use()}
            size={state.button.size.use()}
            opacity={state.button.opacity.use()}
            bodyColor={bodyColor}
            textColor={"hsl(" + state.texthue.use() * 360 + ", 100%, 50%)"}
          />
        }
      />
    </Routes>
  )
}
