import { useState } from "react"
import { useThree } from "@react-three/fiber"
import { Html } from "./Html"
import { Button } from "./Button"

function displayTextWidth(text, font, size) {
  let context = document.createElement("canvas").getContext("2d")
  context.font = size + "px " + font
  return context.measureText(text).width
}

export function Select({
  position = [0, 0, 0],
  text = "Select:",
  size = 1,
  rotation = [0, 0, 0],
  font = "Futura Std",
  opacity = 0.3,
  occlude = false,
  color = "blue",
  width,
  options = [1, 2, 3],
  onChange,
}) {
  const [option, setOption] = useState(0)

  const { camera } = useThree()
  if (camera.type === "OrthographicCamera") {
    size *= 100
  }

  return (
    <group position={position}>
      <Html position={[-displayTextWidth(options[option], font, size) / 2, 0, 0]} transform occlude={occlude} pointerEvents='none'>
        <p
          style={{
            fontWeight: 300,
            userSelect: "none",
            fontSize: size * 40,
            color: color,
            fontFamily: font,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </p>
      </Html>
      <Button
        position={[60, 0, 0]}
        rotation={rotation}
        opacity={opacity}
        occlude={occlude}
        color={color}
        width={width}
        text={options[option]}
        size={size / 100}
        font={font}
        onClick={() => {
          setOption((prev) => (prev + 1) % options.length)
          onChange(options[option + 1])
        }}
      />
    </group>
  )
}
