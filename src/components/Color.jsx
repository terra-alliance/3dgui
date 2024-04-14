import { useState, useEffect, useRef } from "react"
import iro from "@jaames/iro"
import { useThree } from "@react-three/fiber"
import { Button } from "./Button"
import { Html } from "./Html"

function ColorPicker({ setColor, color }) {
  const ref = useRef()

  const colorPicker = useRef()
  useEffect(() => {
    colorPicker.current = new iro.ColorPicker(ref.current, {
      width: 115,
      color: color,
      borderWidth: 3,
    })
    colorPicker.current.on("color:change", (color) => {
      if (setColor) setColor(color.hexString)
    })
  }, [])
  return <div ref={ref} />
}

export function Color({
  position = [0, 0, 0],
  text = "Select:",
  size = 1,
  rotation = [0, 0, 0],
  font = "Futura Std",
  opacity = 0.3,
  occlude = false,
  color = "blue",
  width,
  setColor,
}) {
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState("#f00")

  const { camera } = useThree()
  if (camera.type === "OrthographicCamera") {
    size *= 100
  }

  return (
    <group>
      {show && (
        <>
          <Html position={[0, -120, 0]} occlude={occlude} center>
            <ColorPicker
              color={selected}
              setColor={(color) => {
                setColor(color)
                setSelected(color)
              }}
            />
          </Html>
        </>
      )}
      <Button
        position={position}
        rotation={rotation}
        opacity={opacity}
        occlude={occlude}
        color={color}
        width={width}
        text={text}
        size={size / 100}
        font={font}
        onClick={() => setShow(!show)}
      />
    </group>
  )
}
