



var scene = new THREE.Scene(); 
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
var renderer = new THREE.WebGLRenderer(); 
renderer.setSize( window.innerWidth, window.innerHeight ); 
document.body.appendChild( renderer.domElement );
camera.position.set( 40,20,30 );
camera.lookAt(new THREE.Vector3(0,0,0));

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var toUpdate = [];



//drawing stuff 
var begin = -20,
  end = 20,
  step = Math.ceil(40/3);

for(var i = begin; i < end; i += step) {

  for( var j = begin; j < end; j+=step) {

    for( var m = begin; m < end; m+=step) {
      var geometry = new THREE.BoxGeometry( 3, 3, 3 ); 
      // var material = new THREE.MeshBasicMaterial( { color: 0xbada55 } ); 
      var material = new THREE.MeshLambertMaterial(  ); 
      var cube = new THREE.Mesh( geometry, material ); 
      cube.position.x = i;
      cube.position.y = j;
      cube.position.z = m;


      scene.add( cube ); 
      toUpdate.push(cube);

      var material = new THREE.MeshPhongMaterial({
        color: 0xbada55
      });
      var text = new THREE.TextGeometry(""+i+" "+j+" "+m,{
        size: 0.75,
        height: 1,
        font: "helvetiker"
      });
      var textMesh = new THREE.Mesh(text, material);

      textMesh.position.set(i-1.5,j,m+.75);



    scene.add(textMesh);
    toUpdate.push(textMesh);

    }
  }
}
renderer.setClearColorHex(0x333F47, 1);
 
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




