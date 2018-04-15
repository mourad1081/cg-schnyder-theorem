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
    let size = 50;
    let divisions = 50;

    let gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    let axesHelper = new THREE.AxesHelper(1);
    scene.add(axesHelper);

    controls.update();
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    let points, edges, regions;

    function generateRegions() {
        points = createVertex();
        edges = createEdges(points);
        regions = divideIntoRegions(points, edges);
        let str = "";
        let result = $("#result");
        for(let vertex in regions) {
            let v = regions[vertex]["val"];
            str += "<br>*(ci-dessous) Pour le sommet " + vertex + " = (" + v.x + ", " + v.y + ", " + v.z + ") : <br>";

            for(let k = 1; k <= 3; k++) {
                str += "<br> ===> P" + k + "(" + vertex + ") = {";

                for(let j = 0; j < regions[vertex]["P" + k].length; j++) {
                    let v = regions[vertex]["P" + k][j];
                    str += "(" + v.x + ", " + v.y + ", " + v.z + "),";
                }
                str += "}\n";
            }
        }
        result.html(str + "<br>");
        result.removeClass('d-none');
        $("#btn-compute-regions").prop("disabled", true);
        $("#btn-create-3d-points").prop("disabled", false);
    }

    function compute3DPoints() {
        regions["v0"]["R"] = new THREE.Vector3(9, 0, 0);
        regions["v1"]["R"] = new THREE.Vector3(0, 9, 0);
        regions["v2"]["R"] = new THREE.Vector3(0, 0, 9);
        regions["v3"]["R"] = new THREE.Vector3(2, 5, 2);
        regions["v4"]["R"] = new THREE.Vector3(1, 2, 6);
        regions["v5"]["R"] = new THREE.Vector3(4, 1, 4);
        regions["v6"]["R"] = new THREE.Vector3(6, 2, 1);


        let material = new THREE.PointsMaterial({ size:0.2, color: 0x000000, opacity: 1 });
        let geometry = new THREE.Geometry();


        for(let i = 0; i < points.length; i++) {
            geometry.vertices.push(regions["v" + i]["R"]);

            let materialLine = new THREE.LineDashedMaterial({
                color: 0xffffff,
                linewidth: 1,
                scale: 1,
                dashSize: 1,
                gapSize: 1,
            });
            let geometryLine = new THREE.Geometry();
            geometryLine.vertices.push(
                regions["v" + i]["val"],
                regions["v" + i]["R"],
            );
            let line = new THREE.Line(geometryLine, materialLine);
            scene.add(line);
        }

        let pts = new THREE.Points(geometry, material);
        scene.add(pts);

        $("#btn-create-3d-points").prop("disabled", true);
        $("#btn-generate-orthogonal-surfaces").prop("disabled", false);
        return pts;
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
        // 1 => rouge, ------------------+
        // 2 => vert, -------------------+
        // 3 => bleu --------------------+
        //                               v
        let edges = [
            [points[0], points[1], null, 2, 1], // [0] : node 1, [1] : node 2, [2] True if ->, False if <-, null if -><-, [3] color, [4] "identifiant" de l'edge, pour les demi edges, on repête l'arc mais ils ont le même id.
            [points[1], points[0], null, 1, 1], // [0] : node 1, [1] : node 2, [2] True if ->, False if <-, null if -><-, [3] color

            [points[1], points[2], null, 3, 2],
            [points[2], points[1], null, 2, 2],

            [points[0], points[2], null, 3, 3],
            [points[2], points[0], null, 1, 3],

            [points[6], points[0], true,  1, 4],
            [points[0], points[5], false, 1, 5],
            [points[5], points[6], false, 3, 6],
            [points[6], points[3], false, 1, 7],
            [points[5], points[4], false, 1, 8],
            [points[5], points[3], true,  2, 9],
            [points[4], points[3], false, 3, 10],
            [points[3], points[1], true,  2, 11],
            [points[4], points[1], true,  2, 12],
            [points[6], points[1], true,  2, 13],
            [points[4], points[2], true,  3, 14],
            [points[5], points[2], true,  3, 15],
        ];

        for(let i = 0; i < edges.length; i++) {
            let col;
            if(edges[i][3] === 1)
                col = 0xff0000;
            else if(edges[i][3] === 2)
                col = 0x00ff00;
            else if(edges[i][3] === 3)
                col = 0x0000ff;
            let from, to, dir, len;

            if (edges[i][2] === true) {
                from = edges[i][0].clone();
                to = edges[i][1].clone();
                dir = to.clone().sub(from);
                len = dir.length();

                let direction = new THREE.Vector3().subVectors(to, from).normalize();
                let arrow = new THREE.ArrowHelper(direction, from, len, col, 0.2, 0.2);
                scene.add(arrow);
            }
            else if (edges[i][2] === false) {
                to = edges[i][0].clone();
                from = edges[i][1].clone();
                dir = to.clone().sub(from);
                len = dir.length();

                let direction = new THREE.Vector3().subVectors(to, from).normalize();
                let arrow = new THREE.ArrowHelper(direction, from, len, col, 0.2, 0.2);
                scene.add(arrow);
            }
            else {
                // Demi arrow
                from = edges[i][0].clone();
                to = edges[i][1].clone();
                dir = to.clone().sub(from);
                len = dir.length();

                let direction = new THREE.Vector3().subVectors(to, from).normalize();
                let arrow = new THREE.ArrowHelper(direction, from, len/2, col, 0.2, 0.2);
                scene.add(arrow);
            }
        }
        return edges;
    }

    $(document).on("click", "#btn-compute-regions", () => {
        generateRegions();
    });

    $(document).on("click", "#btn-create-3d-points", () => {
        compute3DPoints();
    });

    $(document).on("click", "#btn-generate-orthogonal-surfaces", () => {
        computeSurfaces2();
    });

    function divideIntoRegions(points, edges) {
        let regions = {};
        // Boundaries of the SWood
        let a1 = points[0], a2 = points[1], a3 = points[2];
        for(let i = 0; i < points.length; i++) {
            // regions of v_i
            regions["v" + i] = [];
            regions["v" + i]["val"] = points[i];
            // On compute P_1(v_i), P_2(v_i), P_3(v_i)
            for (let c = 1; c <= 3; c++) {
                let stack = [];
                stack.push(points[i]);
                let top = stack[stack.length - 1];
                while(stack.length === 1 || (top !== a1 && top !== a2 && top !== a3))
                {
                    let pushed = false;
                    for(let j = 0; j < edges.length; j++) {
                        // ... On récupère les arc où v_i est dedans
                        // + ... juste les arcs sortants...
                        if ((  (edges[j][0] === top && (edges[j][2] === true || edges[j][2] === null))
                            || (edges[j][1] === top &&  edges[j][2] === false))
                            // ... juste les arcs sortants de couleur c
                            && (edges[j][3] === c))
                        {
                            let destination = (edges[j][0] === top) ? edges[j][1] : edges[j][0];
                            stack.push(destination);
                            top = destination;
                            pushed = true;
                        }
                    }
                    // Si nous n'avons pas pu pusher, c'est qu'il n'y
                    // avait plus de destination possible. On arrête.
                    if(!pushed) {
                        break;
                    }
                }
                // On rajoute l'ensemble des sommets impliqué dans P_c(v_i)
                regions["v" + i]["P" + c] = stack.slice();
            }
        }

        console.log(regions);

        return regions;
    }

    function computeSurfaces2() {
        let faces = 9;
        for(let x = 0; x < faces; x++) {
            for(let y = 0; y < faces; y++) {
                for(let z = 0; z < faces; z++) {
                    let geometry = new THREE.BoxGeometry(1, 1, 1);
                    let material = new THREE.MeshBasicMaterial({ color: 0x000000, opacity:0.3 });
                    let cube = new THREE.Mesh(geometry, material);
                    allCubes.push(cube);
                    scene.add(cube);
                    let geo = new THREE.EdgesGeometry(cube.geometry);
                    let mat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
                    let wireframe = new THREE.LineSegments(geo, mat);
                    wireframe.renderOrder = 1;
                    cube.add(wireframe);
                    cube.position.x = x + 0.5;
                    cube.position.y = y + 0.5;
                    cube.position.z = z + 0.5;
                }
            }
        }
        cleanTheScene();
        camera.position.x = 2*faces;
        camera.position.y = 2*faces;
        camera.position.z = 2*faces;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    let allCubes = [];

    function cleanTheScene() {
        // for each point, we remove the cube that
        // are in the octant of the current one
        // (in the direction of the XYZ axes)
        let antichain = [];
        for(let i = 0; i < points.length; i++) {
            antichain.push(regions["v" + i]["R"].clone());
        }
        // for each points
        for(let i = 0; i < antichain.length; i++) {
            // let's consider the ones that
            // are in the octant of the current one
            let cubesToRemove = allCubes.filter(c => c.position.x >= antichain[i].x + 0.5
                                                  && c.position.y > antichain[i].y + 0.5 - 1
                                                  && c.position.z >= antichain[i].z + 0.5);

            for(let j = 0; j < cubesToRemove.length; j++) {
                scene.remove(cubesToRemove[j]);
            }
        }
    }
    animate();
});