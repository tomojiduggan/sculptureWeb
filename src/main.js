// declare module '*.glb' {
//     const src: string
//     export default src
// }
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import file3d from '/src/room.glb?url'

const scene = new THREE.Scene()

const light = new THREE.PointLight()
light.position.set(0, 15, 0)
scene.add(light)

const ambientLight = new THREE.AmbientLight(0x404040)
scene.add(ambientLight)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById("canvas").appendChild(renderer.domElement)


const orbit = new OrbitControls(camera, renderer.domElement);
orbit.autoRotate = true
orbit.enabled = false

// Camera positioning
camera.position.set(12, 20, 12);
orbit.update();

const loader = new GLTFLoader()
// loader.load(
//     'room.glb',
//     function (gltf) {

//         scene.add(gltf.scene)
//     },
//     (xhr) => {
//         console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
//     },
//     (error) => {
//         console.log(error)
//     }
// )

async function loadGltf(url){
    let gltf = await loader.loadAsync(url)
    scene.add(gltf.scene)
}
loadGltf(file3d)


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}


function render() {
    renderer.render(scene, camera)
}

function animate() {
    orbit.update()
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);