_177147.Cube = (function(init) {
    

    //CONSTANTS
    var DIM, NUM_BOXES, SQUARE_SIZE, SCALE, gameColors;

    DIM = init.DIM;
    NUM_BOXES = Math.pow(DIM, 3);
    SQUARE_SIZE = Math.pow(DIM, 2);
    SCALE = init.SCALE;
    gameColors = init.CubeColors;
    


    var onScore = init.onScore,
        onGameOver = init.onGameOver;


    //holds current game tiles
    var boxes = [],
        boundingBox,
        gamescore;

    var Box,    
        shiftRight,
        shiftLeft,
        printCube,
        reset,
        shiftUp,
        shiftDown,
        shiftBackward,
        shiftForward;

    var drawBoundingBox = function() {
        if(boundingBox) {
            _177147.scene.remove(boundingBox);
        }
        var cube = new THREE.Mesh(
            new THREE.CubeGeometry(DIM*SCALE, DIM*SCALE, DIM*SCALE),
            new THREE.MeshBasicMaterial({
                wireframe: true,
                color: 'black'
            })
        );
        
        cube.position.x += DIM*SCALE/2 + 4;
        cube.position.y = cube.position.z -= DIM*SCALE/2 + 4;
        _177147.scene.add(cube); 
        boundingBox = cube;
    }

    drawBoundingBox();

    var toXYZ = function(pos) {
        var x, y, z;


        z = 1 + ((pos - (pos % SQUARE_SIZE)) / SQUARE_SIZE);
        y = 1 + (((pos - (pos % DIM)) / DIM) % DIM % DIM);
        x = 1 + ((pos) % DIM);

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
            add,
            destroy,
            getPosition,
            setPosition,
            createGeometry,
            updateCanvas,
            update;

        this.boxGeometry;

        var position = {
            x: 0,
            y: 0,
            z: 0
        };

        var oldposition = {
            x: 0,
            y: 0,
            z: 0
        };

        // this.tween;
        this.value = DIM;
        this.level;
        createGeometry = function() {
            this.level = 1;
            var size = 4;
            this.boxGeometry = {};
            this.boxGeometry.geometry = new THREE.BoxGeometry(size,size,size);
            var _c = document.createElement("canvas");
            var _cx = _c.getContext("2d");
            _c.width = _c.height = 128;
            _cx.shadowColor = "#fff";
            _cx.shadowBlur = 7;

            _cx.fillStyle = gameColors[this.level-1] || "white";
            _cx.fillRect(0, 0, 128, 128);
            _cx.fillStyle = "black";
            _cx.font = "32pt arial bold";
            _cx.fillText(this.value, 10,64);

            this._cx = _cx;
            this._c = _c;

            this.boxGeometry.material = new THREE.MeshBasicMaterial({ map: new THREE.Texture(this._c), transparent: true });
            this.boxGeometry.material.map.needsUpdate = true;

            var cube = new THREE.Mesh(this.boxGeometry.geometry, this.boxGeometry.material);
            cube.position.x = this.position.x;
            cube.position.y = this.position.y;
            cube.position.z = this.position.z;
            cube.visible = false;
            this.boxGeometry.cube = cube;
            _177147.scene.add(this.boxGeometry.cube);
        };

        updateCanvas = function() {
            var _c = this._c,
                _cx = this._cx;


            _cx.fillStyle = gameColors[this.level-1] || "white";
            _cx.fillRect(0, 0, 128, 128);
            _cx.fillStyle = "black";
            _cx.font = "32pt arial bold";
            _cx.fillText(this.value, 10,64);
            this.boxGeometry.material.map.needsUpdate = true;

            this._cx = _cx;
            this._c = _c;
        }

        moveTo = function(pos) {
            var op = oldposition = this.position;
            this.position = pos;
            var tween = new TWEEN.Tween(oldposition).to(this.position, 400);
            var that = this;
            tween.easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function(){
                if(that.boxGeometry) {
                    that.boxGeometry.cube.position.x = this.x;
                    that.boxGeometry.cube.position.y = this.y;
                    that.boxGeometry.cube.position.z = this.z;
                }
            });
            tween.start();
        };

        add = function() {
            this.level++;
            this.value += this.value;
            gamescore += this.value;
            onScore(gamescore);
            this.updateCanvas();
        };

        getPosition = function() {
            return this.position;
        };

        setPosition = function(pos) {
            oldposition = this.position;
            this.position = pos;
            var that = this;
            var tween = new TWEEN.Tween({s:0.01}).to({s:1}, 200).delay(400);
            tween.onStart(function () {
                if(that.boxGeometry) {
                    that.boxGeometry.cube.visible = true;
                }
            })
            tween.onUpdate(function(){
                if(that.boxGeometry) {
                    s = this.s;
                    that.boxGeometry.cube.scale.set(s,s,s);
                }
            });
            tween.start();
        };

        destroy = function() {
            //could add animation
            if(this.boxGeometry){
                var that = this;
                var tween = new TWEEN.Tween({s:1}).to({s:2}, 500).to({s:0.1}, 100)
                .delay(200)
                .easing(TWEEN.Easing.Bounce.Out)
                .onUpdate(function(){
                    if(that.boxGeometry) {
                        s = this.s;
                        that.boxGeometry.cube.scale.set(s,s,s);
                    }
                })
                .onComplete(function(){
                    _177147.scene.remove(that.boxGeometry.cube);
                })
                .start();

                
            }

        };

        update = function() {
        };

        return {
            moveTo: moveTo,
            value: value,
            position: this.position,
            oldposition: oldposition,
            add: add,
            getPosition: getPosition,
            setPosition: setPosition,
            destroy: destroy,
            boxGeometry: this.boxGeometry,
            createGeometry: createGeometry,
            update: update,
            updateCanvas: updateCanvas
        }
    }());

    var newBox = function(pos) {
        var box = Object.create(Box);
        box.setPosition(pos);
        box.value = DIM;
        box.createGeometry();
        _177147.toUpdate.push(box);
        return box;
    };

    var newEmptyBox = function(pos) {
        var box = Object.create(Box);
        box.value = 0;
        return box;
    };

    var addRandomCube = function() {
        var i, possiblePositions = [];
        for (i = 0; i < boxes.length; i++) {
            if(boxes[i].value === 0) {
                possiblePositions.push(i);
            }
        }
        var pos = possiblePositions[Math.floor(Math.random()*possiblePositions.length)];
        boxes[pos] = newBox(toXYZ(pos));
    };

    getCenterCoordinate = function() {
        debugger;
        return boundingBox.center();
    }

    reset = function(rinit) {

        var i;
        //remove all existing game objects
        for(i = 0; i < NUM_BOXES; i++) {
            if(boxes[i]) {
                boxes[i].destroy();
            }
        }
        //reset "constants"
        DIM = rinit.DIM || DIM;
        NUM_BOXES = Math.pow(DIM, 3);
        SQUARE_SIZE = Math.pow(DIM, 2);
        SCALE = rinit.SCALE;
        //add new game objects
        boxes = [];
        for (i = 0; i < NUM_BOXES; i++) {
            boxes[i] = newEmptyBox();
        };
        for (i = 0; i < DIM; i++) {
            addRandomCube();
        };

        gamescore = 0;


        drawBoundingBox();
        var lookat_ = boundingBox.position;
        _177147.controls.target.set(lookat_.x,lookat_.y,lookat_.z);
    };

    printCube = function() {
        var i,
            str = "\n";
        for (i = 0; i < boxes.length; i++) {
            if (i !== 0 && i % DIM === 0) {
                str += "\n";
            }
            if (i !== 0 && i % SQUARE_SIZE === 0) {
                str += "_________\n";
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

        //start one ahead of current box we're checking for
        //since we can be iterating towards the front of the array,
        //stop may be less than start, so multiply by direction to make check positive
        
        for (i = (start + (skip * dir)); ((stop - i) * dir) >= 0; i += (skip * dir)) {
            if(boxes[i].value === 0) {
                pos = i;
                didHit = false;
            } else if (boxes[i].value === initVal && i!=start) {
                pos = i;
                didHit = true;
            } else {
                break;
            }
        }
        //our box moved was moved from it's beginning position
        if(pos !== start && initVal != 0) {
            moved = true;
            if(didHit) {
                startBox.add();
                boxes[pos].destroy();
            }

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
            shift,
            moved = false;

        for (x = DIM - 1; x < NUM_BOXES; x += DIM) {
            for (var i = (x - 1); i > x - DIM; i--) {
                shift = checkAhead(i, 1, 1, x);
                if(shift.moved) {
                    moved = true;
                }
            }
        }
        if(moved) {
            addRandomCube();
        }
    }

    shiftLeft = function() {
        console.log("shift left");
        var row, square,
            i, j, k, x,
            shift,
            moved = false;


        for (x = 0; x < NUM_BOXES; x += DIM) {
            for (i = (x + 1); i < x + DIM; i++) {
                shift = checkAhead(i, -1, 1, x);
                if(shift.moved) {
                    moved = true;
                }
            }
        }
        if(moved) {
            addRandomCube();
        }
    }

    //right left working
    shiftUp = function() {
        console.log("shift up");
        var y, x,
            shift,
            moved = false;

        for (y = 0; y < NUM_BOXES; y += SQUARE_SIZE) {
            for (x = (y + DIM); x < (y + SQUARE_SIZE); x++) {
                shift = checkAhead(x, -1, DIM, y);
                if(shift.moved) {
                    moved = true;
                }
            }
        }
        if(moved) {
            addRandomCube();
        }
    }

    shiftDown = function() {
        console.log("shift down");
        var y, x,
            shift,
            moved = false;

        for (y = SQUARE_SIZE - 1; y < NUM_BOXES; y += SQUARE_SIZE) {
            for (x = y - DIM; x > y - SQUARE_SIZE; x--) {
                shift = checkAhead(x, 1, DIM, y);
                if(shift.moved) {
                    moved = true;
                }
            }
        }
        if(moved) {
            addRandomCube();
        }
    }

    //still bug
    //skips 2nd to last
    shiftBackward = function() {
        console.log("shift backward");
        var y, x,
            shift,
            moved = false;
        for (y = NUM_BOXES - (SQUARE_SIZE); y > 0; y -= SQUARE_SIZE) {
            for (x = y; x >= y - SQUARE_SIZE; x--) {
                shift = checkAhead(x, 1, SQUARE_SIZE, NUM_BOXES - 1);
                if(shift.moved) {
                    moved = true;
                }
            }
        }
        if(moved) {
            addRandomCube();
        }
    }

    shiftForward = function() {
        console.log("shiftForward");
        var y, x,
            shift,
            moved = false;

        for (y = SQUARE_SIZE; y < NUM_BOXES; y += SQUARE_SIZE) {
            for (x = y; x < y + SQUARE_SIZE; x++) {
                shift = checkAhead(x, -1, SQUARE_SIZE, 0);
                if(shift.moved && !moved) {
                    moved = true;
                }
            }
        }
        if(moved) {
            addRandomCube();
        }
    }

    return {
        boundingBox: boundingBox,
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
    CubeColors: ["#779986", "#88DEB0","#44FA98","#20FF88", "#1AFF84","#FFDBC7","#FFC9AC", "#FFB993", "#FFAA7D", "#FF9D68", "#FF0000"],
    //when score is updated
    onScore: function(score) {
        $("#current_score").text(score);
    },
    onGameOver: function(score) {
        if(score > Number($("#high_score").text())) {
            $("#high_score").text(score);
        }
    },
    SCALE: 10,
    DIM: 3
}));

//parameters optional
_177147.Cube.reset({
    SCALE: 10,
    DIM: 3
});
// Cube.printCube();
