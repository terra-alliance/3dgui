import { useState, useEffect } from "react"
import { Html } from "./Html"
import { useThree } from "@react-three/fiber"
import { useGesture } from "@use-gesture/react"
import { SphereGeometry, Vector3, MeshPhongMaterial, Color } from "three"
import CustomShaderMaterial from "three-custom-shader-material/vanilla"

const sphereGeometry = new SphereGeometry()

function remap(v, x1, y1, x2, y2) {
  return ((v - x1) * (y2 - x2)) / (y1 - x1) + x2
}

function stepRound(num, step) {
  return Math.round(num / step) * step
}

export function HueSlider({
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
  textColor = "blue",
  start,
}) {
  var trackMaterial = new CustomShaderMaterial({
    baseMaterial: MeshPhongMaterial,
    uniforms: {
      bboxMin: {
        value: new Vector3(0, scale[0] / 2, 0),
      },
      bboxMax: {
        value: new Vector3(0, -scale[0] / 2, 0),
      },
    },
    vertexShader: `
    uniform vec3 bboxMin;
    uniform vec3 bboxMax;
  
    varying vec2 vUv;

    void main() {
      vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
    fragmentShader: `
    varying vec2 vUv;
    
    vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
    
    void main() {
      vec3 color = vec3(0.0);
      color = hsv2rgb(vec3(vUv.y,1,0.2));
      csm_DiffuseColor = vec4(color, 1.0);
      csm_DiffuseColor.a = 1.0;
    }
  `,
    transparent: true,
    opacity: 0.5,
  })

  const [value, setValue] = useState(start ? remap(start, min, max, -scale[0] / 2, scale[0] / 2) : 0)
  const [active, setActive] = useState(false)
  const [trackHovered, setTrackHovered] = useState(false)
  const [knobHovered, setKnobHovered] = useState(false)

  const knobColor = new Color()
  knobColor.setHSL(stepRound(remap(value, -scale[0] / 2, scale[0] / 2, min, max), step), 1, 0.15)

  const knobMaterial = new MeshPhongMaterial({
    transparent: "true",
    opacity: knobHovered ? 0.7 : 1,
    color: knobColor,
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
    const val = stepRound(remap(x, 0, 1, -scale[0] / 2, scale[0] / 2), scale[0] / ((max - min) / step))
    setValue(val)
    onChange(stepRound(remap(val, -scale[0] / 2, scale[0] / 2, min, max), step))
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
        material={knobMaterial}
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
        material={trackMaterial}
      >
        <capsuleGeometry args={[scale[2], scale[0]]} />
      </mesh>
      <mesh position={position} onPointerDown={(e) => handleClick(e.uv.x)} visible={false}>
        <planeGeometry args={[scale[0] + scale[2] * 2, scale[2] * 2]} />
      </mesh>
    </>
  )
}
