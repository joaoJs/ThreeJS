var camera;
var scene;
var renderer;
var controls;
var spotLight;
var counter = 0;
var sphere;

var pierrot = new Audio('images/Pierrot_1-1.mp3');

init();
animate();



function init() {

  pierrot.play();
	// Create a scene
    scene = new THREE.Scene();

	// Add the camera
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 100, 250);

    // Add scene elements
    addSceneElements();

    // Add lights
    addLights();

	// Create the WebGL Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    // Append the renderer to the body
    document.body.appendChild( renderer.domElement );

    // Add a resize event listener
    window.addEventListener( 'resize', onWindowResize, false );

    // Add the orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 100, 0);
}

function addLights() {

    // var dirLight = new THREE.DirectionalLight(0xffffff, 1);
    // dirLight.position.set(100, 100, 100);
    // scene.add(dirLight);

    // ambient lights usually look pretty bad. They just add
    // a shade of some color.
    // var ambLight = new THREE.AmbientLight('rgb(200,200,60)');
    // scene.add(ambLight);

    // var redLight = new THREE.PointLight(0xff3300, 5, 100);
    // redLight.position.set( -15, 70, -50 );
    // scene.add(redLight);
    // scene.add(new THREE.PointLightHelper(bluePoint, 3));

    // var greenPoint = new THREE.PointLight(0x33ff00, 1, 150);
    // greenPoint.position.set( -70, 25, 100 );
    // scene.add(greenPoint);
    // scene.add(new THREE.PointLightHelper(greenPoint, 3));

    spotLight = new THREE.SpotLight(0xffffff, 5, 310, 0.8, 0.5);

    spotLight.position.set( -95, 5, 120);

    var targetObject = new THREE.Object3D();
    scene.add(targetObject);

    spotLight.target = targetObject;

    scene.add(spotLight);


    spotLight.target.position.x = 20;
    spotLight.target.position.y = 50;
    spotLight.target.position.z = -100;
    scene.add( targetObject );

    scene.add(new THREE.PointLightHelper(spotLight, 1));
    //
    var hemLight = new THREE.HemisphereLight(0xffe5bb, 0xFFBF00, 0.1);
    scene.add(hemLight);
}

function addSceneElements() {
    // Create a cube used to build the floor and walls
    var cube = new THREE.BoxGeometry( 200, 1, 200);

    var ana = new THREE.TextureLoader().load( 'images/ana2.png' );
    var bricks = new THREE.TextureLoader().load( 'images/bricks.jpg' );

    // create different materials
    var floorMat = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/wood-floor.jpg') } );
    var anaMat = new THREE.MeshPhongMaterial( { map: ana } );
    var wallMat = new THREE.MeshPhongMaterial( { map: bricks } );
    var redMat = new THREE.MeshPhongMaterial( { color: 0xff3300, specular: 0x555555, shininess: 30 } );
    var purpleMat = new THREE.MeshPhongMaterial( { color: 0x6F6CC5, specular: 0x555555, shininess: 30 } );

    // Floor
    var floor = new THREE.Mesh(cube, floorMat );
    scene.add( floor );

    // Back wall
    var backWall = new THREE.Mesh(cube, anaMat );
    backWall.rotation.x = Math.PI/180 * 90;
    backWall.position.set(0,100,-100);
    scene.add( backWall );

    // Left wall
    var leftWall = new THREE.Mesh(cube, wallMat );
    leftWall.rotation.x = Math.PI/180 * 90;
    leftWall.rotation.z = Math.PI/180 * 90;
    leftWall.position.set(-100,100,0);
    scene.add( leftWall );

    // Right wall
    var rightWall = new THREE.Mesh(cube, wallMat );
    rightWall.rotation.x = Math.PI/180 * 90;
    rightWall.rotation.z = Math.PI/180 * 90;
    rightWall.position.set(100,100,0);
    scene.add( rightWall );

    // Sphere
    sphere = new THREE.Mesh(new THREE.SphereGeometry(20, 70, 20), redMat);
    sphere.position.set(70, 25, -20);
    scene.add(sphere);
    //
    // // Knot thingy
    // var knot = new THREE.Mesh(new THREE.TorusKnotGeometry( 40, 3, 100, 16), purpleMat);
    // knot.position.set(0, 60, 30);
    // scene.add(knot);
}

// var sphere_x = 70;
// var sphere_y = 25;
// var sphere_z = -20;

// variables to determine if z will increase or decrease
var goesFar = true;
var comesClose = false;

// variables to determine if x will increase or decrease
var goesLeft = true;
var goesRight = false;

// variables to determine if y will increase or decrease
var goesUp = true;
var goesDown = false;


function animate() {

	  renderer.render( scene, camera );
    requestAnimationFrame( animate );
    controls.update();

    counter += 0.05;
    spotLight.target.position.x = Math.sin(counter) * 100;

    moveSphere();

}


// function to move sphere
function moveSphere() {
  if (sphere.position.z <= -100) {
    comesClose = true;
    goesFar = false;
  } else if (sphere.position.z >= 80) {
    goesFar = true;
    comesClose = false;
  }
  if (goesFar) {
    sphere.position.z--;
  } else {
    sphere.position.z++;
  }

  if (sphere.position.x >= 80) {
    goesLeft = true;
    goesRight = false;
  } else if (sphere.position.x <= -80) {
    goesLeft = false;
    goesRight = true;
  }
  if (goesLeft) {
    sphere.position.x-= 2;
  } else {
    sphere.position.x+= 2;
  }

  if (sphere.position.y <= 25) {
    goesUp = true;
    goesDown = false;
  } else if (sphere.position.y >= 100) {
    goesUp = false;
    goesDown = true;
  }
  if (goesUp) {
    sphere.position.y += 1;
  } else if (goesDown) {
    sphere.position.y -= 2;
  }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
