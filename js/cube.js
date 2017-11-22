
var scene = new THREE.Scene();

// add a camera
// THREE.PerspectiveCamera(fov, aspect, near, far)
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);

// place the camera at z of 100
camera.position.z = 100;

// add a renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// add the renderer element to the DOM so it is in our page
document.body.appendChild( renderer.domElement );


//  creating a cube to put in our scene
var geometry = new THREE.BoxGeometry(20, 20, 20);
var material = new THREE.MeshLambertMaterial({color: 0xfd59d7});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);


/* we need to add a light so we can see our cube - its almost
as if we're turning on a lightbulb within the room */
var light = new THREE.PointLight(0xFFFF00);
/* position the light so it shines on the cube (x, y, z) */
light.position.set(10, 0, 25);
scene.add(light);


function animate() {
        	requestAnimationFrame( animate );
          //cube.rotation.x += 0.1;
          cube.rotation.y += 0.1;
        	renderer.render( scene, camera );
        }
        animate();
