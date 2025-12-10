// Bu dosya src/main.js olarak kullanılacaktır.

// Temizlik için CSS'i yüklüyoruz (tarayıcı kenar boşluklarını sıfırlar)
import './style.css' 

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'; // DRACO SİLİNDİ!


const scene = new THREE.Scene();

// Kamera Ayarları
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// Kamera pozisyonunu modele yakın ayarlıyoruz
camera.position.set(2, 3, 5); 

// Renderer Ayarları
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x87CEEB); // Mavi Arka Plan
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

// !!! DRACO İLE İLGİLİ KOD BLOĞU TAMAMEN KALDIRILDI !!!


loader.load(
  './world.glb', // GÖRECELİ YOL DENEMESİ (En güvenilir Vercel yolu)
  (gltf) => {
    
    // Modelin ölçeği
    gltf.scene.scale.set(0.5, 0.5, 0.5); 
    
    scene.add(gltf.scene);

    // Kontrol hedefi
    controls.target.set(0, 0, 0); 
    
    console.log('Model başarıyla yüklendi: Draco olmadan!');
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% yüklendi');
  },
  (error) => {
    console.error('Model yüklenemedi. Dosya yolu veya sıkıştırma sorunu var.', error);
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