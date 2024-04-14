import { observable } from "@legendapp/state"
export const state = observable()

import { Button } from "./components/Button"
import { Slider } from "./components/Slider"
import { HueSlider } from "./components/HueSlider"
import { Select } from "./components/Select"
import { ShaderButton } from "./components/ShaderButton"
export const compmap = {
  button: Button,
  slider: Slider,
  hueslider: HueSlider,
  select: Select,
  shaderbutton: ShaderButton,
}
