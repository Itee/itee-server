/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

/* global Itee */

const AppPage = {
    template: `
        <TContainer orientation="vertical" hAlign="stretch" vAlign="start" expand=true>
        
            <TContent id="appContent">
                <router-view></router-view>
            </TContent>
                        
            <TContainerCentered id="splashScreen" expand=true>
                <img src="./resources/images/Geomap-Imagis_V_700px.png">
            </TContainerCentered>
            
        </TContainer>
    `,
    data:     function () {
        return {
            isInit: false
        }
    },
    props:    [
        'navLinks'
    ],
    methods:  {},
    mounted () {
        'use strict'

        const self = this

        if ( !self.isInit ) {

            const footer = document.getElementById( 'appFooter' )
            if ( footer ) {
                footer.style.display = 'none'
            }

            const content = document.getElementById( 'appContent' )
            if ( content ) {
                content.style.display = 'none'
            }

            const header = document.getElementById( 'appHeader' )
            if ( header ) {
                header.style.display = 'none'
            }

            const splash = document.getElementById( 'splashScreen' )
            if ( splash ) {
                splash.style.display = 'flex'
            }

            setTimeout( function () {

                if ( splash ) {
                    splash.style.display = 'none'
                }

                if ( header ) {
                    header.style.display = 'flex'
                }

                if ( content ) {
                    content.style.display = 'flex'
                }

                if ( footer ) {
                    footer.style.display = 'flex'
                }

            }, 20 )

            self.isInit = true

        }

    }
}

