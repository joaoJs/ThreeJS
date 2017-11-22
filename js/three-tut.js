var camera;
var scene;
var renderer;
var mesh;

init();
animate();

// function that does all of the setup required to render the scene

function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 20 ).normalize();
    scene.add(light);

    var geometry = new THREE.CubeGeometry( 10, 10, 10);
    var material = new THREE.MeshLambertMaterial( { ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 15 } );

    mesh = new THREE.Mesh(geometry, material );
    mesh.position.z = -20;
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

    render();
}


var z = 500;
var goesFar = true;
var goesClose = false;

// This function is where I will update the state of each object in the scene that I want to animate

function animate() {
    mesh.rotation.x += .03;
    mesh.rotation.y += .03;

    camera.position.set(0, 0, z);

    if (z === 500) {
      goesClose = true;
      goesFar = false;
    } else if (z === -20) {
      goesFar = true;
      goesClose = false;
    }
    if (goesClose) {
      z--;
    } else if (goesFar) {
      z++;
    }

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
