/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

    // Todo: We should implement two save mode in db.
    // One that allow to decouple children from parent ( one mesh for differents parent )
    // Or bind children to parent

const mongoose = require( 'mongoose' )

// Object3D
const Object3DModel               = mongoose.model( 'Object3D' )
const AudioModel                  = mongoose.model( 'Audio' )
const PositionalAudioModel        = mongoose.model( 'PositionalAudio' )
const AudioListenerModel          = mongoose.model( 'AudioListener' )
const ArrowHelperModel            = mongoose.model( 'ArrowHelper' )
const BoneModel                   = mongoose.model( 'Bone' )
const CameraModel                 = mongoose.model( 'CameraScene' )
const PerspectiveCameraModel      = mongoose.model( 'PerspectiveCamera' )
const ArrayCameraModel            = mongoose.model( 'ArrayCamera' )
const OrthographicCameraModel     = mongoose.model( 'OrthographicCamera' )
const CubeCameraModel             = mongoose.model( 'CubeCamera' )
const DirectionalLightHelperModel = mongoose.model( 'DirectionalLightHelper' )
const HemisphereLightHelperModel  = mongoose.model( 'HemisphereLightHelper' )
const ImmediateRenderObjectModel  = mongoose.model( 'ImmediateRenderObject' )
const LensFlareModel              = mongoose.model( 'LensFlare' )
const LightModel                  = mongoose.model( 'Light' )
const AmbientLightModel           = mongoose.model( 'AmbientLight' )
const DirectionalLightModel       = mongoose.model( 'DirectionalLight' )
const HemisphereLightModel        = mongoose.model( 'HemisphereLight' )
const PointLightModel             = mongoose.model( 'PointLight' )
const RectAreaLightModel          = mongoose.model( 'RectAreaLight' )
const SpotLightModel              = mongoose.model( 'SpotLight' )
const LineModel                   = mongoose.model( 'Line' )
const LineLoopModel               = mongoose.model( 'LineLoop' )
const LineSegmentsModel           = mongoose.model( 'LineSegments' )
const AxesHelperModel             = mongoose.model( 'AxesHelper' )
const BoxHelperModel              = mongoose.model( 'BoxHelper' )
const Box3HelperModel             = mongoose.model( 'Box3Helper' )
const CameraHelperModel           = mongoose.model( 'CameraHelper' )
const FaceNormalsHelperModel      = mongoose.model( 'FaceNormalsHelper' )
const GridHelperModel             = mongoose.model( 'GridHelper' )
const PolarGridHelperModel        = mongoose.model( 'PolarGridHelper' )
const SkeletonHelperModel         = mongoose.model( 'SkeletonHelper' )
const VertexNormalHelperModel     = mongoose.model( 'VertexNormalHelper' )
const PlaneHelperModel            = mongoose.model( 'PlaneHelper' )
const LODModel                    = mongoose.model( 'LOD' )
const MeshModel                   = mongoose.model( 'Mesh' )
const PointLightHelperModel       = mongoose.model( 'PointLightHelper' )
const SkinnedMeshModel            = mongoose.model( 'SkinnedMesh' )
const GroupModel                  = mongoose.model( 'Group' )
const PointsModel                 = mongoose.model( 'Points' )
const RectAreaLightHelperModel    = mongoose.model( 'RectAreaLightHelper' )
const SceneModel                  = mongoose.model( 'Scene' )
const SpriteModel                 = mongoose.model( 'Sprite' )
const SpotLightHelperModel        = mongoose.model( 'SpotLightHelper' )

// Curve


// Geometry
const GeometryModel             = mongoose.model( 'Geometry' )
const BoxGeometryModel          = mongoose.model( 'BoxGeometry' )
const CircleGeometryModel       = mongoose.model( 'CircleGeometry' )
const CylinderGeometryModel     = mongoose.model( 'CylinderGeometry' )
const ConeGeometryModel         = mongoose.model( 'ConeGeometry' )
const DodecahedronGeometryModel = mongoose.model( 'DodecahedronGeometry' )
const ExtrudeGeometryModel      = mongoose.model( 'ExtrudeGeometry' )
const IcosahedronGeometryModel  = mongoose.model( 'IcosahedronGeometry' )
const LatheGeometryModel        = mongoose.model( 'LatheGeometry' )
const ParametricGeometryModel   = mongoose.model( 'ParametricGeometry' )
const PlaneGeometryModel        = mongoose.model( 'PlaneGeometry' )
const OctahedronGeometryModel   = mongoose.model( 'OctahedronGeometry' )
const PolyhedronGeometryModel   = mongoose.model( 'PolyhedronGeometry' )
const RingGeometryModel         = mongoose.model( 'RingGeometry' )
const ShapeGeometryModel        = mongoose.model( 'ShapeGeometry' )
const TetrahedronGeometryModel  = mongoose.model( 'TetrahedronGeometry' )
const TextGeometryModel         = mongoose.model( 'TextGeometry' )
const TorusGeometryModel        = mongoose.model( 'TorusGeometry' )
const TorusKnotGeometryModel    = mongoose.model( 'TorusKnotGeometry' )
const TubeGeometryModel         = mongoose.model( 'TubeGeometry' )

// BufferGeometry
const BufferGeometryModel            = mongoose.model( 'BufferGeometry' )
const BoxBufferGeometryModel         = mongoose.model( 'BoxBufferGeometry' )
const CircleBufferGeometryModel      = mongoose.model( 'CircleBufferGeometry' )
const CylinderBufferGeometryModel    = mongoose.model( 'CylinderBufferGeometry' )
const ConeBufferGeometryModel        = mongoose.model( 'ConeBufferGeometry' )
const EdgesGeometryModel             = mongoose.model( 'EdgesGeometry' )
const ExtrudeBufferGeometryModel     = mongoose.model( 'ExtrudeBufferGeometry' )
const TextBufferGeometryModel        = mongoose.model( 'TextBufferGeometry' )
const InstancedBufferGeometryModel   = mongoose.model( 'InstancedBufferGeometry' )
const LatheBufferGeometryModel       = mongoose.model( 'LatheBufferGeometry' )
const ParametricBufferGeometryModel  = mongoose.model( 'ParametricBufferGeometry' )
const PlaneBufferGeometryModel       = mongoose.model( 'PlaneBufferGeometry' )
const PolyhedronBufferGeometryModel  = mongoose.model( 'PolyhedronBufferGeometry' )
const IcosahedronBufferGeometryModel = mongoose.model( 'IcosahedronBufferGeometry' )
const OctahedronBufferGeometryModel  = mongoose.model( 'OctahedronBufferGeometry' )
const TetrahedronBufferGeometryModel = mongoose.model( 'TetrahedronBufferGeometry' )
const RingBufferGeometryModel        = mongoose.model( 'RingBufferGeometry' )
const ShapeBufferGeometryModel       = mongoose.model( 'ShapeBufferGeometry' )
const SphereBufferGeometryModel      = mongoose.model( 'SphereBufferGeometry' )
const TorusBufferGeometryModel       = mongoose.model( 'TorusBufferGeometry' )
const TorusKnotBufferGeometryModel   = mongoose.model( 'TorusKnotBufferGeometry' )
const TubeBufferGeometryModel        = mongoose.model( 'TubeBufferGeometry' )
const WireframeBufferGeometryModel   = mongoose.model( 'WireframeBufferGeometry' )

// Materials
const LineBasicMaterialModel    = mongoose.model( 'LineBasicMaterial' )
const LineDashedMaterialModel   = mongoose.model( 'LineDashedMaterial' )
const MeshBasicMaterialModel    = mongoose.model( 'MeshBasicMaterial' )
const MeshDepthMaterialModel    = mongoose.model( 'MeshDepthMaterial' )
const MeshDistanceMaterialModel = mongoose.model( 'MeshDistanceMaterial' )
const MeshLambertMaterialModel  = mongoose.model( 'MeshLambertMaterial' )
const MeshNormalMaterialModel   = mongoose.model( 'MeshNormalMaterial' )
const MeshPhongMaterialModel    = mongoose.model( 'MeshPhongMaterial' )
const MeshToonMaterialModel     = mongoose.model( 'MeshToonMaterial' )
const MeshPhysicalMaterialModel = mongoose.model( 'MeshPhysicalMaterial' )
const MeshStandardMaterialModel = mongoose.model( 'MeshStandardMaterial' )
const PointsMaterialModel       = mongoose.model( 'PointsMaterial' )
const ShaderMaterialModel       = mongoose.model( 'ShaderMaterial' )
const ShadowMaterialModel       = mongoose.model( 'ShadowMaterial' )
const SpriteMaterialModel       = mongoose.model( 'SpriteMaterial' )

// Texture

class ThreeToMongoDB {

    constructor () {

        this._objectCache         = {}
        this._geometryCache       = {}
        this._bufferGeometryCache = {}
        this._materialCache       = {}
        this._textureCache        = {}
        this._parentId            = undefined

    }

    // Public
    save ( parentId, data, onSuccess, onProgress, onError ) {

        if ( !parentId ) {
            onError( 'Invalid parent id, unable to set children to unknown database node !!!' )
            return
        }

        if ( !data ) {
            onError( 'Data cannot be null or empty, aborting database insert !!!' )
            return
        }

        this._parentId = parentId

        this._parse(
            data,
            onSuccess,
            progress => {

                console.log( `${progress.name}: ${progress.done}/${progress.todo}` )
                onProgress( progress )

            },
            onError
        )

    }

    // Private
    _parse ( object, parentId, onSuccess, onProgress, onError ) {

        const self             = this
        const numberOfChildren = object.children.length

        if ( numberOfChildren > 0 ) {

            let childrenIds = []
            let childIndex  = 0;
            checkNextChild()

            function checkNextChild () {

                self._parse(
                    object.children[ childIndex ],
                    objectId => {

                        childrenIds.push( objectId )

                        onProgress( {
                            name: object.name,
                            done: childrenIds.length,
                            todo: numberOfChildren
                        } )

                        if ( childrenIds.length < numberOfChildren ) {
                            childIndex++
                            checkNextChild()
                            return
                        }

                        self._saveInDataBase( object, parentId, childrenIds, onError, onSuccess )

                    },
                    onProgress,
                    onError
                )

            }

        } else {

            self._saveInDataBase( object, parentId, [], onError, onSuccess )

        }

    }

    _parseUserData ( jsonUserData ) {

        let userData = {}

        for ( let prop in jsonUserData ) {
            if ( jsonUserData.hasOwnProperty( prop ) ) {
                userData[ prop.replace( /\./g, '' ) ] = jsonUserData[ prop ]
            }
        }

        return userData

    }

