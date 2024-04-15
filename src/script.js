import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// INFO: Fog

const fog = new THREE.Fog('#262837', 1, 20)
scene.fog = fog;

/**
 * INFO: Textures
 */

// Door textures
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

// Bricks texture

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

bricksColorTexture.colorSpace = THREE.SRGBColorSpace

// Floor texture

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.colorSpace = THREE.SRGBColorSpace

// Vector 2 grass repeat pattern

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping


/**
 * INFO: House
 */
const house = new THREE.Group()
scene.add(house)

// INFO: Walls

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 3, 4),
    new THREE.MeshStandardMaterial({ 
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
     })
)
walls.position.y = 3 / 2
house.add(walls)


// INFO: Roof

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(4, 1.5, 4),
    new THREE.MeshStandardMaterial({ color:'#b35f45' })
)
roof.position.y = 3 + 0.75
roof.rotation.y = Math.PI / 4
house.add(roof)

// INFO: Door

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 100, 100), //add vertices for displacement map
    new THREE.MeshStandardMaterial({ 
        map: doorColorTexture,
        transparent: true, //To use alpha map
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture, 
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
     })
)

door.position.y = 0.9
door.position.x = 2 
door.rotation.y = Math.PI / 2

house.add(door)

// INFO: Bushes

const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854'})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.35, 0.35, 0.35)
bush1.position.set(0.95, 0.3, 2.7)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.5, 0.2, 2.7)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.35, 0.35, 0.35)
bush3.position.set(2, 0.3, 2.5)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.25, 0.25, 0.25)
bush4.position.set(2.35, 0.2, 2.05)

house.add(bush1, bush2, bush3, bush4)

// INFO: Graves

const graves = new THREE.Group();
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2) //height, width, depth
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

for( let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2
    // console.log(angle)
    const radius = 6 + Math.random() * 3 //random radius values
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.3, z)

    grave.rotation.y = (Math.random() - 0.5) * 0.7;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.castShadow = true
    graves.add(grave)
}

// INFO: Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.26)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// INFO: Door light
const doorLight = new THREE.PointLight('#ff7d46', 2, 6) //color, intensity, distance
doorLight.position.set(2.7, 2.4, 0)
house.add(doorLight)

// INFO: Ghost Light
const ghost1 = new THREE.PointLight('#ff00ff', 6, 3)
// ghost1.position.set(4, 0.5, 0)

const ghost2 = new THREE.PointLight('#00ffff', 6, 3)
// ghost2.position.set(4.3, 0.5, 0)

const ghost3 = new THREE.PointLight('#0000ff', 6, 3)
// ghost3.position.set(4.5, 0.5, 0)

scene.add(ghost1, ghost2, ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// INFO: Blend scene edge with the background - change renderer color to the fog one
renderer.setClearColor('#262837')


// INFO: Shadows

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
roof.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true

floor.receiveShadow = true

// INFO: Optimise shadows

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // INFO: Update ghost animation 

    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin (elapsedTime * 3)

    const ghost2Angle = -elapsedTime * 0.4
    ghost2.position.x = Math.cos(ghost2Angle) * 3
    ghost2.position.z = Math.sin(ghost2Angle) * 3
    ghost2.position.y = Math.sin (elapsedTime * 4) + Math.sin(elapsedTime * 2)

    const ghost3Angle = -elapsedTime * 0.2
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.3))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin (elapsedTime * 3) + Math.sin(elapsedTime * 2)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()