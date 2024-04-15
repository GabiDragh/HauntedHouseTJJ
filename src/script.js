import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

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

const textureLoader = new THREE.TextureLoader()

// FIXME: Roof textures - could do with being in a separate file

const roofColorTexture = textureLoader.load('/textures/roof/color.jpg')
const roofAmbientOcclusionTexture = textureLoader.load('/textures/roof/ambientOcclusion.jpg')
const roofHeightTexture = textureLoader.load('/textures/roof/height.png')
const roofNormalTexture = textureLoader.load('/textures/roof/normal.jpg')
const roofRoughnessTexture = textureLoader.load('/textures/roof/roughness.jpg')

roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(5, 5)
roofAmbientOcclusionTexture.repeat.set(6, 6)
roofHeightTexture.repeat.set(6, 6)
roofNormalTexture.repeat.set(6, 6)
roofRoughnessTexture.repeat.set(6, 6)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
roofHeightTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofRoughnessTexture.wrapS = THREE.RepeatWrapping

roofColorTexture.wrapT = THREE.RepeatWrapping
roofAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
roofHeightTexture.wrapT = THREE.RepeatWrapping
roofNormalTexture.wrapT = THREE.RepeatWrapping
roofRoughnessTexture.wrapT = THREE.RepeatWrapping

roofColorTexture.rotation = 6.23

// Window textures

const window1Colortexture = textureLoader.load('/textures/window1/color.jpg')
const window1AmbientOcclusiontexture = textureLoader.load('/textures/window1/ambientOcclusion.jpg')
const window1Heighttexture = textureLoader.load('/textures/window1/height.png')
const window1Metallictexture = textureLoader.load('/textures/window1/metallic.jpg')
const window1Normaltexture = textureLoader.load('/textures/window1/normal.jpg')
const window1Opacitytexture = textureLoader.load('/textures/window1/opacity.jpg')
const window1Roughnesstexture = textureLoader.load('/textures/window1/roughness.jpg')

window1Colortexture.colorSpace = THREE.SRGBColorSpace

// Stained Glass material

// const window2Colortexture = textureLoader.load('/textures/window2/color.jpg')
// const window2AmbientOcclusiontexture = textureLoader.load('/textures/window2/ambientOcclusion.jpg')
// const window2Aplhatextture = textureLoader.load('/textures/window2/glass.jpg')
// const window2Heighttexture = textureLoader.load('/textures/window2/height.png')
// const window2Metalnesstexture = textureLoader.load('/textures/window2/metallic.jpg')
// const window2Normaltexture = textureLoader.load('/textures/window2/normal.jpg')
// const window2Roughnesstexture = textureLoader.load('/textures/window2/roughness.jpg')

// window2Colortexture.colorSpace = THREE.SRGBColorSpace

// Door textures

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

// Grave texture

const graveColorTexture = textureLoader.load('/textures/grave/color.jpg')
const graveAmbientOcclusionTexture = textureLoader.load('/textures/grave/ambientOcclusion.jpg')
const graveHeightTexture = textureLoader.load('/textures/grave/height.png')
const graveMetallicTexture = textureLoader.load('/textures/grave/metallic.jpg')
const graveNormalTexture = textureLoader.load('/textures/grave/normal.jpg')
const graveRoughnessTexture = textureLoader.load('/textures/grave/roughness.jpg')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

// Rocks Texture

const rocksColorTexture = textureLoader.load('/textures/rocks/color.jpg')
const rocksAmbientOcclusionTexture = textureLoader.load('/textures/rocks/ambientOcclusion.jpg')
const rocksHeightTexture = textureLoader.load('/textures/rocks/height.png')
const rocksNormalTexture = textureLoader.load('/textures/rocks/normal.jpg')
const rocksRoughnessTexture = textureLoader.load('/textures/rocks/roughness.jpg')

rocksColorTexture.colorSpace = THREE.SRGBColorSpace

