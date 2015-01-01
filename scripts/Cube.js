var Cube = (function(init) {


    //CONSTANTS
    var DIM, ROW_SIZE, NUM_BOXES, SQUARE_SIZE, SCALE;

    DIM = ROW_SIZE = init.dim;
    NUM_BOXES = Math.pow(ROW_SIZE, 3);
    SQUARE_SIZE = Math.pow(ROW_SIZE, 2);

    SCALE = init.scale;

    //
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

    var Box = (function() {
        var x, y, z,
            moveTo,
            animate,
            cube,
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

            // console.log("x: "+ this.position.x + " y: "+this.position.y + " z: "+ this.position.z);

            cube.position.x = this.position.x;
            cube.position.y = this.position.y;
            cube.position.z = this.position.z;
            this.boxGeometry.cube = cube;
            scene.add(this.boxGeometry.cube);
        };

        moveTo = function(pos) {
            this.oldposition = this.position;
            this.position = pos;

            var position = this.oldposition;
            var target = pos;
            // debugger;
            // this.tween = new TWEEN.Tween(position).to(target, 1000);
            // this.tween = new TWEEN.Tween(position).to(target, 1000);
            this.tween = new TWEEN.Tween({
                x: "10"
            }).to({
                x: "20"
            }, 1000);
            var that = this;
            this.tween.onUpdate(function(){
                //tween object is not getting passed through
                debugger;
                if(position) {
                    that.boxGeometry.cube.position.x = this.position.x;
                    // that.boxGeometry.cube.position.y = this.position.y;
                    // that.boxGeometry.cube.position.z = this.position.z;
                }
                // that.boxGeometry.cube.position.x = target.x;
                // that.boxGeometry.cube.position.y = target.y;
                // that.boxGeometry.cube.position.z = target.z;
            });
            this.tween.start();
            
        };

        animate = function() {
            //for moving effect
            console.log("andimate unimplemented");
        };

        cube = function() {
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
            scene.remove(this.boxGeometry.cube);
        };

        update = function() {
            if(this.tween) {
                this.tween.update();
            }

        };
        

        // createGeometry();

        return {
            moveTo: moveTo,
            animate: animate,
            value: value,
            position: position,
            oldposition: oldposition,
            cube: cube,
            getPosition: getPosition,
            setPosition: setPosition,
            destroy: destroy,
            boxGeometry: this.boxGeometry,
            createGeometry: createGeometry,
            update: update
        }
    }());

    var newBox = function(pos) {
        var box = Object.create(Box);
        box.setPosition(pos);
        box.createGeometry();
        toUpdate.push(box);
        return box;
    };

    var newEmptyBox = function() {
        var F = Object.create(Box);
        F.value = 0;
        return F;
    };

    var addRandomCube = function() {
        // var i, possiblePositions = [];
        // for (i = 0; i < boxes.length; i++) {
        //     if(boxes[i].value === 0) {
        //         possiblePositions.push(i);
        //     }
        // }
        // var pos = possiblePositions[Math.floor(Math.random()*possiblePositions.length)];
        // debugger;
        // boxes[pos] = newBox(toXYZ(pos));
    };

    reset = function() {
        var i;
        boxes = [];
        for (i = 0; i < NUM_BOXES; i++) {
            boxes[i] = newEmptyBox(toXYZ(i));
        };
        // for (i = 0; i < NUM_BOXES; i++) {
        //     boxes[i] = newBox(toXYZ(i));
        // };
        for (i = 0; i < NUM_BOXES; i+= DIM) {
            boxes[i] = newBox(toXYZ(i));
        };
        // boxes[1] = newBox(toXYZ(1));
    };

    printCube = function() {
        var i,
            str = "\n";
        for (i = 0; i < boxes.length; i++) {
            if (i !== 0 && i % ROW_SIZE === 0) {
                str += "\n";
            }
            if (i !== 0 && i % SQUARE_SIZE === 0) {
                str += "\n";
            }
            str += boxes[i].value + " ";
        };
        console.log(str);
    }

    getBoxes = function() {
        var temp = [],
            i = 0;
        for(i = 0; i < boxes.length; i++ )
        {
            if(boxes[i].value != 0) {
                temp.push(boxes[i]);
            }
        }
        return temp;
    }


    //start:    position of block we're checking for
    //dir:      [-1,1] direction of trace
    //skip:     integer [1 = RIGHT/LEFT,DIM = UP/DOWN, SQUARE_SIZE = FRONT/BACK]
    //stop:     position of block to stop at, inclusive
    checkAhead = function(start, dir, skip, stop) {
        var i,
            pos = start,
            didHit = false,
            startBox = boxes[start],
            initVal = startBox.value,
            moved = false;

        // //start one ahead of current box we're checking for
        // //since we can be iterating towards the front of the array,
        // //stop may be less than start, so multiply by direction to make check positive
        
        for (i = start + (skip * dir);
            (stop - i) * dir >= 0; i += skip * dir) {

            if(boxes[i].value === 0) {
                pos = i;
                didHit = false;
            } else if (boxes[i].value === initVal) {
                pos = i;
                didHit = true;
            }
        }
        if(pos !== start) {
            moved = true;
            boxes[pos].destroy;
            if(didHit) {
                startBox.cube();
            }
            console.log(pos);
            console.log(toXYZ(pos));
            console.log(startBox.position);

            startBox.moveTo(toXYZ(pos));
            boxes[pos] = startBox;
            boxes[start] = newEmptyBox();
            
        }
        return {
            position: pos,
            hit: didHit,
            moved: moved
        }
    }

    shiftRight = function() {
        console.log("shift right");
        var row, square,
            z, x, y,
            firstShift;

        for (x = DIM - 1; x < NUM_BOXES; x += DIM) {
            for (var i = (x - 1); i > x - DIM; i--) {
                firstShift = checkAhead(i, 1, 1, x);
            }
        }
        if(firstShift.moved===true) {
            addRandomCube();
        }
    }

    shiftLeft = function() {
        console.log("shift left");
        var row, square,
            i, j, k, x,
            firstShift;


        for (x = 0; x < NUM_BOXES; x += DIM) {
            for (i = (x + 1); i < x + DIM; i++) {
                firstShift = checkAhead(i, -1, 1, x);
            }
        }
        if(firstShift.moved===true) {
            addRandomCube();
        }
    }

    //right left working
    shiftUp = function() {
        console.log("shift up");
        var y, x,
            firstShift;

        for (y = 0; y < NUM_BOXES; y += SQUARE_SIZE) {
            for (x = (y + DIM); x < (y + SQUARE_SIZE); x++) {
                firstShift = checkAhead(x, -1, DIM, y);
            }
        }
        if(firstShift.moved===true) {
            addRandomCube();
        }
    }

    shiftDown = function() {
        console.log("shift down");
        var y, x,
            firstShift;
        for (y = SQUARE_SIZE - 1; y < NUM_BOXES; y += SQUARE_SIZE) {
            for (x = y - DIM; x > y - SQUARE_SIZE; x--) {
                firstShift = checkAhead(x, 1, DIM, y);
            }
        }
        if(firstShift.moved===true) {
            addRandomCube();
        }
    }

    shiftBackward = function() {
        console.log("shift backward");

        var y, x,
            firstShift;

        for (y = NUM_BOXES - (2*SQUARE_SIZE); y > 0; y -= SQUARE_SIZE) {
            for (x = y; x >= y - SQUARE_SIZE; x--) {
                firstShift = checkAhead(x, 1, SQUARE_SIZE, NUM_BOXES - 1);
            }
        }
        if(firstShift.moved===true) {
            addRandomCube();
        }
    }

    shiftForward = function() {
        console.log("shiftForward");

        var y, x,
            firstShift;
        for (y = SQUARE_SIZE; y < NUM_BOXES; y += SQUARE_SIZE) {
            for (x = y; x < y + SQUARE_SIZE; x++) {
                firstShift = checkAhead(x, -1, SQUARE_SIZE, 0);
            }
        }
        if(firstShift.moved===true) {
            addRandomCube();
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
        shiftForward: shiftForward,
        getBoxes: getBoxes
    }
}({
    scale: 10,
    dim: 3
}));

//testing

Cube.reset();
Cube.printCube();