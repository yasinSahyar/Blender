import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'; // 1. DRACOLoader dahil edildi

const scene = new THREE.Scene();

// Kamera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// Kamera pozisyonunu biraz yaklaştırıyoruz (5, 5, 10 yerine 2, 3, 5)
camera.position.set(2, 3, 5); 

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// Arka plan rengini mavi/gök rengi yapıyoruz
renderer.setClearColor(0x87CEEB); 
document.body.appendChild(renderer.domElement);

// Işıklar (Değiştirilmedi, yeterli görünüyor)
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(10, 10, 10);
scene.add(dirLight);

// Yükleyici
const loader = new GLTFLoader();

// 2. DRACO Loader'ı Ayarla ve GLTFLoader'a ekle
const dracoLoader = new DRACOLoader();
// Draco dosyalarının Vercel'de erişileceği kök dizin yolu
// (public/draco/ klasörüne kopyaladığınızı varsayarak)
dracoLoader.setDecoderPath('/draco/'); 
loader.setDRACOLoader(dracoLoader);


loader.load(
  '/world.glb', // 3. YOL DÜZELTİLDİ: Vercel için kök dizinle (/) başlar ve 'public' kullanılmaz. 
  (gltf) => {
    
    // Modelin ölçeği çok büyükse küçült (opsiyonel ama iyi uygulama)
    gltf.scene.scale.set(0.5, 0.5, 0.5); 
    
    scene.add(gltf.scene);

    // OrbitControls'ün hedef noktasını modelin merkezine (0,0,0) ayarla
    controls.target.set(0, 0, 0); 
    
    console.log('Model başarıyla yüklendi ve sahneye eklendi.');
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% yüklendi');
  },
  (error) => {
    console.error('Model yüklenemedi:', error);
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