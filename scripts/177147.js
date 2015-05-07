window._177147 = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 ),
  renderer: new THREE.WebGLRenderer(),
  toUpdate: [],
  Cube: null,
  createAxes: function () {
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

    var text1 = createText('<-a    d->',{r:255, g: 0, b: 0});
    text1.position.x = axes.position.x - 5;
    text1.position.y = axes.position.y;
    text1.position.z = axes.position.z;
    text1.rotation = axes.rotation;
    this.scene.add(text1);

    var text2 = createText('<-w   s->', {r:0, g: 255, b: 0});
    text2.position.x = axes.position.x;
    text2.position.y = axes.position.y + 6;
    text2.position.z = axes.position.z;
    text2.rotation = axes.rotation;
    text2.rotateOnAxis({x:0, y: 0, z:1}, -Math.PI/2);
    this.scene.add(text2);

    var text3 = createText('<-q   e->', {r:0, g: 0, b: 255});
    text3.position.x = axes.position.x;
    text3.position.y = axes.position.y;
    text3.position.z = axes.position.z + 5;
    text3.rotation = axes.rotation;
    text3.rotateOnAxis({x:0, y: 1, z:0}, Math.PI/2);
    this.scene.add(text3);
    return function() {
      axes.visible = !axes.visible;
      text1.visible = !text1.visible;
      text2.visible = !text2.visible;
      text3.visible = !text3.visible;
    };
  },
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
  toggleAxes: function() {
    this.axes();
  },
  init: function() {
    this.renderer.setSize( window.innerWidth, window.innerHeight ); 
    this.renderer.setClearColor(new THREE.Color(0xbada99));    
    document.body.appendChild( this.renderer.domElement );
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement),
    this.camera.position.set( 20,20,30 );
    this.createLight();
    this.axes = this.createAxes();
    this.animate();
  }

}
_177147.init();

(function () {
  $("#new_game").click(function() {
    _177147.Cube.reset({SCALE: 10, DIM: Number(this.nextElementSibling.value)});
    event.preventDefault();
  });
  $("#axes_toggle").click(function() {
    _177147.axes();
    event.preventDefault();
  });
})();

window.addEventListener("keypress", function (event) {
  if (event.defaultPrevented) {
    return; // Should do nothing if the key event was already consumed.
  }
  console.log(event.keyCode);
  switch (event.keyCode) {
    //w
    case 119:
      _177147.Cube.shiftUp();
      break;
    //s
    case 115:
      _177147.Cube.shiftDown();
      break;
    //a
    case 97:
      _177147.Cube.shiftLeft();
      break;
    //d
    case 100:
      _177147.Cube.shiftRight();
      break;
    //q
    case 113:
      _177147.Cube.shiftForward();
      break;
    //e
    case 101:
      _177147.Cube.shiftBackward();
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
  _177147.Cube.printCube();
  event.preventDefault();
}, true);

