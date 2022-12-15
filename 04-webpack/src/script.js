import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('canvas.webgl');

const sizes = {
  width: 800,
  height: 600
}


// Create Scene
const scene = new THREE.Scene()

//Create Group
const group = new THREE.Group()
scene.add(group)

//Cube 1
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1), 
  new THREE.MeshBasicMaterial({
    color: '#ff0000'
  })
)

//group.position.y = 2
group.add(cube1)

//Cube 2
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1), 
  new THREE.MeshBasicMaterial({
    color: '#00ff00'
  })
)

cube2.position.x = -2
//group.add(cube2)

//Cube 3
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1), 
  new THREE.MeshBasicMaterial({
    color: '#0000ff00'
  })
)

cube3.position.x = 2
//group.add(cube3)


//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.0001, 100)
camera.position.z = 3
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);

//gameloop 

const gameloop = () => {
  requestAnimationFrame(gameloop);
  controls.update();
  renderer.render(scene, camera);
}

gameloop();