// snow texture

const snowColorTexture = textureLoader.load('/textures/snow/color.jpg')
const snowAmbientOcclusionTexture = textureLoader.load('/textures/snow/ambientOcclusion.jpg')
const snowHeighttexture = textureLoader.load('/textures/snow/height.png')
const snowNormalTexture = textureLoader.load('/textures/snow/normal.jpg')
const snowRoughnessTexture = textureLoader.load('/textures/snow/roughness.jpg')

snowColorTexture.colorSpace = THREE.SRGBColorSpace

// Vector 2 snow repeat pattern

snowColorTexture.repeat.set(4, 4)
snowAmbientOcclusionTexture.repeat.set(4, 4)
snowNormalTexture.repeat.set(4, 4)
snowRoughnessTexture.repeat.set(4, 4)

snowColorTexture.wrapS = THREE.RepeatWrapping
snowAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
snowNormalTexture.wrapS = THREE.RepeatWrapping
snowRoughnessTexture.wrapS = THREE.RepeatWrapping

snowColorTexture.wrapT = THREE.RepeatWrapping
snowAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
snowNormalTexture.wrapT = THREE.RepeatWrapping
snowRoughnessTexture.wrapT = THREE.RepeatWrapping


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
    new THREE.CylinderGeometry(0, 3.5, 2.75, 4, 1),
    [new THREE.MeshLambertMaterial ({  
        map: roofColorTexture,
        aoMap: roofAmbientOcclusionTexture,
        displacementMap: roofHeightTexture,
        displacementScale: 0.01,
        normalMap: roofNormalTexture,
        // roughnessMap: roofRoughnessTexture
    }),
    new THREE.MeshLambertMaterial ({ color: '#6c4c27'}),
    new THREE.MeshLambertMaterial ({ color: '#6c4c27'})
]);

roof.position.y = 3 + 2.75 / 2 //wall + roofHt/2
roof.rotation.y = Math.PI / 4
house.add(roof)

// TODO: Group Window 1 into a white window group with the glass

const window1 = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5, 1.5, 100, 100),
    new THREE.MeshStandardMaterial({ 
        map: window1Colortexture,
        // transparent: true,
        // alphaMap: window1Opacitytexture,
        aoMap: window1AmbientOcclusiontexture,
        displacementMap: window1Heighttexture,
        displacementScale: 0.2,
        metalnessMap: window1Metallictexture,
        normalMap: window1Normaltexture,
        roughnessMap: window1Roughnesstexture
    })
)

window1.position.set(0, 1.5, 1.99)

// Window 1 glass

const window1Glass = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 1),
    new THREE.MeshStandardMaterial({
        color: '#a3c4d7',
        roughness: 0.01,
        metalness: 0.8,
        transparent: true
    })
)
window1Glass.position.set(0, 1.5, 2.001)

house.add(window1, window1Glass)

// Window 2 = cleanup up - can be dryer

const window2 = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5, 1.5, 100, 100),
    new THREE.MeshStandardMaterial({ 
        map: window1Colortexture,
        // transparent: true,
        // alphaMap: window2Opacitytexture,
        aoMap: window1AmbientOcclusiontexture,
        displacementMap: window1Heighttexture,
        displacementScale: 0.2,
        metalnessMap: window1Metallictexture,
        normalMap: window1Normaltexture,
        roughnessMap: window1Roughnesstexture
    })
)

window2.position.set(0, 1.5, -1.999)
window2.rotation.y = Math.PI

// Window 1 glass

const window2Glass = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 1),
    new THREE.MeshStandardMaterial({
        color: '#a3c4d7',
        roughness: 0.01,
        metalness: 0.8,
        transparent: true
    })
)
window2Glass.position.set(0, 1.5, -2.001)
window2Glass.rotation.y = Math.PI

house.add(window2, window2Glass)

// Window 2 - stained glass

