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
const sun_geometry = new THREE.SphereGeometry(4,20,20) ; 

const earth_sphere_material = new THREE.MeshBasicMaterial({
    color: 0xffffff ,
    wireframe : true, 
    wireframeLinewidth : 1,
})

const sun_sphere_material = new THREE.MeshBasicMaterial({
  color: 0xffffff ,
  wireframe : true, 
  wireframeLinewidth : 1,
})

console.log(earth_geometry) ;


const earth = new THREE.Mesh(earth_geometry, earth_sphere_material) ;
const sun = new THREE.Mesh(sun_geometry, sun_sphere_material)

// postions

camera.position.setZ(100) ;

earth.position.y = -20 ; 
earth.position.z = 0 ; 

sun.position.x = -5 ;
sun.position.y = 5 ;
sun.position.z = 10 ;

// postions end 

scene.add(earth, sun) 

function animate(){
    requestAnimationFrame(animate) ;     
    renderer.render(scene, camera) ; 
    earth.rotation.x += 0.0005  ;
    sun.rotation.y -= 0.001 ;
}

animate()

window.addEventListener('resize',()=>{
  const width = window.innerWidth ; 
  const height = window.innerHeight ;
  camera.aspect = width/height ;
  camera.updateProjectionMatrix() ;
  renderer.setSize(width,height) ;  
})
