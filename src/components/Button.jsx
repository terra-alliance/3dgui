import { useState, useEffect } from "react"
import { useThree } from "@react-three/fiber"
import { Html } from "./Html"

function displayTextWidth(text, font, size) {
  let context = document.createElement("canvas").getContext("2d")
  context.font = size + "px " + font
  return context.measureText(text).width
}

export function Button({
  position = [0, 0, 0],
  onClick,
  text = "Button",
  size = 1,
  rotation = [0, 0, 0],
  font = "Futura Std",
  opacity = 0.3,
  occlude = false,
  textColor = "blue",
  bodyColor = "blue",
  width,
}) {
  const [hovered, setHover] = useState(false)
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto"
    setColorState(bodyColor)
  }, [hovered, bodyColor])

  const { camera } = useThree()
  if (camera.isOrthographicCamera) {
    size *= 100
  }

  const [colorState, setColorState] = useState(bodyColor)

  return (
    <group position={position} rotation={rotation}>
      <mesh
        onClick={onClick}
        onPointerDown={() => setColorState("red")}
        onPointerUp={() => setColorState(bodyColor)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => {
          setHover(false)
          setColorState(bodyColor)
        }}
        rotation-z={90 * (Math.PI / 180)}
      >
        <capsuleGeometry args={[size * 0.7, width || displayTextWidth(text, font, size), 20, 20]} />
        <meshPhongMaterial
          color={colorState}
          transparent='true'
          opacity={hovered ? opacity / 2 : opacity}
          depthWrite={false}
        />
      </mesh>
      <Html transform occlude={occlude} pointerEvents='none'>
        <p
          style={{
            fontWeight: 300,
            userSelect: "none",
            fontSize: size * 40,
            color: textColor,
            fontFamily: font,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </p>
      </Html>
    </group>
  )
}
