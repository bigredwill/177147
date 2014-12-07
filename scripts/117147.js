
var scene = new THREE.Scene(); 
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
var renderer = new THREE.WebGLRenderer(); 
renderer.setSize( 600, window.innerHeight ); 
document.body.appendChild( renderer.domElement );
camera.position.z = 40;
camera.position.x = 10;
camera.position.y = 12;
camera.lookAt(new THREE.Vector3(0,0,0));

var toUpdate = [];
var size = 20;
var geometry = new THREE.BoxGeometry( size, size, size ); 
var material = new THREE.MeshLambertMaterial( { wireframe: false, color: "rgba(20,50,150,0.1)"} ); 
var cuber = new THREE.Mesh( geometry, material ); 
// cube.position.x = -100;

cuber.position.z = 0;

// scene.add( cuber ); 

var begin = -10,
  end = 10,
  step = Math.ceil(20/3);

for(var i = begin; i < end; i += step) {

  for( var j = begin; j < end; j+=step) {

    for( var m = begin; m < end; m+=step) {
      var geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
      // var material = new THREE.MeshBasicMaterial( { color: 0xbada55 } ); 
      var material = new THREE.MeshLambertMaterial(  ); 
      var cube = new THREE.Mesh( geometry, material ); 
      cube.position.x = i;
      cube.position.y = j;
      cube.position.z = m;
      scene.add( cube ); 
      toUpdate.push(cube);
      

    }
  }
}

var geometry = new THREE.BoxGeometry( 24, 24, 24 ); 
      var material = new THREE.MeshBasicMaterial( { color: 0xbada55, wireframe: true} ); 

      var cube = new THREE.Mesh( geometry, material ); 
      cube.position.x = -6;
      cube.position.y = -6;
      cube.position.z = -8;
      scene.add( cube ); 
      toUpdate.push(cube);



var light = new THREE.PointLight(0xFFFFFF);
light.position.x = 10;
light.position.y = 50;
light.position.z = 130;
scene.add(light);