import { useRef, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"
import { enableReactUse } from "@legendapp/state/config/enableReactUse"
enableReactUse()

import { Model } from "./Model"
import { Code } from "./Code"
import { Menu } from "./Menu"

export default function App() {
  const menu = useRef()
  const model = useRef()
  const code = useRef()

  const [size] = useState(100)

  // const codeBlock =
  //   `
  // import { Canvas } from "@react-three/fiber";
  // import { Button } from "3dgui";

  // export default function App() {
  //   return (
  //       <Canvas>
  //         <OrthographicCamera makeDefault position={[0, 0, 600]} />
  //         <Button text='Button' position={[0, 0, 0]} size={` +
  //   size +
  //   `} />
  //       </Canvas>
  //   );
  // }
  // `

  const [width, setWidth] = useState(window.innerWidth / 3 + "px")

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth / 3 + "px")
    })
  }, [])

  return (
    <>
      <div>
        <div
          ref={model}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            margin: "auto",
          }}
        ></div>
        <div
          ref={code}
          style={{
            position: "absolute",
            left: 15,
            top: 15,
            bottom: 15,
            height: "auto",
            width: "23%",
            backgroundColor: "rgba(0,0,255,0.1)",
            borderRadius: "20px",
          }}
        ></div>
        <div
          ref={menu}
          style={{
            position: "absolute",
            right: 15,
            top: 15,
            bottom: 15,
            height: "auto",
            width: "23%", 
            backgroundColor: "rgba(0,0,255,0.1)",
            borderRadius: "20px",
          }}
        ></div>
      </div>
      <Canvas frameloop='demand' onCreated={(state) => (state.gl.autoClear = false)} eventSource={window.root}>
        <Code view={code} />
        <Model view={model} />
        <Menu view={menu} />
      </Canvas>
    </>
  )
}

// <div
//   style={{
//     position: "absolute",
//     justifyContent: "center",
//     alignItems: "center",
//     display: "flex",
//     width: "100%",
//     height: "100%",
//     background: "linear-gradient(0deg, #d9afd9 0%, #b9f5ff 100%)",
//     userSelect: "none",
//   }}
// >
//   <div
//     style={{
//       position: "absolute",
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "center",
//       display: "flex",
//       width: "96%",
//       height: "96%",
//       gap: "2vw",
//     }}
//   >
//     <div
//       style={{
//         position: "relative",
//         flexDirection: "column",
//         height: "100%",
//         flexBasis: "400px",
//         backgroundColor: "rgba(0,0,255,0.1)",
//         borderRadius: "20px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//       }}
//     >
//       <div
//         ref={code}
//         style={{
//           position: "relative",
//           width: "100%",
//           flexGrow: 1,
//         }}
//       ></div>
//       <SyntaxHighlighter
//         language='jsx'
//         style={dracula}
//         codeTagProps={{ style: { lineHeight: "normal" } }}
//         customStyle={{
//           fontSize: "13px",
//           borderRadius: "20px",
//           userSelect: "text",
//           padding: "0px",
//           width: "100%",
//           overflow: "hidden",
//           display: "block",
//           margin: "0px",
//           lineHeight: "normal",
//         }}
//         wrapLongLines={true}
//       >
//         {codeBlock}
//       </SyntaxHighlighter>
//     </div>
//     <div
//       ref={model}
//       style={{
//         position: "relative",
//         height: "100%",
//         flexBasis: "800px",
//         backgroundColor: "rgba(0,0,255,0.1)",
//         borderRadius: "20px",
//       }}
//     ></div>
//     <div
//       ref={menu}
//       style={{
//         position: "relative",
//         height: "100%",
//         flexBasis: "250px",
//         backgroundColor: "rgba(0,0,255,0.1)",
//         borderRadius: "20px",
//       }}
//     ></div>
//   </div>
// </div>