    _saveInDataBase ( object, parentId, childrenArrayIds, onError, onSuccess ) {

        // Remove null ids that could come from invalid objects
        const self        = this
        const childrenIds = childrenArrayIds.filter( ( item ) => {
            return item
        } )

        // Preprocess objects here to save geometry, materials and related before to save the object itself
        const objectType = object.type
        const geometry   = object.geometry
        const materials  = object.material

        if ( geometry && material ) {

            if ( geometry.isGeometry ) {

                // If it is a terminal object ( No children ) with an empty geometry
                if ( childrenIds.length === 0 && (!geometry.vertices || geometry.vertices.length === 0) ) {

                    console.error( `Mesh ${mesh.name} geometry doesn't contain vertices ! Skip it.` )
                    onSuccess( null )
                    return

                }

                if ( objectType === 'Line' || objectType === 'LineLoop' || objectType === 'LineSegments' ) {

                    // if material != LineBasicMaterial or LineDashedMaterial... ERROR
                    if ( Array.isArray( materials ) ) {

                        let materialOnError = false
                        let material        = undefined
                        let materialType    = undefined
                        for ( let materialIndex = 0, numberOfMaterials = materials.length ; materialIndex < numberOfMaterials ; materialIndex++ ) {

                            material     = materials[ materialIndex ]
                            materialType = material.type
                            if ( materialType !== 'LineBasicMaterial' && materialType !== 'LineDashedMaterial' ) {
                                materialOnError = true
                                break
                            }

                        }

                        if ( materialOnError ) {

                            console.error( `Object ${object.name} of type ${objectType}, contain an invalid material of type ${materialType} ! Skip it.` )
                            onSuccess( null )
                            return

                        }

                    } else if ( materials.type !== 'LineBasicMaterial' && materials.type !== 'LineDashedMaterial' ) {

                        console.error( `Object ${object.name} of type ${objectType}, contain an invalid material of type ${materials.type} ! Skip it.` )
                        onSuccess( null )
                        return

                    } else {

                        // Materials are ok for this type of object

                    }

                } else if ( objectType === 'Points' ) {

                    // if material != PointsMaterial... ERROR

                    if ( Array.isArray( materials ) ) {

                        let materialOnError = false
                        let material        = undefined
                        let materialType    = undefined
                        for ( let materialIndex = 0, numberOfMaterials = materials.length ; materialIndex < numberOfMaterials ; materialIndex++ ) {

                            material     = materials[ materialIndex ]
                            materialType = material.type
                            if ( materialType !== 'PointsMaterial' ) {
                                materialOnError = true
                                break
                            }

                        }

                        if ( materialOnError ) {

                            console.error( `Object ${object.name} of type ${objectType}, contain an invalid material of type ${materialType} ! Skip it.` )
                            onSuccess( null )
                            return

                        }

                    } else if ( materials.type !== 'PointsMaterial' ) {

                        console.error( `Object ${object.name} of type ${objectType}, contain an invalid material of type ${materials.type} ! Skip it.` )
                        onSuccess( null )
                        return

                    } else {

                        // Materials are ok for this type of object

                    }

                } else {

                    // Regular object

                }

                self._saveGeometryInDatabase( geometry, onError, ( geometryId ) => {

                    self._saveMaterialInDatabase( materials, onError, ( materialIds ) => {

                        self._saveObject3DInDatabase( object, parentId, childrenIds, geometryId, materialIds, onError, onSuccess )

                    } )

                } )

            } else if ( geometry.isBufferGeometry ) {

                // If it is a terminal object ( No children ) with an empty geometry
                if ( childrenIds.length === 0 && (!geometry.attributes[ 'position' ] || geometry.attributes[ 'position' ].count === 0 ) ) {

                    console.error( `Mesh ${mesh.name} buffer geometry doesn't contain position attributes ! Skip it.` )
                    onSuccess( null )
                    return

                }

                if ( objectType === 'Line' || objectType === 'LineLoop' || objectType === 'LineSegments' ) {

                    // if material != LineBasicMaterial or LineDashedMaterial... ERROR
                    if ( Array.isArray( materials ) ) {

                        let materialOnError = false
                        let material        = undefined
                        let materialType    = undefined
                        for ( let materialIndex = 0, numberOfMaterials = materials.length ; materialIndex < numberOfMaterials ; materialIndex++ ) {

                            material     = materials[ materialIndex ]
                            materialType = material.type
                            if ( materialType !== 'LineBasicMaterial' && materialType !== 'LineDashedMaterial' ) {
                                materialOnError = true
                                break
                            }

                        }

                        if ( materialOnError ) {

                            console.error( `Object ${object.name} of type ${objectType}, contain an invalid material of type ${materialType} ! Skip it.` )
                            onSuccess( null )
                            return

                        }

                    } else if ( materials.type !== 'LineBasicMaterial' && materials.type !== 'LineDashedMaterial' ) {

                        console.error( `Object ${object.name} of type ${objectType}, contain an invalid material of type ${materials.type} ! Skip it.` )
                        onSuccess( null )
                        return

                    } else {

                        // Materials are ok for this type of object

                    }

                } else if ( objectType === 'Points' ) {

                    // if material != PointsMaterial... ERROR

                    if ( Array.isArray( materials ) ) {

                        let materialOnError = false
                        let material        = undefined
                        let materialType    = undefined
                        for ( let materialIndex = 0, numberOfMaterials = materials.length ; materialIndex < numberOfMaterials ; materialIndex++ ) {

                            material     = materials[ materialIndex ]
                            materialType = material.type
                            if ( materialType !== 'PointsMaterial' ) {
                                materialOnError = true
                                break
                            }

                        }

                        if ( materialOnError ) {

                            console.error( `Object ${object.name} of type ${objectType}, contain an invalid material of type ${materialType} ! Skip it.` )
                            onSuccess( null )
                            return

                        }

                    } else if ( materials.type !== 'PointsMaterial' ) {

                        console.error( `Object ${object.name} of type ${objectType}, contain an invalid material of type ${materials.type} ! Skip it.` )
                        onSuccess( null )
                        return

                    } else {

                        // Materials are ok for this type of object

                    }

                } else {

                    // Regular object

                }

                self._saveBufferGeometryInDatabase( geometry, onError, ( geometryId ) => {

                    self._saveMaterialInDatabase( materials, onError, ( materialIds ) => {

                        self._saveObject3DInDatabase( object, parentId, childrenIds, geometryId, materialIds, onError, onSuccess )

                    } )

                } )

            } else {

                console.error( `Object ${object.name} contain an unknown/unmanaged geometry of type ${geometry.type} ! Skip it.` )
                onSuccess( null )
                return

            }

        } else if ( geometry && !material ) {

            // Is this right ??? Object can have geometry without material ???

            if ( geometry.isGeometry ) {

                // If it is a terminal object ( No children ) with an empty geometry
                if ( childrenIds.length === 0 && (!geometry.vertices || geometry.vertices.length === 0) ) {

                    console.error( `Mesh ${mesh.name} geometry doesn't contain vertices ! Skip it.` )
                    onSuccess( null )
                    return

                }

                self._saveGeometryInDatabase( geometry, onError, ( geometryId ) => {

                    self._saveObject3DInDatabase( object, parentId, childrenIds, geometryId, [], onError, onSuccess )

                } )

            } else if ( geometry.isBufferGeometry ) {

                // If it is a terminal object ( No children ) with an empty geometry
                if ( childrenIds.length === 0 && (!geometry.attributes[ 'position' ] || geometry.attributes[ 'position' ].count === 0 ) ) {

                    console.error( `Mesh ${mesh.name} buffer geometry doesn't contain position attributes ! Skip it.` )
                    onSuccess( null )
                    return

                }

                self._saveBufferGeometryInDatabase( geometry, onError, ( geometryId ) => {

                    self._saveObject3DInDatabase( object, parentId, childrenIds, geometryId, null, onError, onSuccess )

                } )

            } else {

                console.error( `Object ${object.name} contain an unknown/unmanaged geometry of type ${geometry.type} ! Skip it.` )
                onSuccess( null )
                return

            }

        } else if ( !geometry && material ) {

            if ( objectType === 'Sprite' ) {

                // if material != SpriteMaterial... ERROR
                if ( Array.isArray( materials ) ) {

                    let materialOnError = false
                    let material        = undefined
                    let materialType    = undefined
                    for ( let materialIndex = 0, numberOfMaterials = materials.length ; materialIndex < numberOfMaterials ; materialIndex++ ) {

                        material     = materials[ materialIndex ]
                        materialType = material.type
                        if ( materialType !== 'SpriteMaterial' ) {
                            materialOnError = true
                            break
                        }

                    }

                    if ( materialOnError ) {

                        console.error( `Object ${object.name} of type ${objectType}, contain an invalid material of type ${materialType} ! Skip it.` )
                        onSuccess( null )
                        return

                    }

                } else if ( materials.type !== 'SpriteMaterial' ) {

                    console.error( `Object ${object.name} of type ${objectType}, contain an invalid material of type ${materials.type} ! Skip it.` )
                    onSuccess( null )
                    return

                } else {

                    // Materials are ok for this type of object

                }

            } else {

                console.error( `Missing geometry for object ${object.name} of type ${objectType}. Only Sprite can contains material without geometry ! Skip it.` )
                onSuccess( null )
                return

            }

            self._saveMaterialInDatabase( materials, onError, ( materialIds ) => {

                self._saveObject3DInDatabase( object, parentId, childrenIds, null, materialIds, onError, onSuccess )

            } )

        } else {

            self._saveObject3DInDatabase( object, parentId, childrenIds, null, null, onError, onSuccess )

        }

    }

    // Object3D
    _checkIfObject3DAlreadyExist ( object ) {

        return this._objectCache[ object.uuid ]

    }

    _getObject3DModel ( object, parentId, childrenIds, geometryId, materialsIds, onError, onSuccess ) {

        const objectType = object.type

        switch ( objectType ) {

            case 'Object3D':
                onSuccess( Object3DModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                } ) )
                break

