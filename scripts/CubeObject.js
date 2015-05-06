Game.CubeObject = Game.CubeObject || {};

Game.CubeObject = (function() {
  var x, y, z,
    moveTo,
    animate,
    add,
    destroy,
    getPosition,
    setPosition,
    createGeometry,
    update;

  this.boxGeometry;

  this.position = {
      x: 0,
      y: 0,
      z: 0
  };

  this.oldposition = {
      x: 0,
      y: 0,
      z: 0
  };

  this.tween;
  this.value = DIM;

  createGeometry = function() {

      this.boxGeometry = {};
      this.boxGeometry.geometry = new THREE.BoxGeometry(4, 4, 4);
      this.boxGeometry.material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff, shading: THREE.FlatShading });
      
      var cube = new THREE.Mesh(this.boxGeometry.geometry, this.boxGeometry.material);
      cube.position.x = this.position.x;
      cube.position.y = this.position.y;
      cube.position.z = this.position.z;
      this.boxGeometry.cube = cube;
      scene.add(this.boxGeometry.cube);
  };

  moveTo = function(pos) {
      this.oldposition = this.position;
      this.position = pos;

      this.tween = new TWEEN.Tween(this.oldposition).to(pos, 1000);
      var that = this;
      this.tween.onUpdate(function(){

          if(that.boxGeometry) {
              that.boxGeometry.cube.position.x = this.x;
              that.boxGeometry.cube.position.y = this.y;
              that.boxGeometry.cube.position.z = this.z;
          }
      });
      this.tween.start();
      
  };

  animate = function() {
      //for moving effect
      console.log("andimate unimplemented");
  };

  add = function() {
      // this.value = Math.pow(this.value, 3);

      this.value += this.value;
  };

  getPosition = function() {
      return this.position;
  };

  setPosition = function(pos) {
      this.oldposition.x = this.position.x = pos.x;
      this.oldposition.y = this.position.y = pos.y;
      this.oldposition.z = this.position.z = pos.z;
  };

  destroy = function() {
      //add in animation
      console.log("destroyed");
      if(this.boxGeometry){
          scene.remove(this.boxGeometry.cube);
      }
      // this.boxGeometry = {};
  };

  update = function() {
  };

  return {
      moveTo: moveTo,
      animate: animate,
      value: value,
      position: position,
      oldposition: oldposition,
      add: add,
      getPosition: getPosition,
      setPosition: setPosition,
      destroy: destroy,
      boxGeometry: this.boxGeometry,
      createGeometry: createGeometry,
      update: update
  }
}());