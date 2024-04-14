import { Clock } from "three"
const clock = new Clock()

import { material } from "../materials/twistedcolor"
import { useState, useEffect, useRef } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { Html } from "./Html"

function displayTextWidth(text, font, size) {
  let context = document.createElement("canvas").getContext("2d")
  context.font = size + "px " + font
  return context.measureText(text).width
}

export function ShaderButton({
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
  } else {
    width /= 100
  }

  const mesh = useRef()

  const { invalidate } = useThree()

  useFrame(() => {
    mesh.current.material.uniforms.uTime.value = clock.getElapsedTime()
    invalidate()
  })

  const [colorState, setColorState] = useState(bodyColor)

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={mesh}
        onClick={onClick}
        onPointerDown={() => setColorState("red")}
        onPointerUp={() => setColorState(bodyColor)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => {
          setHover(false)
          setColorState(bodyColor)
        }}
        rotation-z={90 * (Math.PI / 180)}
        material={material}
      >
        <capsuleGeometry args={[size * 0.7, width || displayTextWidth(text, font, size), 20, 20]} />
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
