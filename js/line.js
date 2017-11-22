
///
// setting scene, camera and renderer
///
// const scene = new THREE.Scene();
// // attributes are:
// //  -- > fields of view (FOV). Value given in degrees.
// //  -- > ratio
// //  -- > near clipping plane
// //  -- > far clipping plane
// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
//
// // a <canvas> element renderer uses to display the scene
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var scene = new THREE.Scene();


//create a blue LineBasicMaterial
var material = new THREE.LineBasicMaterial({ color: 0x0000ff });

// add geometry
// The array of vertices holds the position of every vertex in the model.
var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 10, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));


// draw the line using the geometry and the material
var line = new THREE.Line(geometry, material);


// add it to scene and render
scene.add(line);
var y = 100;
var goesFar = true;
var goesClose = false;
function animate() {
        	requestAnimationFrame( animate );
          camera.position.set(0, 0, y);
          if (y === 200) {
            goesClose = true;
            goesFar = false;
          } else if (y === 10) {
            goesFar = true;
            goesClose = false;
          }
          if (goesClose) {
            y--;
          } else if (goesFar) {
            y++;
          }
        	renderer.render(scene, camera);
        }
        animate();