// const stainedGlassGeometry = new THREE.PlaneGeometry(1, 1.8)
// const stainedGlassMaterial = new THREE.MeshStandardMaterial({
//     map: window2Colortexture,
//     aoMap: window2AmbientOcclusiontexture,
//     transparent: true,
//     alphaMap: window2Aplhatextture,
//     displacementMap: window2Heighttexture,
//     displacementScale: 0.1,
//     metalnessMap: window2Metalnesstexture,
//     normalMap: window2Normaltexture,
//     roughnessMap: window2Roughnesstexture,
//     // color: '#00ff00'
// })

// const stainedGlass1 = new THREE.Mesh(stainedGlassGeometry, stainedGlassMaterial)
// stainedGlass1.position.set(2.01, 1.32, 1.3)
// stainedGlass1.rotation.y = Math.PI / 2

// const stainedGlass2 = new THREE.Mesh(stainedGlassGeometry, stainedGlassMaterial)
// stainedGlass2.position.set(2.01, 1.32, -1.3)
// stainedGlass2.rotation.y = Math.PI / 2

// house.add(stainedGlass1, stainedGlass2)

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

// 3d Text

const fontLoader = new FontLoader();

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Random House',
            {
                font: font, 
                size: 0.2,
                height: 0.07,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.02,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 3
            }
        );

        textGeometry.center() //INFO: the easy version of the lines above :)
        const material = new THREE.MeshStandardMaterial({ color: '#ff0000' });
        const text = new THREE.Mesh(textGeometry, material);
        text.position.set(2, 2.3, 0)
        text.rotation.y = Math.PI / 2
        house.add(text)
    }

)

// INFO: Rocks

const rockGeometry = new THREE.SphereGeometry(1, 16, 16)
const rockMaterial = new THREE.MeshStandardMaterial({ 
    map: rocksColorTexture,
    aoMap: rocksAmbientOcclusionTexture,
    displacementMap: rocksHeightTexture,
    displacementScale: 0.01,
    normalMap: rocksNormalTexture,
    roughnessMap: rocksRoughnessTexture
})

const rock1 = new THREE.Mesh(rockGeometry, rockMaterial)
rock1.scale.set(0.35, 0.35, 0.35)
rock1.position.set(0.95, 0.3, 2.7)

const rock2 = new THREE.Mesh(rockGeometry, rockMaterial)
rock2.scale.set(0.25, 0.25, 0.25)
rock2.position.set(1.5, 0.2, 2.7)

const rock3 = new THREE.Mesh(rockGeometry, rockMaterial)
rock3.scale.set(0.35, 0.35, 0.35)
rock3.position.set(2, 0.3, 2.5)

const rock4 = new THREE.Mesh(rockGeometry, rockMaterial)
rock4.scale.set(0.25, 0.25, 0.25)
rock4.position.set(2.35, 0.2, 2.05)

house.add(rock1, rock2, rock3, rock4)

// INFO: Graves

const graves = new THREE.Group();
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2) //height, width, depth
const graveMaterial = new THREE.MeshStandardMaterial({ 
    map: graveColorTexture,
    aoMap: graveAmbientOcclusionTexture,
    displacementMap: graveHeightTexture,
    displacementScale: 0.0001,
    metalnessMap: graveMetallicTexture,
    normalMap: graveNormalTexture,
    roughnessMap: graveRoughnessTexture
 })

for( let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2
    // console.log(angle)
    const radius = 6 + Math.random() * 3 //random radius values
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.35, z)

    grave.rotation.y = (Math.random() - 0.5) * 0.7;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.castShadow = true
    graves.add(grave)
}

// INFO: Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: snowColorTexture,
        aoMap: snowAmbientOcclusionTexture,
        displacementMap: snowHeighttexture,
        displacementScale: 0.1,
        normalMap: snowNormalTexture,
        roughnessMap: snowRoughnessTexture
    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.52)
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
rock1.castShadow = true
rock2.castShadow = true
rock3.castShadow = true

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