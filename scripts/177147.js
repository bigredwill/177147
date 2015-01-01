Math.linearTween = function (t, b, c, d) {
  return c*t/d + b;
};
  

window.addEventListener("keypress", function (event) {
  if (event.defaultPrevented) {
    return; // Should do nothing if the key event was already consumed.
  }
  console.log(event.keyCode);
  switch (event.keyCode) {
    //w
    case 119:
      Cube.shiftUp();
      break;
    //s
    case 115:
      Cube.shiftDown();
      break;
    //a
    case 97:
      Cube.shiftLeft();
      break;
    //d
    case 100:
      Cube.shiftRight();
      break;
    //q
    case 113:
      Cube.shiftBackward();
      break;
    //e
    case 101:
      Cube.shiftForward();
      break;
    case "Enter":
      // Do something for "enter" or "return" key press.
      break;
    case "Esc":
      // Do something for "esc" key press.
      break;
    default:
      return; // Quit when this doesn't handle the key event.
   // Consume the event for suppressing "double action".
 }
  Cube.printCube();
  event.preventDefault();
}, true);

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
var ambientLight = new THREE.AmbientLight(0x090909);
scene.add(ambientLight);
var light = new THREE.PointLight(0xffffff);
light.position.set(20,20,80);
light.castShadow = true;
scene.add(light);
light = new THREE.PointLight(0xffffff);
light.position.set(-20,-20,-80);
light.castShadow = true;
scene.add(light);



// geometry = new THREE.BoxGeometry(4, 4, 4);
// material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff, shading: THREE.FlatShading });
// var cube = new THREE.Mesh(geometry, material);

// cube.position.x = 10;
// cube.position.y = 10;
// cube.position.z = 10;

// scene.add(cube);

var animate = function() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    // cube.position.x += 0.1;
    for(var i in toUpdate) {
      toUpdate[i].update();
    }

}
animate();









