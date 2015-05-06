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
camera.position.set( 30,15,30 );
// camera.lookAt(new THREE.Vector3(3000,0,0));

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var toUpdate = [];



var axes = new THREE.AxisHelper( 40 );
    axes.rotateOnAxis({x:0,y:0,z:1},Math.PI);

    axes.rotateOnAxis({x:0,y:1,z:0},Math.PI);
    scene.add(axes);
var createText = function(text, color) {
  var  textGeo = new THREE.TextGeometry(text, {
        size: 2,
        height: 0.25,
        curveSegments: 6,
        font: "helvetiker",
        style: "normal"
  });
  var  _color = new THREE.Color();
  _color.setRGB(color.r, color.g, color.b);
  var  textMaterial = new THREE.MeshBasicMaterial({ color: _color });
  var  text = new THREE.Mesh(textGeo , textMaterial);
  return text;
}

var text = createText('<-a    d->',{r:255, g: 0, b: 0});
text.position.x = axes.position.x - 5;
text.position.y = axes.position.y;
text.position.z = axes.position.z;
text.rotation = axes.rotation;
scene.add(text);
var text = createText('<-w   s->', {r:0, g: 255, b: 0});
text.position.x = axes.position.x;
text.position.y = axes.position.y + 6;
text.position.z = axes.position.z;
text.rotation = axes.rotation;
text.rotateOnAxis({x:0, y: 0, z:1}, -Math.PI/2);
scene.add(text);
var text = createText('<-e   q->', {r:0, g: 0, b: 255});
text.position.x = axes.position.x;
text.position.y = axes.position.y;
text.position.z = axes.position.z + 5;
text.rotation = axes.rotation;
text.rotateOnAxis({x:0, y: 1, z:0}, Math.PI/2);
scene.add(text);




renderer.setClearColor(new THREE.Color(0xbada99));
 
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


var animate = function() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    // cube.position.x += 0.1;
    for(var i in toUpdate) {
      toUpdate[i].update();
    }
    TWEEN.update();

}
animate();












