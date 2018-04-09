$(function() {
    let canvas = $("#canvas-holder");
    let scene  = new THREE.Scene();
    let w = canvas.width();
    let h = canvas.height();

    let camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({ alpha:true });
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.panningMode = THREE.HorizontalPanning; // default is THREE.ScreenSpacePanning
    controls.minDistance = 1;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    canvas.append(renderer.domElement);
    camera.position.z = 5;
    camera.position.y = 5;
    let size = 10;
    let divisions = 10;

    let gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );



    controls.update();
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    createSchnyderWoods();
    animate();

    function createSchnyderWoods() {
        let points = createVertex();
        let edges = createEdges(points);
    }
    function createVertex() {
        let material = new THREE.PointsMaterial({ size:0.2, color: 0x000000, opacity: 1 });
        let geometry = new THREE.Geometry();
        let v0 = new THREE.Vector3(0, 0, -4);
        let v1 = new THREE.Vector3(4, 0, 4);
        let v2 = new THREE.Vector3(-4, 0, 4);
        let v3 = new THREE.Vector3( 1, 0,  1);
        let v4 = new THREE.Vector3(-2, 0,  2);
        let v5 = new THREE.Vector3(-1, 0, -1);
        let v6 = new THREE.Vector3( 0, 0, -2);

        let pts = [v0, v1, v2, v3, v4, v5, v6];

        for(let i = 0; i < pts.length; i++)
            geometry.vertices.push(pts[i]);

        let points = new THREE.Points(geometry, material);

        scene.add(points);

        return pts;
    }
    
    function createEdges(points) {
        let material = new THREE.LineBasicMaterial( { color: 0xff0000, size: 10 } );
        let geometry = new THREE.Geometry();
        let edges = [
            [points[0], points[1]],
            [points[1], points[2]],
            [points[2], points[0]],
            [points[0], points[6]],
            [points[0], points[5]],
            [points[5], points[6]],
            [points[6], points[3]],
            [points[5], points[4]],
            [points[5], points[3]],
            [points[4], points[3]],
            [points[3], points[1]],
            [points[4], points[1]],
            [points[6], points[1]],
            [points[4], points[2]],
            [points[5], points[2]],
        ];

        for(let i = 0; i < edges.length; i++) {
            geometry.vertices.push(edges[i][0]);
            geometry.vertices.push(edges[i][1]);
        }

        let line = new THREE.Line(geometry, material);

        scene.add(line);

        return edges;
    }
});