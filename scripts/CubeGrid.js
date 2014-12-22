var CubeGrid = (function() {
    // 3D Array representation of the Cube
    // Each square has N rows

    //CONSTANTS
    var DIM, ROW_SIZE, NUM_BOXES, SQUARE_SIZE;

    DIM = ROW_SIZE = 4;
    NUM_BOXES = Math.pow(ROW_SIZE,3);
    SQUARE_SIZE = Math.pow(ROW_SIZE,2);

    var boxes = [];

    var blocks,
        Box,
        shiftRight,
        shiftLeft,
        printCube,
        reset,
        shiftUp,
        shiftDown,
        shiftBackward,
        shiftForward;

    var toXYZ = function(pos) {
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
        var x,y,z,
            moveTo,
            animate,
            cube,
            destroy,
            getPosition,
            setPosition;

        this.position = {x:0,y:0,z:0};
        this.value = 3;

        // value = 3;

        moveTo = function(pos) {
            this.position = pos;
        };

        animate = function () {
            console.log("animate unimplemented");  
        };

        cube = function() {
            this.value = Math.pow(this.value,3);
        };

        getPosition = function() {
            return position;
        };

        setPosition = function(pos) {
            position.x = pos.x;
            position.y = pos.y;
            position.z = pos.z;
        };

        destroy = function() {
            console.log("destroyed");
        };


        return {
            moveTo: moveTo,
            animate: animate,
            value: value,
            position: position,
            cube: cube,
            getPosition: getPosition,
            setPosition: setPosition,
            destroy: destroy
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

    reset = function() {
        var i;
        boxes = [];
        for (i = 0; i < NUM_BOXES; i++) {
            boxes[i] = newEmptyBox();
        };
        boxes[0] = newBox();
        boxes[11] = newBox();
        boxes[8] = newBox();
        boxes[9] = newBox();
    };

    //for debugging purposes
    //visualization inside console
    printCube = function() {
        var i,
            str="\n";
        for (i = 0; i < boxes.length; i++) {
            if (i !== 0 && i % ROW_SIZE === 0) {
                str+="\n";
            }
            if(i !== 0 && i % SQUARE_SIZE === 0) {
                str+="\n";
            }
            str += boxes[i].value + " ";
        };
        console.log(str);
    }


    //start:    position of block we're checking for
    //dir:      [-1,1] direction of trace
    //skip:     integer [1 = RIGHT/LEFT,DIM = UP/DOWN, SQUARE_SIZE = FRONT/BACK]
    //stop:     position of block to stop at, inclusive
    checkAhead = function(start, dir, skip, stop) {
        var i, 
            pos = start, 
            didHit = false,
            initVal = boxes[start].value,
            movedBox;


        if(initVal === 0) {
            return {
                position: pos,
                hit: didHit
            }
        }

        //start one ahead of current box we're checking for
        //since we can be iterating towards the front of the array,
        //stop may be less than start, so multiply by direction to make check positive
        for (i = start + (skip*dir); (stop-i)*dir >= 0; i+= skip*dir) {
            // console.log("\t"+ i + " " + (stop-i)*dir);
            if(boxes[i].value===initVal) {
                // console.log(i+ " ");
                debugger;
                didHit = true;
                pos = i;
                movedBox = boxes[start];

                boxes[i].destroy();
                movedBox.cube();
                movedBox.moveTo(toXYZ(i));
                boxes[i] = movedBox;
                boxes[start] = newEmptyBox();
                return {
                    position: pos,
                    hit: didHit
                }
            } else if(boxes[i].value === 0) {
                didHit = false;
                pos = i;
            } else {
                debugger;
                didHit = true;
                pos = i;
                boxes[start].moveTo(toXYZ(i));
                boxes[i - (skip*dir)] = boxes[start];
                boxes[start] = newEmptyBox();

                return {
                    position: pos,
                    hit: didHit
                }
            }
        };

        //move box to end
        boxes[start].moveTo(toXYZ(i));
        boxes[i - (skip*dir)] = boxes[start];
        boxes[start] = newEmptyBox();
        return {
            position: pos,
            hit: didHit
        }
    }

    shiftRight = function() {
        console.log("shift right");
        var row, square,
            z,x,y,
            firstShift;
        for(x = DIM-1; x < NUM_BOXES; x+=DIM) {
            for (var i = (x-1); i > x - DIM; i--) {
                firstShift = checkAhead(i,1,1,x);
            }
        }
    }

    shiftLeft = function() {
        console.log("shift left");
        var row, square,
            i,j,k,x,
            firstShift;


        for(x = 0; x < NUM_BOXES; x+= DIM) {
            for(i = (x+1); i < x + DIM; i++) {
                firstShift = checkAhead(i,-1,1,x);
            }
        }
    }

    //right left working
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

//testing
// CubeGrid.reset();
// CubeGrid.printCube();
// CubeGrid.shiftRight();
// CubeGrid.shiftRight();
// CubeGrid.printCube();

CubeGrid.reset();
CubeGrid.printCube();
CubeGrid.shiftLeft();
CubeGrid.printCube();