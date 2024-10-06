import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('dome-container').appendChild(renderer.domElement);

// Add controls to rotate and zoom the camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enablePan = false;

// Create a large sphere that represents the planetarium dome
const geometry = new THREE.SphereGeometry(20, 64, 64);
const textureLoader = new THREE.TextureLoader();
const skyTexture = textureLoader.load('assets/sky_texture.jpg'); // Add a texture of stars or sky

const material = new THREE.MeshBasicMaterial({
    map: skyTexture,
    side: THREE.BackSide, // Render the inside of the sphere
});
const dome = new THREE.Mesh(geometry, material);
scene.add(dome);

// Add ambient light for a natural effect
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Animate the scene
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Adjust camera and renderer on window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Start the animation loop
animate();
