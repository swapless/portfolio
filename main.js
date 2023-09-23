import * as THREE from 'three';
import * as TWEEN from 'tween.js';
import noise from 'noisejs';

class SolarSystem {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = this.createCamera();
    this.renderer = this.createRenderer();

    this.earth = this.createEarth();
    this.sun = this.createSun();

    this.setupLights();

    this.animate();
    this.setupEventListeners();
    this.generateAndTransitionDisplacementMap();
  }

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

  createEarth() {
    const earthGeometry = new THREE.SphereGeometry(20, 20, 20);
    const earthMaterial = this.createEarthMaterial();
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);

    earth.position.y = -20;
    earth.position.z = 0;

    this.scene.add(earth);

    return earth;
  }

  createEarthMaterial() {
    const displacementMapTexture = this.generateRandomDisplacementMap(64, 64, 1);

    return new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true,
      wireframeLinewidth: 1,
      displacementMap: displacementMapTexture,
    });
  }

  createSun() {
    const sunGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      wireframeLinewidth: 1,
    });

    const sun = new THREE.Mesh(sunGeometry, sunMaterial);

    sun.position.x = -5;
    sun.position.y = 5;
    sun.position.z = 10;

    this.scene.add(sun);

    return sun;
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

  generateRandomDisplacementMap(width, height, displacementScale) {
    const data = new Float32Array(width * height);

    for (let i = 0; i < width * height; i++) {
      data[i] = (Math.random() * 2 - 1) * displacementScale;
    }

    const texture = new THREE.DataTexture(data, width, height, THREE.RedFormat, THREE.FloatType);
    texture.needsUpdate = true;

    return texture;
  }

  generateAndTransitionDisplacementMap() {
    const newDisplacementMapTexture = this.generateRandomDisplacementMap(64, 64, 1);

    const tween = new TWEEN.Tween(this.earth.material.displacementMap)
      .to(newDisplacementMapTexture, 10)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        this.earth.material.displacementMap.needsUpdate = true;
      })
      .start();
  }
}

const solarSystem = new SolarSystem();
