import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import typefaceFont from '../static/fonts/helvetiker_regular.typeface.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// scene.background = new THREE.Color( 'aqua' );
/**
 * Fonts
 */

 const fontLoader = new FontLoader()

 fontLoader.load(
    '/fonts/Bobble_Regular.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Sophon',
            {
                font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
       
        // const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        // const material = new THREE.MeshNormalMaterial()
        const material = new THREE.MeshStandardMaterial()
        material.metalness = 0.7
        material.roughness = 0.2
        gui.add(material, 'metalness').min(0).max(1).step(0.0001)
        gui.add(material, 'roughness').min(0).max(1).step(0.0001)

        const cubeTextureLoader = new THREE.CubeTextureLoader()

        const environmentMapTexture = cubeTextureLoader.load([
            '/textures/environmentMaps/1/px.jpg',
            '/textures/environmentMaps/1/nx.jpg',
            '/textures/environmentMaps/1/py.jpg',
            '/textures/environmentMaps/1/ny.jpg',
            '/textures/environmentMaps/1/pz.jpg',
            '/textures/environmentMaps/1/nz.jpg'
        ])

        material.envMap = environmentMapTexture
        // const material = new THREE.MeshBasicMaterial({ wireframe: true })
        const text = new THREE.Mesh(textGeometry,material)
        textGeometry.computeBoundingBox()
        textGeometry.center()
        console.log(textGeometry.boundingBox)
        scene.add(text)

        const donutGeometry = new THREE.TorusGeometry(0.2,0.1,20,30)
        // const donutGeometry = new THREE.RingGeometry(0.2,0.3,32)
        // const donutMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})

        for (let i=0; i<100;i++) {
          
            const donut = new THREE.Mesh(donutGeometry,material)

            gsap.to(donut.rotation, {duration: 6, y: Math.PI * 2, repeat: -1, ease: "none"});


            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            scene.add(donut)

            
        }
    }
 )

 
 
/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)




/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const matcapTexture = textureLoader.load('/textures/matcaps/2.png')

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()