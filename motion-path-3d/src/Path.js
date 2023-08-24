import { Bezier, Point } from 'bezier-js'
import { Box, Sphere, QuadraticBezierLine, PerspectiveCamera } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import _ from 'lodash'

export function Path() {
  const pathPoints = [new Bezier(-5, -5, 0, -10, 0, 0), new Bezier(0, 0, 0, 10, 5, 5)]
  const points = _.flatten([pathPoints[0].getLUT(16), pathPoints[1].getLUT(16)])
  const currentPos = useRef(pathPoints[0].get(0))
  const currentRotation = useRef()
  const currentT = useRef(0)
  const curveIndex = useRef(0)
  const rate = 0.0025
  const poi = useRef()
  const objRef = useRef()
  useEffect(() => {
    console.log(points)
  }, [])

  function moveOnPath(pos, tangent, nextPos) {
    //Math.atan2(speedY, speedX) + 0 * Math.PI/180;
    const oldX = currentPos.current.x
    const oldY = currentPos.current.y

    currentPos.current = pos

    const speedX = currentPos.current.x - oldX
    const speedY = currentPos.current.y - oldY

    //atan2(y2 - y1, x2 - x1)
    const up = new THREE.Vector3(0, 1, 0)
    const axis = new THREE.Vector3(0, 1, 0)
    const _tangent = new THREE.Vector3(tangent.x, 1, tangent.y)
    //const tangent = pointsPath.getTangent(fraction);
    axis.crossVectors(up, _tangent) //.normalize()

    //const radians = Math.acos(up.dot(_tangent))
    objRef.current.lookAt(poi.current.position)

    //objRef.current.quaternion.setFromAxisAngle(axis, radians)
    //currentRotation.current = tangent //radians * (180 / Math.PI)
    //currentRotation.current = Math.atan2(speedY, speedX) + Math.PI / 2
  }

  useFrame((delta) => {
    currentT.current += rate

    if (currentT.current >= 1.0 && curveIndex.current < pathPoints.length) {
      currentT.current = 0.0
      curveIndex.current += 1
    }
    if (curveIndex.current >= pathPoints.length) {
      currentT.current = 1.0
      curveIndex.current = pathPoints.length - 1
    }

    const pos = pathPoints[curveIndex.current].get(currentT.current)
    const tangent = pathPoints[curveIndex.current].normal(currentT.current)
    //console.log(pos)
    const nextPos = pathPoints[curveIndex.current].get(currentT.current + rate)
    moveOnPath(pos, tangent, nextPos)
    objRef.current.position.x = currentPos.current.x
    objRef.current.position.z = currentPos.current.y
    //objRef.current.rotation.y = currentRotation.current
  })

  return (
    <group>
      {points.map((item, index) => (
        <Sphere args={[0.15, 16, 16]} key={index} position={[item.x, 1, item.y]}>
          <meshToonMaterial color={'red'} />
        </Sphere>
      ))}
      <Box args={[1, 1, 1]} position={[5, 1, -5]} ref={poi}>
        <meshToonMaterial color={'limegreen'} />
      </Box>
      <PerspectiveCamera ref={objRef} makeDefault position={[0, 2, 0]} />
    </group>
  )
}