            case 'Audio':
                onSuccess( AudioModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // Audio
                } ) )
                break

            case 'PositionalAudio':
                onSuccess( PositionalAudioModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // PositionalAudio

                } ) )
                break

            case 'AudioListener':
                onSuccess( AudioListenerModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // AudioListener

                } ) )
                break

            case 'ArrowHelper':
                onSuccess( ArrowHelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // ArrowHelper

                } ) )
                break

            case 'Bone':
                onSuccess( BoneModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // Bone

                } ) )
                break

            case 'CameraScene':
                onSuccess( CameraModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // CameraScene

                } ) )
                break

            case 'PerspectiveCamera':
                onSuccess( PerspectiveCameraModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // PerspectiveCamera

                } ) )
                break

            case 'ArrayCamera':
                onSuccess( ArrayCameraModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // ArrayCamera

                } ) )
                break

            case 'OrthographicCamera':
                onSuccess( OrthographicCameraModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // OrthographicCamera

                } ) )
                break

            case 'CubeCamera':
                onSuccess( CubeCameraModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // CubeCamera

                } ) )
                break

            case 'DirectionalLightHelper':
                onSuccess( DirectionalLightHelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // DirectionalLightHelper

                } ) )
                break

            case 'HemisphereLightHelper':
                onSuccess( HemisphereLightHelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // HemisphereLightHelper

                } ) )
                break

            case 'ImmediateRenderObject':
                onSuccess( ImmediateRenderObjectModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // ImmediateRenderObject

                } ) )
                break

            case 'LensFlare':
                onSuccess( LensFlareModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData ),
                    // LensFlare
                    lensFlares:             [ // This is an array need mapping
                        {
                            texture:  null, // todo save texture before
                            size:     object.lensFlares.size,
                            distance: object.lensFlares.distance,
                            x:        object.lensFlares.distance,
                            y:        object.lensFlares.distance,
                            z:        object.lensFlares.distance,
                            scale:    object.lensFlares.distance,
                            rotation: object.lensFlares.distance,
                            opacity:  object.lensFlares.distance,
                            color:    {
                                r: object.lensFlares.distance.r,
                                g: object.lensFlares.distance.g,
                                b: object.lensFlares.distance.b
                            },
                            blending: object.lensFlares.distance
                        }
                    ],
                    positionScreen:         {
                        x: object.positionScreen.x,
                        y: object.positionScreen.y,
                        z: object.positionScreen.z
                    }
                } ) )
                break

            case 'Light':
                onSuccess( LightModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // Light

                } ) )
                break

            case 'AmbientLight':
                onSuccess( AmbientLightModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // AmbientLight

                } ) )
                break

            case 'DirectionalLight':
                onSuccess( DirectionalLightModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // DirectionalLight

                } ) )
                break

            case 'HemisphereLight':
                onSuccess( HemisphereLightModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // HemisphereLight

                } ) )
                break

            case 'PointLight':
                onSuccess( PointLightModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // PointLight

                } ) )
                break

            case 'RectAreaLight':
                onSuccess( RectAreaLightModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // RectAreaLight

                } ) )
                break

            case 'SpotLight':
                onSuccess( SpotLightModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // SpotLight

                } ) )
                break

            case 'Line':
                onSuccess( LineModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData ),
                    // Line
                    geometry:               geometryId,
                    material:               materialsIds,
                    drawMode:               object.drawMode
                } ) )
                break

            case 'LineLoop':
                onSuccess( LineLoopModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData ),
                    // LineLoop
                    geometry:               geometryId,
                    material:               materialsIds,
                    drawMode:               object.drawMode
                } ) )
                break

            case 'LineSegments':
                onSuccess( LineSegmentsModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData ),
                    // LineSegments
                    geometry:               geometryId,
                    material:               materialsIds,
                    drawMode:               object.drawMode
                } ) )
                break

            case 'AxesHelper':
                onSuccess( AxesHelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // AxesHelper

                } ) )
                break

            case 'BoxHelper':
                onSuccess( BoxHelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // BoxHelper

                } ) )
                break

            case 'Box3Helper':
                onSuccess( Box3HelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // Box3Helper

                } ) )
                break

            case 'CameraHelper':
                onSuccess( CameraHelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // CameraHelper

                } ) )
                break

            case 'FaceNormalsHelper':
                onSuccess( FaceNormalsHelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // FaceNormalsHelper

                } ) )
                break

            case 'GridHelper':
                onSuccess( GridHelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // GridHelper

                } ) )
                break

            case 'PolarGridHelper':
                onSuccess( PolarGridHelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // PolarGridHelper

                } ) )
                break

            case 'SkeletonHelper':
                onSuccess( SkeletonHelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // SkeletonHelper

                } ) )
                break

            case 'VertexNormalHelper':
                onSuccess( VertexNormalHelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // VertexNormalHelper

                } ) )
                break

            case 'PlaneHelper':
                onSuccess( PlaneHelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // PlaneHelper

                } ) )
                break

            case 'LOD':
                onSuccess( LODModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData ),
                    // LOD
                    levels:                 object.levels
                } ) )
                break

            case 'Mesh':
                onSuccess( MeshModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData ),
                    // Mesh
                    geometry:               geometryId,
                    material:               materialsIds,
                    drawMode:               object.drawMode
                } ) )
                break

            case 'PointLightHelper':
                onSuccess( PointLightHelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // PointLightHelper

                } ) )
                break

            case 'SkinnedMesh':
                onSuccess( SkinnedMeshModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData ),
                    // Mesh
                    geometry:               geometryId,
                    material:               materialsIds,
                    drawMode:               object.drawMode,
                    // SkinnedMesh
                    bindMode:               object.bindMode,
                    bindMatrix:             object.bindMatrix,
                    bindMatrixInverse:      object.bindMatrixInverse
                } ) )
                break

            case 'Group':
                onSuccess( GroupModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // Group

                } ) )
                break

            case 'Points':
                onSuccess( PointsModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData ),
                    // Points
                    geometry:               geometryId,
                    material:               materialsIds,
                    drawMode:               object.drawMode
                } ) )
                break

            case 'RectAreaLightHelper':
                onSuccess( RectAreaLightHelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // RectAreaLightHelper

                } ) )
                break

            case 'Scene':
                onSuccess( SceneModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData ),
                    // Scene
                    background:             object.background,
                    fog:                    null, // Todo - This is an edge case, we need to link to fog model (saved before here)
                    overrideMaterial:       object.overrideMaterial,
                    autoUpdate:             object.autoUpdate
                } ) )
                break

            case 'Sprite':
                onSuccess( SpriteModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData ),
                    // Sprite
                    material:               materialsIds
                } ) )
                break

            case 'SpotLightHelper':
                onSuccess( SpotLightHelperModel( {
                    uuid:                   object.uuid,
                    name:                   object.name,
                    type:                   object.type,
                    parent:                 parentId,
                    children:               childrenIds,
                    up:                     {
                        x: object.up.x,
                        y: object.up.y,
                        z: object.up.z
                    },
                    position:               {
                        x: object.position.x,
                        y: object.position.y,
                        z: object.position.z
                    },
                    rotation:               {
                        x:     object.rotation.x,
                        y:     object.rotation.y,
                        z:     object.rotation.z,
                        order: object.rotation.order
                    },
                    quaternion:             {
                        x: object.quaternion.x,
                        y: object.quaternion.y,
                        z: object.quaternion.z,
                        w: object.quaternion.w
                    },
                    scale:                  {
                        x: object.scale.x,
                        y: object.scale.y,
                        z: object.scale.z
                    },
                    modelViewMatrix:        object.modelViewMatrix.toArray(),
                    normalMatrix:           object.normalMatrix.toArray(),
                    matrix:                 object.matrix.toArray(),
                    matrixWorld:            object.matrixWorld.toArray(),
                    matrixAutoUpdate:       object.matrixAutoUpdate,
                    matrixWorldNeedsUpdate: object.matrixWorldNeedsUpdate,
                    layers:                 object.layers.mask,
                    visible:                object.visible,
                    castShadow:             object.castShadow,
                    receiveShadow:          object.receiveShadow,
                    frustumCulled:          object.frustumCulled,
                    renderOrder:            object.renderOrder,
                    userData:               this._parseUserData( object.userData )
                    // SpotLightHelper

                } ) )
                break

            default:
                onError( `Unmanaged object3d of type: ${objectType}` )
                break

        }

    }

    _saveObject3DInDatabase ( object, parentId, childrenIds, geometryId, materialsIds, onError, onSuccess ) {

        const self     = this
        const objectId = this._checkIfObject3DAlreadyExist( object )

        if ( objectId ) {

            onSuccess( objectId )

        } else {

            this._getObject3DModel( object, parentId, childrenIds, geometryId, materialsIds, onError, ( objectModel ) => {

                objectModel.save()
                           .then( savedObject => {

                               const objectId = savedObject.id

                               // Add geometry id to cache
                               self._objectCache[ savedObject.uuid ] = objectId

                               // Return id
                               onSuccess( objectId )

                           } )
                           .catch( onError )

            } )

        }

    }

    //    // Mesh
    //
    //    _getMeshModel ( mesh, childrenIds, geometryId, materialIds ) {
    //
    //        return MeshModel( {
    //            uuid:                   mesh.uuid,
    //            name:                   mesh.name,
    //            type:                   mesh.type,
    //            children:               childrenIds,
    //            up:                     {
    //                x: mesh.up.x,
    //                y: mesh.up.y,
    //                z: mesh.up.z
    //            },
    //            position:               {
    //                x: mesh.position.x,
    //                y: mesh.position.y,
    //                z: mesh.position.z
    //            },
    //            rotation:               {
    //                x:     mesh.rotation.x,
    //                y:     mesh.rotation.y,
    //                z:     mesh.rotation.z,
    //                order: mesh.rotation.order
    //            },
    //            quaternion:             {
    //                x: mesh.quaternion.x,
    //                y: mesh.quaternion.y,
    //                z: mesh.quaternion.z,
    //                w: mesh.quaternion.w
    //            },
    //            scale:                  {
    //                x: mesh.scale.x,
    //                y: mesh.scale.y,
    //                z: mesh.scale.z
    //            },
    //            modelViewMatrix:        mesh.modelViewMatrix.toArray(),
    //            normalMatrix:           mesh.normalMatrix.toArray(),
    //            matrix:                 mesh.matrix.toArray(),
    //            matrixWorld:            mesh.matrixWorld.toArray(),
    //            matrixAutoUpdate:       mesh.matrixAutoUpdate,
    //            matrixWorldNeedsUpdate: mesh.matrixWorldNeedsUpdate,
    //            layers:                 mesh.layers.mask,
    //            visible:                mesh.visible,
    //            castShadow:             mesh.castShadow,
    //            receiveShadow:          mesh.receiveShadow,
    //            frustumCulled:          mesh.frustumCulled,
    //            renderOrder:            mesh.renderOrder,
    //            userData:               this._parseUserData( mesh.userData ),
    //            // Specific
    //            geometry:               geometryId,
    //            material:               materialIds,
    //            drawMode:               mesh.drawMode
    //        } )
    //
    //    }
    //
    //    _saveMesh ( mesh, childrenIds, onError, onSuccess ) {
    //
    //        const self      = this
    //        const geometry  = mesh.geometry
    //        const materials = mesh.material
    //
    //        if ( !geometry ) {
    //            onError( `Mesh doesn't contain geometry !!!` )
    //            return
    //        }
    //
    //        if ( !materials ) {
    //            onError( `Mesh doesn't contain materials !!!` )
    //            return
    //        }
    //
    //        if ( geometry.isGeometry ) {
    //
    //            // If it is a terminal object ( No children ) with an empty geometry
    //            if ( childrenIds.length === 0 && (!geometry.vertices || geometry.vertices.length === 0) ) {
    //
    //                console.error( `Mesh ${mesh.name} geometry doesn't contain vertices ! Skip it.` )
    //                onSuccess( null )
    //                return
    //
    //            }
    //
    //            self._saveGeometryInDatabase( geometry, onError, ( geometryId ) => {
    //
    //                self._saveMaterialInDatabase( materials, onError, ( materialIds ) => {
    //
    //                    self._saveMeshInDatabase( mesh, childrenIds, geometryId, materialIds, onError, onSuccess )
    //
    //                } )
    //
    //            } )
    //
    //        } else if ( geometry.isBufferGeometry ) {
    //
    //            // If it is a terminal object ( No children ) with an empty geometry
    //            if ( childrenIds.length === 0 && (!geometry.attributes[ 'position' ] || geometry.attributes[ 'position' ].count === 0 ) ) {
    //
    //                console.error( `Mesh ${mesh.name} buffer geometry doesn't contain position attributes ! Skip it.` )
    //                onSuccess( null )
    //                return
    //
    //            }
    //
    //            self._saveBufferGeometryInDatabase( geometry, onError, ( geometryId ) => {
    //
    //                self._saveMaterialInDatabase( materials, onError, ( materialIds ) => {
    //
    //                    self._saveMeshInDatabase( mesh, childrenIds, geometryId, materialIds, onError, onSuccess )
    //
    //                } )
    //
    //            } )
    //
    //        } else {
    //
    //            console.error( `Mesh ${mesh.name} contain an unknown/unmanaged geometry of type ${geometry.type} ! Skip it.` )
    //            onSuccess( null )
    //            return
    //
    //        }
    //
    //    }
    //
    //    _saveMeshInDatabase ( object, childrenIds, geometryId, materialId, onError, onSuccess ) {
    //
    //        this._getMeshModel( object, childrenIds, geometryId, materialId )
    //            .save()
    //            .then( savedMesh => {
    //
    //                onSuccess( savedMesh.id )
    //
    //            } )
    //            .catch( onError )
    //
    //    }
    //
    //    // LineSegment
    //
    //    _saveLineSegment ( lineSegment, childrenIds, onError, onSuccess ) {
    //
    //        const self      = this
    //        const geometry  = lineSegment.geometry
    //        const materials = lineSegment.material
    //
    //        self._saveGeometryInDatabase( geometry, onError, ( geometryId ) => {
    //
    //            self._saveMaterialInDatabase( materials, onError, ( materialIds ) => {
    //
    //                self._saveLineSegmentInDatabase( lineSegment, childrenIds, geometryId, materialIds, onError, onSuccess )
    //
    //            } )
    //
    //        } )
    //
    //    }
    //
    //    _getLineSegmentModel ( lineSegment, childrenIds, geometryId, materialIds ) {
    //
    //        return LineSegmentsModel( {
    //            uuid:                   lineSegment.uuid,
    //            name:                   lineSegment.name,
    //            type:                   lineSegment.type,
    //            children:               childrenIds,
    //            up:                     {
    //                x: lineSegment.up.x,
    //                y: lineSegment.up.y,
    //                z: lineSegment.up.z
    //            },
    //            position:               {
    //                x: lineSegment.position.x,
    //                y: lineSegment.position.y,
    //                z: lineSegment.position.z
    //            },
    //            rotation:               {
    //                x:     lineSegment.rotation.x,
    //                y:     lineSegment.rotation.y,
    //                z:     lineSegment.rotation.z,
    //                order: lineSegment.rotation.order
    //            },
    //            quaternion:             {
    //                x: lineSegment.quaternion.x,
    //                y: lineSegment.quaternion.y,
    //                z: lineSegment.quaternion.z,
    //                w: lineSegment.quaternion.w
    //            },
    //            scale:                  {
    //                x: lineSegment.scale.x,
    //                y: lineSegment.scale.y,
    //                z: lineSegment.scale.z
    //            },
    //            modelViewMatrix:        lineSegment.modelViewMatrix.toArray(),
    //            normalMatrix:           lineSegment.normalMatrix.toArray(),
    //            matrix:                 lineSegment.matrix.toArray(),
    //            matrixWorld:            lineSegment.matrixWorld.toArray(),
    //            matrixAutoUpdate:       lineSegment.matrixAutoUpdate,
    //            matrixWorldNeedsUpdate: lineSegment.matrixWorldNeedsUpdate,
    //            layers:                 lineSegment.layers.mask,
    //            visible:                lineSegment.visible,
    //            castShadow:             lineSegment.castShadow,
    //            receiveShadow:          lineSegment.receiveShadow,
    //            frustumCulled:          lineSegment.frustumCulled,
    //            renderOrder:            lineSegment.renderOrder,
    //            userData:               this._parseUserData( lineSegment.userData ),
    //            // Specific
    //            geometry:               geometryId,
    //            material:               materialIds,
    //            drawMode:               lineSegment.drawMode
    //        } )
    //
    //    }
    //
    //    _saveLineSegmentInDatabase ( lineSegment, childrenIds, geometryId, materialIds, onError, onSuccess ) {
    //
    //        this._getLineSegmentModel( lineSegment, childrenIds, geometryId, materialIds )
    //            .save()
    //            .then( savedLineSegment => {
    //
    //                onSuccess( savedLineSegment.id )
    //
    //            } )
    //            .catch( onError )
    //
    //    }
    //
    //    // Scene

    _getSceneModel ( scene, childrenIds ) {

        return SceneModel( {
            uuid:                   scene.uuid,
            name:                   scene.name,
            type:                   scene.type,
            parent:                 this._parentId,
            children:               childrenIds,
            up:                     {
                x: scene.up.x,
                y: scene.up.y,
                z: scene.up.z
            },
            position:               {
                x: scene.position.x,
                y: scene.position.y,
                z: scene.position.z
            },
            rotation:               {
                x:     scene.rotation.x,
                y:     scene.rotation.y,
                z:     scene.rotation.z,
                order: scene.rotation.order
            },
            quaternion:             {
                x: scene.quaternion.x,
                y: scene.quaternion.y,
                z: scene.quaternion.z,
                w: scene.quaternion.w
            },
            scale:                  {
                x: scene.scale.x,
                y: scene.scale.y,
                z: scene.scale.z
            },
            modelViewMatrix:        scene.modelViewMatrix.toArray(),
            normalMatrix:           scene.normalMatrix.toArray(),
            matrix:                 scene.matrix.toArray(),
            matrixWorld:            scene.matrixWorld.toArray(),
            matrixAutoUpdate:       scene.matrixAutoUpdate,
            matrixWorldNeedsUpdate: scene.matrixWorldNeedsUpdate,
            layers:                 scene.layers.mask,
            visible:                scene.visible,
            castShadow:             scene.castShadow,
            receiveShadow:          scene.receiveShadow,
            frustumCulled:          scene.frustumCulled,
            renderOrder:            scene.renderOrder,
            userData:               this._parseUserData( scene.userData ),
            // Specific
            background:             scene.background,
            fog:                    null,
            overrideMaterial:       scene.overrideMaterial,
            autoUpdate:             scene.autoUpdate
        } )

    }

    _saveScene ( scene, childrenIds, onError, onSuccess ) {

        this._getSceneModel( scene, childrenIds )
            .save()
            .then( savedScene => {

                const sceneId = savedScene.id

                updateChildren( onError, onSuccess )

                //                  updateBuilding( onError, updateChildren.bind( this, onError, onSuccess ) )
                //
                //                  function updateBuilding ( onError, onSuccess ) {
                //
                //                      BuildingModel.findOneAndUpdate( { _id: _buildingId }, { $push: { scenes: sceneId } }, ( error ) => {
                //
                //                          if ( error ) {
                //                              onError( error )
                //                          } else {
                //                              onSuccess()
                //                          }
                //
                //                      } )
                //
                //                  }

                function updateChildren ( onError, onSuccess ) {

                    const savedChildrenIds = savedScene._doc.children
                    const numberOfChildren = savedChildrenIds.length

                    let endUpdates = 0
                    let childIndex
                    let childId

                    for ( childIndex = 0 ; childIndex < numberOfChildren ; childIndex++ ) {

                        childId = savedChildrenIds[ childIndex ]

                        MeshModel.update( { _id: childId }, { $set: { parent: sceneId } }, () => {

                            endUpdates++
                            if ( endUpdates < numberOfChildren ) {
                                return
                            }

                            onSuccess( sceneId )

                        } );

                    }

                }

            } )
            .catch( onError )

    }

    // Geometry

    _checkIfGeometryAlreadyExist ( geometry ) {

        return this._geometryCache[ geometry.uuid ]

    }

    _getGeometryModel ( geometry, onError, onSuccess ) {

        const geometryType = geometry.type

        switch ( geometryType ) {

            case 'Geometry': {

                onSuccess(
                    GeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate
                    } )
                )

            }
                break

            case 'BoxGeometry': {

                onSuccess(
                    BoxGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'CircleGeometry': {

                onSuccess(
                    CircleGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'CylinderGeometry': {

                onSuccess(
                    CylinderGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'ConeGeometry': {

                onSuccess(
                    ConeGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'DodecahedronGeometry': {

                onSuccess(
                    DodecahedronGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'ExtrudeGeometry': {

                onSuccess(
                    ExtrudeGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'IcosahedronGeometry': {

                onSuccess(
                    IcosahedronGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'LatheGeometry': {

                onSuccess(
                    LatheGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'OctahedronGeometry': {

                onSuccess(
                    OctahedronGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'ParametricGeometry': {

                onSuccess(
                    ParametricGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'PlaneGeometry': {

                onSuccess(
                    PlaneGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'PolyhedronGeometry': {

                onSuccess(
                    PolyhedronGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'RingGeometry': {

                onSuccess(
                    RingGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'ShapeGeometry': {

                onSuccess(
                    ShapeGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'TetrahedronGeometry': {

                onSuccess(
                    TetrahedronGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'TextGeometry': {

                onSuccess(
                    TextGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'TorusGeometry': {

                onSuccess(
                    TorusGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'TorusKnotGeometry': {

                onSuccess(
                    TorusKnotGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            case 'TubeGeometry': {

                onSuccess(
                    TubeGeometryModel( {
                        uuid:                    geometry.uuid,
                        name:                    geometry.name,
                        type:                    geometry.type,
                        vertices:                geometry.vertices,
                        colors:                  geometry.colors,
                        faces:                   geometry.faces,
                        faceVertexUvs:           geometry.faceVertexUvs,
                        morphTargets:            geometry.morphTargets,
                        morphNormals:            geometry.morphNormals,
                        skinWeights:             geometry.skinWeights,
                        skinIndices:             geometry.skinIndices,
                        lineDistances:           geometry.lineDistances,
                        boundingBox:             null,
                        boundingSphere:          null,
                        elementsNeedUpdate:      geometry.elementsNeedUpdate,
                        verticesNeedUpdate:      geometry.verticesNeedUpdate,
                        uvsNeedUpdate:           geometry.uvsNeedUpdate,
                        normalsNeedUpdate:       geometry.normalsNeedUpdate,
                        colorsNeedUpdate:        geometry.colorsNeedUpdate,
                        lineDistancesNeedUpdate: geometry.lineDistancesNeedUpdate,
                        groupsNeedUpdate:        geometry.groupsNeedUpdate,

                        // Specific stuff

                    } )
                )

            }
                break

            default:
                onError( `Unmanaged buffer geometry of type: ${geometryType}` )
                break

        }

    }

    _saveGeometryInDatabase ( geometry, onError, onSuccess ) {

        const self       = this
        const geometryId = this._checkIfGeometryAlreadyExist( geometry )

        if ( geometryId ) {

            onSuccess( geometryId )

        } else {

            this._getGeometryModel( geometry, onError, ( geometryModel ) => {

                geometryModel.save()
                             .then( savedGeometry => {

                                 // Add geometry id to cache
                                 self._geometryCache[ savedGeometry.uuid ] = savedGeometry.id

                                 // Return id
                                 onSuccess( savedGeometry.id )

                             } )
                             .catch( onError )

            } )

        }

    }

    // BufferGeometry

    _checkIfBufferGeometryAlreadyExist ( bufferGeometry ) {

        return this._bufferGeometryCache[ bufferGeometry.uuid ]

    }

    _getBufferGeometryModel ( bufferGeometry, onError, onSuccess ) {

        const bufferGeometryType = bufferGeometry.type

        switch ( bufferGeometryType ) {

            case 'BufferGeometry': {


                // Retrieve attributes
                const geometryAttributes = bufferGeometry.attributes
                let attributes           = {}
                if ( geometryAttributes ) {
                    // TODO: use loop instead

                    const geometryAttributesPosition = geometryAttributes[ 'position' ]
                    if ( geometryAttributesPosition ) {
                        attributes[ 'position' ] = {
                            //                    array:       geometryAttributesPosition.array,
                            array:       Array.from( geometryAttributesPosition.array ),
                            count:       geometryAttributesPosition.count,
                            dynamic:     geometryAttributesPosition.dynamic,
                            itemSize:    geometryAttributesPosition.itemSize,
                            name:        geometryAttributesPosition.name,
                            needsUpdate: geometryAttributesPosition.needsUpdate,
                            normalized:  geometryAttributesPosition.normalized,
                            updateRange: geometryAttributesPosition.updateRange,
                            uuid:        geometryAttributesPosition.uuid,
                            version:     geometryAttributesPosition.version
                        }
                    }

                    const geometryAttributesColor = geometryAttributes[ 'color' ]
                    if ( geometryAttributesColor ) {
                        attributes[ 'color' ] = {
                            //                    array:       geometryAttributesColor.array,
                            array:       Array.from( geometryAttributesColor.array ),
                            count:       geometryAttributesColor.count,
                            dynamic:     geometryAttributesColor.dynamic,
                            itemSize:    geometryAttributesColor.itemSize,
                            name:        geometryAttributesColor.name,
                            needsUpdate: geometryAttributesColor.needsUpdate,
                            normalized:  geometryAttributesColor.normalized,
                            updateRange: geometryAttributesColor.updateRange,
                            uuid:        geometryAttributesColor.uuid,
                            version:     geometryAttributesColor.version
                        }
                    }

                    const geometryAttributesNormal = geometryAttributes[ 'normal' ]
                    if ( geometryAttributesNormal ) {
                        attributes[ 'normal' ] = {
                            //                    array:       geometryAttributesNormal.array,
                            array:       Array.from( geometryAttributesNormal.array ),
                            count:       geometryAttributesNormal.count,
                            dynamic:     geometryAttributesNormal.dynamic,
                            itemSize:    geometryAttributesNormal.itemSize,
                            name:        geometryAttributesNormal.name,
                            needsUpdate: geometryAttributesNormal.needsUpdate,
                            normalized:  geometryAttributesNormal.normalized,
                            updateRange: geometryAttributesNormal.updateRange,
                            uuid:        geometryAttributesNormal.uuid,
                            version:     geometryAttributesNormal.version
                        }
                    }

                    const geometryAttributesUV = geometryAttributes[ 'uv' ]
                    if ( geometryAttributesUV ) {
                        attributes[ 'uv' ] = {
                            //                    array:       geometryAttributesUV.array,
                            array:       Array.from( geometryAttributesUV.array ),
                            count:       geometryAttributesUV.count,
                            dynamic:     geometryAttributesUV.dynamic,
                            itemSize:    geometryAttributesUV.itemSize,
                            name:        geometryAttributesUV.name,
                            needsUpdate: geometryAttributesUV.needsUpdate,
                            normalized:  geometryAttributesUV.normalized,
                            updateRange: geometryAttributesUV.updateRange,
                            uuid:        geometryAttributesUV.uuid,
                            version:     geometryAttributesUV.version
                        }
                    }
                }

                // Retrieve index
                const geometryIndexes = bufferGeometry.index
                let indexes           = {}
                if ( geometryIndexes ) {
                    indexes = {
                        //                array:       geometryIndexes.array,
                        array:       Array.from( geometryIndexes.array ),
                        count:       geometryIndexes.count,
                        dynamic:     geometryIndexes.dynamic,
                        itemSize:    geometryIndexes.itemSize,
                        name:        geometryIndexes.name,
                        needsUpdate: geometryIndexes.needsUpdate,
                        normalized:  geometryIndexes.normalized,
                        updateRange: geometryIndexes.updateRange,
                        uuid:        geometryIndexes.uuid,
                        version:     geometryIndexes.version
                    }
                }

                onSuccess(
                    BufferGeometryModel( {
                        attributes:     attributes,
                        boundingBox:    null,
                        boundingSphere: null,
                        drawRange:      bufferGeometry.drawRange,
                        groups:         bufferGeometry.groups,
                        index:          indexes,
                        name:           bufferGeometry.name,
                        uuid:           bufferGeometry.uuid
                    } )
                )

            }
                break

            case 'BoxBufferGeometry': {

            }
                break

            case 'CircleBufferGeometry': {

            }
                break

            case 'CylinderBufferGeometry': {

            }
                break

            case 'ConeBufferGeometry': {

            }
                break

            case 'EdgesGeometry': {

            }
                break

            case 'ExtrudeBufferGeometry': {

            }
                break

            case 'TextBufferGeometry': {

            }
                break

            case 'InstancedBufferGeometry': {

            }
                break

            case 'LatheBufferGeometry': {

            }
                break

            case 'ParametricBufferGeometry': {

            }
                break

            case 'PlaneBufferGeometry': {

            }
                break

            case 'PolyhedronBufferGeometry': {

            }
                break

            case 'IcosahedronBufferGeometry': {

            }
                break

            case 'OctahedronBufferGeometry': {

            }
                break

            case 'TetrahedronBufferGeometry': {

            }
                break

            case 'RingBufferGeometry': {

            }
                break

            case 'ShapeBufferGeometry': {

            }
                break

            case 'SphereBufferGeometry': {

            }
                break

            case 'TorusBufferGeometry': {

            }
                break

            case 'TorusKnotBufferGeometry': {

            }
                break

            case 'TubeBufferGeometry': {

            }
                break

            case 'WireframeBufferGeometry': {

            }
                break

            default:
                onError( `Unmanaged buffer geometry of type: ${bufferGeometryType}` )
                break

        }

    }

    _saveBufferGeometryInDatabase ( bufferGeometry, onError, onSuccess ) {

        const self             = this
        const bufferGeometryId = this._checkIfBufferGeometryAlreadyExist( bufferGeometry )

        if ( bufferGeometryId ) {

            onSuccess( bufferGeometryId )

        } else {

            this._getBufferGeometryModel( bufferGeometry, onError, ( bufferGeometryModel ) => {

                bufferGeometryModel.save()
                                   .then( savedBufferGeometry => {

                                       // Add geometry id to cache
                                       self._bufferGeometryCache[ savedBufferGeometry.uuid ] = savedBufferGeometry.id

                                       // Return id
                                       onSuccess( savedBufferGeometry.id )

                                   } )
                                   .catch( onError )

            } )

        }

    }

    // Material

    _checkIfMaterialAlreadyExist ( materials ) {

        return this._materialCache[ materials.uuid ]

    }

    _getMaterialModel ( material, onError, onSuccess ) {

        const materialType = material.type

        switch ( materialType ) {

            case 'LineBasicMaterial':
                onSuccess( LineBasicMaterialModel( {
                    uuid:                material.uuid,
                    name:                material.name,
                    type:                material.type,
                    fog:                 material.fog,
                    lights:              material.lights,
                    blending:            material.blending,
                    side:                material.side,
                    flatShading:         material.flatShading,
                    vertexColors:        material.vertexColors,
                    opacity:             material.opacity,
                    transparent:         material.transparent,
                    blendSrc:            material.blendSrc,
                    blendDst:            material.blendDst,
                    blendEquation:       material.blendEquation,
                    blendSrcAlpha:       material.blendSrcAlpha,
                    blendDstAlpha:       material.blendDstAlpha,
                    blendEquationAlpha:  material.blendEquationAlpha,
                    depthFunc:           material.depthFunc,
                    depthTest:           material.depthTest,
                    depthWrite:          material.depthWrite,
                    clippingPlanes:      material.clippingPlanes,
                    clipIntersection:    material.clipIntersection,
                    clipShadows:         material.clipShadows,
                    colorWrite:          material.colorWrite,
                    precision:           material.precision,
                    polygonOffset:       material.polygonOffset,
                    polygonOffsetFactor: material.polygonOffsetFactor,
                    polygonOffsetUnits:  material.polygonOffsetUnits,
                    dithering:           material.dithering,
                    alphaTest:           material.alphaTest,
                    premultipliedAlpha:  material.premultipliedAlpha,
                    overdraw:            material.overdraw,
                    visible:             material.visible,
                    userData:            this._parseUserData( material.userData ),
                    needsUpdate:         material.needsUpdate,
                    // LineBasicMaterial
                    color:               material.color,
                    light:               material.light,
                    lineWidth:           material.lineWidth,
                    linecap:             material.linecap,
                    linejoin:            material.linejoin
                } ) )
                break

            case 'LineDashedMaterial':
                onSuccess( LineDashedMaterialModel( {
                    uuid:                material.uuid,
                    name:                material.name,
                    type:                material.type,
                    fog:                 material.fog,
                    lights:              material.lights,
                    blending:            material.blending,
                    side:                material.side,
                    flatShading:         material.flatShading,
                    vertexColors:        material.vertexColors,
                    opacity:             material.opacity,
                    transparent:         material.transparent,
                    blendSrc:            material.blendSrc,
                    blendDst:            material.blendDst,
                    blendEquation:       material.blendEquation,
                    blendSrcAlpha:       material.blendSrcAlpha,
                    blendDstAlpha:       material.blendDstAlpha,
                    blendEquationAlpha:  material.blendEquationAlpha,
                    depthFunc:           material.depthFunc,
                    depthTest:           material.depthTest,
                    depthWrite:          material.depthWrite,
                    clippingPlanes:      material.clippingPlanes,
                    clipIntersection:    material.clipIntersection,
                    clipShadows:         material.clipShadows,
                    colorWrite:          material.colorWrite,
                    precision:           material.precision,
                    polygonOffset:       material.polygonOffset,
                    polygonOffsetFactor: material.polygonOffsetFactor,
                    polygonOffsetUnits:  material.polygonOffsetUnits,
                    dithering:           material.dithering,
                    alphaTest:           material.alphaTest,
                    premultipliedAlpha:  material.premultipliedAlpha,
                    overdraw:            material.overdraw,
                    visible:             material.visible,
                    userData:            this._parseUserData( material.userData ),
                    needsUpdate:         material.needsUpdate,
                    // LineBasicMaterial
                    color:               material.color,
                    light:               material.light,
                    lineWidth:           material.lineWidth,
                    linecap:             material.linecap,
                    linejoin:            material.linejoin,
                    // LineDashedMaterial
                    dashSize:            material.dashSize,
                    gapSize:             material.gapSize,
                    scale:               material.scale
                } ) )
                break

            case 'MeshBasicMaterial':
                onSuccess( MeshBasicMaterialModel( {
                    uuid:                material.uuid,
                    name:                material.name,
                    type:                material.type,
                    fog:                 material.fog,
                    lights:              material.lights,
                    blending:            material.blending,
                    side:                material.side,
                    flatShading:         material.flatShading,
                    vertexColors:        material.vertexColors,
                    opacity:             material.opacity,
                    transparent:         material.transparent,
                    blendSrc:            material.blendSrc,
                    blendDst:            material.blendDst,
                    blendEquation:       material.blendEquation,
                    blendSrcAlpha:       material.blendSrcAlpha,
                    blendDstAlpha:       material.blendDstAlpha,
                    blendEquationAlpha:  material.blendEquationAlpha,
                    depthFunc:           material.depthFunc,
                    depthTest:           material.depthTest,
                    depthWrite:          material.depthWrite,
                    clippingPlanes:      material.clippingPlanes,
                    clipIntersection:    material.clipIntersection,
                    clipShadows:         material.clipShadows,
                    colorWrite:          material.colorWrite,
                    precision:           material.precision,
                    polygonOffset:       material.polygonOffset,
                    polygonOffsetFactor: material.polygonOffsetFactor,
                    polygonOffsetUnits:  material.polygonOffsetUnits,
                    dithering:           material.dithering,
                    alphaTest:           material.alphaTest,
                    premultipliedAlpha:  material.premultipliedAlpha,
                    overdraw:            material.overdraw,
                    visible:             material.visible,
                    userData:            this._parseUserData( material.userData ),
                    needsUpdate:         material.needsUpdate,
                    // MeshBasicMaterial
                    color:               material.color,
                    map:                 material.map, // Unknown yet
                    lightMap:            material.lightMap, // Unknown yet
                    lightMapIntensity:   material.lightMapIntensity,
                    aoMap:               material.aoMap, // Unknown yet
                    aoMapIntensity:      material.aoMapIntensity,
                    specularMap:         material.specularMap, // Unknown yet
                    alphaMap:            material.alphaMap, // Unknown yet
                    envMap:              material.envMap, // Unknown yet
                    combine:             material.combine,
                    reflectivity:        material.reflectivity,
                    refractionRatio:     material.refractionRatio,
                    wireframe:           material.wireframe,
                    wireframeLinewidth:  material.wireframeLinewidth,
                    wireframeLinecap:    material.wireframeLinecap,
                    wireframeLinejoin:   material.wireframeLinejoin,
                    skinning:            material.skinning,
                    morphTargets:        material.morphTargets,
                    light:               material.light
                } ) )
                break

            case 'MeshDepthMaterial':
                onSuccess( MeshDepthMaterialModel( {
                    uuid:                material.uuid,
                    name:                material.name,
                    type:                material.type,
                    fog:                 material.fog,
                    lights:              material.lights,
                    blending:            material.blending,
                    side:                material.side,
                    flatShading:         material.flatShading,
                    vertexColors:        material.vertexColors,
                    opacity:             material.opacity,
                    transparent:         material.transparent,
                    blendSrc:            material.blendSrc,
                    blendDst:            material.blendDst,
                    blendEquation:       material.blendEquation,
                    blendSrcAlpha:       material.blendSrcAlpha,
                    blendDstAlpha:       material.blendDstAlpha,
                    blendEquationAlpha:  material.blendEquationAlpha,
                    depthFunc:           material.depthFunc,
                    depthTest:           material.depthTest,
                    depthWrite:          material.depthWrite,
                    clippingPlanes:      material.clippingPlanes,
                    clipIntersection:    material.clipIntersection,
                    clipShadows:         material.clipShadows,
                    colorWrite:          material.colorWrite,
                    precision:           material.precision,
                    polygonOffset:       material.polygonOffset,
                    polygonOffsetFactor: material.polygonOffsetFactor,
                    polygonOffsetUnits:  material.polygonOffsetUnits,
                    dithering:           material.dithering,
                    alphaTest:           material.alphaTest,
                    premultipliedAlpha:  material.premultipliedAlpha,
                    overdraw:            material.overdraw,
                    visible:             material.visible,
                    userData:            this._parseUserData( material.userData ),
                    needsUpdate:         material.needsUpdate,
                    // MeshDepthMaterial
                    depthPacking:        material.depthPacking,
                    skinning:            material.skinning,
                    morphTargets:        material.morphTargets,
                    map:                 material.map, // Unknown yet
                    alphaMap:            material.alphaMap, // Unknown yet
                    displacementMap:     material.displacementMap, // Unknown yet
                    displacementScale:   material.displacementScale,
                    displacementBias:    material.displacementBias,
                    wireframe:           material.wireframe,
                    wireframeLinewidth:  material.wireframeLinewidth,
                    light:               material.light
                } ) )
                break

            case 'MeshDistanceMaterial':
                onSuccess( MeshDistanceMaterialModel( {
                    uuid:                material.uuid,
                    name:                material.name,
                    type:                material.type,
                    fog:                 material.fog,
                    lights:              material.lights,
                    blending:            material.blending,
                    side:                material.side,
                    flatShading:         material.flatShading,
                    vertexColors:        material.vertexColors,
                    opacity:             material.opacity,
                    transparent:         material.transparent,
                    blendSrc:            material.blendSrc,
                    blendDst:            material.blendDst,
                    blendEquation:       material.blendEquation,
                    blendSrcAlpha:       material.blendSrcAlpha,
                    blendDstAlpha:       material.blendDstAlpha,
                    blendEquationAlpha:  material.blendEquationAlpha,
                    depthFunc:           material.depthFunc,
                    depthTest:           material.depthTest,
                    depthWrite:          material.depthWrite,
                    clippingPlanes:      material.clippingPlanes,
                    clipIntersection:    material.clipIntersection,
                    clipShadows:         material.clipShadows,
                    colorWrite:          material.colorWrite,
                    precision:           material.precision,
                    polygonOffset:       material.polygonOffset,
                    polygonOffsetFactor: material.polygonOffsetFactor,
                    polygonOffsetUnits:  material.polygonOffsetUnits,
                    dithering:           material.dithering,
                    alphaTest:           material.alphaTest,
                    premultipliedAlpha:  material.premultipliedAlpha,
                    overdraw:            material.overdraw,
                    visible:             material.visible,
                    userData:            this._parseUserData( material.userData ),
                    needsUpdate:         material.needsUpdate,
                    // MeshDistanceMaterial
                    referencePosition:   material.referencePosition,
                    nearDistance:        material.nearDistance,
                    farDistance:         material.farDistance,
                    skinning:            material.skinning,
                    morphTargets:        material.morphTargets,
                    map:                 material.map, // Unknown yet
                    alphaMap:            material.alphaMap, // Unknown yet
                    displacementMap:     material.displacementMap, // Unknown yet
                    displacementScale:   material.displacementScale,
                    displacementBias:    material.displacementBias,
                    light:               material.light,
                } ) )
                break

            case 'MeshLambertMaterial':
                onSuccess( MeshLambertMaterialModel( {
                    uuid:                material.uuid,
                    name:                material.name,
                    type:                material.type,
                    fog:                 material.fog,
                    lights:              material.lights,
                    blending:            material.blending,
                    side:                material.side,
                    flatShading:         material.flatShading,
                    vertexColors:        material.vertexColors,
                    opacity:             material.opacity,
                    transparent:         material.transparent,
                    blendSrc:            material.blendSrc,
                    blendDst:            material.blendDst,
                    blendEquation:       material.blendEquation,
                    blendSrcAlpha:       material.blendSrcAlpha,
                    blendDstAlpha:       material.blendDstAlpha,
                    blendEquationAlpha:  material.blendEquationAlpha,
                    depthFunc:           material.depthFunc,
                    depthTest:           material.depthTest,
                    depthWrite:          material.depthWrite,
                    clippingPlanes:      material.clippingPlanes,
                    clipIntersection:    material.clipIntersection,
                    clipShadows:         material.clipShadows,
                    colorWrite:          material.colorWrite,
                    precision:           material.precision,
                    polygonOffset:       material.polygonOffset,
                    polygonOffsetFactor: material.polygonOffsetFactor,
                    polygonOffsetUnits:  material.polygonOffsetUnits,
                    dithering:           material.dithering,
                    alphaTest:           material.alphaTest,
                    premultipliedAlpha:  material.premultipliedAlpha,
                    overdraw:            material.overdraw,
                    visible:             material.visible,
                    userData:            this._parseUserData( material.userData ),
                    needsUpdate:         material.needsUpdate,
                    // MeshLambertMaterial
                    color:               material.color,
                    map:                 material.map, // Unknown yet
                    lightMap:            material.lightMap, // Unknown yet
                    lightMapIntensity:   material.lightMapIntensity,
                    aoMap:               material.aoMap, // Unknown yet
                    aoMapIntensity:      material.aoMapIntensity,
                    emissive:            material.emissive,
                    emissiveIntensity:   material.emissiveIntensity,
                    emissiveMap:         material.emissiveMap, // Unknown yet
                    specularMap:         material.specularMap, // Unknown yet
                    alphaMap:            material.alphaMap, // Unknown yet
                    envMap:              material.envMap, // Unknown yet
                    combine:             material.combine,
                    reflectivity:        material.reflectivity,
                    refractionRatio:     material.refractionRatio,
                    wireframe:           material.wireframe,
                    wireframeLinewidth:  material.wireframeLinewidth,
                    wireframeLinecap:    material.wireframeLinecap,
                    wireframeLinejoin:   material.wireframeLinejoin,
                    skinning:            material.skinning,
                    morphTargets:        material.morphTargets,
                    morphNormals:        material.morphNormals,
                } ) )
                break

            case 'MeshNormalMaterial':
                onSuccess( MeshNormalMaterialModel( {
                    uuid:                material.uuid,
                    name:                material.name,
                    type:                material.type,
                    fog:                 material.fog,
                    lights:              material.lights,
                    blending:            material.blending,
                    side:                material.side,
                    flatShading:         material.flatShading,
                    vertexColors:        material.vertexColors,
                    opacity:             material.opacity,
                    transparent:         material.transparent,
                    blendSrc:            material.blendSrc,
                    blendDst:            material.blendDst,
                    blendEquation:       material.blendEquation,
                    blendSrcAlpha:       material.blendSrcAlpha,
                    blendDstAlpha:       material.blendDstAlpha,
                    blendEquationAlpha:  material.blendEquationAlpha,
                    depthFunc:           material.depthFunc,
                    depthTest:           material.depthTest,
                    depthWrite:          material.depthWrite,
                    clippingPlanes:      material.clippingPlanes,
                    clipIntersection:    material.clipIntersection,
                    clipShadows:         material.clipShadows,
                    colorWrite:          material.colorWrite,
                    precision:           material.precision,
                    polygonOffset:       material.polygonOffset,
                    polygonOffsetFactor: material.polygonOffsetFactor,
                    polygonOffsetUnits:  material.polygonOffsetUnits,
                    dithering:           material.dithering,
                    alphaTest:           material.alphaTest,
                    premultipliedAlpha:  material.premultipliedAlpha,
                    overdraw:            material.overdraw,
                    visible:             material.visible,
                    userData:            this._parseUserData( material.userData ),
                    needsUpdate:         material.needsUpdate,
                    // MeshNormalMaterial
                    bumpMap:             material.bumpMap, // Unknown yet
                    bumpScale:           material.bumpScale,
                    normalMap:           material.normalMap, // Unknown yet
                    normalScale:         material.normalScale,
                    displacementMap:     material.displacementMap, // Unknown yet
                    displacementScale:   material.displacementScale,
                    displacementBias:    material.displacementBias,
                    wireframe:           material.wireframe,
                    wireframeLinewidth:  material.wireframeLinewidth,
                    light:               material.light,
                    skinning:            material.skinning,
                    morphTargets:        material.morphTargets,
                    morphNormals:        material.morphNormals,
                } ) )
                break

            case 'MeshPhongMaterial':
                onSuccess( MeshPhongMaterialModel( {
                    uuid:                material.uuid,
                    name:                material.name,
                    type:                material.type,
                    fog:                 material.fog,
                    lights:              material.lights,
                    blending:            material.blending,
                    side:                material.side,
                    flatShading:         material.flatShading,
                    vertexColors:        material.vertexColors,
                    opacity:             material.opacity,
                    transparent:         material.transparent,
                    blendSrc:            material.blendSrc,
                    blendDst:            material.blendDst,
                    blendEquation:       material.blendEquation,
                    blendSrcAlpha:       material.blendSrcAlpha,
                    blendDstAlpha:       material.blendDstAlpha,
                    blendEquationAlpha:  material.blendEquationAlpha,
                    depthFunc:           material.depthFunc,
                    depthTest:           material.depthTest,
                    depthWrite:          material.depthWrite,
                    clippingPlanes:      material.clippingPlanes,
                    clipIntersection:    material.clipIntersection,
                    clipShadows:         material.clipShadows,
                    colorWrite:          material.colorWrite,
                    precision:           material.precision,
                    polygonOffset:       material.polygonOffset,
                    polygonOffsetFactor: material.polygonOffsetFactor,
                    polygonOffsetUnits:  material.polygonOffsetUnits,
                    dithering:           material.dithering,
                    alphaTest:           material.alphaTest,
                    premultipliedAlpha:  material.premultipliedAlpha,
                    overdraw:            material.overdraw,
                    visible:             material.visible,
                    userData:            this._parseUserData( material.userData ),
                    needsUpdate:         material.needsUpdate,
                    // MeshPhongMaterial
                    color:               material.color,
                    specular:            material.specular,
                    shininess:           material.shininess,
                    map:                 material.map,
                    lightMap:            material.lightMap,
                    lightMapIntensity:   material.lightMapIntensity,
                    aoMap:               material.aoMap,
                    aoMapIntensity:      material.aoMapIntensity,
                    emissive:            material.emissive,
                    emissiveIntensity:   material.emissiveIntensity,
                    emissiveMap:         material.emissiveMap,
                    bumpMap:             material.bumpMap,
                    bumpScale:           material.bumpScale,
                    normalMap:           material.normalMap,
                    normalScale:         material.normalScale,
                    displacementMap:     material.displacementMap,
                    displacementScale:   material.displacementScale,
                    displacementBias:    material.displacementBias,
                    specularMap:         material.specularMap,
                    alphaMap:            material.alphaMap,
                    envMap:              material.alphaMap,
                    combine:             material.combine,
                    reflectivity:        material.reflectivity,
                    refractionRatio:     material.refractionRatio,
                    wireframe:           material.wireframe,
                    wireframeLinewidth:  material.wireframeLinewidth,
                    wireframeLinecap:    material.wireframeLinecap,
                    wireframeLinejoin:   material.wireframeLinejoin,
                    skinning:            material.skinning,
                    morphTargets:        material.morphTargets,
                    morphNormals:        material.morphNormals
                } ) )
                break

            case 'MeshToonMaterial':
                onSuccess( MeshToonMaterialModel( {
                    uuid:                material.uuid,
                    name:                material.name,
                    type:                material.type,
                    fog:                 material.fog,
                    lights:              material.lights,
                    blending:            material.blending,
                    side:                material.side,
                    flatShading:         material.flatShading,
                    vertexColors:        material.vertexColors,
                    opacity:             material.opacity,
                    transparent:         material.transparent,
                    blendSrc:            material.blendSrc,
                    blendDst:            material.blendDst,
                    blendEquation:       material.blendEquation,
                    blendSrcAlpha:       material.blendSrcAlpha,
                    blendDstAlpha:       material.blendDstAlpha,
                    blendEquationAlpha:  material.blendEquationAlpha,
                    depthFunc:           material.depthFunc,
                    depthTest:           material.depthTest,
                    depthWrite:          material.depthWrite,
                    clippingPlanes:      material.clippingPlanes,
                    clipIntersection:    material.clipIntersection,
                    clipShadows:         material.clipShadows,
                    colorWrite:          material.colorWrite,
                    precision:           material.precision,
                    polygonOffset:       material.polygonOffset,
                    polygonOffsetFactor: material.polygonOffsetFactor,
                    polygonOffsetUnits:  material.polygonOffsetUnits,
                    dithering:           material.dithering,
                    alphaTest:           material.alphaTest,
                    premultipliedAlpha:  material.premultipliedAlpha,
                    overdraw:            material.overdraw,
                    visible:             material.visible,
                    userData:            this._parseUserData( material.userData ),
                    needsUpdate:         material.needsUpdate,
                    // MeshPhongMaterial
                    color:               material.color,
                    specular:            material.specular,
                    shininess:           material.shininess,
                    map:                 material.map, // Unknown yet
                    lightMap:            material.lightMap, // Unknown yet
                    lightMapIntensity:   material.lightMapIntensity,
                    aoMap:               material.aoMap, // Unknown yet
                    aoMapIntensity:      material.aoMapIntensity,
                    emissive:            material.emissive,
                    emissiveIntensity:   material.emissiveIntensity,
                    emissiveMap:         material.emissiveMap, // Unknown yet
                    bumpMap:             material.bumpMap, // Unknown yet
                    bumpScale:           material.bumpScale,
                    normalMap:           material.normalMap, // Unknown yet
                    normalScale:         material.normalScale,
                    displacementMap:     material.displacementMap, // Unknown yet
                    displacementScale:   material.displacementScale,
                    displacementBias:    material.displacementBias,
                    specularMap:         material.specularMap, // Unknown yet
                    alphaMap:            material.alphaMap, // Unknown yet
                    envMap:              material.envMap, // Unknown yet
                    combine:             material.combine,
                    reflectivity:        material.reflectivity,
                    refractionRatio:     material.refractionRatio,
                    wireframe:           material.wireframe,
                    wireframeLinewidth:  material.wireframeLinewidth,
                    wireframeLinecap:    material.wireframeLinecap,
                    wireframeLinejoin:   material.wireframeLinejoin,
                    skinning:            material.skinning,
                    morphTargets:        material.morphTargets,
                    morphNormals:        material.morphNormals,
                    // MeshToonMaterial
                    gradientMap:         material.gradientMap
                } ) )
                break

            case 'MeshPhysicalMaterial':
                onSuccess( MeshPhysicalMaterialModel( {
                    uuid:                material.uuid,
                    name:                material.name,
                    type:                material.type,
                    fog:                 material.fog,
                    lights:              material.lights,
                    blending:            material.blending,
                    side:                material.side,
                    flatShading:         material.flatShading,
                    vertexColors:        material.vertexColors,
                    opacity:             material.opacity,
                    transparent:         material.transparent,
                    blendSrc:            material.blendSrc,
                    blendDst:            material.blendDst,
                    blendEquation:       material.blendEquation,
                    blendSrcAlpha:       material.blendSrcAlpha,
                    blendDstAlpha:       material.blendDstAlpha,
                    blendEquationAlpha:  material.blendEquationAlpha,
                    depthFunc:           material.depthFunc,
                    depthTest:           material.depthTest,
                    depthWrite:          material.depthWrite,
                    clippingPlanes:      material.clippingPlanes,
                    clipIntersection:    material.clipIntersection,
                    clipShadows:         material.clipShadows,
                    colorWrite:          material.colorWrite,
                    precision:           material.precision,
                    polygonOffset:       material.polygonOffset,
                    polygonOffsetFactor: material.polygonOffsetFactor,
                    polygonOffsetUnits:  material.polygonOffsetUnits,
                    dithering:           material.dithering,
                    alphaTest:           material.alphaTest,
                    premultipliedAlpha:  material.premultipliedAlpha,
                    overdraw:            material.overdraw,
                    visible:             material.visible,
                    userData:            this._parseUserData( material.userData ),
                    needsUpdate:         material.needsUpdate,
                    // MeshPhysicalMaterial
                    reflectivity:        material.reflectivity,
                    clearCoat:           material.clearCoat,
                    clearCoatRoughness:  material.clearCoatRoughness
                } ) )
                break

            case 'MeshStandardMaterial':
                onSuccess( MeshStandardMaterialModel( {
                    uuid:                material.uuid,
                    name:                material.name,
                    type:                material.type,
                    fog:                 material.fog,
                    lights:              material.lights,
                    blending:            material.blending,
                    side:                material.side,
                    flatShading:         material.flatShading,
                    vertexColors:        material.vertexColors,
                    opacity:             material.opacity,
                    transparent:         material.transparent,
                    blendSrc:            material.blendSrc,
                    blendDst:            material.blendDst,
                    blendEquation:       material.blendEquation,
                    blendSrcAlpha:       material.blendSrcAlpha,
                    blendDstAlpha:       material.blendDstAlpha,
                    blendEquationAlpha:  material.blendEquationAlpha,
                    depthFunc:           material.depthFunc,
                    depthTest:           material.depthTest,
                    depthWrite:          material.depthWrite,
                    clippingPlanes:      material.clippingPlanes,
                    clipIntersection:    material.clipIntersection,
                    clipShadows:         material.clipShadows,
                    colorWrite:          material.colorWrite,
                    precision:           material.precision,
                    polygonOffset:       material.polygonOffset,
                    polygonOffsetFactor: material.polygonOffsetFactor,
                    polygonOffsetUnits:  material.polygonOffsetUnits,
                    dithering:           material.dithering,
                    alphaTest:           material.alphaTest,
                    premultipliedAlpha:  material.premultipliedAlpha,
                    overdraw:            material.overdraw,
                    visible:             material.visible,
                    userData:            this._parseUserData( material.userData ),
                    needsUpdate:         material.needsUpdate,
                    // MeshStandardMaterial
                    color:               material.color,
                    roughness:           material.roughness,
                    metalness:           material.metalness,
                    map:                 material.map, // Unknown yet
                    lightMap:            material.lightMap, // Unknown yet
                    lightMapIntensity:   material.lightMapIntensity,
                    aoMap:               material.aoMap, // Unknown yet
                    aoMapIntensity:      material.aoMapIntensity,
                    emissive:            material.emissive,
                    emissiveIntensity:   material.emissiveIntensity,
                    emissiveMap:         material.emissiveMap, // Unknown yet
                    bumpMap:             material.bumpMap, // Unknown yet
                    bumpScale:           material.bumpScale,
                    normalMap:           material.normalMap, // Unknown yet
                    normalScale:         material.normalScale,
                    displacementMap:     material.displacementMap, // Unknown yet
                    displacementScale:   material.displacementScale,
                    displacementBias:    material.displacementBias,
                    roughnessMap:        material.roughnessMap, // Unknown yet
                    metalnessMap:        material.metalnessMap, // Unknown yet
                    alphaMap:            material.alphaMap, // Unknown yet
                    envMap:              material.envMap, // Unknown yet
                    envMapIntensity:     material.envMapIntensity,
                    refractionRatio:     material.refractionRatio,
                    wireframe:           material.wireframe,
                    wireframeLinewidth:  material.wireframeLinewidth,
                    wireframeLinecap:    material.wireframeLinecap,
                    wireframeLinejoin:   material.wireframeLinejoin,
                    skinning:            material.skinning,
                    morphTargets:        material.morphTargets,
                    morphNormals:        material.morphNormals
                } ) )
                break

            case 'PointsMaterial':
                onSuccess( PointsMaterialModel( {
                    uuid:                material.uuid,
                    name:                material.name,
                    type:                material.type,
                    fog:                 material.fog,
                    lights:              material.lights,
                    blending:            material.blending,
                    side:                material.side,
                    flatShading:         material.flatShading,
                    vertexColors:        material.vertexColors,
                    opacity:             material.opacity,
                    transparent:         material.transparent,
                    blendSrc:            material.blendSrc,
                    blendDst:            material.blendDst,
                    blendEquation:       material.blendEquation,
                    blendSrcAlpha:       material.blendSrcAlpha,
                    blendDstAlpha:       material.blendDstAlpha,
                    blendEquationAlpha:  material.blendEquationAlpha,
                    depthFunc:           material.depthFunc,
                    depthTest:           material.depthTest,
                    depthWrite:          material.depthWrite,
                    clippingPlanes:      material.clippingPlanes,
                    clipIntersection:    material.clipIntersection,
                    clipShadows:         material.clipShadows,
                    colorWrite:          material.colorWrite,
                    precision:           material.precision,
                    polygonOffset:       material.polygonOffset,
                    polygonOffsetFactor: material.polygonOffsetFactor,
                    polygonOffsetUnits:  material.polygonOffsetUnits,
                    dithering:           material.dithering,
                    alphaTest:           material.alphaTest,
                    premultipliedAlpha:  material.premultipliedAlpha,
                    overdraw:            material.overdraw,
                    visible:             material.visible,
                    userData:            this._parseUserData( material.userData ),
                    needsUpdate:         material.needsUpdate,
                    // PointsMaterial
                    color:               material.color,
                    map:                 material.map, // Unknown yet
                    size:                material.size,
                    sizeAttenuation:     material.sizeAttenuation
                } ) )
                break

            case 'ShaderMaterial':
                onSuccess( ShaderMaterialModel( {
                    uuid:                material.uuid,
                    name:                material.name,
                    type:                material.type,
                    fog:                 material.fog,
                    lights:              material.lights,
                    blending:            material.blending,
                    side:                material.side,
                    flatShading:         material.flatShading,
                    vertexColors:        material.vertexColors,
                    opacity:             material.opacity,
                    transparent:         material.transparent,
                    blendSrc:            material.blendSrc,
                    blendDst:            material.blendDst,
                    blendEquation:       material.blendEquation,
                    blendSrcAlpha:       material.blendSrcAlpha,
                    blendDstAlpha:       material.blendDstAlpha,
                    blendEquationAlpha:  material.blendEquationAlpha,
                    depthFunc:           material.depthFunc,
                    depthTest:           material.depthTest,
                    depthWrite:          material.depthWrite,
                    clippingPlanes:      material.clippingPlanes,
                    clipIntersection:    material.clipIntersection,
                    clipShadows:         material.clipShadows,
                    colorWrite:          material.colorWrite,
                    precision:           material.precision,
                    polygonOffset:       material.polygonOffset,
                    polygonOffsetFactor: material.polygonOffsetFactor,
                    polygonOffsetUnits:  material.polygonOffsetUnits,
                    dithering:           material.dithering,
                    alphaTest:           material.alphaTest,
                    premultipliedAlpha:  material.premultipliedAlpha,
                    overdraw:            material.overdraw,
                    visible:             material.visible,
                    userData:            this._parseUserData( material.userData ),
                    needsUpdate:         material.needsUpdate,
                    // ShaderMaterial
                    defines:             material.defines, // Unknown yet
                    uniforms:            material.uniforms, // Unknown yet
                    vertexShader:        material.vertexShader,
                    fragmentShader:      material.fragmentShader,
                    linewidth:           material.linewidth,
                    wireframe:           material.wireframe,
                    wireframeLinewidth:  material.wireframeLinewidth,
                    light:               material.light,
                    clipping:            material.clipping,
                    skinning:            material.skinning,
                    morphTargets:        material.morphTargets,
                    morphNormals:        material.morphNormals,
                    derivatives:         material.derivatives,
                    fragDepth:           material.fragDepth,
                    drawBuffers:         material.drawBuffers,
                    shaderTextureLOD:    material.shaderTextureLOD
                } ) )
                break

            case 'ShadowMaterial':
                onSuccess( ShadowMaterialModel( {
                    uuid:                material.uuid,
                    name:                material.name,
                    type:                material.type,
                    fog:                 material.fog,
                    lights:              material.lights,
                    blending:            material.blending,
                    side:                material.side,
                    flatShading:         material.flatShading,
                    vertexColors:        material.vertexColors,
                    opacity:             material.opacity,
                    transparent:         material.transparent,
                    blendSrc:            material.blendSrc,
                    blendDst:            material.blendDst,
                    blendEquation:       material.blendEquation,
                    blendSrcAlpha:       material.blendSrcAlpha,
                    blendDstAlpha:       material.blendDstAlpha,
                    blendEquationAlpha:  material.blendEquationAlpha,
                    depthFunc:           material.depthFunc,
                    depthTest:           material.depthTest,
                    depthWrite:          material.depthWrite,
                    clippingPlanes:      material.clippingPlanes,
                    clipIntersection:    material.clipIntersection,
                    clipShadows:         material.clipShadows,
                    colorWrite:          material.colorWrite,
                    precision:           material.precision,
                    polygonOffset:       material.polygonOffset,
                    polygonOffsetFactor: material.polygonOffsetFactor,
                    polygonOffsetUnits:  material.polygonOffsetUnits,
                    dithering:           material.dithering,
                    alphaTest:           material.alphaTest,
                    premultipliedAlpha:  material.premultipliedAlpha,
                    overdraw:            material.overdraw,
                    visible:             material.visible,
                    userData:            this._parseUserData( material.userData ),
                    needsUpdate:         material.needsUpdate,
                    // ShadowMaterial
                    color:               material.color
                } ) )
                break

            case 'SpriteMaterial':
                onSuccess( SpriteMaterialModel( {
                    uuid:                material.uuid,
                    name:                material.name,
                    type:                material.type,
                    fog:                 material.fog,
                    lights:              material.lights,
                    blending:            material.blending,
                    side:                material.side,
                    flatShading:         material.flatShading,
                    vertexColors:        material.vertexColors,
                    opacity:             material.opacity,
                    transparent:         material.transparent,
                    blendSrc:            material.blendSrc,
                    blendDst:            material.blendDst,
                    blendEquation:       material.blendEquation,
                    blendSrcAlpha:       material.blendSrcAlpha,
                    blendDstAlpha:       material.blendDstAlpha,
                    blendEquationAlpha:  material.blendEquationAlpha,
                    depthFunc:           material.depthFunc,
                    depthTest:           material.depthTest,
                    depthWrite:          material.depthWrite,
                    clippingPlanes:      material.clippingPlanes,
                    clipIntersection:    material.clipIntersection,
                    clipShadows:         material.clipShadows,
                    colorWrite:          material.colorWrite,
                    precision:           material.precision,
                    polygonOffset:       material.polygonOffset,
                    polygonOffsetFactor: material.polygonOffsetFactor,
                    polygonOffsetUnits:  material.polygonOffsetUnits,
                    dithering:           material.dithering,
                    alphaTest:           material.alphaTest,
                    premultipliedAlpha:  material.premultipliedAlpha,
                    overdraw:            material.overdraw,
                    visible:             material.visible,
                    userData:            this._parseUserData( material.userData ),
                    needsUpdate:         material.needsUpdate,
                    // SpriteMaterial
                    color:               material.color,
                    map:                 material.map, // Unknown yet
                    rotation:            material.rotation
                } ) )
                break

            default:
                onError( `Unmanaged material of type: ${materialType}` )
                break

        }

    }

    _saveMaterialInDatabase ( materials, onError, onSuccess ) {

        const self = this
        if ( Array.isArray( materials ) ) {

            const numberOfMaterials    = materials.length
            let materialIds            = new Array( numberOfMaterials )
            let numberOfSavedMaterials = 0
            let material               = undefined
            for ( let materialIndex = 0 ; materialIndex < numberOfMaterials ; materialIndex++ ) {

                material         = materials[ materialIndex ]
                const materialId = this._checkIfMaterialAlreadyExist( material )

                if ( materialId ) {

                    materialIds[ materialIndex ] = materialId
                    numberOfSavedMaterials++

                    // End condition
                    if ( numberOfSavedMaterials === numberOfMaterials ) {
                        onSuccess( materialIds )
                    }

                } else {

                    (function closeIndex () {

                        const materialLocalIndex = materialIndex

                        this._getMaterialModel( materials, onError, ( materialModel ) => {

                            materialModel.save()
                                         .then( savedMaterial => {

                                             materialIds[ materialLocalIndex ] = savedMaterial.id
                                             numberOfSavedMaterials++

                                             // Add material id to cache
                                             self._materialCache[ savedMaterial.uuid ] = savedMaterial.id

                                             // End condition
                                             if ( numberOfSavedMaterials === numberOfMaterials ) {
                                                 onSuccess( materialIds )
                                             }

                                         } )
                                         .catch( onError )

                        } )

                    })()

                }

            }

        } else {

            const materialId = this._checkIfMaterialAlreadyExist( materials )

            if ( materialId ) {

                onSuccess( materialId )

            } else {

                this._getMaterialModel( materials, onError, ( materialModel ) => {

                    materialModel.save()
                                 .then( savedMaterial => {

                                     // Add material id to cache
                                     self._materialCache[ savedMaterial.uuid ] = savedMaterial.id

                                     // Return id
                                     onSuccess( savedMaterial.id )

                                 } )
                                 .catch( onError )

                } )

            }

        }

    }

    // Texture

}

module.exports = ThreeToMongoDB
