// import './style.css'
import * as THREE from 'three';
import * as TWEEN from 'tween.js';

class SolarSystem {
  constructor() { 
    
    this.scene = new THREE.Scene();
    this.camera = this.createCamera();
    this.renderer = this.createRenderer();
    
    this.isMobile = window.innerWidth <= 768;

    let earthParams = {
      x : 0, 
      y : -20, 
      r : 20,
      widthSegments : 20 , 
      heightSegments : 20, 
    }
    let sunParams = {
      x : -5, 
      y : 5, 
      r : 4,
      widthSegments : 20 , 
      heightSegments : 20, 
    }

    if(this.isMobile) {
      earthParams = {
        x : 10 , 
        y : -407, 
        r : 400,
        widthSegments : 300 , 
        heightSegments : 300, 
      }
      sunParams = {
        x : 10, 
        y : 407, 
        r : 400,
        widthSegments : 200 , 
        heightSegments : 200, 
      }
    }
    this.earth = this.createEarth(earthParams);
    this.sun = this.createSun(sunParams);

    this.setupLights();
    this.animate();
    this.setupEventListeners();
  }

  // TODO : Parameterize Orthographic Camera Frustum for AutoAdjusting Scenes
  createCamera() {
    const camera = new THREE.OrthographicCamera(-10, 30, 10, -10, 10, 500);
    camera.position.setZ(100);
    return camera;
  }

  createRenderer() {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
  }

  createEarth(params) {
    const earthGeometry = new THREE.SphereGeometry(params.r, params.widthSegments, params.heightSegments);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true,
      wireframeLinewidth: 1,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);

    earth.position.x = params.x;
    earth.position.y = params.y;

    this.scene.add(earth);

    return earth;
  }

  createSun(params) {
    const sunGeometry = new THREE.SphereGeometry(params.r, params.widthSegments, params.heightSegments);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      wireframeLinewidth: 1,
    });

    const sun = new THREE.Mesh(sunGeometry, sunMaterial);

    sun.position.x = params.x;
    sun.position.y = params.y;

    this.scene.add(sun);

    return sun;
  }

  createPoint(position) {
    const pointGeo = new THREE.SphereGeometry(30, 20, 20);
    const pointMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true,
      wireframeLinewidth: 1,
    });
    const point = new THREE.Mesh(pointGeo, pointMaterial);

    point.position.x = position.x;
    point.position.y = position.y;
    point.position.z = position.z;

    this.scene.add(point);

    return point;
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    TWEEN.update();
    this.renderer.render(this.scene, this.camera);
    this.earth.rotation.x += 0.0005;
    this.sun.rotation.y -= 0.001;
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.handleResize());
  }

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  toggleTheme(isLightMode) {
    if (isLightMode) {
      this.sun.material.color.set(0xffffff);
      this.earth.material.color.set(0xffffff)
      this.renderer.setClearColor(0x000000);
    } else {
      this.sun.material.color.set(0x000000);
      this.earth.material.color.set(0x000000)
      this.renderer.setClearColor(0xffffff);
    }

  }

}

const solarSystem = new SolarSystem();


const themeToggleBtn = document.getElementById('themeToggle');

themeToggleBtn.addEventListener('click', () => {
  const isLightMode = document.body.classList.contains('light-mode');

    if (isLightMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
    solarSystem.toggleTheme(isLightMode);
});
