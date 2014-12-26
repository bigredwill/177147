var Box = (function() {
        var x, y, z,
            moveTo,
            animate,
            cube,
            destroy,
            getPosition,
            setPosition,
            createGeometry;

        this.position = {
            x: 0,
            y: 0,
            z: 0
        };

        this.value = DIM;

        createGeometry = function() {
            var geometry = new THREE.BoxGeometry(4, 4, 4);

            var material = new THREE.MeshLambertMaterial();
            var cube = new THREE.Mesh(geometry, material);

            console.log("x: "+ this.position.x + " y: "+this.position.y + " z: "+ this.position.z);

            cube.position.x = this.position.x;
            cube.position.y = this.position.y;
            cube.position.z = this.position.z;

            scene.add(cube);
            toUpdate.push(cube);
        }

        moveTo = function(pos) {
            this.position = pos;
        };

        animate = function() {
            //for moving effect
            console.log("animate unimplemented");
        };

        cube = function() {
            this.value = Math.pow(this.value, 3);
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
            destroy: destroy,
            createGeometry: createGeometry
        }
    }());