
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
var material0 = new THREE.LineBasicMaterial({ color: 'rgb(150,0,150)' });
var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
var material2 = new THREE.LineBasicMaterial({ color: 0xff00ff });
var material3 = new THREE.LineBasicMaterial({ color: 'rgb(200,150,255)' });

// add geometry
// The array of vertices holds the position of every vertex (x,y,z) in the model.
var geometry0 = new THREE.Geometry();
geometry0.vertices.push(new THREE.Vector3(-20, 0, 0));
geometry0.vertices.push(new THREE.Vector3(0, 20, 0));
geometry0.vertices.push(new THREE.Vector3(20, 0, 0));
geometry0.vertices.push(new THREE.Vector3(0, -20, 0));
geometry0.vertices.push(new THREE.Vector3(-20, 0, 0));

var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 10, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, -10, 0));
geometry.vertices.push(new THREE.Vector3(-10, 0, 0));

var geometry2 = new THREE.Geometry();
geometry2.vertices.push(new THREE.Vector3(-5, 0, 0));
geometry2.vertices.push(new THREE.Vector3(0, 5, 0));
geometry2.vertices.push(new THREE.Vector3(5, 0, 0));
geometry2.vertices.push(new THREE.Vector3(0, -5, 0));
geometry2.vertices.push(new THREE.Vector3(-5, 0, 0));

var geometry3 = new THREE.Geometry();
geometry3.vertices.push(new THREE.Vector3(-2.5, 0, 0));
geometry3.vertices.push(new THREE.Vector3(0, 2.5, 0));
geometry3.vertices.push(new THREE.Vector3(2.5, 0, 0));
geometry3.vertices.push(new THREE.Vector3(0, -2.5, 0));
geometry3.vertices.push(new THREE.Vector3(-2.5, 0, 0));


// draw the line using the geometry and the material
var line0 = new THREE.Line(geometry0, material0);
var line = new THREE.Line(geometry, material);
var line2 = new THREE.Line(geometry2, material2);
var line3 = new THREE.Line(geometry3, material3);


// add it to scene and render
scene.add(line0);
scene.add(line);
scene.add(line2);
scene.add(line3);
//var x = -100
var z = 100;
var goesFar = true;
var goesClose = false;
function animate() {
        	requestAnimationFrame( animate );
          camera.position.set(0, 0, z);
          if (z === 200) {
            goesClose = true;
            goesFar = false;
          } else if (z === 50) {
            goesFar = true;
            goesClose = false;
          }
          if (goesClose) {
            z--;
          } else if (goesFar) {
            z++;
          }
        	renderer.render(scene, camera);
        }
        animate();
