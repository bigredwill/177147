var Game = Game || {};

Game.init = (function() {
  Game.scene = new THREE.Scene();

  Game.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
  Game.renderer = new THREE.WebGLRenderer(); 
  Game.renderer.setSize( window.innerWidth, window.innerHeight ); 
  document.body.appendChild( Game.renderer.domElement );
  Game.camera.position.set( 40,20,60 );
  // camera.lookAt(new THREE.Vector3(0,0,0));

  Game.controls = new THREE.OrbitControls(Game.camera, Game.renderer.domElement);

  var axes = new THREE.AxisHelper( 40 );
  axes.rotateOnAxis({x:0,y:0,z:1},Math.PI);

  axes.rotateOnAxis({x:0,y:1,z:0},Math.PI);
  Game.scene.add(axes);


  renderer.setClearColor(new THREE.Color(0xbada99));
   
  // Create a light, set its position, and add it to the scene.
  var ambientLight = new THREE.AmbientLight(0x090909);
  Game.scene.add(ambientLight);
  var light = new THREE.PointLight(0xffffff);
  light.position.set(20,20,80);
  light.castShadow = true;
  Game.scene.add(light);
  light = new THREE.PointLight(0xffffff);
  light.position.set(-20,-20,-80);
  light.castShadow = true;
  Game.scene.add(light);
  var animate = function() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    // cube.position.x += 0.1;
    // for(var i in toUpdate) {
    //   toUpdate[i].update();
    // }
    TWEEN.update();

  }
  animate();

});