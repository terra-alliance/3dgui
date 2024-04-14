import { Merged } from "@react-three/drei"
import { ConeGeometry, MeshLambertMaterial, Mesh } from "three"

const material = new MeshLambertMaterial()

let Trees = []
for (let i = -2; i < 3; i++) {
  Trees.push([i * 100])
}

export function Rating() {
  return (
    <Merged meshes={[new Mesh(new ConeGeometry(1, 1, 4), material)]}>
      {(Cone) => (
        <>
          {Trees.map((p, i) => (
            <Tree position={[p[0], 0, 0]} Cone={Cone} key={i} />
          ))}
        </>
      )}
    </Merged>
  )
}

const thickness = 20

function Tree(p) {
  return (
    <group position={p.position}>
      <p.Cone
        position={[0, 25, 0]}
        rotation={[0, 0, 0 * (Math.PI / 180)]}
        scale={[thickness, 50, thickness]}
        color='orange'
      />
      <p.Cone
        position={[
          -(25 * Math.sin(Math.PI * (72 / 180))) / Math.sin(Math.PI * (90 / 180)),
          (25 * Math.sin(Math.PI * (18 / 180))) / Math.sin(Math.PI * (90 / 180)),
          0,
        ]}
        rotation={[0, 0, 72 * (Math.PI / 180)]}
        scale={[thickness, 50, thickness]}
        color='orange'
      />
      <p.Cone
        position={[
          -(25 * Math.sin(Math.PI * (36 / 180))) / Math.sin(Math.PI * (90 / 180)),
          -(25 * Math.sin(Math.PI * (54 / 180))) / Math.sin(Math.PI * (90 / 180)),
          0,
        ]}
        rotation={[0, 0, 144 * (Math.PI / 180)]}
        scale={[thickness, 50, thickness]}
        color='orange'
      />
      <p.Cone
        position={[
          (25 * Math.sin(Math.PI * (36 / 180))) / Math.sin(Math.PI * (90 / 180)),
          -(25 * Math.sin(Math.PI * (54 / 180))) / Math.sin(Math.PI * (90 / 180)),
          0,
        ]}
        rotation={[0, 0, 216 * (Math.PI / 180)]}
        scale={[thickness, 50, thickness]}
        color='orange'
      />
      <p.Cone
        position={[
          (25 * Math.sin(Math.PI * (72 / 180))) / Math.sin(Math.PI * (90 / 180)),
          (25 * Math.sin(Math.PI * (18 / 180))) / Math.sin(Math.PI * (90 / 180)),
          0,
        ]}
        rotation={[0, 0, 288 * (Math.PI / 180)]}
        scale={[thickness, 50, thickness]}
        color='orange'
      />
    </group>
  )
}
