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
      Cube.shiftForward();
      break;
    //e
    case 101:
      Cube.shiftBackward();
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


window._177147 = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 ),
  renderer: new THREE.WebGLRenderer(),
  toUpdate: [],
  animate: function () {
    //need to use _177147 namespace because requestAnimationFrame
    //calls this function from within the scope of the window.
    requestAnimationFrame(_177147.animate);
    _177147.renderer.render(_177147.scene, _177147.camera);
    _177147.controls.update();
    for(var i in _177147.toUpdate) {
      _177147.toUpdate[i].update();
    }
    TWEEN.update();
  },
  createAxisHelper: function () {
    var axes = new THREE.AxisHelper( 40 );
    axes.rotateOnAxis({x:0,y:0,z:1},Math.PI);
    axes.rotateOnAxis({x:0,y:1,z:0},Math.PI);
    this.scene.add(axes);
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
    this.scene.add(text);

    text = createText('<-w   s->', {r:0, g: 255, b: 0});
    text.position.x = axes.position.x;
    text.position.y = axes.position.y + 6;
    text.position.z = axes.position.z;
    text.rotation = axes.rotation;
    text.rotateOnAxis({x:0, y: 0, z:1}, -Math.PI/2);
    this.scene.add(text);

    text = createText('<-q   e->', {r:0, g: 0, b: 255});
    text.position.x = axes.position.x;
    text.position.y = axes.position.y;
    text.position.z = axes.position.z + 5;
    text.rotation = axes.rotation;
    text.rotateOnAxis({x:0, y: 1, z:0}, Math.PI/2);
    this.scene.add(text);
  },
  createLight: function () {
    var ambientLight = new THREE.AmbientLight(0x090909);
    this.scene.add(ambientLight);
    var light = new THREE.PointLight(0xffffff);
    light.position.set(20,20,80);
    light.castShadow = true;
    this.scene.add(light);
    light = new THREE.PointLight(0xffffff);
    light.position.set(-20,-20,-80);
    light.castShadow = true;
    this.scene.add(light);
  },
  createText: function(text, color) {
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
  },
  init: function() {
    this.renderer.setSize( window.innerWidth, window.innerHeight ); 
    this.renderer.setClearColor(new THREE.Color(0xbada99));    
    document.body.appendChild( this.renderer.domElement );
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement),
    this.camera.position.set( 20,20,30 );
    this.createAxisHelper();
    this.createLight();
    this.animate();
  }

}

_177147.init();