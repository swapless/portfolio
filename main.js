import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene() ;
const camera = new THREE.OrthographicCamera(-10,30,10,-10,10,500) ; 
const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg') , 
})

renderer.setPixelRatio(window.devicePixelRatio) ; 
renderer.setSize(window.innerWidth, window.innerHeight) ; 

const earth_geometry = new THREE.SphereGeometry(20,20,20) ; 
const sun_geometry = new THREE.SphereGeometry(5,20,20) ; 
const sphere_material = new THREE.MeshBasicMaterial({
    color: 0xffffff ,
    wireframe : true, 
    wireframeLinewidth : 1,
})

console.log(earth_geometry) ;


const earth = new THREE.Mesh(earth_geometry, sphere_material) ;
const sun = new THREE.Mesh(sun_geometry, sphere_material)

// postions

camera.position.setZ(100) ;

earth.position.y = -20 ; 
earth.position.z = 0 ; 

sun.position.x = -5 ;
sun.position.y = 3 ;
sun.position.z = -100 ;

// postions end 

scene.add(earth, sun) 

function animate(){
    requestAnimationFrame(animate) ;     
    renderer.render(scene, camera) ; 
    earth.rotation.x += 0.0005  
}

animate()