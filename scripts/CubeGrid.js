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
            //for moving effect
            console.log("animate unimplemented");  
        };

        cube = function() {
            this.value = Math.pow(this.value,3);
        };

        getPosition = function() {
            return this.position;
        };

        setPosition = function(pos) {
            this.position.x = pos.x;
            this.position.y = pos.y;
            this.position.z = pos.z;
        };

        destroy = function() {
            //add in animation
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
        for(i = 0; i < 4; i++) {
            boxes[Math.floor(Math.random()*NUM_BOXES-1)] = newBox();
        }
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


        if(i< 0 || initVal === 0) {
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
            debugger;
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
        var y,x,
            firstShift;

        for(y = 0; y < NUM_BOXES; y += SQUARE_SIZE) {
            for(x = (y + DIM); x < (y+SQUARE_SIZE); x++) {
                firstShift = checkAhead(x, -1, DIM, y);
            }
        }
    }

    shiftDown = function() {
        console.log("shift down");
        var y,x,
            firstShift;
        for(y = SQUARE_SIZE-1; y < NUM_BOXES; y += SQUARE_SIZE) {
            for(x = y - DIM; x > y - SQUARE_SIZE; x--) {
                firstShift = checkAhead(x, 1, DIM, y);
            }
        }
    }

    shiftBackward = function() {
        console.log("shift backward");

        var y,x,
            firstShift;
        for(y = NUM_BOXES-SQUARE_SIZE; y > 0; y -= SQUARE_SIZE) {
            for(x = y; x >= y-SQUARE_SIZE; x--) {
                firstShift = checkAhead(x, 1, SQUARE_SIZE, NUM_BOXES-1);
            }
        }
    }

    shiftForward = function () {
        console.log("shiftForward");
        
        var y,x,
            firstShift;
        for(y = SQUARE_SIZE; y < NUM_BOXES; y += SQUARE_SIZE) {
            for(x = y; x < y+SQUARE_SIZE; x++) {
                firstShift = checkAhead(x, -1, SQUARE_SIZE, 0);
            }
        }
        
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

// CubeGrid.reset();
// CubeGrid.printCube();
// CubeGrid.shiftLeft();
// CubeGrid.printCube();

CubeGrid.reset();
CubeGrid.printCube();
CubeGrid.shiftForward();
CubeGrid.printCube();