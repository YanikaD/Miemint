import './style.css';
import * as THREE from 'https://threejs.org/build/three.module.js'; 

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus
const heartShape = new THREE.Shape();

// heartShape.moveTo( 5, 5 );
// heartShape.bezierCurveTo( 5, 5, 4, 0, 0, 0 );
// heartShape.bezierCurveTo( - 6, 0, - 6, 7, - 6, 7 );
// heartShape.bezierCurveTo( - 6, 11, - 2, 15.4, 5, 19 );
// heartShape.bezierCurveTo( 12, 15.4, 16, 11, 16, 7 );
// heartShape.bezierCurveTo( 16, 7, 16, 0, 10, 0 );
// heartShape.bezierCurveTo( 7, 0, 5, 5, 5, 5 );
const x = -2.5;
const y = -5;
heartShape.moveTo((x + 2.5)/2, (y + 2.5)/2);
heartShape.bezierCurveTo((x + 2.5)/2, (y + 2.5)/2, (x + 2)/2, (y)/2, (x)/2, (y)/2);
heartShape.bezierCurveTo((x - 3)/2, (y)/2, (x - 3)/2, (y + 3.5)/2, (x - 3)/2, (y + 3.5)/2);
heartShape.bezierCurveTo((x - 3)/2, (y + 5.5)/2, (x - 1.5)/2, (y + 7.7)/2, (x + 2.5)/2, (y + 9.5)/2);
heartShape.bezierCurveTo((x + 6)/2, (y + 7.7)/2, (x + 8)/2, (y + 4.5)/2, (x + 8)/2, (y + 3.5)/2);
heartShape.bezierCurveTo((x + 8)/2, (y + 3.5)/2, (x + 8)/2, (y)/2, (x + 5)/2, (y)/2);
heartShape.bezierCurveTo((x + 3.5)/2, (y)/2, (x + 2.5)/2, (y + 2.5)/2, (x + 2.5)/2, (y + 2.5)/2);
const extrudeSettings = { depth: 0.5, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.5, bevelThickness: 0.5 };

const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
// const geometry = new THREE.ShapeGeometry(shape, curveSegments);
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(270));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(600).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('Src/space.jpg');
scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('Src/IMG_7999.jpg');

const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load('Src/Earth.webp');
// const normalTexture = new THREE.TextureLoader().load('Src/Earth.png');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(6, 30, 30),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    // normalMap: normalTexture,
  })
);

scene.add(moon);

//Neptune
const neptuneTexture = new THREE.TextureLoader().load('Src/Neptune.jpg');
// const normalTexture = new THREE.TextureLoader().load('Src/Earth.png');

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(5, 30, 30),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
    // normalMap: normalTexture,
  })
);
scene.add(neptune);

neptune.position.z = 75;
neptune.position.setX(-20);

moon.position.z = 32;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.025;
  moon.rotation.y += 0.05;
  moon.rotation.z += 0.025;

  neptune.rotation.x += 0.025;
  neptune.rotation.y += 0.05;
  neptune.rotation.z += 0.025;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  neptune.rotation.x += 0.005;
  // controls.update();

  renderer.render(scene, camera);
}

animate();