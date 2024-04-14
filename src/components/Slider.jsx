import { useState, useEffect } from "react"
import { Html } from "./Html"
import { useThree } from "@react-three/fiber"
import { useGesture } from "@use-gesture/react"
import { SphereGeometry, MeshPhongMaterial, MeshNormalMaterial } from "three"

const sphereGeometry = new SphereGeometry()

function remap(v, x1, y1, x2, y2) {
  return ((v - x1) * (y2 - x2)) / (y1 - x1) + x2
}

function stepRound(num, step) {
  return Math.round(num / step) * step
}

export function Slider({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  onChange = () => null,
  text,
  min = 0,
  max = 100,
  step = 10,
  fontSize = 0.3,
  font = "Futura Std",
  unit = "",
  occlude,
  bodyColor = "blue",
  textColor = "blue",
  start,
  trackMaterial,
  knobMaterial,
}) {
  const [value, setValue] = useState(start ? remap(start, min, max, -scale[0] / 2, scale[0] / 2) : 0)
  const [active, setActive] = useState(false)
  const [trackHovered, setTrackHovered] = useState(false)
  const [knobHovered, setKnobHovered] = useState(false)
  const knobmaterial = knobMaterial || new MeshNormalMaterial({ transparent: "true", opacity: knobHovered ? 0.7 : 1 })
  const trackmaterial =
    trackMaterial ||
    new MeshPhongMaterial({
      color: bodyColor,
      transparent: true,
      opacity: 0.3,
      shininess: 1,
    })

  const { camera } = useThree()
  if (camera.isOrthographicCamera) {
    fontSize *= 100
  }

  useEffect(() => {
    document.body.style.cursor = trackHovered || knobHovered ? "pointer" : "auto"
  }, [trackHovered, knobHovered])

  const bind = useGesture(
    {
      onDrag: ({ event, offset: [x] }) => {
        event.stopPropagation()
        setValue(stepRound(x, step))
        onChange(stepRound(remap(value, -scale[0] / 2, scale[0] / 2, min, max), step))
      },
      onDragStart: () => {
        setActive(true)
      },
      onDragEnd: () => {
        setActive(false)
      },
    },
    { drag: { bounds: { left: -scale[0] / 2, right: scale[0] / 2 }, from: () => [value] } }
  )

  const handleClick = (x) => {
    const v = stepRound(remap(x, 0, 1, -scale[0] / 2, scale[0] / 2), scale[0] / ((max - min) / step))
    setValue(v)
    onChange(stepRound(remap(v, -scale[0] / 2, scale[0] / 2, min, max), step))
  }

  return (
    <>
      <Html position={[position[0], position[1] + 40, position[2]]} occlude={occlude} transform pointerEvents='none'>
        <span
          style={{
            fontWeight: 300,
            userSelect: "none",
            fontSize: fontSize * 40,
            color: textColor,
            fontFamily: font,
            whiteSpace: "nowrap",
          }}
        >
          {text +
            " " +
            Math.round(stepRound(remap(value, -scale[0] / 2, scale[0] / 2, min, max), step) * 100) / 100 +
            unit}
        </span>
      </Html>
      <mesh
        geometry={sphereGeometry}
        material={knobmaterial}
        onPointerOver={() => setKnobHovered(true)}
        onPointerOut={() => setKnobHovered(false)}
        scale={active ? scale[1] * 0.9 : scale[1]}
        position={[position[0] + value, position[1], position[2]]}
        {...bind()}
      ></mesh>
      <mesh
        onPointerOver={() => setTrackHovered(true)}
        onPointerOut={() => setTrackHovered(false)}
        position={position}
        rotation={[0, 0, 90 * (Math.PI / 180)]}
        material={trackmaterial}
      >
        <capsuleGeometry args={[scale[2], scale[0]]} />
      </mesh>
      <mesh position={position} onPointerDown={(e) => handleClick(e.uv.x)} visible={false}>
        <planeGeometry args={[scale[0] + scale[2] * 2, scale[2] * 2]} />
      </mesh>
    </>
  )
}
