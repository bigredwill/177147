



var scene = new THREE.Scene(); 
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
var renderer = new THREE.WebGLRenderer(); 
renderer.setSize( window.innerWidth, window.innerHeight ); 
document.body.appendChild( renderer.domElement );
camera.position.set( 40,20,60 );
camera.lookAt(new THREE.Vector3(0,0,0));

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var toUpdate = [];



var axes = new THREE.AxisHelper( 40 );
    scene.add(axes);


renderer.setClearColor(new THREE.Color(0xEEEEEE));
 
// Create a light, set its position, and add it to the scene.
var light = new THREE.PointLight(0xffffff);
light.position.set(20,20,80);
scene.add(light);

var animate = function() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
animate();




