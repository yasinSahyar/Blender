// Bu kod, artık src/main.js olarak kullanılacaktır.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'; 

// ⚠️ Not: Eğer Three.js Canvas'ı HTML'inizde varsa, buradaki document.body.appendChild satırını kaldırın.

const scene = new THREE.Scene();

// Kamera Ayarları
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(2, 3, 5); 

// Renderer Ayarları
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x87CEEB); 
document.body.appendChild(renderer.domElement);

// Işıklar
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(10, 10, 10);
scene.add(dirLight);

// Yükleyici
const loader = new GLTFLoader();

// DRACO Loader'ı Ayarla (Modelin yüklenmesini garanti eder)
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/'); 
loader.setDRACOLoader(dracoLoader);


loader.load(
  '/world.glb', // KÖK YOL KESİNLİKLE DOĞRU
  (gltf) => {
    
    gltf.scene.scale.set(0.5, 0.5, 0.5); 
    
    scene.add(gltf.scene);

    controls.target.set(0, 0, 0); 
    
    console.log('Model başarıyla yüklendi ve sahneye eklendi.');
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% yüklendi');
  },
  (error) => {
    console.error('Model yüklenemedi. Sunucu dosya yolunu bulamadı veya Draco hatası var.', error);
  }
);

// OrbitControls (fare ile döndürme)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Ekran boyutu değişince yeniden boyutlandır
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});