var camera;
var scene;
var renderer;
var mesh;


// var img = new Image();
// img.crossOrigin = "anonymous";
// img.src = "images/bricks.jpg";


  init();
  animate();



// function that does all of the setup required to render the scene

function init() {


    // texture-atlas is an image used for UV maping. It works similar to a spritesheet,
    // where  different parts of the image are assigned to individual faces of our 3D object
    texture = new THREE.TextureLoader().load( "images/texture-atlas.jpg" );

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 20 ).normalize();
    scene.add(light);

    var geometry = new THREE.CubeGeometry( 10, 10, 10);


    var material = new THREE.MeshPhongMaterial( { map: texture} );


    // each of the following arrays contain the vertices of where the subimages are located
    // withing the atlas
    var bricks = [new THREE.Vector2(0, 0.666), new THREE.Vector2(0.5, 0.666), new THREE.Vector2(0.5, 1), new THREE.Vector2(0, 1)];
    var clouds = [new THREE.Vector2(0.5, 0.666), new THREE.Vector2(1, 0.666), new THREE.Vector2(1, 1), new THREE.Vector2(0.5, 1)];
    var crate = [new THREE.Vector2(0, 0.333), new THREE.Vector2(0.5, 0.333), new THREE.Vector2(0.5, 0.666), new THREE.Vector2(0, 0.666)];
    var stone = [new THREE.Vector2(0.5, 0.333), new THREE.Vector2(1, 0.333), new THREE.Vector2(1, 0.666), new THREE.Vector2(0.5, 0.666)];
    var water = [new THREE.Vector2(0, 0), new THREE.Vector2(0.5, 0), new THREE.Vector2(0.5, 0.333), new THREE.Vector2(0, 0.333)];
    var wood = [new THREE.Vector2(0.5, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 0.333), new THREE.Vector2(0.5, 0.333)];

    // The faceVertexUvs property of geometry is an array of arrays that contains the coordinate mapping for each face of the geometry
    // we need two arrays for cube, since we need 2 triangles per cube.
    // the vertices are given in counter clockwise order
    geometry.faceVertexUvs[0][0] = [ bricks[0], bricks[1], bricks[3] ];
    geometry.faceVertexUvs[0][1] = [ bricks[1], bricks[2], bricks[3] ];

    geometry.faceVertexUvs[0][2] = [ clouds[0], clouds[1], clouds[3] ];
    geometry.faceVertexUvs[0][3] = [ clouds[1], clouds[2], clouds[3] ];

    geometry.faceVertexUvs[0][4] = [ crate[0], crate[1], crate[3] ];
    geometry.faceVertexUvs[0][5] = [ crate[1], crate[2], crate[3] ];

    geometry.faceVertexUvs[0][6] = [ stone[0], stone[1], stone[3] ];
    geometry.faceVertexUvs[0][7] = [ stone[1], stone[2], stone[3] ];

    geometry.faceVertexUvs[0][8] = [ water[0], water[1], water[3] ];
    geometry.faceVertexUvs[0][9] = [ water[1], water[2], water[3] ];

    geometry.faceVertexUvs[0][10] = [ wood[0], wood[1], wood[3] ];
    geometry.faceVertexUvs[0][11] = [ wood[1], wood[2], wood[3] ];

    mesh = new THREE.Mesh(geometry, material );
    mesh.position.z = -50;
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

    render();
}


// var z = 500;
// var goesFar = true;
// var goesClose = false;

// This function is where I will update the state of each object in the scene that I want to animate

function animate() {
    mesh.rotation.x += .03;
    mesh.rotation.y += .03;

    // camera.position.set(0, 0, z);
    //
    // if (z === 500) {
    //   goesClose = true;
    //   goesFar = false;
    // } else if (z === -20) {
    //   goesFar = true;
    //   goesClose = false;
    // }
    // if (goesClose) {
    //   z--;
    // } else if (goesFar) {
    //   z++;
    // }

    render();
    requestAnimationFrame( animate );
}

// This function will contain code that will render the results of the state changes from the animate() function.

function render() {
    renderer.render( scene, camera );
}



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}
