$(function() {
    var points = [];
    var edges = []; 
    var canvas = $("#canvas-holder");
    var scene  = new THREE.Scene();
    var w = canvas.width();
    var h = canvas.height();
    var camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer({ alpha:true });


    //Create a plane that receives shadows (but does not cast them)
    var planeGeometry = new THREE.PlaneBufferGeometry(120, 120);
    var planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // Create a helper for the camera (optional)
    var helper = new THREE.CameraHelper(camera);
    // helper normal plane
    var Nhelper = new THREE.PlaneHelper(plane);


    renderer.setSize(w, h);
    canvas.append(renderer.domElement);


    var materialForLine = new THREE.LineBasicMaterial( { color: 0x0000ff } );

    var geometryForLine = new THREE.Geometry();

    geometryForLine.vertices.push(new THREE.Vector3(-2, 0, 0));
    geometryForLine.vertices.push(new THREE.Vector3( 0, 2, 0));
    geometryForLine.vertices.push(new THREE.Vector3( 2, 0, 0));

    var line = new THREE.Line(geometryForLine, materialForLine);


    scene.add(line);
    scene.add(helper);
    scene.add(plane);


    // By default, when we call scene.add(), the thing we add will be added to the coordinates (0, 0, 0).
    // This would cause both the camera and the cube to be inside each other. 
    // To avoid this, we simply move the camera out a bit.
    camera.position.z = 20;
    camera.lookAt(0, 0, 0);

    function animate() {
        requestAnimationFrame(animate);
        plane.rotation.x += 0.01;
        renderer.render(scene, camera);
    }

    animate();

    var xi = null;
    var yi = null;

    canvas.on('touchstart', (event) => {
        event.preventDefault();
        xi = event.touches[0].pageX / 1000;
        yi = event.touches[0].pageY / 1000;
    });

    canvas.on("touchmove", (event) => {
        event.preventDefault();
        var dx = xi - event.touches[0].pageX / 1000;
        var dy = yi - event.touches[0].pageY / 1000;
        console.log(dx, dy);
        camera.position.x += dx;
        camera.position.y -= dy;
    });


    $("#btn-reset-position-camera").on("click", (event) => {
        event.preventDefault();
        camera.position.x = 0;
        camera.position.y = 0;
    });
    
    $("#btn-reset-rotation-camera").on("click", (event) => {
        event.preventDefault();
        camera.lookAt(0, 0, 0);
    });
    
    $(document).on("keypress", function(event) {
        // alert(event.which);
        if(event.which == 122) //  Z -- en avant
            camera.position.z -= 1;
        if(event.which == 115) // S -- en arrière
            camera.position.z += 1;
        if(event.which == 113) // Q -- à gauche
            camera.position.x += 1;
        if(event.which == 100) // D -- à droite
            camera.position.x -= 1;
    });

    canvas.mousedown(function () {
        
        event.preventDefault();

        var isLeftClick = event.which == 1;
        var isRightClick = event.which == 3;
        var isMiddleClick = event.which == 2;
        var strangeClick = event.which > 3;

        xi = event.pageX / 1000;
        yi = event.pageY / 1000;

        if (isLeftClick) 
        {
            $(this).mousemove(function () {
                event.preventDefault();
                var dx = xi - event.pageX / 1000;
                var dy = yi - event.pageY / 1000;
                console.log("p", dx, dy);
                camera.position.x += dx;
                camera.position.y -= dy;
            });
        }
        else if (isMiddleClick) 
        {
            $(this).mousemove(function () {
                event.preventDefault();
                var dx = xi - event.pageX / 1000;
                var dy = yi - event.pageY / 1000;
                console.log("r", dx, dy);
                camera.rotation.x += dy;
                camera.rotation.y -= dx;
            });
        }
    
    }).mouseup(function () {
        $(this).unbind('mousemove');
    }).mouseout(function () {
        $(this).unbind('mousemove');
    });
});