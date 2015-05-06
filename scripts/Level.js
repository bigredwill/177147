Game.Level = Game.Level || {};

Game.Level = (function(init) {
  var DIMENSION   = init.dim,
      NUM_CUBES   = Math.pow(DIMENSION, 3),
      SQUARE_SIZE = Math.pow(DIMENSION, 2),
      SCALE       = init.scale;

  var cubes = [];

  var toXYZ = function(pos) {
        var x, y, z;


        z = 1 + ((pos - (pos % SQUARE_SIZE)) / SQUARE_SIZE);
        y = 1 + (((pos - (pos % ROW_SIZE)) / ROW_SIZE) % SQUARE_SIZE % ROW_SIZE);
        x = 1 + ((pos) % ROW_SIZE);

        x = x * SCALE;
        y = y * SCALE * -1;
        z = z * SCALE * -1;

        // console.log("pos: "+ pos +" x: " + x + " y: " + y + " z: " + z);
        return {
            x: x,
            y: y,
            z: z 
        }
    };


});