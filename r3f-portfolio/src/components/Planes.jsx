

export default function Planes() {

    return <>
        <Plane position={[8, 1.92, 4.2]}/>
        <Plane position={[-10, 1.92, 4.2]}/>
        <Plane position={[-2, 1.92, -7.7]}/>
        <Plane position={[-2, 1.92, 16.2]}/>
        <Plane position={[8, 1.92, 16.2]}/>
        <Plane position={[8, 1.92, -7.7]}/>
    </>
}

function Plane({position}) {
    return <>
            <mesh rotation-x={-Math.PI / 2} position={position}>
            <planeBufferGeometry args={[12, 12]}/>
            <meshBasicMaterial color='#ffffff' />
        </mesh>
    </>
}