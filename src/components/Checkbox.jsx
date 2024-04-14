import { useState, useEffect } from "react"
import { useThree } from "@react-three/fiber"
import { Text } from "@react-three/drei"

export function Checkbox({
  position = [0, 0, 0],
  onClick,
  text,
  size = 0.2,
  rotation = [0, 0, 0],
  font = "./FuturaStdBook.otf",
  opacity = 0.3,
}) {
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [width, setWidth] = useState(0)
  const { camera } = useThree()

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto"
  }, [hovered])

  if (camera.type === "OrthographicCamera") {
    size *= 100
  }

  return (
    <group>
      {/* <Text
        rotation={rotation}
        position={[position[0], position[1], position[2]]}
        font={font}
        fontSize={size}
        color={"blue"}
        onSync={(text) => setWidth(text.geometry.boundingBox.max.x)}
      >
        {text}
      </Text> */}
      <mesh
        position={[position[0] + width + size, position[1], position[2]]}
        onClick={() => {
          setActive(!active)
          onClick()
        }}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        rotation={[rotation[0], rotation[1], rotation[2] + 90 * (Math.PI / 180)]}
      >
        <sphereGeometry args={[size * 0.7]} />
        <meshPhongMaterial
          color={active ? "green" : "red"}
          transparent='true'
          opacity={active ? (hovered ? opacity : opacity * 2) : hovered ? opacity / 2 : opacity}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