const ViewerPage = {
    template: `
   <TContainerVertical vAlign="start" hAlign="stretch" expand="true">
     
        <TContainerHorizontal vAlign="center" hAlign="spaced" style="background-color: #323232;">
        
            <TToolBar>
                <TToolItem icon="hand-pointer" tooltip="Sélection" :isActive="toolbar.selectIsActive" :onClick="()=>{updateActiveToolItems('select')}" />
                <TToolItem icon="wifi" tooltip="Rayon X" :isActive="toolbar.xRayIsActive" :onClick="()=>{updateActiveToolItems('xRay')}" />
                <TToolDropDown popAt="bottomLeft" tooltip="Outil de découpe" icon="cut" :isActive="toolbar.clippingIsActive">
                    <TToolItem icon="long-arrow-alt-down" label="Hauteur" tooltip="Effectuer une coupe dans la hauteur" :isActive="toolbar.verticalClippingIsActive" :onClick="()=>{updateActiveToolItems('verticalClipping')}" />
                    <TToolItem icon="long-arrow-alt-right" label="Largeur" tooltip="Effectuer une coupe dans la largeur" :isActive="toolbar.horizontalClippingIsActive" :onClick="()=>{updateActiveToolItems('horizontalClipping')}" />
                    <TToolItem icon="expand-arrows-alt" label="Libre" tooltip="Effectuer une coupe omnidirectionnel" :isActive="toolbar.freeClippingIsActive" :onClick="()=>{updateActiveToolItems('freeClipping')}" />
                </TToolDropDown>
                <TToolDropDown popAt="bottomLeft" icon="crosshairs" tooltip="Outils de mesure" :isActive="toolbar.measureIsActive" >
                    <TToolItem icon="mars" label="Segment" tooltip="Prendre une distance entre un point A et un point B" :onClick="()=>{updateActiveToolItems('measure')}" onClickData="segment" />
                    <TToolItem class="disabled" icon="share-alt" label="PolyLigne" tooltip="Prendre des distances entre plusieurs points qui se suivent" />
                    <TToolItem class="disabled" :icon="['fab', 'hubspot']" label="PolySegment" tooltip="Prendre des distances entre un point central et plusieurs points" />
                    <TDivider orientation="horizontal" />
                    <TToolItem class="disabled" icon="circle" label="Disque" tooltip="Prendre des mesures de type circulaire" />
                    <TToolItem class="disabled" icon="square" label="Carré" tooltip="Prendre des mesures de type rectangulaire" />
                    <TToolItem class="disabled" icon="star" label="Polygone" tooltip="Prendre des mesures de type polygonale" />
                    <TDivider orientation="horizontal" />
                    <TToolItem class="disabled" :icon="['fab', 'dribbble']" label="Sphère" tooltip="Volume sphèrique" />
                    <TToolItem class="disabled" icon="cube" label="Cube" tooltip="Volume cubique" />
                </TToolDropDown>
    
                <TDivider orientation="vertical" />
    
                <TToolDropDown popAt="bottomLeft" tooltip="Choisir le type de projection de la camera" icon="camera">
                    <TToolItem icon="cubes" label="Orthographique" :onClick=setViewportCameraOfType onClickData="orthographic" />
                    <TToolItem :icon="['fab', 'linode']" label="Perspective" :onClick=setViewportCameraOfType onClickData="perspective" />
                </TToolDropDown>
                
                <TToolDropDown popAt="bottomLeft" tooltip="Choisir le type de contrôle de caméra" icon="gamepad">
                    <TToolItem icon="smile" label="Première personne" tooltip="Permet de..." :onClick=setViewportControlOfType onClickData="firstperson" />
                    <TToolItem icon="fighter-jet" label="Vol libre" tooltip="Permet de..." :onClick=setViewportControlOfType onClickData="fly" />
                    <TToolItem :icon="{icon:['fab', 'quinscape']}" label="Orbital" tooltip="Permet de se déplacer en mode orbital autour du model 3D" :onClick=setViewportControlOfType onClickData="orbit" />
                    <TToolItem class="disabled" icon="street-view" label="Avatar" tooltip="Permet de se déplacer en mode immersif dans le model 3D" :onClick=setViewportControlOfType onClickData="pointerlock" />
                    <!-- <TToolItem icon="street-view" label="Avatar" tooltip="Permet de se déplacer en mode immersif dans le model 3D" :onClick="()=>{_avatar()}" /> -->
                    <TToolItem class="disabled" :icon="{icon:['fab', 'simplybuilt'], flip: 'vertical'}" label="Realité Virtuel" tooltip="Permet de se déplacer en mode immersif dans le model 3D" :onClick=setViewportControlOfType onClickData="vr" />
                </TToolDropDown>
                
                <TToolDropDown popAt="bottomLeft" tooltip="Choisir un effet de camera" icon="eye">
                    <TToolItem icon="globe" label="Normal" tooltip="Vision de base" :onClick=setViewportEffectOfType onClickData="none" />
                    <TToolItem :icon="['fab', 'nintendo-switch']" label="Anaglyphe" tooltip="Anaglyphe" :onClick=setViewportEffectOfType onClickData="anaglyph" />
                    <TToolItem :icon="{icon:'barcode', rotate: '90'}" label="Parallax" tooltip="Effet de caractère" :onClick=setViewportEffectOfType onClickData="parallaxbarrier" />
                    <TToolItem icon="adjust" label="Stereo" tooltip="Effet stereo pour google cardboard" :onClick=setViewportEffectOfType onClickData="stereo" />
                    <TToolItem class="disabled" :icon="{icon:['fab', 'simplybuilt'], flip: 'vertical'}" label="VR" tooltip="VR" :onClick=setViewportEffectOfType onClickData="vr" />
                </TToolDropDown>
    
                <TToolItem class="disabled" icon="sun" tooltip="Activer/Désactiver les ombres" :isActive="toolbar.shadowIsActive" :onClick="()=>{updateActiveToolItems('shadow')}" />
    
                <TDivider orientation="vertical" />
                
                <TToolItem icon="chart-bar" tooltip="Afficher les statistiques webgl" :isActive="toolbar.statsIsActive" :onClick="()=>{updateActiveToolItems('stats')}" />
                <TToolItem icon="recycle" tooltip="Activer/Désactivé le rendu du viewport" :isActive="toolbar.renderIsActive" :onClick="()=>{updateActiveToolItems('render')}" />
                <TToolItem :icon="['fab', 'centercode']" tooltip="Recentre la camera sur la vue" :onClick=centerViewportCamera />
    
            </TToolBar>
            
            <TToolBar style="justify-content: flex-end;">
                <TToolItem icon="pencil-alt" tooltip="Editer la fiche du bâtiment" :onClick="editBuilding" />
                <TToolItem icon="cog" tooltip="Créer une intervention pour le bâtiment" :onClick="createBuildingIntervention" />
            </TToolBar>
                
        </TContainerHorizontal>
    
        <TSplitter :isVertical=true :initPosition=20>
            <TTree 
                slot="left" 
                :items="scene.children"
                :maxDeepLevel="9"
                :needUpdate="tree.needUpdate"
            ></TTree>
            <TViewport3D
                id="viewport3D"
                slot="right"
                v-bind="viewport"
                :scene="scene"
                :renderer="renderer"
                v-on:intersect=onIntersect
                v-on:select=onSelect
                v-on:deselect=onDeselect
                v-on:cacheUpdated="viewport.needCacheUpdate = false"
                v-on:cameraFitWorldBoundingBox="viewport.needCameraFitWorldBoundingBox = false"
             />
        </TSplitter>
                
        <TFooter id="appFooter" style="min-height: 30px;">
            <TProgress v-if="progressBar.isVisible" :isVisible="progressBar.isVisible" v-bind:done=progressBar.done v-bind:todo=progressBar.todo style="width:100%; margin: 0 15px;"></TProgress>
        </TFooter>
            
        <div v-on:click="onToggleModalVisibility('userDataModal')" id="userDataModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div v-on:click.stop class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">{{userDataModal.title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click.stop="onToggleModalVisibility('userDataModal')">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <TInputObject v-if="selected.object" :label="selected.object.name" :value="selected.object" :filter="userDataModal.filter" />

                    </div>
                    <div class="modal-footer">
                        <TButton v-if="selected.object && selected.object.userData && selected.object.userData.gmaoId" class="btn-primary" icon="pencil-alt" :onClick=getCarlDetail></TButton>
                        <TButton v-if="selected.object && selected.object.userData && selected.object.userData.gmaoId" class="btn-primary" icon="cog" :onClick=createCarlInter></TButton>
                        <button type="button" class="btn btn-primary" v-on:click.stop="onToggleModalVisibility('userDataModal')">Ok</button>
                    </div>
                </div>
            </div>
        </div>
							
    </TContainerVertical>
    `,
    data () {

        return {
            // Tree
            tree: {
                needUpdate: false
            },

            toolbar: {
                selectIsActive:             false,
                xRayIsActive:               false,
                clippingIsActive:           false,
                verticalClippingIsActive:   false,
                horizontalClippingIsActive: false,
                freeClippingIsActive:       false,
                measureIsActive:            false,
                shadowIsActive:             false,
                statsIsActive:              false,
                renderIsActive:             true,
            },

            // Viewport
            viewport:    {
                scene:                         undefined,
                //                camera:                        undefined,
                camera:                        {
                    type:     'perspective',
                    position: {
                        x: 70,
                        y: 20,
                        z: 50
                    },
                    target:   {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                },
                control:                       'orbit',
                //                control:                       undefined,
                effect:                        'none',
                renderer:                      undefined,
                showStats:                     false,
                autoUpdate:                    true,
                backgroundColor:               0x000000,
                enableShadow:                  false,
                isRaycastable:                 false,
                allowDecimate:                 true,
                needCacheUpdate:               false,
                needCameraFitWorldBoundingBox: false
            },
            intersected: {
                object:           undefined,
                originalMaterial: undefined
            },
            selected:    {
                object:           undefined,
                originalMaterial: undefined
            },
            measures:    {
                ab: {
                    currentGroup: undefined,
                    startPoint:   undefined,
                    line:         undefined,
                    endPoint:     undefined
                }
            },
            pointer:     undefined,

            // Modal
            carl: {
                objectId: undefined,
                isGroup:  undefined
            },

            userDataModal: {
                title:  'Propriétés',
                filter: function ( key, value ) {
                    'use strict'

                    if ( !value ) {
                        return false
                    }

                    if (
                        key === 'name' ||
                        key === 'userData'
                    ) {
                        return true
                    } else {
                        return false
                    }

                    return ([ 'parent', 'matrix', '' ].indexOf( propertyName ) === -1)

                }
            },

            // Progress
            progressBar: {
                isVisible: false,
                timeoutId: undefined,
                done:      0,
                todo:      0
            }
        }

    },
    created () {
        'use strict'

        const _externalOptions = window.IteeQueryConfig

        // Should not be observed...
        this._cache = {}

        this._initUntrackableDatasHooks()
        this._initEnvironement()
        this._initDatas( _externalOptions )

        console.log( 'created' )

    },
    methods:  {

        //        _avatar() {
        //            'use strict'
        //
        //            const self = this
        //            const element = document.getElementById("viewport3D")
        //
        //            function lockPointer () {
        //
        //                // On débute par mettre l'élément en plein écran. L'implémentation actuelle
        //                // demande à ce que l'élément soit en plein écran (fullscreen) pour
        //                // pouvoir capturer le pointeur--c'est une chose qui sera probablement
        //                // modifiée dans le futur.
        //                element.requestFullscreen = element.requestFullscreen ||
        //                    element.mozRequestFullscreen ||
        //                    element.mozRequestFullScreen || // Le caractère 'S' majuscule de l'ancienne API. (note de traduction: ?)
        //                    element.webkitRequestFullscreen
        //
        //                element.requestFullscreen()
        //
        //            }
        //
        //            function fullscreenChange () {
        //
        //                if ( document.webkitFullscreenElement === elem ||
        //                    document.mozFullscreenElement === elem ||
        //                    document.mozFullScreenElement === elem ) { // Le caractère 'S' majuscule de l'ancien API. (note de traduction: ?)
        //                    // L'élément est en plein écran, nous pouvons maintenant faire une requête pour capturer le curseur.
        //
        //                    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock
        //                    element.requestPointerLock()
        //
        //                }
        //
        //            }
        //
        //            function pointerlockchange ( event ) {
        //
        //                if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
        //
        //                    self._control.enabled = true
        //
        //                } else {
        //
        //                    self._control.enabled = false
        //
        //                }
        //
        //            }
        //
        //            function pointerlockerror ( event ) {
        //
        //                console.error( event )
        //
        //                self._control.enabled = false
        //
        //            }
        //
        //            this.viewport.control              = new Itee.PointerLockControls( this._camera )
        //            this._pointerLockRaycaster = new Itee.Raycaster( new Vector3(), new Vector3( 0, -1, 0 ), 0, 10 )
        //            this._moveForward          = false
        //            this._moveBackward         = false
        //            this._moveLeft             = false
        //            this._moveRight            = false
        //            this._canJump              = false
        //            this._prevTime             = performance.now()
        //            this._velocity             = new Vector3()
        //            this._direction            = new Vector3()
        //            this.scene.add( this.viewport.control.getObject() )
        //
        //            // Hook pointer lock state change events
        //            document.addEventListener( 'fullscreenchange', fullscreenChange, false );
        //            document.addEventListener( 'mozfullscreenchange', fullscreenChange, false );
        //            document.addEventListener( 'webkitfullscreenchange', fullscreenChange, false );
        //
        //            document.addEventListener( 'pointerlockchange', pointerlockchange, false )
        //            document.addEventListener( 'mozpointerlockchange', pointerlockchange, false )
        //            document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false )
        //
        //            document.addEventListener( 'pointerlockerror', pointerlockerror, false )
        //            document.addEventListener( 'mozpointerlockerror', pointerlockerror, false )
        //            document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false )
        //
        //            document.addEventListener( 'keydown', event => {
        //
        //                switch ( event.keyCode ) {
        //
        //                    case 38: // up
        //                    case 90: // z
        //                        self._moveForward = true
        //                        break
        //
        //                    case 37: // left
        //                    case 81: // q
        //                        self._moveLeft = true
        //                        break
        //
        //                    case 40: // down
        //                    case 83: // s
        //                        self._moveBackward = true
        //                        break
        //
        //                    case 39: // right
        //                    case 68: // d
        //                        self._moveRight = true
        //                        break
        //
        //                    case 32: // space
        //                        if ( this._canJump === true ) {
        //                            this._velocity.y += 350
        //                        }
        //                        self._canJump = false
        //                        break
        //                }
        //
        //            }, false )
        //            document.addEventListener( 'keyup', event => {
        //
        //                switch ( event.keyCode ) {
        //
        //                    case 38: // up
        //                    case 90: // z
        //                        self._moveForward = false
        //                        break
        //
        //                    case 37: // left
        //                    case 81: // q
        //                        self._moveLeft = false
        //                        break
        //
        //                    case 40: // down
        //                    case 83: // s
        //                        self._moveBackward = false
        //                        break
        //
        //                    case 39: // right
        //                    case 68: // d
        //                        self._moveRight = false
        //                        break
        //                }
        //
        //            }, false )
        //
        //            lockPointer()
        //
        //        },

        //// GLOBALS
        _initUntrackableDatasHooks () {
            'use strict'

            this.scene    = new Itee.Scene()
            this.renderer = new Itee.WebGLRenderer( {
                antialias:              true,
                logarithmicDepthBuffer: true
            } )

        },

        _initEnvironement () {
            'use strict'

            ///////////////////
            // Add Env group //
            ///////////////////
            let envGroup = this.scene.getObjectByName( 'Environement' )
            if ( !envGroup ) {

                envGroup      = new Itee.Group()
                envGroup.name = "Environement"
                this.scene.add( envGroup )

            }

            this._initLights( envGroup )
            this._initGrids( envGroup )
            this._initPointers( envGroup )
            this._initModifiers( envGroup )
            this._initHelpers( envGroup )

        },

        _initLights ( parentGroup ) {
            'use strict'

            ///////////////
            // Add light //
            ///////////////
            let lightGroup = parentGroup.getObjectByName( 'Lumières' )
            if ( !lightGroup ) {

                lightGroup      = new Itee.Group()
                lightGroup.name = "Lumières"
                parentGroup.add( lightGroup )

            }

            const ambiantLight = new Itee.AmbientLight( 0xC8C8C8 )
            ambiantLight.name  = "Lumière ambiante"
            lightGroup.add( ambiantLight )

            //                        const SHADOW_MAP_SIZE = 16384
            //                        const spotLight       = new Itee.SpotLight( 0xffffff, 1, 0, Math.PI / 2 )
            //                        spotLight.position.set( 0, 1500, 1000 )
            //                        spotLight.target.position.set( 0, 0, 0 )
            //                        spotLight.castShadow            = true
            //                        spotLight.shadow                = new Itee.LightShadow( new Itee.PerspectiveCamera( 50, 1, 1200, 2500 ) )
            //                        spotLight.shadow.bias           = 0.0001
            //                        spotLight.shadow.mapSize.width  = SHADOW_MAP_SIZE
            //                        spotLight.shadow.mapSize.height = SHADOW_MAP_SIZE
            //                        envGroup.add( spotLight )

            const frustum          = 500
            const mapSize          = 2048
            const directionalLight = new Itee.DirectionalLight( 0xaaaaaa, 0.6 )
            directionalLight.position.set( 100, 300, 100 )
            directionalLight.name = "Lumière directionnel"
            //                        dirLight.castShadow            = true
            //                        dirLight.shadow.mapSize.width  = mapSize
            //                        dirLight.shadow.mapSize.height = mapSize
            //                        dirLight.shadow.darkness       = 1
            //                        dirLight.shadow.camera.left    = -frustum
            //                        dirLight.shadow.camera.right   = frustum
            //                        dirLight.shadow.camera.top     = frustum
            //                        dirLight.shadow.camera.bottom  = -frustum
            //                        dirLight.shadow.camera.near    = 1
            //                        dirLight.shadow.camera.far     = 500
            lightGroup.add( directionalLight )

            //                        const dirLightHelper = new Itee.DirectionalLightHelper( dirLight, 10 )
            //                        envGroup.add( dirLightHelper )
            //
            //                        //Create a helper for the shadow camera
            //                        const dirLightShadowCameraHelper = new Itee.CameraHelper( dirLight.shadow.camera )
            //                        envGroup.add( dirLightShadowCameraHelper )

        },

        _initGrids ( parentGroup ) {
            'use strict'

            ///////////////
            // Add grids //
            ///////////////
            let gridGroup = parentGroup.getObjectByName( 'Grilles' )
            if ( !gridGroup ) {

                gridGroup      = new Itee.Group()
                gridGroup.name = "Grilles"
                this.applyModifiers( gridGroup, [ 'toggleVisibility', 'opacity' ] )
                parentGroup.add( gridGroup )

            }

            /// XZ

            const gridHelperXZ_1 = new Itee.GridHelper( 20, 20 )
            gridHelperXZ_1.name  = "Grille XZ - Mètrique"
            this.applyModifiers( gridHelperXZ_1, [ 'toggleVisibility', 'opacity' ] )
            gridGroup.add( gridHelperXZ_1 )

            const gridHelperXZ_10 = new Itee.GridHelper( 200, 20 )
            gridHelperXZ_10.name  = "Grille XZ - Décamètrique"
            this.applyModifiers( gridHelperXZ_10, [ 'toggleVisibility', 'opacity' ] )
            gridGroup.add( gridHelperXZ_10 )

            const gridHelperXZ_100 = new Itee.GridHelper( 2000, 20 )
            gridHelperXZ_100.name  = "Grille XZ - Hectomètrique"
            this.applyModifiers( gridHelperXZ_100, [ 'toggleVisibility', 'opacity' ] )
            gridGroup.add( gridHelperXZ_100 )

            /// XY

            //                        const gridHelperXY_1 = new Itee.GridHelper( 20, 20 )
            //                        gridHelperXY_1.name  = "Grille XY - Mètrique"
            //                        gridHelperXY_1.rotateX( Itee.degreesToRadians( 90 ) )
            //                        gridGroup.add( gridHelperXY_1 )
            //
            //                        const gridHelperXY_10 = new Itee.GridHelper( 200, 20 )
            //                        gridHelperXY_10.name  = "Grille XY - Décamètrique"
            //                        gridHelperXY_10.rotateX( Itee.degreesToRadians( 90 ) )
            //                        gridGroup.add( gridHelperXY_10 )
            //
            //                        const gridHelperXY_100 = new Itee.GridHelper( 2000, 20 )
            //                        gridHelperXY_100.name  = "Grille XY - Hectomètrique"
            //                        gridHelperXY_100.rotateX( Itee.degreesToRadians( 90 ) )
            //                        gridGroup.add( gridHelperXY_100 )

            /// YZ

            //                        const gridHelperYZ_1 = new Itee.GridHelper( 20, 20 )
            //                        gridHelperYZ_1.name  = "Grille YZ - Mètrique"
            //                        gridHelperYZ_1.rotateZ( Itee.degreesToRadians( 90 ) )
            //                        gridGroup.add( gridHelperYZ_1 )
            //
            //                        const gridHelperYZ_10 = new Itee.GridHelper( 200, 20 )
            //                        gridHelperYZ_10.name  = "Grille YZ - Décamètrique"
            //                        gridHelperYZ_10.rotateZ( Itee.degreesToRadians( 90 ) )
            //                        gridGroup.add( gridHelperYZ_10 )
            //
            //                        const gridHelperYZ_100 = new Itee.GridHelper( 2000, 20 )
            //                        gridHelperYZ_100.name  = "Grille YZ - Hectomètrique"
            //                        gridHelperYZ_100.rotateZ( Itee.degreesToRadians( 90 ) )
            //                        gridGroup.add( gridHelperYZ_100 )

        },

        _initPointers ( parentGroup ) {
            'use strict'

            //////////////////
            // Add pointers //
            //////////////////
            let pointersGroup = parentGroup.getObjectByName( 'Pointers' )
            if ( !pointersGroup ) {

                pointersGroup      = new Itee.Group()
                pointersGroup.name = "Pointers"
                parentGroup.add( pointersGroup )

            }

            const sphereGeometry = new Itee.SphereBufferGeometry( 0.5, 32, 32 )
            const sphereMaterial = new Itee.MeshPhongMaterial( { color: 0x007bff } )
            const sphere         = new Itee.Mesh( sphereGeometry, sphereMaterial )
            sphere.name          = 'Sphère'
            sphere.visible       = false
            sphere.isRaycastable = false
            pointersGroup.add( sphere )

            // Plane
            const planeGeometry = new Itee.PlaneGeometry( 2, 2, 10, 10 )
            const planeMaterial = new Itee.MeshBasicMaterial( {
                color:       0x000000,
                side:        Itee.DoubleSide,
                opacity:     0.2,
                transparent: true
            } )
            const plane         = new Itee.Mesh( planeGeometry, planeMaterial )
            plane.name          = 'Plan'
            plane.visible       = false
            plane.isRaycastable = false
            pointersGroup.add( plane )

            const octahedronGeometry = new Itee.OctahedronBufferGeometry( 0.3, 0 )
            const octahedronMaterial = new Itee.MeshPhongMaterial( { color: 0x007bff } )
            const octahedron         = new Itee.Mesh( octahedronGeometry, octahedronMaterial )
            octahedron.name          = 'Octahèdre'
            octahedron.visible       = false
            octahedron.isRaycastable = false
            pointersGroup.add( octahedron )

        },

        _initModifiers ( parentGroup ) {
            'use strict'

            let modifiersGroup = parentGroup.getObjectByName( 'Modificateurs' )
            if ( !modifiersGroup ) {

                modifiersGroup      = new Itee.Group()
                modifiersGroup.name = "Modificateurs"
                parentGroup.add( modifiersGroup )

            }

        },

        _initHelpers ( parentGroup ) {},

        _initDatas ( parameters ) {
            'use strict'

            const _parameters = parameters || {
                companyId: '5b07f0ae5b5bf56470e07de6' //'5abb2eab3dae751becf8aed3',
            }

            this._initDatabaseManagers()
            this._fetchDatas( _parameters )

        },

        _initDatabaseManagers () {
            'use strict'

            this.dbManager          = new Itee.TDataBaseManager()
            this.dbManager.basePath = '/companies'
            this.objectsManager     = new Itee.TObjectsManager()
            this.geometriesManager  = new Itee.TGeometriesManager()
            this.materialsManager   = new Itee.TMaterialsManager()

        },

        _fetchDatas ( parameters ) {
            'use strict'

            const self = this

            const collection = parameters.collection
            const query      = parameters.query

            let sitesGroup = this.scene.getObjectByName( 'Sites' )
            if ( !sitesGroup ) {

                sitesGroup      = new Itee.Group()
                sitesGroup.name = "Sites"
                this.scene.add( sitesGroup )

            }

            if ( collection === "companies" ) {

                self.dbManager.read(
                    query,
                    ( companies ) => {

                        let sites = undefined
                        for ( let key in companies ) {
                            sites = companies[key].sites
                        }

                        fetchObjects( sites, ( objectData ) => {

                            for ( let key in objectData ) {

                                populateOne( objectData[key], ( object ) => {

                                    lookAtObject( object )
                                    searchFamilly( object, sitesGroup, ( parent ) => {

                                        onFetchEnd()

                                    } )

                                } )

                            }

                        } )

                    },
                    self.onProgress,
                    self.onError
                )

            } else if ( collection === "objects" ) {

                fetchObjects( query, ( objectData ) => {

                    for ( let key in objectData ) {

                        populateOne( objectData[key], ( object ) => {

                            lookAtObject( object )
                            searchFamilly( object, sitesGroup, ( parent ) => {

                                onFetchEnd()

                            } )

                        } )

                    }

                } )

            } else {

                console.error('Invalid parameters !')

            }

            function lookAtObject ( object ) {

                if ( object.isMesh ) {

                    if ( !object.geometry.boundingSphere ) {
                        object.geometry.computeBoundingSphere()
                    }

                    const objectPosition       = object.position
                    const objectBoundingSphere = object.geometry.boundingSphere
                    const radius               = objectBoundingSphere.radius * 2
                    const target               = new Itee.Vector3().add( objectPosition, objectBoundingSphere.center )
                    const position             = new Itee.Vector3( radius, radius, radius ).add( target )

                    self.viewport.camera = {
                        type:     'perspective',
                        position: position,
                        target:   target
                    }

                }

            }

            function fetchObjects ( query, callback ) {

                self.objectsManager.read(
                    query,
                    callback,
                    self.onProgress,
                    self.onError
                )

            }

            function onFetchEnd () {

                self.resetDefaultCursor()

                // Special case to refresh treeview that cannot listen on scene
                self.viewport.needCacheUpdate = true
                self.viewport.needCameraFitWorldBoundingBox = true

                self.tree.needUpdate          = !self.tree.needUpdate

            }

            function searchFamilly ( object, root, callback ) {

                const childrenObj  = object.children.filter( child => { return (typeof child !== 'string' ) } )
                const childrenIds  = object.children.filter( child => { return (typeof child === 'string' ) } )
                const haveChildren = ( childrenIds && childrenIds.length > 0 )

                const parentId   = object.parent
                const haveParent = ( parentId !== null && parentId !== undefined && typeof parentId === 'string' )

                if ( haveParent && haveChildren ) {

                    // Have children and ancestor
                    object.parent   = null
                    object.children = childrenObj

                    // Assign to root element
                    root.add( object )

                    populateChildren( object, childrenIds, () => {

                        // After parent retrieve children get the ancestor
                        populateParent( [ object ], parentId, ( parent ) => {

                            // Recursive family search against parent
                            searchFamilly( parent, root, callback )

                        } )

                    } )

                } else if ( haveParent && !haveChildren ) {

                    // Have only an ancestor got it
                    object.parent = null

                    // Assign to root element before reassign to his real parent
                    root.add( object )

                    populateParent( [ object ], parentId, ( parent ) => {

                        // Recursive family search against parent
                        searchFamilly( parent, root, callback )

                    } )

                } else if ( !haveParent && haveChildren ) {
                    // It is a top level element without children

                    // Assign to root element
                    root.add( object )

                    object.children = childrenObj
                    populateChildren( object, childrenIds, () => {

                        // After parent retrieve children return
                        callback( object )

                    } )

                } else {
                    // It is a top level element without parent or children

                    // Assign to root element
                    root.add( object )

                    callback( object )

                }

            }

            function populateOne ( object, callback ) {

                if ( object.isGroup || object.type === 'Group' || object.type === 'Scene' ) {

                    self.applyModifiers( object, [ 'toggleVisibility', 'toggleChildrenVisibility', 'opacity' ] )

                    callback( object )

                } else {

                    self.applyModifiers( object, [ 'toggleVisibility', 'opacity', 'lookAt' ] )
                    object.isRaycastable = true

                    callback( object )

                }

            }

            function populateParent ( children, parentId, callback ) {

                self.objectsManager.read(
                    parentId,
                    objects => {

                        let parent = undefined
                        for ( let key in objects ) {
                            parent = objects[key]
                        }

                        if ( parent.isGroup || parent.type === 'Group' || parent.type === 'Scene' ) {

                            self.applyModifiers( parent, [ 'toggleVisibility', 'toggleChildrenVisibility', 'opacity' ] )

                            // Update child reference
                            if ( children ) {

                                for ( let childIndex = 0, numberOfChildren = children.length ; childIndex < numberOfChildren ; childIndex++ ) {

                                    if ( typeof children[ childIndex ].parent === 'string' ) {
                                        children[ childIndex ].parent = null
                                    }

                                    const childPosition = parent.children.indexOf( children[ childIndex ]._id )
                                    parent.children.splice( childPosition, 1 )
                                    parent.add( children[ childIndex ] )
                                }

                            }

                            callback( parent )

                        } else {

                            parent.isRaycastable = true

                            // Update child reference
                            if ( children ) {

                                for ( let childIndex = 0, numberOfChildren = children.length ; childIndex < numberOfChildren ; childIndex++ ) {
                                    children[ childIndex ].parent = null

                                    const childPosition = parent.children.indexOf( children[ childIndex ]._id )
                                    parent.children.splice( childPosition, 1 )
                                    parent.add( children[ childIndex ] )
                                }

                            }

                            callback( parent )

                        }

                    },
                    self.onProgress,
                    self.onError
                )
            }

            function populateChildren ( parent, childrenIds, callback ) {

                if ( !parent ) {
                    console.error( 'Invalid argument: parent can\'t be null or undefined' )
                }

                const numberOfChildrenToPopulate = childrenIds.length
                if ( numberOfChildrenToPopulate === 0 ) {
                    callback()
                    return
                }

                if ( parent.layers.mask > 0 ) {
                    callback()
                    return
                }

                let numberOfPopulatedChildren = 0

                self.objectsManager.read(
                    childrenIds,
                    objects => {

                        const groupsObjects = []
                        let haveGroups      = false

                        const meshesObjects = []
                        let haveMeshes      = false

                        // Dispatch by categories
                        for ( let key in objects ) {
//                        for ( let objI = 0, numObj = objects.length ; objI < numObj ; objI++ ) {
                            let obj = objects[ key ]

                            if ( obj.isGroup || obj.type === 'Group' || obj.type === 'Scene' ) {
                                groupsObjects.push( obj )
                                haveGroups = true
                            } else {
                                meshesObjects.push( obj )
                                haveMeshes = true
                            }

                        }

                        // Fill Groups
                        if ( haveGroups && haveMeshes ) {

                            fillGroups( groupsObjects )
                            fillMeshes( meshesObjects )

                        } else if ( haveGroups && !haveMeshes ) {

                            fillGroups( groupsObjects )

                        } else if ( !haveGroups && haveMeshes ) {

                            fillMeshes( meshesObjects )

                        } else {

                            callback()

                        }

                        function fillGroups ( groups ) {

                            for ( let groupIndex = 0, numberOfGroups = groups.length ; groupIndex < numberOfGroups ; groupIndex++ ) {

                                let group = groups[ groupIndex ]

                                if ( group.layers.mask > 0 ) {

                                    group.modifiers = [
                                        {
                                            type:    'icon',
                                            icon:    'download',
                                            onClick: (function encloseLazyLoading () {

                                                const _group       = group
                                                const _childrenIds = group.children

                                                return function lazyLoadingPopulate () {

                                                    _group.layers.mask = 0

                                                    populateChildren( _group, _childrenIds, function () {

                                                        _group.modifiers = [
                                                            {
                                                                type:    'checkicon',
                                                                iconOn:  'eye',
                                                                iconOff: 'eye-slash',
                                                                value:   _group.visible,
                                                                onClick: self.toggleVisibilityOf( _group )
                                                            },
                                                            {
                                                                type:    'icon',
                                                                icon:    'low-vision',
                                                                onClick: self.makeVisibleAllChildrenOf( group )
                                                            }
                                                        ]

                                                        self.viewport.needCacheUpdate = true
                                                        self.tree.needUpdate = !self.tree.needUpdate

                                                    } )

                                                }

                                            })()
                                        }
                                    ]

                                } else {

                                    self.applyModifiers( group, [ 'toggleVisibility', 'toggleChildrenVisibility', 'opacity' ] )

                                }

                                // Reset children to empty array before fill it
                                const subChildrenIds = group.children
                                group.children       = []

                                // Assign to parent first
                                group.parent = null
                                parent.add( group )

                                // then Populate children
                                populateChildren( group, subChildrenIds, checkPopulateEnd )

                            }

                        }

                        function fillMeshes ( meshes ) {

                            for ( let key in meshes ) {

                                const object      = meshes[ key ]
                                self.applyModifiers( object, [ 'toggleVisibility', 'opacity', 'lookAt' ] )

                                object.isRaycastable = true

                                // Reset children to empty array before fill it
                                const subChildrenIds = object.children
                                object.children      = []

                                // Assign to parent first

                                /////////////////////////////////

                                if ( parent.name !== "Locaux" ) {

                                    const objectName = object.name
                                    const splits     = objectName.split( ' - ' )
                                    let subParent    = parent

                                    if ( splits.length > 0 ) {

                                        for ( let splitIndex = 0, numberOfSplits = splits.length ; splitIndex < numberOfSplits ; splitIndex++ ) {

                                            let subGroupName = splits[ splitIndex ].trim()

                                            let subGroup = subParent.getObjectByName( subGroupName )
                                            if ( subGroupName.length > 0 && !subGroup ) {

                                                subGroup      = new Itee.Group()
                                                subGroup.name = subGroupName
                                                self.applyModifiers( subGroup, [ 'toggleVisibility', 'toggleChildrenVisibility', 'opacity' ] )

                                                subParent.add( subGroup )

                                            }

                                            subParent = subGroup

                                        }

                                        if ( subParent && subParent.type !== 'Scene' ) {

                                            object.name   = object._id
                                            object.parent = null

                                            subParent.add( object )

                                        } else {
                                            //todo: alert unkowngroup
                                        }

                                    } else {

                                        object.parent = null

                                        parent.add( object )

                                    }

                                } else {

                                    object.parent = null

                                    parent.add( object )

                                }

                                // OR

                                //                                            object.parent = null
                                //                                            parent.add( object )

                                /////////////////////////////////

                                // then Populate children
                                populateChildren( object, subChildrenIds, checkPopulateEnd )

                            }

                        }

                        function checkPopulateEnd () {

                            numberOfPopulatedChildren++
                            if ( numberOfPopulatedChildren < numberOfChildrenToPopulate ) {
                                return
                            }

                            callback()

                        }

                    },
                    self.onProgress,
                    self.onError
                )

            }

        },

        //// ToolBar
        updateActiveToolItems ( itemName ) {
            'use strict'

            switch ( itemName ) {

                case 'select':
                    if ( this.toolbar.xRayIsActive ) {
                        this.disableXRay()
                        this.toolbar.xRayIsActive = false
                    }

                    if ( this.toolbar.clippingIsActive ) {
                        this.disableFreeClipping()
                        this.toolbar.clippingIsActive = false
                    }

                    if ( this.toolbar.measureIsActive ) {
                        this.disableMeasure()
                        this.toolbar.measureIsActive = false
                    }

                    ///

                    this.toolbar.selectIsActive = !this.toolbar.selectIsActive
                    if ( this.toolbar.selectIsActive ) {
                        this.enableSelection()
                    } else {
                        this.disableSelection()
                    }

                    break

                case 'xRay':
                    if ( this.toolbar.selectIsActive ) {
                        this.disableSelection()
                        this.toolbar.selectIsActive = false
                    }

                    if ( this.toolbar.clippingIsActive ) {
                        this.disableFreeClipping()
                        this.toolbar.clippingIsActive = false
                    }

                    if ( this.toolbar.measureIsActive ) {
                        this.disableMeasure()
                        this.toolbar.measureIsActive = false
                    }

                    ///

                    this.toolbar.xRayIsActive = !this.toolbar.xRayIsActive
                    if ( this.toolbar.xRayIsActive ) {
                        this.enableXRay()
                    } else {
                        this.disableXRay()
                    }

                    break

                case 'verticalClipping':
                case 'horizontalClipping':
                case 'freeClipping':
                    if ( this.toolbar.selectIsActive ) {
                        this.disableSelection()
                        this.toolbar.selectIsActive = false
                    }

                    if ( this.toolbar.xRayIsActive ) {
                        this.disableXRay()
                        this.toolbar.xRayIsActive = false
                    }

                    if ( this.toolbar.measureIsActive ) {
                        this.disableMeasure()
                        this.toolbar.measureIsActive = false
                    }

                    ///

                    switch ( itemName ) {

                        case 'verticalClipping':
                            this.toolbar.verticalClippingIsActive = !this.toolbar.verticalClippingIsActive
                            if ( this.toolbar.verticalClippingIsActive ) {
                                this.enableVerticalClipping()
                            } else {
                                this.disableVerticalClipping()
                            }
                            break

                        case 'horizontalClipping':
                            this.toolbar.horizontalClippingIsActive = !this.toolbar.horizontalClippingIsActive
                            if ( this.toolbar.horizontalClippingIsActive ) {
                                this.enableHorizontalClipping()
                            } else {
                                this.disableHorizontalClipping()
                            }
                            break

                        case 'freeClipping':
                            this.toolbar.freeClippingIsActive = !this.toolbar.freeClippingIsActive
                            if ( this.toolbar.freeClippingIsActive ) {
                                this.enableFreeClipping()
                            } else {
                                this.disableFreeClipping()
                            }
                            break

                        default:
                            throw new RangeError( `Invalid clipping parameter: ${itemName}` )
                            break

                    }

                    this.toolbar.clippingIsActive = ( this.toolbar.verticalClippingIsActive || this.toolbar.horizontalClippingIsActive || this.toolbar.freeClippingIsActive )
                    break

                case 'measure':
                    if ( this.toolbar.selectIsActive ) {
                        this.disableSelection()
                        this.toolbar.selectIsActive = false
                    }

                    if ( this.toolbar.xRayIsActive ) {
                        this.disableXRay()
                        this.toolbar.xRayIsActive = false
                    }

                    if ( this.toolbar.clippingIsActive ) {
                        this.disableFreeClipping()
                        this.toolbar.clippingIsActive = false
                    }

                    ///

                    this.toolbar.measureIsActive = true
                    if ( this.toolbar.measureIsActive ) {
                        this.enableMeasure()
                    } else {
                        this.disableMeasure()
                    }

                    break

                case 'shadow':
                    this.toolbar.shadowIsActive = !this.toolbar.shadowIsActive
                    if ( this.toolbar.shadowIsActive ) {
                        this.enableShadow()
                    } else {
                        this.disableShadow()
                    }
                    break

                case 'stats':
                    this.toolbar.statsIsActive = !this.toolbar.statsIsActive
                    if ( this.toolbar.statsIsActive ) {
                        this.enableStats()
                    } else {
                        this.disableStats()
                    }
                    break

                case 'render':
                    this.toolbar.renderIsActive = !this.toolbar.renderIsActive
                    if ( this.toolbar.renderIsActive ) {
                        this.enableRender()
                    } else {
                        this.disableRender()
                    }
                    break

                default:
                    throw new RangeError( `Invalid parameter: ${itemName}` )
                    break

            }

        },

        //// Modal

        onToggleModalVisibility ( modalId ) {
            'use strict'

            const modal = document.getElementById( modalId )
            if ( modal ) {

                if ( modal.className === 'modal fade' ) {
                    modal.className             = 'modal fade show'
                    modal.style.display         = 'block'
                    modal.style.backgroundColor = '#f9f9f980'
                } else {
                    modal.className     = 'modal fade'
                    modal.style.display = 'none'
                }

            }

        },

        /// Cursor
        setCursorOfType ( type ) {
            'use strict'
            document.body.style.cursor = type
        },

        resetDefaultCursor () {
            'use strict'

            document.body.style.cursor = 'auto'

        },

        //// Pointers

        enablePointer ( pointerType ) {

            if ( !pointerType || pointerType.length === 0 ) {
                console.error( `Invalide pointer type: ${pointerType}` )
                return
            }

            this.pointer = this.scene.getObjectByName( 'Environement' ).getObjectByName( 'Pointers' ).getObjectByName( pointerType )
            if ( !this.pointer ) {
                console.error( `Unable to find pointer of type: ${pointerType}` )
                return
            }

            this.pointer.visible = true

        },

        updatePointer ( point, face ) {

            if ( !this.pointer ) {
                return
            }

            if ( !point || !face ) {
                return
            }

            //                                const arrowHelper = new Itee.ArrowHelper( face.normal, point, 1, 0x123456 )
            //                                this.scene.add( arrowHelper )

            if ( this.pointer.name === 'Plan' ) {

                const direction       = new Itee.Vector3().addVectors( point, face.normal )
                const div             = direction.clone().normalize().divideScalar( 10 )
                const offsetPosition  = point.clone().add( div )
                const offsetDirection = direction.clone().add( div )
                this.pointer.position.set( offsetPosition.x, offsetPosition.y, offsetPosition.z )
                this.pointer.lookAt( offsetDirection )

                //                                this.pointer.position.set( point.x, point.y, point.z )
                //                                this.pointer.lookAt( direction )
                //                                this.pointer.rotateX(Itee.degreesToRadians(90))

            } else if ( this.pointer.name === 'Sphère' ) {

                //Todo: scale sphere in squared distance to intersect origin and camera position
                this.pointer.position.set( point.x, point.y, point.z )

            } else {

                console.warn( `Unknown pointer ${this.pointer.name}, defaulting to intersect position` )
                this.pointer.position.set( point.x, point.y, point.z )

            }

        },

        disablePointer () {

            if ( !this.pointer ) {
                return
            }

            this.pointer.visible = false

        },

        //// Viewport stuff

        // Select
        enableSelection () {
            'use strict'

            this.setCursorOfType( 'hand' )
            //            this.enablePointer( 'Sphère' )
            this.action                 = 'selection'
            this.viewport.isRaycastable = true

        },

        disableSelection () {
            'use strict'

            this.viewport.isRaycastable = false
            this.action                 = ''
            //            this.disablePointer()
            this.resetDefaultCursor()

            this.onDeselect()
            this._clearPreviousIntersected()

        },

        // xRay
        enableXRay () {
            'use strict'

            const sitesGroup = this.scene.getObjectByName( 'Sites' )
            sitesGroup.traverse( object => {

                const materials = object.material
                if ( materials ) {

                    if ( Array.isArray( materials ) ) {

                        for ( let i = 0, n = materials.length ; i < n ; i++ ) {

                            object.material[ i ].side = Itee.BackSide

                        }

                    } else {

                        object.material.side = Itee.BackSide

                    }

                }

            } )

        },

        disableXRay () {
            'use strict'

            const sitesGroup = this.scene.getObjectByName( 'Sites' )
            sitesGroup.traverse( object => {

                const materials = object.material
                if ( materials ) {

                    if ( Array.isArray( materials ) ) {

                        for ( let i = 0, n = materials.length ; i < n ; i++ ) {

                            object.material[ i ].side = Itee.FrontSide

                        }

                    } else {

                        object.material.side = Itee.FrontSide

                    }

                }

            } )

        },

        // Clipping
        enableVerticalClipping () {
            'use strict'

            //Todo: map on global bounding box
            //            this.scene.traverse()

            const point  = new Itee.Vector3( 0, 0, 0 )
            const normal = new Itee.Vector3( 0, -1, 0 )
            this._addClippingPlan( point, normal, 'Coupe vertical', 2.1 )

        },
        disableVerticalClipping () {
            'use strict'

            const clippingPlanes        = this.renderer.clippingPlanes
            const verticalClippingPlane = this.scene.getObjectByName( 'Environement' ).getObjectByName( 'Modificateurs' ).getObjectByName( 'Coupe vertical' )
            if ( !verticalClippingPlane ) {
                return
            }

            clippingPlanes.splice( clippingPlanes.indexOf( verticalClippingPlane ), 1 )
            verticalClippingPlane.parent.remove( verticalClippingPlane )

            const geometry = verticalClippingPlane.geometry
            if ( geometry ) {
                geometry.dispose()
            }

            const materials = verticalClippingPlane.material
            if ( materials ) {

                if ( Array.isArray( materials ) ) {
                    for ( let i = 0, n = materials.length ; i < n ; i++ ) {
                        materials[ i ].dispose()
                    }
                } else {
                    materials.dispose()
                }

            }

            // Special case to refresh treeview that cannot listen on scene
            this.tree.needUpdate = !this.tree.needUpdate

        },

        enableHorizontalClipping () {
            'use strict'

            const point  = new Itee.Vector3( 0, 0, 0 )
            const normal = new Itee.Vector3( 1, 0, 0 )
            this._addClippingPlan( point, normal, 'Coupe horizontal', 10 )

        },
        disableHorizontalClipping () {
            'use strict'

            const clippingPlanes          = this.renderer.clippingPlanes
            const horizontalClippingPlane = this.scene.getObjectByName( 'Environement' ).getObjectByName( 'Modificateurs' ).getObjectByName( 'Coupe horizontal' )
            if ( !horizontalClippingPlane ) {
                return
            }

            clippingPlanes.splice( clippingPlanes.indexOf( horizontalClippingPlane ), 1 )
            horizontalClippingPlane.parent.remove( horizontalClippingPlane )

            const geometry = horizontalClippingPlane.geometry
            if ( geometry ) {
                geometry.dispose()
            }

            const materials = horizontalClippingPlane.material
            if ( materials ) {

                if ( Array.isArray( materials ) ) {
                    for ( let i = 0, n = materials.length ; i < n ; i++ ) {
                        materials[ i ].dispose()
                    }
                } else {
                    materials.dispose()
                }

            }

            // Special case to refresh treeview that cannot listen on scene
            this.tree.needUpdate = !this.tree.needUpdate

        },

        enableFreeClipping () {
            'use strict'

            this.setCursorOfType( 'hand' )
            this.enablePointer( 'Plan' )
            this.action                 = 'clippingSelection'
            this.viewport.isRaycastable = true

        },
        disableFreeClipping () {
            'use strict'

            this.viewport.isRaycastable = false
            this.action                 = ''
            this.disablePointer()
            this.resetDefaultCursor()

        },

        // Measures

        enableMeasure ( type ) {
            'use strict'

            this.setCursorOfType( 'crosshair' )
            this.enablePointer( 'Octahèdre' )
            this.action                 = 'measureAB'
            this.viewport.isRaycastable = true

            let measuresGroup = this.scene.getObjectByName( 'Mesures' )
            if ( !measuresGroup ) {

                measuresGroup      = new Itee.Group()
                measuresGroup.name = "Mesures"
                this.scene.add( measuresGroup )
                this.tree.needUpdate = !this.tree.needUpdate

            }

            let measuresABGroup = measuresGroup.getObjectByName( 'Mesures AB' )
            if ( !measuresABGroup ) {

                measuresABGroup      = new Itee.Group()
                measuresABGroup.name = 'Mesures AB'
                this.applyModifiers( measuresABGroup, [ 'toggleVisibility', 'opacity', 'remove' ] )
                measuresGroup.add( measuresABGroup )
                this.tree.needUpdate = !this.tree.needUpdate

            }

        },

        updateMeasure ( intersect ) {
            'use strict'

            if ( !this.measures.ab.startPoint ) {
                return
            }

            const currentGroup = this.measures.ab.currentGroup
            const point        = intersect.point

            if ( this.measures.ab.line ) {
                this.measures.ab.currentGroup.remove( this.measures.ab.line )
            }

            const lineGeometry = new Itee.Geometry()
            lineGeometry.vertices.push( this.measures.ab.startPoint.position.clone() )
            lineGeometry.vertices.push( point.clone() )
            const lineMaterial = new Itee.LineBasicMaterial( { color: 0x0000ff } )
            const line         = new Itee.Line( lineGeometry, lineMaterial )
            line.name          = 'Jonction AB'

            this.measures.ab.line = line
            currentGroup.add( line )

        },

        applyMeasure ( intersect ) {
            'use strict'

            const point = intersect.point

            let currentGroup = this.measures.ab.currentGroup
            if ( !currentGroup ) {

                const measuresABGroup       = this.scene.getObjectByName( 'Mesures' ).getObjectByName( 'Mesures AB' )
                let currentMeasuresABGroup  = new Itee.Group()
                currentMeasuresABGroup.name = `${measuresABGroup.children.length}`
                this.applyModifiers( currentMeasuresABGroup, [ 'toggleVisibility', 'opacity', 'remove' ] )

                measuresABGroup.add( currentMeasuresABGroup )
                this.tree.needUpdate = !this.tree.needUpdate

                // Keep ref on group for next use
                this.measures.ab.currentGroup = currentMeasuresABGroup
                currentGroup                  = this.measures.ab.currentGroup
            }

            if ( !this.measures.ab.startPoint ) {

                const octahedronGeometry = new Itee.OctahedronBufferGeometry( 0.3, 0 )
                const octahedronMaterial = new Itee.MeshPhongMaterial( { color: 0x007bff } )
                const octahedron         = new Itee.Mesh( octahedronGeometry, octahedronMaterial )
                octahedron.name          = 'Point de départ'
                octahedron.isRaycastable = false
                octahedron.position.set( point.x, point.y, point.z )

                this.measures.ab.startPoint = octahedron
                currentGroup.add( octahedron )
                this.tree.needUpdate = !this.tree.needUpdate

            } else if ( !this.measures.ab.endPoint ) {

                // remove previous interline
                this.measures.ab.currentGroup.remove( this.measures.ab.line )

                // Create final line
                const lineGeometry = new Itee.Geometry()
                lineGeometry.vertices.push( this.measures.ab.startPoint.position.clone() )
                lineGeometry.vertices.push( point.clone() )
                const lineMaterial = new Itee.LineBasicMaterial( { color: 0x0000ff } )
                const line         = new Itee.Line( lineGeometry, lineMaterial )
                line.name          = 'Jonction AB'
                line.name          = 'Jonction AB'
                currentGroup.add( line )

                // Create sprite
                const distance         = this.measures.ab.startPoint.position.distanceTo( point )
                const distanceToString = `${distance.toFixed( 3 )}m`
                const sprite           = this.createSprite( distanceToString )
                sprite.position.x      = (this.measures.ab.startPoint.position.x + point.x) / 2
                sprite.position.y      = ((this.measures.ab.startPoint.position.y + point.y) / 2) + 0.2
                sprite.position.z      = (this.measures.ab.startPoint.position.z + point.z) / 2
                sprite.scale.x         = 7
                sprite.scale.y         = 7
                sprite.scale.z         = 7
                sprite.name            = distanceToString
                line.add( sprite )

                // end point
                const octahedronGeometry = new Itee.OctahedronBufferGeometry( 0.3, 0 )
                const octahedronMaterial = new Itee.MeshPhongMaterial( { color: 0x007bff } )
                const octahedron         = new Itee.Mesh( octahedronGeometry, octahedronMaterial )
                octahedron.name          = 'Point de d\'arrivé'
                octahedron.position.set( point.x, point.y, point.z )

                this.measures.ab.endPoint = octahedron
                currentGroup.add( octahedron )

                // Clear group for next measure
                this.measures.ab.currentGroup = undefined
                this.measures.ab.startPoint   = undefined
                this.measures.ab.line         = undefined
                this.measures.ab.endPoint     = undefined
                this.tree.needUpdate          = !this.tree.needUpdate

            }

        },

        createSprite ( message, parameters ) {

            var spriteSideLength = (parameters && parameters.spriteSideLength) ? parameters.spriteSideLength : 300;
            var fontFace         = (parameters && parameters.fontFace) ? parameters.fontFace : "Arial";
            var fontSize         = (parameters && parameters.fontSize) ? parameters.fontSize : "64";
            var textColor        = (parameters && parameters.textColor) ? parameters.textColor : "white";

            var spriteCenter = spriteSideLength / 2;

            var canvas    = document.createElement( 'canvas' );
            canvas.width  = spriteSideLength;
            canvas.height = spriteSideLength;

            // get size data (height depends only on font size)
            var context = canvas.getContext( '2d' );

            context.font  = `Bold ${fontSize}px ${fontFace}`;
            var textWidth = Math.round( context.measureText( message ).width );

            context.fillStyle = textColor;
            context.fillText( message, spriteCenter - (textWidth / 2), spriteCenter + ( Number.parseInt( fontSize ) / 2) );

            // canvas contents will be used for a texture
            var texture         = new Itee.Texture( canvas )
            texture.minFilter   = Itee.LinearFilter
            //            texture.minFilter   = Itee.LinearFilter
            texture.mapping     = Itee.UVMapping
            texture.needsUpdate = true;

            var spriteMaterial = new Itee.SpriteMaterial( {
                map: texture
            } );

            return new Itee.Sprite( spriteMaterial );

        },

        disableMeasure () {
            'use strict'

            this.viewport.isRaycastable = false
            this.action                 = ''
            this.disablePointer()
            this.resetDefaultCursor()

        },

        // Cameras
        setViewportCameraOfType ( cameraType ) {
            'use strict'

            const camera   = this.viewport.camera
            const position = camera.position
            const target   = camera.target

            this.viewport.camera = {
                type:     cameraType,
                position: position,
                target:   target
            }

            //            const element = document.getElementById("viewport3D")
            //
            //            switch ( cameraType ) {
            //
            //                case 'none': {
            //
            //                    this.viewport.camera = null
            //
            //                    break
            //                }
            //
            //                case 'array': {
            //
            //                    const array  = []
            //                    this.viewport.camera = new Itee.ArrayCamera( array )
            //
            //                    break
            //                }
            //
            //                case 'cinematic': {
            //
            //                    const fov    = 50
            //                    const aspect = ( element.offsetWidth / element.offsetHeight )
            //                    const near   = 0.001
            //                    const far    = 1000
            //                    this.viewport.camera = new Itee.CinematicCamera( fov, aspect, near, far )
            //
            //                    break
            //                }
            //
            //                case 'cube': {
            //
            //                    const near           = 100
            //                    const far            = 2000
            //                    const cubeResolution = 512
            //                    this.viewport.camera         = new Itee.CubeCamera( near, far, cubeResolution )
            //
            //                    break
            //                }
            //
            //                case 'orthographic': {
            //                    const frustum = 500
            //                    const left    = -frustum
            //                    const right   = frustum
            //                    const top     = frustum
            //                    const bottom  = -frustum
            //                    const near    = 1
            //                    const far     = 2000
            //                    this.viewport.camera  = new Itee.OrthographicCamera( left, right, top, bottom, near, far )
            //                    break
            //                }
            //
            //                case 'perspective': {
            //                    const fov    = 50
            //                    const aspect = ( element.offsetWidth / element.offsetHeight )
            //                    const near   = 0.01
            //                    const far    = 10000 // logDepthBuffer
            //                    //                    const near   = 1
            //                    //                    const far    = 1000
            //                    this.viewport.camera = new Itee.PerspectiveCamera( fov, aspect, near, far )
            //                    break
            //                }
            //
            //                default:
            //                    throw new RangeError( `Invalid switch parameter: ${ cameraType }` )
            //
            //            }

        },

        // Controls
        setViewportControlOfType ( controlType ) {
            'use strict'

            this.viewport.control = controlType

            //
            //            const element = document.getElementById("viewport3D")
            //
            //            // Dispose controls handlers before create new one
            //            if ( this.viewport.control && this.viewport.control.dispose ) {
            //
            //                if ( this.viewport.control instanceof Itee.OrbitControls ) {
            //                    this.viewport.control.removeEventListener( 'change' )
            //                    this.viewport.control.removeEventListener( 'end' )
            //                }
            //
            //                this.viewport.control.dispose()
            //
            //            }
            //
            //            switch ( controlType ) {
            //
            //                case 'none':
            //                    this.viewport.control = null
            //                    break
            //
            //                case "deviceorientation":
            //                    this.viewport.control = new Itee.DeviceOrientationControls( this.viewport.camera )
            //                    break
            //
            //                case "drag":
            //                    this.viewport.control = new Itee.DragControls( this.scene.children[ 1 ], this.viewport.camera, element )
            //                    break
            //
            //                case "editor":
            //                    this.viewport.control = new Itee.EditorControls( this.viewport.camera, element )
            //                    break
            //
            //                case "firstperson":
            //                    this.viewport.control               = new Itee.FirstPersonControls( this.viewport.camera, element )
            //                    this.viewport.control.movementSpeed = 10.0
            //                    this.viewport.control.lookSpeed     = 0.1
            //                    break
            //
            //                case "fly":
            //                    // Should it be this._selected ???
            //                    this.viewport.control               = new Itee.FlyControls( this.viewport.camera, element )
            //                    this.viewport.control.movementSpeed = 10.0
            //                    this.viewport.control.rollSpeed     = 0.1
            //                    break
            //
            //                case "orbit":
            //                    this.viewport.control = new Itee.OrbitControls( this.viewport.camera, element )
            ////                    this.viewport.control.addEventListener( 'change', this._decimateVisibleMeshes.bind( this ), true )
            ////                    this.viewport.control.addEventListener( 'end', this._populateVisibleMeshes.bind( this ), true )
            //
            //                    break
            //
            //                case "orthographictrackball":
            //                    this.viewport.control = new Itee.OrthographicTrackballControls( this.viewport.camera, element )
            //                    break
            //
            //                case "pointerlock":
            //                    const havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
            //                    if ( havePointerLock ) {
            //                        this._avatar()
            //                    } else {
            //                        alert( 'Your browser doesn\'t seem to support Pointer Lock API' )
            //                    }
            //
            //                    break
            //
            //                case "trackball":
            //                    this.viewport.control = new Itee.TrackballControls( this.viewport.camera, element )
            //                    break
            //
            //                case "transform":
            //                    this.viewport.control = new Itee.TransformControls( this.viewport.camera, element )
            //                    break
            //
            //                case "vr":
            //                    this.viewport.control = new Itee.VRControls( this.viewport.camera, ( error ) => {
            //                        console.error( error )
            //                    } )
            //                    break
            //
            //                default:
            //                    throw new RangeError( `Invalid control parameter: ...` )
            //                    break
            //
            //            }

        },

        // Effects
        setViewportEffectOfType ( effectType ) {
            'use strict'

            this.viewport.effect = effectType

        },

        // Shadow
        enableShadow () {
            'use strict'

            this.viewport.enableShadow = true

        },

        disableShadow () {
            'use strict'

            this.viewport.enableShadow = false

        },

        // Stats
        enableStats () {
            'use strict'

            this.viewport.showStats = true

        },

        disableStats () {
            'use strict'

            this.viewport.showStats = false

        },

        // Render
        enableRender () {
            'use strict'

            this.viewport.autoUpdate = true

        },

        disableRender () {
            'use strict'

            this.viewport.autoUpdate = false

        },

        // Centering
        centerViewportCamera () {
            'use strict'

            this.viewport.needCameraFitWorldBoundingBox = true

        },

        // Extras
        setViewportBackgroundColor ( colorEvent ) {
            'use strict'
            console.log( 'setViewportBackgroundColor' )

            const hexaStringColor         = colorEvent.target.value
            const hexaIntColor            = parseInt( hexaStringColor.replace( '#', '0x' ) )
            this.viewport.backgroundColor = hexaIntColor

        },

        // Viewport Listeners
        onIntersect ( intersect ) {

            if ( intersect ) {

                this.updatePointer( intersect.point, intersect.face )

                switch ( this.action ) {

                    case 'selection':
                    case 'clippingSelection':
                        this._updateIntersected( intersect.object )
                        break

                    case 'measureAB':
                        this.updateMeasure( intersect )
                        break

                    default:
                        throw new RangeError( `Invalid action: ${this.action}` )
                        break

                }

            } else {

                switch ( this.action ) {

                    case 'selection':
                    case 'clippingSelection':
                        this._clearPreviousIntersected()
                        break

                    case 'measureAB':
                        //                        this.applyMeasure( intersect )
                        break

                    default:
                        throw new RangeError( `Invalid action: ${this.action}` )
                        break

                }

            }

        },

        onSelect ( intersect ) {

            if ( intersect ) {

                switch ( this.action ) {

                    case 'selection':
                        this._updateSelected( intersect.object )
                        this.onToggleModalVisibility( 'userDataModal' )
                        break

                    case 'measureAB':
                        this.applyMeasure( intersect )
                        break

                    case 'clippingSelection':
                        this._addClippingPlan( intersect.point, intersect.face.normal )
                        break

                    default:
                        throw new RangeError( `Invalid action: ${this.action}` )
                        break

                }

            } else {

            }

        },

        onDeselect () {

            if ( !this.selected.object ) { return }

            if ( this.selected.object.material ) {

                this._resetOriginalMaterialOf( this.selected )

            }

            this._releaseReferenceFrom( this.selected )

        },

        _addClippingPlan ( point, normal, name, sensibility ) {

            const self = this

            let envGroup = this.scene.getObjectByName( 'Environement' )
            if ( !envGroup ) {

                envGroup      = new Itee.Group()
                envGroup.name = "Environement"
                this.scene.add( envGroup )

            }

            let modifiersGroup = this.scene.getObjectByName( 'Modificateurs' )
            if ( !modifiersGroup ) {

                modifiersGroup      = new Itee.Group()
                modifiersGroup.name = "Geometries"
                envGroup.add( modifiersGroup )

            }

            const subClippinPlane = new Itee.Plane( normal.clone(), 0 )

            let projectedPoint = new Itee.Vector3( 0, 0, 0 )
            subClippinPlane.projectPoint( point, projectedPoint )

            const orthogonalDistanceToOrigin = point.distanceTo( projectedPoint ) - 0.1

            const clippingPlane      = new Itee.Plane( normal.clone(), -orthogonalDistanceToOrigin )
            const clippingPlaneIndex = this.renderer.clippingPlanes.length
            clippingPlane.id         = clippingPlaneIndex

            const helper   = new Itee.PlaneHelper( clippingPlane, 1000, 0xffffff )
            helper.name    = name || `Plan de coupe n°${clippingPlaneIndex}`
            helper.visible = false
            self.applyModifiers( helper, [ 'updateClipping', 'removeClipping' ], {
                clippingPlane,
                sensibility
            } )
            modifiersGroup.add( helper )

            this.renderer.clippingPlanes.push( clippingPlane )

            // Special case to refresh treeview that cannot listen on scene
            self.tree.needUpdate = !self.tree.needUpdate

        },

        _updateIntersected ( object ) {

            if ( !object || (object.type === 'Group' || object.type === 'Scene') ) {
                return
            }

            if ( !this.intersected.object ) {

                this._keepReferenceOf( object, this.intersected )

            } else {

                if ( this.intersected.object.uuid !== object.uuid ) {

                    this._clearPreviousIntersected()
                    this._keepReferenceOf( object, this.intersected )

                }

            }

        },

        _updateSelected ( object ) {

            if ( object && (object.type === 'Group' || object.type === 'Scene') ) {
                return
            }

            if ( !this.selected.object ) {

                if ( this.intersected.object ) {
                    this._clearPreviousIntersected()
                }

                this._keepReferenceOf( object, this.selected )

            } else {

                if ( this.selected.object.uuid !== this.intersected.object.uuid ) {

                    this.onDeselect()

                    if ( this.intersected.object ) {
                        this._clearPreviousIntersected()
                    }

                    this._keepReferenceOf( object, this.selected )

                }

            }

        },

        _keepReferenceOf ( objectToRef, refObject ) {

            refObject.object           = objectToRef
            refObject.originalMaterial = objectToRef.material
            refObject.object.material  = this._cloneMaterials( objectToRef.material )

        },

        _cloneMaterials ( materials ) {

            if ( !materials ) {
                return
            }

            if ( Array.isArray( materials ) ) {

                const cloneMaterials = []
                for ( let i = 0, n = materials.length ; i < n ; i++ ) {

                    const material = materials[ i ]
                    // Fix wrong cloning with undefined
                    if ( material.userData === undefined ) {
                        material.userData = {}
                    }

                    let cloneMaterial = material.clone()
                    cloneMaterial.color.set( 0x00c8ff ) //0xfa9600
                    cloneMaterials.push( cloneMaterial )

                }
                return cloneMaterials

            } else {

                // Fix wrong cloning with undefined
                if ( materials.userData === undefined ) {
                    materials.userData = {}
                }

                const cloneMaterial = materials.clone()
                cloneMaterial.color.set( 0x00c8ff ) //0xfa9600
                return cloneMaterial

            }

        },

        _clearPreviousIntersected () {

            if ( this.intersected.object ) {

                if ( this.intersected.object.material ) {

                    this._releaseMaterials( this.intersected.object.material )
                    this.intersected.object.material = this.intersected.originalMaterial

                }

                this._releaseReferenceFrom( this.intersected )

            }

        },

        _releaseReferenceFrom ( refObject ) {

            refObject.originalMaterial = undefined
            refObject.object           = undefined

        },

        _resetOriginalMaterialOf ( refObject ) {

            this._releaseMaterials( refObject.object.material )
            refObject.object.material = refObject.originalMaterial

        },

        _releaseMaterials ( materials ) {

            if ( !materials ) {
                return
            }

            if ( Array.isArray( materials ) ) {
                for ( let i = 0, n = materials.length ; i < n ; i++ ) {
                    materials[ i ].dispose()
                }
            } else {
                materials.dispose()
            }

        },

        /// Tree modifiers
        applyModifiers ( object, modifiersNames, modifiersDatas ) {

            const self = this

            let modifiers = []

            for ( let modifierIndex = 0, numberOfModifiers = modifiersNames.length ; modifierIndex < numberOfModifiers ; modifierIndex++ ) {

                switch ( modifiersNames[ modifierIndex ] ) {

                    case 'lazyPopulate':
                        modifiers.push( {
                            type: 'icon',
                            icon: 'download'
                        } )
                        break

                    case 'toggleVisibility':
                        modifiers.push( {
                            type:    'checkicon',
                            iconOn:  'eye',
                            iconOff: 'eye-slash',
                            value:   object.visible,
                            onClick: self.toggleVisibilityOf( object )
                        } )
                        break

                    case 'toggleChildrenVisibility':
                        modifiers.push( {
                            type:    'icon',
                            icon:    'low-vision',
                            onClick: self.makeVisibleAllChildrenOf( object )
                        } )
                        break

                    case 'opacity':
                        modifiers.push( {
                            type:     'range',
                            display:  'select',
                            onChange: self.updateOpacityOf( object )
                        } )
                        break

                    case 'lookAt':
                        modifiers.push( {
                            type:    'icon',
                            display: 'select',
                            icon:    'search',
                            onClick: self.lookAtObject( object )
                        } )
                        break

                    case 'remove':
                        modifiers.push( {
                            type:    'icon',
                            display: 'select',
                            icon:    'times',
                            onClick: self.removeObject( object )
                        } )
                        break

                    case 'updateClipping':
                        modifiers.push( {
                            type:     'range',
                            onChange: self.updateClippingPlane( modifiersDatas.clippingPlane, modifiersDatas.sensibility )
                        } )
                        break

                    case 'removeClipping':
                        modifiers.push( {
                            type:    'icon',
                            icon:    'times',
                            onClick: self.removeClippingPlane.call(self, modifiersDatas.clippingPlane, object )
                        } )
                        break
                }

            }

            object.modifiers = modifiers

        },

        selectObject ( object ) {
            'use strict'

            const self    = this
            const _object = object
            let _selected = false

            return function selectObjectHandler () {

                _selected = !_selected

                if ( _selected ) {
                    self.onSelect( _object )
                } else {
                    self.onDeselect()
                }

            }

        },

        toggleVisibilityOf ( object ) {
            'use strict'

            const _self   = this
            const _object = object

            return function toggleVisibility () {
                _object.visible                = !_object.visible
                _object.modifiers[ 0 ].value   = _object.visible
                _self.tree.needUpdate          = !_self.tree.needUpdate
                _self.viewport.needCacheUpdate = true
            }

        },

        makeVisibleAllChildrenOf ( object ) {

            const _self             = this
            const _object           = object
            let _childrenVisibility = _object.visible

            return function toggleVisibility () {

                _childrenVisibility = !_childrenVisibility
                _object.traverse( function ( children ) {
                    children.visible              = _childrenVisibility
                    children.modifiers[ 0 ].value = _childrenVisibility
                } )

                _self.tree.needUpdate          = !_self.tree.needUpdate
                _self.viewport.needCacheUpdate = true
            }

        },

        updateOpacityOf ( object ) {
            'use strict'

            const _object = object

            return function onChangeHandler ( changeEvent ) {

                const opacity = changeEvent.target.valueAsNumber / 100

                _object.traverse( child => {

                    if ( !child.isMesh && !child.isLineSegments ) {
                        return
                    }

                    const materials = child.material
                    if ( !materials ) {
                        return
                    }

                    if ( Array.isArray( materials ) ) {

                        for ( let materialIndex = 0, numberOfMaterial = materials.length ; materialIndex < numberOfMaterial ; materialIndex++ ) {
                            setOpacity( materials[ materialIndex ], opacity )
                        }

                    } else {

                        setOpacity( materials, opacity )

                    }

                } )

                function setOpacity ( material, opacity ) {

                    if ( !material.transparent ) {
                        material.transparent = true
                    }

                    material.opacity = opacity

                }

            }

        },

        removeObject ( element ) {
            'use strict'

            let _element = element

            return function removeElementHandler () {
                _element.parent.remove( _element )

                const geometry = _element.geometry
                if ( geometry ) {
                    geometry.dispose()
                }

                const materials = _element.material
                if ( materials ) {

                    if ( Array.isArray( materials ) ) {
                        for ( let i = 0, n = materials.length ; i < n ; i++ ) {
                            materials[ i ].dispose()
                        }
                    } else {
                        materials.dispose()
                    }

                }

                _element = undefined
            }

        },

        lookAtObject ( object ) {
            'use strict'

            const _self   = this
            const _object = object

            return function _lookAtObject () {

                if ( _object.isMesh ) {

                    if ( !_object.geometry.boundingSphere ) {
                        _object.geometry.computeBoundingSphere()
                    }

                    const objectPosition       = _object.position
                    const objectBoundingSphere = _object.geometry.boundingSphere
                    const radius               = objectBoundingSphere.radius * 2
                    const target               = new Itee.Vector3().add( objectPosition, objectBoundingSphere.center )
                    const position             = new Itee.Vector3( radius, radius, radius ).add( target )

                    _self.viewport.camera = {
                        type:     'perspective',
                        position: position,
                        target:   target
                    }

                }

            }

        },

        updateClippingPlane ( clippingPlane, sensibility ) {

            const _clippingPlane = clippingPlane
            const _sensibility   = sensibility || 1

            return function ( changeEvent ) {

                const centeredValue     = (changeEvent.target.valueAsNumber - 50) * _sensibility
                _clippingPlane.constant = centeredValue

            }

        },

        removeClippingPlane ( clippingPlane, helper ) {

            const _self         = this
            let _clippingPlanes = _self.renderer.clippingPlanes
            let _clippingPlane  = clippingPlane
            let _element        = helper

            return function removeModifierHandler () {

                _clippingPlanes.splice( _clippingPlanes.indexOf( _clippingPlane ), 1 )

                _element.parent.remove( _element )

                const geometry = _element.geometry
                if ( geometry ) {
                    geometry.dispose()
                }

                const materials = _element.material
                if ( materials ) {

                    if ( Array.isArray( materials ) ) {
                        for ( let i = 0, n = materials.length ; i < n ; i++ ) {
                            materials[ i ].dispose()
                        }
                    } else {
                        materials.dispose()
                    }

                }

                _element = undefined

                // Special case to refresh treeview that cannot listen on scene
                _self.tree.needUpdate = !_self.tree.needUpdate

            }

        },

        ////

        onProgress ( progressEvent ) {
            'use strict'

            if ( !progressEvent.lengthComputable ) { return }

            if ( !this.progressBar.isVisible ) {
                this.progressBar.isVisible = true
            }

            this.progressBar.done = progressEvent.loaded
            this.progressBar.todo = progressEvent.total

            if ( this.progressBar.done === this.progressBar.todo ) {

                if ( this.progressBar.timeoutId ) {
                    clearTimeout( this.progressBar.timeoutId )
                }

                this.progressBar.timeoutId = setTimeout( () => {
                    this.progressBar.isVisible = false
                }, 1000 )

            }

        },

        onError ( error ) {
            'use strict'

            console.error( error )

        },

        // CARL

        editBuilding () {

            const id = this.carl.objectId
            if ( id ) {

                const isGroup = this.carl.isGroup
                if ( isGroup ) {
                    parent.postMessage( `GISDetailAction#-#${id};com.carl.xnet.equipment.backend.bean.BoxBean#+#`, '*' )
                } else {
                    parent.postMessage( `GISDetailAction#-#${id};com.carl.xnet.equipment.backend.bean.MaterialBean#+#`, '*' )
                }

            } else {
                console.warn( 'The current building doesn\'t container a gmaoId' )
            }

        },

        createBuildingIntervention () {

            const id = this.carl.objectId
            if ( id ) {

                const isGroup = this.carl.isGroup
                if ( isGroup ) {
                    parent.postMessage( `CREATE_WO#-#${id};com.carl.xnet.equipment.backend.bean.BoxBean#+#`, '*' )
                } else {
                    parent.postMessage( `CREATE_WO#-#${id};com.carl.xnet.equipment.backend.bean.MaterialBean#+#`, '*' )
                }

            } else {
                console.warn( 'The current building doesn\'t container a gmaoId' )
            }

        },

        getCarlDetail () {

            const id = this.selected.object.userData.gmaoId
            if ( id ) {

                const isRoom = (this.selected.object.parent.name === "Locaux")
                if ( isRoom ) {
                    parent.postMessage( `GISDetailAction#-#${id};com.carl.xnet.equipment.backend.bean.BoxBean#+#`, '*' )
                } else {
                    parent.postMessage( `GISDetailAction#-#${id};com.carl.xnet.equipment.backend.bean.MaterialBean#+#`, '*' )
                }

            } else {
                console.warn( 'The current selection doesn\'t container a gmaoId' )
            }

        },

        createCarlInter () {

            const id = this.selected.object.userData.gmaoId
            if ( id ) {

                const isRoom = (this.selected.object.parent.name === "Locaux")
                if ( isRoom ) {
                    parent.postMessage( `CREATE_WO#-#${id};com.carl.xnet.equipment.backend.bean.BoxBean#+#`, '*' )
                } else {
                    parent.postMessage( `CREATE_WO#-#${id};com.carl.xnet.equipment.backend.bean.MaterialBean#+#`, '*' )
                }

            } else {
                console.warn( 'The current selection doesn\'t container a gmaoId' )
            }

        },

    }

}

const NotFound = {
    template: `
        <div>
            Uuuuhhhh, you got a 404 !
        </div>
    `
}

//////
// NEED TO BE A VAR else won't be in global space but in scripts space !!!
var IteeConfig = {
    launchingSite: '#itee-application-root',
    props:         [],
    routes:        [
        {
            path:      '/',
            component: AppPage,
            children:  [
                {
                    path:      '',
                    alias:     '/viewer',
                    component: ViewerPage
                },
                {
                    path:      '*',
                    component: NotFound
                }
            ]
        },
        {
            path:      '*',
            component: NotFound
        }
    ]
}
