var scene = new THREE.Scene(); 
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
var renderer = new THREE.WebGLRenderer(); 
renderer.setSize( window.innerWidth, window.innerHeight ); 
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


var cubeGrid = (function() {
    // 3D Array representation of the Cube
    // Each square has 3 rows
    var cube = [
                 //square 1
                [[ 3 , 0 , 0 ],
                 [ 3 , 3 , 3 ],
                 [ 3 , 0 , 3]],
                //square 2
                [[ 0 , 9 , 3 ],
                 [ 3 , 0 , 0 ],
                 [ 0 , 3 , 0 ]],
                //square 3
                [[ 0 , 0 , 3 ],
                 [ 3 , 0 , 0 ],
                 [ 0 , 3 , 0 ]]];

    var reset = function() {
        cube = [
                 //square 1
                [[ 0 , 0 , 0 ],
                 [ 3 , 9 , 0 ],
                 [ 0 , 0 , 0]],
                //square 2
                [[ 0 , 0 , 0 ],
                 [ 9, 3 , 3 ],
                 [ 0 , 0 , 0]],
                //square 3
                [[ 0 , 0 , 0 ],
                 [ 0 , 3 , 3 ],
                 [ 0 , 0 , 0 ]]];
    };

    var shiftRight = function() {
        console.log("shift right");
        printCube();
        var row, square,
            i,j,k,
            firstShift;
        for (i = 0; i < cube.length; i++) {
            square = cube[i];
            for (j = 0; j < square.length; j++) {
                row = square[j];
                firstShift = true;
                for (k = row.length-2; k >= 0; k--) {

                    if(row[k+1] === row[k]){
                        row[k+1] = row[k+1]*row[k+1];
                        row[k] = 0;
                        firstShift = false;
                    } else if (row[k+1] === 0) {
                        if (row[k+2] == 0) {
                            row[k+2] = row[k];
                            row[k] = 0;
                        } else if (row[k+2] === row[k] && firstShift === true) {
                            row[k+2] = row[k+2] * row[k+2];
                            row[k] = 0;
                        } else {
                            row[k+1] = row[k];
                            row[k] = 0;
                            firstShift = false;
                        };
                    };
                };
            };
        };
        printCube();
    }
    var shiftLeft = function() {
        console.log("shift left");
        printCube();
        var row, square,
            i,j,k,
            firstShift;
        for (i = 0; i < cube.length; i++) {
            square = cube[i];
            for (j = 0; j < square.length; j++) {
                row = square[j];
                firstShift = true;
                for (k = 1; k < row.length; k++) {
                    if(row[k-1] === row[k]){
                        row[k-1] = row[k-1]*row[k-1];
                        row[k] = 0;
                        firstShift = false; 
                    } else if (row[k-1] === 0) {
                        if (row[k-2] == 0) {
                            row[k-2] = row[k];
                            row[k] = 0;
                        } else if (row[k-2] === row[k] && firstShift === true) {
                            row[k-2] = row[k-2] * row[k-2];
                            row[k] = 0;
                        } else {
                            row[k-1] = row[k];
                            row[k] = 0;
                            firstShift = false;
                        };
                    };
                };
            };
        };
        printCube();
    }

    var shiftUp = function() {
        console.log("shift up");
        printCube();
        var row, square,
            prow, frow, //prev row, first row
            i,j,k,
            firstShift;
        for (m = 0; m < cube.length; m++) {
            square = cube[m];
            for (j = 0; j < square[0].length; j++) {
                firstShift = true;
                for (k = 1; k < square.length; k++) {
                    row = square[k];
                    prow = square[k-1];
                    frow = square[k-2];
                    if(prow[j] === row[j]){
                        prow[j] = prow[j]*prow[j];
                        row[j] = 0;
                        firstShift = false; 
                    } else if (prow[j] === 0) {
                        if(square[k-2]){
                            if (square[k-2][j] === 0) {
                            square[k-2][j] = row[j];
                            row[j] = 0;
                            } else if (square[k-2] === row[j] && firstShift == true) {
                                square[k-2][j] = square[k-2] * square[k-2][j];
                                row[j] = 0;
                            } else {
                                prow[j] = row[j];
                                row[j] = 0;
                                firstShift = false;
                            }
                        } else {
                            prow[j] = row[j];
                            row[j] = 0;
                        };
                    };
                };
            };
        };
        printCube();
    }

    var shiftDown = function() {
        console.log("shift down");
        printCube();
        var row, square,
            prow, frow, //prev row, first row
            i,j,k,
            firstShift;
        for (m = 0; m < cube.length; m++) {
            square = cube[m];
            for (j = 0; j < square[0].length; j++) {
                firstShift = true;
                for (k = 1; k >= 0; k--) {
                    row = square[k];
                    prow = square[k+1];
                    frow = square[k+2];
                    if(prow[j] === row[j]){
                        prow[j] = prow[j]*prow[j];
                        row[j] = 0;
                        firstShift = false; 
                    } else if (prow[j] === 0) {
                        if(square[k+2]){
                            if (square[k+2][j] === 0) {
                                square[k+2][j] = row[j];
                                row[j] = 0;
                            } else if (square[k+2] === row[j] && firstShift === true) {
                                square[k+2][j] = square[k+2] * square[k+2][j];
                                row[j] = 0;
                            } else {
                                prow[j] = row[j];
                                row[j] = 0;
                                firstShift = false; 
                            }
                        } else {
                            prow[j] = row[j];
                            row[j] = 0;
                        };
                    };
                };
            };
        };
        printCube();
    }

    var shiftBackward = function() {
        console.log("shift backward");
        printCube();
        var row, square,
            rowLength = cube[0][0].length,
            squareHeight = cube[0].length,
            cubeLength = cube.length,
            cur, prev, first, //current row, prev row, first row
            firstShift,
            c,s,r,b;

            //iterate through all rows in square
        for(s = squareHeight-1; s > 0; s--) {
            //iterate through row
            for(r = 0; r < rowLength; r++) {
                //push through squares to back of cube
                firstShift = true;
                for(b = 1; b >= 0; b--) {
                    cur = cube[b][s][r];
                    prev = cube[b+1][s][r];
                    try {
                        first = cube[b+2][s][r];
                    } catch (e) {
                        first = -1;
                    }
                    if(prev === cur){
                        cube[b+1][s][r] = prev*prev;
                        cube[b][s][r] = 0;
                        firstShift = false;
                    } else if (prev === 0) {
                        if(first !== -1){
                            if (first === 0) {
                                cube[b+2][s][r] = cur;
                                cube[b][s][r] = 0;
                            } else if (first === cur && firstShift === true) {
                                cube[b+2][s][r] = first * first;
                                cube[b][s][r] = 0;
                            } else {
                                // debugger;
                                cube[b+1][s][r] = cur;
                                cube[b][s][r] = 0;
                                firstShift = false;
                            }
                        } else {
                            cube[b+1][s][r] = cur;
                            cube[b][s][r] = 0;
                        };
                    };

                }
            }
        }

        printCube();
    }

    var shiftForward = function () {
        console.log("shiftForward");
        printCube();
        var row, square,
            rowLength = cube[0][0].length,
            squareHeight = cube[0].length,
            cubeLength = cube.length,
            cur, prev, first, //current row, prev row, first row
            firstShift,
            c,s,r,b;
        for(s = 0; s < squareHeight; s++) {
            for(r = 0; r < rowLength; r++) {
                firstShift = true;
                for(b = 1; b < cubeLength; b++) {
                    cur = cube[b][s][r];
                    prev = cube[b-1][s][r];
                    try {
                        first = cube[b-2][s][r];
                    } catch (e) {
                        first = -1;
                    }
                    if(prev === cur){
                        cube[b-1][s][r] = prev*prev;
                        cube[b][s][r] = 0;
                        firstShift = false;
                    } else if (prev === 0) {
                        if(first !== -1){
                            if (first === 0) {
                                cube[b-2][s][r] = cur;
                                cube[b][s][r] = 0;
                            } else if (first === cur && firstShift === true) {
                                cube[b-2][s][r] = first * first;
                                cube[b][s][r] = 0;
                            } else {
                                debugger;
                                cube[b-1][s][r] = cur;
                                cube[b][s][r] = 0;
                                firstShift = false;
                            }
                        } else {
                            cube[b-1][s][r] = cur;
                            cube[b][s][r] = 0;
                        };
                    };

                }
            }
        }

        printCube();
    }

    var printCube = function() {
        var i,j,k,
            str="";
        for (i = 0; i < cube.length; i++) {
            square = cube[i];
            for (j = 0; j < square.length; j++) {
                row = square[j];
                for (k = 0; k < row.length; k++) {
                    if(row[k]===undefined){

                    } else {
                        str+= row[k] + "  ";
                    }
                };
                str += "\n";
            };
            str +="\n";
        };
        console.log(str + "\n");
    }

    return {
        shiftRight: shiftRight,
        shiftLeft: shiftLeft,
        printCube: printCube,
        reset: reset,
        shiftUp: shiftUp,
        shiftDown: shiftDown,
        shiftBackward: shiftBackward,
        shiftForward: shiftForward
    }
}());

cubeGrid.reset();
//left right
cubeGrid.shiftRight();
cubeGrid.reset();
cubeGrid.shiftLeft();
cubeGrid.reset();
// up down
cubeGrid.shiftUp();
cubeGrid.reset();
cubeGrid.shiftDown();
//forward back
cubeGrid.reset();
cubeGrid.shiftForward();
cubeGrid.reset();
cubeGrid.shiftBackward();






//drawing stuff
// scene.add( cuber ); 
var begin = -10,
  end = 10,
  step = Math.ceil(20/3);

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


      material = new THREE.MeshPhongMaterial({
        color: 0xbada55
      });
      var text = new THREE.TextGeometry("fuck",{
        size:1,
        font: "helvetiker",
      });
      var textMesh = new THREE.Mesh(text, material);

      textMesh.position.x = i;
      textMesh.position.y = j;
      textMesh.position.z = m;

      scene.add(textMesh);
      toUpdate.push(textMesh);
      

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

renderer.setClearColorHex(0x333F47, 1);
renderer.render(scene, camera);
