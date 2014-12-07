var CubeGrid = (function() {
    // 3D Array representation of the Cube
    // Each square has 3 rows

    var cube,
        shiftRight,
        shiftLeft,
        printCube,
        reset,
        shiftUp,
        shiftDown,
        shiftBackward,
        shiftForward

    var Box = (function() {
        var x,y,z, position,
            value,
            moveTo,
            animate;

        position = {x:0,y:0,z:0};

        value = 3;

        moveTo = function(pos) {
            console.log("move to pos x , y , z");
            position = pos;
        };

        animate = function () {
            console.log("animate unimplemented");  
        };



        return {
            moveTo: moveTo,
            animate: animate,
            value: value,
            position: position
        }
    }());

    debugger;
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
    }
    var shiftLeft = function() {
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

    var shiftUp = function() {
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

    var shiftDown = function() {
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

    var shiftBackward = function() {
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

    var shiftForward = function () {
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