var CubeGrid = (function() {
    // 3D Array representation of the Cube
    // Each square has N rows

    ROW_SIZE = 4;
    NUM_BOXES = Math.pow(ROW_SIZE,3);
    SQUARE_SIZE = Math.pow(ROW_SIZE,2);

    var cube,
        shiftRight,
        shiftLeft,
        printCube,
        reset,
        shiftUp,
        shiftDown,
        shiftBackward,
        shiftForward;

    var toXYZ(pos) = function() {
        var x, y, z;

        x = pos % ROW_SIZE;
        z = Math.floor(pos/ROW_SIZE);
        y = Math.floor((pos - (z * SQUARE_SIZE)) / ROW_SIZE);

        return {
            x: x,
            y: y,
            z: z
        }
    };

    var Box = (function() {
        var x,y,z, position,
            value,
            moveTo,
            animate,
            cube,
            getPosition,
            setPosition;

        position = {x:0,y:0,z:0};

        value = 3;

        moveTo = function(pos) {
            console.log("move to pos x , y , z");
            position = pos;
        };

        animate = function () {
            console.log("animate unimplemented");  
        };

        cube = function() {
            value = Math.pow(value,3);
        };

        getPosition = function() {
            return position;
        };

        setPosition = function(pos) {
            position.x = pos.x;
            position.y = pos.y;
            position.z = pos.z;
        }



        return {
            moveTo: moveTo,
            animate: animate,
            value: value,
            position: position,
            cube: cube,
            getPosition: getPosition,
            setPosition: setPosition
        }
    }());

    var newBox = function(x,y,z) {
        var box = Object.create(Box);
        box.position.x = x;
        box.position.y = y;
        box.position.z = z;
        return box;
    };

    var newEmptyBox = function() {
        var F = Object.create(Box);
        F.value = 0;
        return F;
    };



    blocks = [];

    for (var i = 0; i < cubeSize; i++) {
        blocks[i] = newEmptyBox();
    };

    blocks[8] = newBox();

    cube = [
                 //square 1
                [[ newEmptyBox() , newEmptyBox() , newEmptyBox() ],
                 [ newEmptyBox() , newBox() , newEmptyBox() ],
                 [ newEmptyBox() , newEmptyBox() , newEmptyBox()]],
                //square 2
                [[ newEmptyBox() , newEmptyBox() , newEmptyBox() ],
                 [ newEmptyBox() , newEmptyBox() , newEmptyBox() ],
                 [ newEmptyBox() , newEmptyBox() , newEmptyBox()]],
                //square 3
                [[ newEmptyBox() , newEmptyBox() , newEmptyBox() ],
                 [ newEmptyBox() , newEmptyBox() , newEmptyBox() ],
                 [ newEmptyBox() , newEmptyBox() , newEmptyBox()]]

            ];
    reset = function() {
        cube = [
                 //square 1
                [[ newEmptyBox() , newEmptyBox() , newEmptyBox() ],
                 [ newEmptyBox() , newBox()      , newEmptyBox() ],
                 [ newEmptyBox() , newEmptyBox() , newEmptyBox()]],
                //square 2
                [[ newEmptyBox() , newEmptyBox() , newEmptyBox() ],
                 [ newEmptyBox() , newEmptyBox() , newEmptyBox() ],
                 [ newEmptyBox() , newEmptyBox() , newEmptyBox()]],
                //square 3
                [[ newEmptyBox() , newEmptyBox() , newEmptyBox() ],
                 [ newEmptyBox() , newEmptyBox() , newEmptyBox() ],
                 [ newEmptyBox() , newEmptyBox() , newEmptyBox()]]

                ];
    };
    //thanks to qwook for the idea
    //https://github.com/qwook/4096/blob/master/src/game.js

    lineTrace = function(xOrigin,yOrigin,zOrigin,dir) {
        var 
    }

    shiftRight = function() {
        console.log("shift right");
        var row, square,
            z,x,y,
            firstShift;
        for (z = 0; z < cube.length; z++) {
            square = cube[z];
            for (y = 0; y < square.length; y++) {
                row = square[y];
                firstShift = true;
                for (x = row.length-2; x >= 0; x--) {

                    if(row[x+1].value === row[x].value){
                        row[x+1].cube();
                        row[x].value = 0;
                        firstShift = false;
                    } else if (row[x+1].value === 0) {
                        if (row[x+2] && row[x+2].value == 0) {
                            //should row[x].moveTo() row[x+2].position
                            row[x+2].value = row[x].value;
                            row[x] = 0;
                        } else if (row[x+2] === row[x] && firstShift === true) {
                            //should shift over
                            row[x+2].cube();
                            row[x].value = 0;
                        } else {
                            //should moveTo
                            row[x+1].value = row[x].value;
                            row[x].value = 0;
                            firstShift = false;
                        };
                    };
                };
            };
        };
    }
    shiftLeft = function() {
        console.log("shift left");
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
    }

    shiftUp = function() {
        console.log("shift up");
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
    }

    shiftDown = function() {
        console.log("shift down");
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
    }

    shiftBackward = function() {
        console.log("shift backward");

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
    }

    shiftForward = function () {
        console.log("shiftForward");
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
    }

    printCube = function() {
        var i,j,k,
            str="\n";
        for (i = 0; i < cube.length; i++) {
            square = cube[i];
            for (j = 0; j < square.length; j++) {
                row = square[j];
                for (k = 0; k < row.length; k++) {
                    if(row[k]===undefined || row[k] === 0){
                        str+= 0 + " ";
                    } else {
                        str+= row[k].value + "  ";
                    }
                };
                str += "\n";
            };
            str +="\n";
        };
        console.log(str);
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

CubeGrid.printCube();
CubeGrid.shiftRight();
CubeGrid.printCube();