import { OrthographicCamera, View } from "@react-three/drei"
import { useNavigate } from "react-router-dom"
import { state, compmap } from "./global"
import { createElement } from "react"
import { Color } from "three"

const buttons = [
  { component: "shaderbutton", text: "Button", route: "/button" },
  { component: "shaderbutton", text: "Slider", route: "/slider" },
  { component: "shaderbutton", text: "Checkbox", route: "/checkbox" },
  { component: "shaderbutton", text: "Rating", route: "/rating" },
  { component: "shaderbutton", text: "Select", route: "/select" },
  { component: "shaderbutton", text: "Switch", route: "/switch" },
  { component: "shaderbutton", text: "Toggle", route: "/toggle" },
  { component: "shaderbutton", text: "ShaderButton", route: "/shaderbutton" },
]

export function Menu(p) {
  return (
    <View track={p.view}>
      <OrthographicCamera makeDefault position={[0, 0, 1000]} />
      <ambientLight />
      <pointLight decay={0} intensity={14} position={[0, 0, 1000]} />
      <Buttons />
    </View>
  )
}

state.bodyhue.set(0.66)
state.texthue.set(0.66)

function Buttons() {
  const navigate = useNavigate()

  const bodyColor = new Color()
  bodyColor.setHSL(state.bodyhue.use(), 1, 0.3)

  const height = 50

  return (
    <>
      {buttons.map(({ component, text, route }, i) =>
        createElement(compmap[component], {
          position: [0, -i * height + (buttons.length - 1) * (height / 2), 0],
          text: text,
          font: state.button.font.use(),
          opacity: state.button.opacity.use(),
          bodyColor: bodyColor,
          textColor: "hsl(" + state.texthue.use() * 360 + ", 100%, 50%)",
          size: 0.3,
          onClick: () => navigate(route),
          width: 130,
          key: i,
        })
      )}
    </>
  )
}
