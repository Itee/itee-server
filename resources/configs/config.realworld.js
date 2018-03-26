/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

const AppPage = {
    template: `
        <TContainer orientation="vertical" hAlign="stretch" vAlign="start" expand=true>
        
            <THeader id="appHeader" style="min-height: 60px;">
                <TAppBar height="60px">
                    <TContainer vAlign="center" hAlign="start">
                        <TLabel class="tBrand" icon="eye" label="Geomap-Imagis" />
                    </TContainer>
                    <TMenu>
                        <TMenuItem label="Visualiseur" :onClickHandler="function() { routeTo('/') }" />
                        <TMenuItem label="Editeur" :onClickHandler="function() { routeTo('/editor') }" />
                        <TMenuItem label="Téléversement" :onClickHandler="function() { routeTo('/upload') }" />
                        <TMenuItem label="Database" :onClickHandler="function() { routeTo('/database') }" />
                    </TMenu>
                </TAppBar>
            </THeader>
            
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
    methods:  {

        routeTo ( route ) {
            'use strict'

            this.$router.push( route )

        },

        alertFooBar () {
            'use strict'
            alert( 'foo bar' )
        },

    },
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

            }, 100 )

            self.isInit = true

        }

    }
}

const ViewerPage = {
    template: `
   <TContainerVertical vAlign="start" hAlign="stretch" expand="true">
     
        <TToolBar>
            <TToolItem icon="hand-pointer" tooltip="Sélection" :onClick=toggleViewportRaycasting />
            <TToolItem icon="wifi" tooltip="Rayon X" :onClick="function(){alert('todo')}" />
            <TToolItem icon="cut" tooltip="Outil de découpe" :onClick="function(){alert('todo')}" />
            <TToolDropDown popAt="bottomLeft" icon="crosshairs" tooltip="Outils de mesure" >
                <TToolItem icon="mars" label="Segment" tooltip="Prendre une distance entre un point A et un point B" :onClick=setMesureModeOfType onClickData="segment" />
                <TToolItem icon="share-alt" label="PolyLigne" tooltip="Prendre des distances entre plusieurs points qui se suivent" :onClick=setMesureModeOfType onClickData="polyline" />
                <TToolItem :icon="['fab', 'hubspot']" label="PolySegment" tooltip="Prendre des distances entre un point central et plusieurs points" :onClick=setMesureModeOfType onClickData="polysegment" />
                <TDivider orientation="horizontal" />
                <TToolItem class="disabled" icon="circle" label="Disque" tooltip="Prendre des mesures de type circulaire" :onClick=setMesureModeOfType onClickData="disk" />
                <TToolItem class="disabled" icon="square" label="Carré" tooltip="Prendre des mesures de type rectangulaire" :onClick=setMesureModeOfType onClickData="square" />
                <TToolItem class="disabled" icon="star" label="Polygone" tooltip="Prendre des mesures de type polygonale" :onClick=setMesureModeOfType onClickData="polygone" />
                <TDivider orientation="horizontal" />
                <TToolItem class="disabled" :icon="['fab', 'dribbble']" label="Sphère" tooltip="Volume sphèrique" :onClick=setMesureModeOfType onClickData="sphere" />
                <TToolItem class="disabled" icon="cube" label="Cube" tooltip="Volume cubique" :onClick=setMesureModeOfType onClickData="cube" />
            </TToolDropDown>

            <TDivider orientation="vertical" />

            <TToolDropDown popAt="bottomLeft" tooltip="Choisir le type de projection de la camera" icon="camera">
                <TToolItem icon="cubes" label="Orthographique" :onClick=setViewportCameraOfType onClickData="orthographic" />
                <TToolItem :icon="['fab', 'linode']" label="Perspective" :onClick=setViewportCameraOfType onClickData="perspective" />
            </TToolDropDown>
            
            <TToolDropDown popAt="bottomLeft" tooltip="Choisir le type de contrôle de caméra" icon="gamepad">
                <TToolItem icon="times" label="Aucun" tooltip="..." :onClick=setViewportControlOfType onClickData="none" />
                <TToolItem icon="hand-rock" label="Drag" tooltip="Permet de bouger les objets" :onClick=setViewportControlOfType onClickData="drag" />
                <TToolItem icon="smile" label="Première personne" tooltip="Permet de..." :onClick=setViewportControlOfType onClickData="firstperson" />
                <TToolItem icon="fighter-jet" label="Vol libre" tooltip="Permet de..." :onClick=setViewportControlOfType onClickData="fly" />
                <TToolItem :icon="{icon:['fab', 'quinscape']}" label="Orbital" tooltip="Permet de se déplacer en mode orbital autour du model 3D" :onClick=setViewportControlOfType onClickData="orbit" />
                <TToolItem icon="street-view" label="Avatar" tooltip="Permet de se déplacer en mode immersif dans le model 3D" :onClick=setViewportControlOfType onClickData="avatar" />
                <TToolItem :icon="{icon:['fab', 'simplybuilt'], flip: 'vertical'}" label="Realité Virtuel" tooltip="Permet de se déplacer en mode immersif dans le model 3D" :onClick=setViewportControlOfType onClickData="vr" />
            </TToolDropDown>
            
            <TToolDropDown popAt="bottomLeft" tooltip="Choisir un effet de camera" icon="eye">
                <TToolItem icon="globe" label="Normal" tooltip="Vision de base" :onClick=setViewportEffectOfType onClickData="normal" />
                <TToolItem :icon="['fab', 'nintendo-switch']" label="Anaglyphe" tooltip="Anaglyphe" :onClick=setViewportEffectOfType onClickData="anaglyph" />
                <TToolItem :icon="{icon:'barcode', rotate: '90'}" label="Parallax" tooltip="Effet de caractère" :onClick=setViewportEffectOfType onClickData="parallaxbarrier" />
                <TToolItem icon="adjust" label="Stereo" tooltip="Effet stereo pour google cardboard" :onClick=setViewportEffectOfType onClickData="stereo" />
                <TToolItem :icon="{icon:['fab', 'simplybuilt'], flip: 'vertical'}" label="VR" tooltip="VR" :onClick=setViewportEffectOfType onClickData="vr" />
            </TToolDropDown>

            <TDivider orientation="vertical" />
            
            <TToolItem icon="chart-bar" tooltip="Afficher les statistiques webgl" :onClick=toggleViewportStats />
            <TToolItem icon="recycle" tooltip="Activer/Désactivé la mise à jours automatique du viewport" :onClick=toggleViewportAutoUpdate />
            <TToolDropDown popAt="bottomLeft" tooltip="Choisir un effet de camera" icon="globe">
                <TToolItem icon="sun" label="Ombres" tooltip="Activer/Désactiver les ombres" :onClick=toggleViewportShadow />
                <TToolItem icon="paint-brush" label="Couleur de fond" tooltip="Changer la couleur de fond" :onClick=toggleViewportShadow />
                <input type="color" label="Couleur de fond" value="#ff0000" v-on:change="setViewportBackgroundColor">
            </TToolDropDown>
            <TToolItem :icon="['fab', 'centercode']" tooltip="Recentre la camera sur la vue" :onClick=centerViewportCamera />

        </TToolBar>
                    
        <TSplitter :isVertical=true :initPosition=20>
            <TTree slot="left" :items="viewport.scene.children"></TTree>
            <TViewport3D
                slot="right"
                v-bind="viewport"
                v-on:intersect=onIntersect
                v-on:noIntersect=onNoIntersect
                v-on:select=onSelect
                v-on:deselect=onDeselect
             />
        </TSplitter>
                
        <TFooter id="appFooter" style="min-height: 30px;">
            <TProgress :isVisible="progressBar.isVisible" v-bind:done=progressBar.done v-bind:todo=progressBar.todo style="width:100%; margin: 0 15px;"></TProgress>
        </TFooter>
            
    </TContainerVertical>
    `,
    data () {

        return {
            dbManager:         new Itee.TDataBaseManager(),
            objectsManager:    new Itee.TObjectsManager(),
            geometriesManager: new Itee.TGeometriesManager(),
            materialsManager:  new Itee.TMaterialsManager(),
            viewport:          {
                scene:           new Itee.Scene(),
                camera:          {
                    type:     'perspective',
                    position: {
                        x: 700,
                        y: 200,
                        z: 500
                    },
                    target:   {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                },
                control:         'orbit',
                effect:          'none',
                renderer:        'webgl',
                showStats:       true,
                autoUpdate:      true,
                backgroundColor: 0x000000,
                enableShadow:    false,
                isRaycastable:   false,
                fitCamera:       false
            },
            intersected:       {
                object:           undefined,
                originalMaterial: undefined
            },
            selected:          {
                object:           undefined,
                originalMaterial: undefined
            },
            progressBar:       {
                show:      false,
                timeoutId: undefined,
                done:      0,
                todo:      0
            }

        }

    },
    methods:  {

        //// Viewport stuff

        setMesureModeOfType ( effectType ) {
            'use strict'

        },

        ////

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

        },

        setViewportControlOfType ( controlType ) {
            'use strict'

            this.viewport.control = controlType

        },

        setViewportEffectOfType ( effectType ) {
            'use strict'

            this.viewport.effect = effectType

        },

        setViewportBackgroundColor ( colorEvent ) {
            'use strict'
            console.log( 'setViewportBackgroundColor' )

            const hexaStringColor         = colorEvent.target.value
            const hexaIntColor            = parseInt( hexaStringColor.replace( '#', '0x' ) )
            this.viewport.backgroundColor = hexaIntColor

        },

        toggleViewportStats () {
            'use strict'
            console.log( 'toggleViewportStats' )

            this.viewport.showStats = !this.viewport.showStats

        },

        toggleViewportAutoUpdate () {
            'use strict'
            console.log( 'toggleViewportAutoUpdate' )

            this.viewport.autoUpdate = !this.viewport.autoUpdate

        },

        toggleViewportShadow () {
            'use strict'
            console.log( 'toggleViewportShadow' )

            this.viewport.enableShadow = !this.viewport.enableShadow

        },

        toggleViewportRaycasting () {
            'use strict'
            console.log( 'toggleViewportRaycasting' )

            this.viewport.isRaycastable = !this.viewport.isRaycastable
        },

        centerViewportCamera () {
            'use strict'

            this.viewport.fitCamera = !this.viewport.fitCamera

        },

        // Listener

        onIntersect ( intersect ) {

            const object = intersect.object
            if ( !object || (object.type === 'Group' || object.type === 'Scene') ) {
                return
            }

            const materials = object.material

            if ( this.intersected.object && (this.intersected.object.uuid !== object.uuid) ) {

                this.intersected.object.material = this.intersected.originalMaterial

            }

            this.intersected.object           = object
            this.intersected.originalMaterial = materials

            if ( Array.isArray( materials ) ) {

                const cloneMaterials = []
                for ( let i = 0, n = materials.length ; i < n ; i++ ) {
                    let cloneMaterial = materials[ i ].clone()
                    cloneMaterial.color.set( 0x00c8ff )
                    cloneMaterials.push( cloneMaterial )
                }
                this.intersected.object.material = cloneMaterials

            } else {

                const cloneMaterial = materials.clone()
                cloneMaterial.color.set( 0x00c8ff )
                this.intersected.object.material = cloneMaterial

            }

            const intersectPoint = intersect.point
            if ( intersectPoint ) {
                //Todo: scale sphere in squared idstance to intersect origin and camera position
                let sphere     = this.viewport.scene.getObjectByName( 'SpherePointer' )
                sphere.visible = true
                sphere.position.set( intersectPoint.x, intersectPoint.y, intersectPoint.z )
            }

        },

        onNoIntersect () {

            if ( this.intersected.object ) {

                if ( this.intersected.object.material ) {

                    const materials = this.intersected.object.material
                    if ( Array.isArray( materials ) ) {
                        for ( let i = 0, n = materials.length ; i < n ; i++ ) {
                            materials[ i ].dispose()
                        }
                    } else {
                        materials.dispose()
                    }

                    this.intersected.object.material = this.intersected.originalMaterial

                }

                this.intersected.object           = undefined
                this.intersected.originalMaterial = undefined

            }

            let sphere     = this.viewport.scene.getObjectByName( 'SpherePointer' )
            sphere.visible = false

        },

        onSelect ( object ) {

            if ( object && (object.type === 'Group' || object.type === 'Scene') ) {
                return
            }

            if ( !this.intersected.object ) { this.onIntersect( { object } ) }

            // In case we already have a selected object and it is different from intersected
            // Reset the current selection before new selection assignement
            if ( this.selected.object && (this.selected.object.uuid !== this.intersected.object.uuid) ) {

                this.selected.object.material      = this.selected.originalMaterial
                this.selected.object.isRaycastable = true

            }

            // Update selection with intersected object
            this.selected.object               = this.intersected.object
            this.selected.originalMaterial     = this.intersected.originalMaterial
            this.selected.object.isRaycastable = false

            // Clear current intersected object
            this.intersected.object           = undefined
            this.intersected.originalMaterial = undefined

        },

        onDeselect () {

            if ( this.selected.object ) {

                if ( this.selected.object.material ) {

                    const materials = this.selected.object.material
                    if ( Array.isArray( materials ) ) {
                        for ( let i = 0, n = materials.length ; i < n ; i++ ) {
                            materials[ i ].dispose()
                        }
                    } else {
                        materials.dispose()
                    }

                    this.selected.object.material = this.selected.originalMaterial

                }
                this.selected.object.isRaycastable = true

                this.selected.object           = undefined
                this.selected.originalMaterial = undefined

            }

        },

        /// Tree modifiers

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

            const _object = object

            return function toggleVisibility () {
                _object.visible = !_object.visible
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

        ////

        onProgress ( progressEvent ) {
            'use strict'

            if ( progressEvent.lengthComputable ) {

                this.progressBar.done = progressEvent.loaded
                this.progressBar.todo = progressEvent.total

                if ( !this.progressBar.show ) {
                    this.progressBar.show = true
                }

                this.progressBar.done = progressEvent.loaded
                this.progressBar.todo = progressEvent.total

                if ( this.progressBar.done === this.progressBar.todo ) {

                    if ( this.progressBar.timeoutId ) {
                        clearTimeout( this.progressBar.timeoutId )
                    }

                    this.progressBar.timeoutId = setTimeout( () => {
                        this.progressBar.show = false
                    }, 1000 )

                }

            }

        },

        onError ( error ) {
            'use strict'

            console.error( error )

        },

        //// PRIVATE

        _createEnvironement () {
            'use strict'

            ///////////////////
            // Add Env group //
            ///////////////////
            const envGroup = new Itee.Group()
            envGroup.name  = "Environement"
            this.viewport.scene.add( envGroup )

            ///////////////
            // Add light //
            ///////////////
            const lightGroup = new Itee.Group()
            lightGroup.name  = "Lumières"
            envGroup.add( lightGroup )

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

            ///////////////
            // Add grids //
            ///////////////
            const gridGroup     = new Itee.Group()
            gridGroup.name      = "Grilles"
            gridGroup.modifiers = [
                {
                    type:    'checkbox',
                    value:   'checked',
                    onClick: this.toggleVisibilityOf( gridGroup )
                },
                {
                    type:     'range',
                    onChange: this.updateOpacityOf( gridGroup )
                }
            ]
            envGroup.add( gridGroup )

            /// XZ

            const gridHelperXZ_1     = new Itee.GridHelper( 20, 20 )
            gridHelperXZ_1.name      = "Grille XZ - Mètrique"
            gridHelperXZ_1.modifiers = [
                {
                    type:    'checkbox',
                    value:   'checked',
                    onClick: this.toggleVisibilityOf( gridHelperXZ_1 )
                },
                {
                    type:     'range',
                    onChange: this.updateOpacityOf( gridHelperXZ_1 )
                }
            ]
            gridGroup.add( gridHelperXZ_1 )

            const gridHelperXZ_10     = new Itee.GridHelper( 200, 20 )
            gridHelperXZ_10.name      = "Grille XZ - Décamètrique"
            gridHelperXZ_10.modifiers = [
                {
                    type:    'checkbox',
                    value:   'checked',
                    onClick: this.toggleVisibilityOf( gridHelperXZ_10 )
                },
                {
                    type:     'range',
                    onChange: this.updateOpacityOf( gridHelperXZ_10 )
                }
            ]
            gridGroup.add( gridHelperXZ_10 )

            const gridHelperXZ_100     = new Itee.GridHelper( 2000, 20 )
            gridHelperXZ_100.name      = "Grille XZ - Hectomètrique"
            gridHelperXZ_100.modifiers = [
                {
                    type:    'checkbox',
                    value:   'checked',
                    onClick: this.toggleVisibilityOf( gridHelperXZ_100 )
                },
                {
                    type:     'range',
                    onChange: this.updateOpacityOf( gridHelperXZ_100 )
                }
            ]
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

            //////////////////
            // Add pointers //
            //////////////////
            const pointersGroup = new Itee.Group()
            pointersGroup.name  = "Pointers"
            envGroup.add( pointersGroup )

            const geometry = new Itee.SphereBufferGeometry( 0.5, 32, 32 )
            const material = new Itee.MeshPhongMaterial( { color: 0xffff00 } )
            const sphere   = new Itee.Mesh( geometry, material )
            sphere.name    = 'SpherePointer'
            sphere.visible = false
            pointersGroup.add( sphere )

            ////////////////////
            // Populate model //
            ////////////////////
            const siteGroup = new Itee.Group()
            siteGroup.name  = "Sites"
            this.viewport.scene.add( siteGroup )

        },

        _fetchData () {
            'use strict'

            const self = this

            const sitesGroup = this.viewport.scene.getObjectByName('Sites')

            self.dbManager.basePath = '/companies'
            self.dbManager.read(
                {},
                companies => {

                    let sitesIds = companies[ 0 ].sites

                    populate( 'objects', sitesIds, sitesGroup, ( site, siteGroup ) => {

                        let buildingsIds = site.children

                        populate( 'objects', buildingsIds, siteGroup, ( building, buildingGroup ) => {

                            let categoriesIds = building.children

                            populate( 'objects', categoriesIds, buildingGroup, ( category, categoryGroup ) => {

                                let categoriesIds = category.children

                                if ( categoryGroup.type === 'Group' ) {
                                    categoryGroup.updateMatrix()
                                }

                                populateChildren( categoryGroup, categoriesIds )

                            } )

                        } )

                    } )

                },
                self.onProgress,
                self.onError
            )

            function populate ( collectionName, childrenIds, parentGroup, callback ) {

                self.dbManager.basePath = `/${collectionName}`
                self.dbManager.read(
                    childrenIds,
                    children => {

                        let child = undefined
                        for ( let i = 0, n = children.length ; i < n ; i++ ) {
                            child = children[ i ]

                            const group     = new Itee.Group()
                            group.name      = child.name
                            group.modifiers = [
                                {
                                    type:    'checkbox',
                                    value:   'checked',
                                    onClick: self.toggleVisibilityOf( group )
                                },
                                {
                                    type:     'range',
                                    onChange: self.updateOpacityOf( group )
                                }
                            ]

                            callback( child, group )

                            parentGroup.add( group )

                        }

                    },
                    self.onProgress,
                    self.onError
                )

            }

            function populateChildren ( parentGroup, childrenIds ) {

                self.objectsManager.read(
                    childrenIds,
                    objects => {

                        const geometriesIds = objects.map( object => object.geometry ).filter( ( value, index, self ) => {
                            return self.indexOf( value ) === index
                        } )

                        const materialsArray       = objects.map( object => object.material )
                        const concatMaterialsArray = [].concat.apply( [], materialsArray )
                        const materialsIds         = concatMaterialsArray.filter( ( value, index, self ) => {
                            return self.indexOf( value ) === index
                        } )

                        self.geometriesManager.read(
                            geometriesIds,
                            geometries => {

                                self.materialsManager.read(
                                    materialsIds,
                                    materials => {

                                        for ( let objectIndex = 0, numberOfObjects = objects.length ; objectIndex < numberOfObjects ; objectIndex++ ) {

                                            if ( objects[ objectIndex ].children.length > 0 ) {
                                                populateChildren( objects[ objectIndex ], objects[ objectIndex ].children )
                                            }

                                            objects[ objectIndex ].geometry = geometries[ objects[ objectIndex ].geometry ]

                                            const materialIds               = objects[ objectIndex ].material
                                            objects[ objectIndex ].material = []
                                            for ( let materialIndex = 0, numberOfMaterial = materialIds.length ; materialIndex < numberOfMaterial ; materialIndex++ ) {
                                                objects[ objectIndex ].material.push( materials[ materialIds[ materialIndex ] ] )
                                            }

                                            objects[ objectIndex ].parent = null

                                            objects[ objectIndex ].modifiers = [
                                                {
                                                    type:    'checkbox',
                                                    value:   'checked',
                                                    onClick: self.toggleVisibilityOf( objects[ objectIndex ] )
                                                },
                                                {
                                                    type:     'range',
                                                    onChange: self.updateOpacityOf( objects[ objectIndex ] )
                                                }
                                            ]

                                            // Start Test
                                            objects[ objectIndex ].matrixAutoUpdate = false
                                            objects[ objectIndex ].updateMatrix()
                                            // End Test

                                            parentGroup.add( objects[ objectIndex ] )

                                        }

                                    },
                                    self.onProgress,
                                    self.onError
                                )

                            },
                            self.onProgress,
                            self.onError
                        )

                    },
                    self.onProgress,
                    self.onError
                )

            }

        }

    },
    created () {
        'use strict'

        this._createEnvironement()
        this._fetchData()

    },
    mounted () {
        'use strict'

        this.viewport.fitCamera = true

    }

}

const EditorPage = {
    template: `
    <TContainerVertical>

        <TToolBar>
            <TToolItem icon="upload" tooltip="Load" :onClick="function() { toggleModalVisibility('modal-file-data') }" />
            <TToolItem icon="download" tooltip="Download" :onClick=download />
            <TDivider orientation="vertical" />
            <TToolItem icon="hand-pointer" tooltip="Sélection" :onClick=toggleSelectionMode />
            <TToolItem icon="minus" tooltip="Supprimer tous les chargements" :onClick=clear />
            <TDivider orientation="vertical" />
            <TToolItem icon="chart-bar" tooltip="Afficher les statistiques webgl" :onClick=toggleViewportStats />
        </TToolBar>
        
        <TSplitter :isVertical=true :initPosition=20>
        
            <TTree slot="left" :items="viewport.scene.children"></TTree>
           
            <TSplitter slot="right" :isVertical=true :initPosition=25>
                            
                <div slot="left" class="container pt-3 pb-3" style="min-width:300px; overflow-y: scroll;">
                    
                    <div v-if="selectedObject" class="card bg-transparent border-success mb-3">
                        <TInputObject label="Sélection" :value=selectedObject :onChange=onSelectionDataChange />
                    </div>  
                    
                    <div class="card bg-transparent border-success mb-3">
                        <div class="card-header border-success text-center">
                            Affichage
                        </div>
                        <div class="card-body bg-transparent">
                            <button type="button" class="btn btn-outline-primary btn-block" v-on:click.stop="setGroupTransparent">Rendre le groupe transparent</button>
                            <button type="button" class="btn btn-outline-primary btn-block" v-on:click.stop="showGroupGeometries">Voir les geometries</button>
                            <button type="button" class="btn btn-outline-primary btn-block" v-on:click.stop="showGroupCenter">Voir le centre du groupe</button>
                            <button type="button" class="btn btn-outline-primary btn-block" v-on:click.stop="showMeshesBarycenter">Voir le barycentre des meshes</button>
                            <button type="button" class="btn btn-outline-primary btn-block" v-on:click.stop="showGeometriesBarycenter">Voir le barycentre des geometries</button>
                        </div>
                    </div>    
                    
                    <div class="card bg-transparent border-success mb-3">
                        <div class="card-header border-success text-center">
                            Modifications
                        </div>
                        <div class="card-body bg-transparent">
                            <button type="button" class="btn btn-outline-warning btn-block" v-on:click.stop="setGroupToCenter">Centrer le groupe à l'origine</button>
                            <button type="button" class="btn btn-outline-warning btn-block" v-on:click.stop="setMeshesToGroupCenter">Centrer les meshes sur le groupe</button>
                            <button type="button" class="btn btn-outline-warning btn-block" v-on:click.stop="setGroupPositionToChildrenMeshBarycenter">Centrer le groupe sur les meshes</button>
                            <button type="button" class="btn btn-outline-warning btn-block" v-on:click.stop="setGroupPositionToChildrenGeometriesBarycenter">Centrer le groupe sur les geometries</button>
                            <button type="button" class="btn btn-outline-warning btn-block" v-on:click.stop="rotateGeometries">Roter les geometries</button>
                            <button type="button" class="btn btn-outline-warning btn-block" v-on:click.stop="recenterGeometriesChildren">Recentrer les geometries</button>
                        </div>
                    </div>    
                    
                    <div class="card bg-transparent border-success mb-3">
                        <div class="card-header border-success text-center">
                            Transformations
                        </div>
                        <div class="card-body bg-transparent">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="">Rotate</span>
                                </div>
                                <input type="number" class="form-control">
                                <input type="number" class="form-control">
                                <input type="number" class="form-control">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-success" type="button">Apply</button>
                                </div>
                            </div>
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="">Translate</span>
                                </div>
                                <input type="number" class="form-control">
                                <input type="number" class="form-control">
                                <input type="number" class="form-control">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-success" type="button">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>  

                </div>
                
                <TViewport3D
                    slot="right"
                    v-bind="viewport"
                    v-on:intersect=onIntersect
                    v-on:noIntersect=onNoIntersect
                    v-on:select=onSelect
                    v-on:deselect=onDeselect
                 />
                 
            </TSplitter>
            
        </TSplitter>
        
        <div id="modal-file-data" v-on:click="toggleModalVisibility('modal-file-data')" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div v-on:click.stop class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Charger des fichiers dans la vue 3D</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click.stop="toggleModalVisibility('modal-file-data')">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <TInputFile :onChange=updateFilesList />
                    </div>
                    <div v-if="filesList && filesList.length > 0" class="container">
                        <ul class="list-group list-group-flush">
                            <li v-for="file in filesList" class="list-group-item">{{file.name}}</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click.stop="toggleModalVisibility('modal-file-data')">Fermer</button>
                        <button type="button" class="btn btn-primary" v-on:click.stop="upload">Valider</button>
                    </div>
                </div>
            </div>
        </div>

        <TFooter id="appFooter" style="min-height: 30px;">
            <TProgress :isVisible="progressBar.isVisible" v-bind:done=progressBar.done v-bind:todo=progressBar.todo style="width:100%; margin: 0 15px;"></TProgress>
        </TFooter>
        
    </TContainerVertical>
    `,
    data:     function () {

        return {
            loader:         new Itee.TUniversalLoader(),
            filesList:      undefined,
            viewport:       {
                scene:           new Itee.Scene(),
                camera:          {
                    type:     'perspective',
                    position: {
                        x: 700,
                        y: 200,
                        z: 500
                    },
                    target:   {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                },
                control:         'orbit',
                effect:          'none',
                renderer:        'webgl',
                showStats:       true,
                autoUpdate:      true,
                backgroundColor: 0x000000,
                enableShadow:    false,
                isRaycastable:   false,
                fitCamera:       false
            },
            intersected:    {
                object:           undefined,
                originalMaterial: undefined
            },
            selected:       {
                object:           undefined,
                originalMaterial: undefined
            },
            progressBar:    {
                show:      false,
                timeoutId: undefined,
                done:      0,
                todo:      0
            },
            selectedObject: undefined
        }

    },
    methods:  {

        ///// GLOBAL

        onProgress ( progressEvent ) {
            'use strict'

            if ( progressEvent.lengthComputable ) {

                this.progressBar.done = progressEvent.loaded
                this.progressBar.todo = progressEvent.total

                if ( !this.progressBar.show ) {
                    this.progressBar.show = true
                }

                this.progressBar.done = progressEvent.loaded
                this.progressBar.todo = progressEvent.total

                if ( this.progressBar.done === this.progressBar.todo ) {

                    if ( this.progressBar.timeoutId ) {
                        clearTimeout( this.progressBar.timeoutId )
                    }

                    this.progressBar.timeoutId = setTimeout( () => {
                        this.progressBar.show = false
                    }, 1000 )

                }

            }

        },

        onError ( error ) {
            'use strict'

            console.error( error )

        },

        _createEnvironement () {
            'use strict'

            ///////////////////
            // Add Env group //
            ///////////////////
            const envGroup = new Itee.Group()
            envGroup.name  = "Environement"
            this.viewport.scene.add( envGroup )

            ///////////////
            // Add light //
            ///////////////
            const lightGroup = new Itee.Group()
            lightGroup.name  = "Lumières"
            envGroup.add( lightGroup )

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

            ///////////////
            // Add grids //
            ///////////////
            const gridGroup     = new Itee.Group()
            gridGroup.name      = "Grilles"
            gridGroup.modifiers = [
                {
                    type:    'checkbox',
                    value:   'checked',
                    onClick: this.toggleVisibilityOf( gridGroup )
                },
                {
                    type:     'range',
                    onChange: this.updateOpacityOf( gridGroup )
                }
            ]
            envGroup.add( gridGroup )

            /// XZ

            const gridHelperXZ_1     = new Itee.GridHelper( 20, 20 )
            gridHelperXZ_1.name      = "Grille XZ - Mètrique"
            gridHelperXZ_1.modifiers = [
                {
                    type:    'checkbox',
                    value:   'checked',
                    onClick: this.toggleVisibilityOf( gridHelperXZ_1 )
                },
                {
                    type:     'range',
                    onChange: this.updateOpacityOf( gridHelperXZ_1 )
                }
            ]
            gridGroup.add( gridHelperXZ_1 )

            const gridHelperXZ_10     = new Itee.GridHelper( 200, 20 )
            gridHelperXZ_10.name      = "Grille XZ - Décamètrique"
            gridHelperXZ_10.modifiers = [
                {
                    type:    'checkbox',
                    value:   'checked',
                    onClick: this.toggleVisibilityOf( gridHelperXZ_10 )
                },
                {
                    type:     'range',
                    onChange: this.updateOpacityOf( gridHelperXZ_10 )
                }
            ]
            gridGroup.add( gridHelperXZ_10 )

            const gridHelperXZ_100     = new Itee.GridHelper( 2000, 20 )
            gridHelperXZ_100.name      = "Grille XZ - Hectomètrique"
            gridHelperXZ_100.modifiers = [
                {
                    type:    'checkbox',
                    value:   'checked',
                    onClick: this.toggleVisibilityOf( gridHelperXZ_100 )
                },
                {
                    type:     'range',
                    onChange: this.updateOpacityOf( gridHelperXZ_100 )
                }
            ]
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

            //////////////////
            // Add pointers //
            //////////////////
            const pointersGroup = new Itee.Group()
            pointersGroup.name  = "Pointers"
            envGroup.add( pointersGroup )

            const geometry = new Itee.SphereBufferGeometry( 0.5, 32, 32 )
            const material = new Itee.MeshPhongMaterial( { color: 0xffff00 } )
            const sphere   = new Itee.Mesh( geometry, material )
            sphere.name    = 'SpherePointer'
            sphere.visible = false
            pointersGroup.add( sphere )

            /////////////////////////////////////////////

            const dataGroup = new Itee.Group()
            dataGroup.name  = "Données"
            this.viewport.scene.add( dataGroup )

        },

        /// Loader

        toggleModalVisibility ( modalId ) {
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

        updateFilesList ( files ) {
            'use strict'

            this.filesList = files

        },

        upload () {
            'use strict'

            const self      = this
            const dataGroup = self.viewport.scene.getObjectByName( 'Données' )

            this.toggleModalVisibility( 'modal-file-data' )

            this.loader.load(
                this.filesList,
                data => {

                    // Import routine

                    data.traverse( object => {

                        if ( !object.name ) {
                            object.name = `${object.type}_${object.id}`
                        }

                        object.onClick = this.selectObject( object )

                        object.modifiers = [
                            {
                                type:    'checkbox',
                                value:   'checked',
                                onClick: this.toggleVisibilityOf( object )
                            },
                            {
                                type:     'range',
                                onChange: this.updateOpacityOf( object )
                            },
                            {
                                type:    'button',
                                value:   'X',
                                onClick: this.removeObject( object )
                            },
                            {
                                type:    'button',
                                value:   'Up',
                                onClick: this.parentUp( object )
                            }
                        ]

                        if ( object.isMesh || object.isLineSegments ) {
                            object.isRaycastable = true
                            object.geometry.computeFaceNormals()
                            object.geometry.computeVertexNormals()
                            //                                            object.castShadow    = true        //default is false
                            //                                            object.receiveShadow = true     //default is false
                        }

                    } )

                    dataGroup.add( data )

                },
                self.onProgress,
                self.onError
            )

        },

        clear () {
            'use strict'

            let dataGroup = this.viewport.scene.getObjectByName( 'Données' )

            for ( let childIndex = 0, numChildren = dataGroup.children.length ; childIndex < numChildren ; childIndex++ ) {
                let child = dataGroup.children[ childIndex ]
                dataGroup.remove( child )
            }

        },

        download ( objectType ) {
            'use strict'

            let dataGroup     = this.viewport.scene.getObjectByName( 'Données' )
            const stringScene = JSON.stringify( dataGroup.children[ 0 ].toJSON() )
            console.log( `File size: ${stringScene.length}` )

            document.body.innerHTML = stringScene

        },

        /// Tree modifiers

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

            const _object = object

            return function toggleVisibility () {
                _object.visible = !_object.visible
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

        parentUp ( object ) {
            'use strict'

            const _object = object

            return function () {

                const grandParent = _object.parent.parent
                if ( grandParent ) {
                    grandParent.add( object )
                }

            }

        },

        parentDown ( object ) {
            'use strict'

            const _object = object

            return function () {

                const brothers = _object.parent.children
                if ( brothers ) {
                    brothers[ 0 ].add( object )
                }

            }

        },

        //// MESH MODIFIERS

        setGroupTransparent () {
            'use strict'

            const group = this.loadedGroup

            group.traverse( child => {

                if ( !child.isMesh ) {
                    return
                }

                const materials = child.material
                if ( !materials ) {
                    return
                }

                if ( Array.isArray( materials ) ) {
                    for ( let i = 0, n = materials.length ; i < n ; i++ ) {
                        materials[ i ].transparent = true
                        materials[ i ].opacity     = 0.5
                    }
                } else {
                    materials.transparent = true
                    materials.opacity     = 0.5
                }

            } )

        },

        showGroupGeometries ( color ) {
            'use strict'

            const self   = this
            const _group = this.loadedGroup
            const _color = color || Math.random() * 0xffffff

            _group.traverse( child => {

                if ( !child.isMesh ) {
                    return
                }

                const geometry = child.geometry
                if ( !geometry ) {
                    return
                }

                self.viewport.scene.add(
                    new Itee.LineSegments(
                        new Itee.EdgesGeometry( child.geometry ),
                        new Itee.LineBasicMaterial( { color: _color } )
                    )
                )

            } )

        },

        showGroupCenter () {
            'use strict'

            const group      = this.loadedGroup
            //            const position   = group.position
            const position   = group.getWorldPosition( group.position.clone() )
            const axesHelper = new Itee.AxesHelper( 100 )
            axesHelper.position.set( position.x, position.y, position.z )

            this.viewport.scene.add( axesHelper )

        },

        showMeshesBarycenter () {
            'use strict'

            const group            = this.loadedGroup
            const children         = group.children
            const numberOfChildren = children.length || 1
            const barycenter       = children.map( child => {return child.getWorldPosition( child.position.clone() )} )
                                             .reduce( ( a, b ) => { return new Itee.Vector3().addVectors( a, b )} )
                                             .divideScalar( numberOfChildren )

            const axesHelper = new Itee.AxesHelper( 75 )
            axesHelper.position.set( barycenter.x, barycenter.y, barycenter.z )

            this.viewport.scene.add( axesHelper )

        },

        showGeometriesBarycenter () {
            'use strict'

            const group            = this.loadedGroup
            const children         = group.children
            const numberOfChildren = children.length || 1
            const barycenter       = children.map( child => {

                                                 if ( !child.geometry.boundingBox ) {
                                                     child.geometry.computeBoundingBox()
                                                 }

                                                 return child.geometry.boundingBox.getCenter()

                                             } )
                                             .reduce( ( a, b ) => { return new Itee.Vector3().addVectors( a, b )} )
                                             .divideScalar( numberOfChildren )

            const axesHelper = new Itee.AxesHelper( 50 )
            axesHelper.position.set( barycenter.x, barycenter.y, barycenter.z )

            this.viewport.scene.add( axesHelper )

        },

        setMeshesToBarycenter () {
            'use strict'

        },

        setGroupToCenter () {
            'use strict'

            const group = this.loadedGroup
            group.position.set( 0, 0, 0 )
            group.updateMatrix()

        },

        setMeshesToGroupCenter () {
            'use strict'

            const group            = this.loadedGroup
            const groupPosition    = group.position
            const children         = group.children
            const numberOfChildren = children.length || 1
            const barycenter       = children.map( child => {return child.position} )
                                             .reduce( ( a, b ) => { return new Itee.Vector3().addVectors( a, b )} )
                                             .divideScalar( numberOfChildren )

            const subVector = new Itee.Vector3().subVectors( barycenter, groupPosition )

            group.traverse( child => {

                if ( child.uuid === group.uuid ) {
                    return
                }

                child.position.x -= subVector.x
                child.position.y -= subVector.y
                child.position.z -= subVector.z
                child.updateMatrix()

            } )

        },

        setGroupPositionToChildrenMeshBarycenter () {
            'use strict'

            const group            = this.loadedGroup
            const groupPosition    = group.position
            const children         = group.children
            const numberOfChildren = children.length || 1
            const barycenter       = children.map( child => {return child.position} )
                                             .reduce( ( a, b ) => { return new Itee.Vector3().addVectors( a, b )} )
                                             .divideScalar( numberOfChildren )

            const subVector = new Itee.Vector3().subVectors( barycenter, groupPosition )

            group.traverse( child => {

                if ( child.uuid === group.uuid ) {
                    return
                }

                child.position.x -= subVector.x
                child.position.y -= subVector.y
                child.position.z -= subVector.z
                child.updateMatrix()

            } )

            group.position.set( barycenter.x, barycenter.y, barycenter.z )
            group.updateMatrix()

        },

        setGroupPositionToChildrenGeometryBarycenter () {
            'use strict'

            const groupToUpdate    = this.loadedGroup
            const children         = groupToUpdate.children
            const numberOfChildren = children.length || 1
            const barycenter       = children.map( child => {

                                                 if ( !child.geometry.boundingBox ) {
                                                     child.geometry.computeBoundingBox()
                                                 }

                                                 return child.geometry.boundingBox.getCenter()

                                             } )
                                             .reduce( ( a, b ) => { return new Itee.Vector3().addVectors( a, b )} )
                                             .divideScalar( numberOfChildren )

            const negatedBarycenter = barycenter.clone().negate()

            groupToUpdate.position.set( barycenter.x, barycenter.y, barycenter.z )
            groupToUpdate.updateMatrix()

            groupToUpdate.traverse( child => {

                if ( child.uuid === groupToUpdate.uuid ) {
                    return
                }

                child.position.set( negatedBarycenter.x, negatedBarycenter.y, negatedBarycenter.z )
                child.updateMatrix()

            } )

        },

        rotateGeometries () {
            'use strict'

            const group = this.loadedGroup
            group.traverse( child => {

                if ( !child.isMesh ) {
                    return
                }

                child.geometry.rotateX( Itee.degreesToRadians( 90 ) )

            } )

        },

        recenterGeometriesChildren () {
            'use strict'

            // Recenter buffergeometry in world center
            const group = this.loadedGroup
            group.traverse( child => {

                if ( !child.isMesh ) {
                    return
                }

                const center         = child.geometry.center()
                const meshBarycenter = center.negate()

                child.position.set( meshBarycenter.x, meshBarycenter.y, meshBarycenter.z )
                child.updateMatrix()

            } )

        },

        //// // VIEWPORT

        toggleViewportStats () {
            'use strict'

            this.viewport.showStats = !this.viewport.showStats

        },

        toggleSelectionMode () {
            'use strict'

            this.viewport.isRaycastable = !this.viewport.isRaycastable

        },

        onSelectionDataChange ( key, value ) {

            let _key     = key
            let _value   = value
            let _element = this.selectedObject

            // Care: the order of assignement is important here !
            while ( _value.key ) {
                _element = _element[ _key ]
                _key     = _value.key
                _value   = _value.value
            }

            _element[ _key ] = _value

        },

        onIntersect ( intersect ) {

            const object = intersect.object
            if ( !object || (object.type === 'Group' || object.type === 'Scene') ) {
                return
            }

            const materials = object.material

            if ( this.intersected.object && (this.intersected.object.uuid !== object.uuid) ) {

                this.intersected.object.material = this.intersected.originalMaterial

            }

            this.intersected.object           = object
            this.intersected.originalMaterial = materials

            if ( Array.isArray( materials ) ) {

                const cloneMaterials = []
                for ( let i = 0, n = materials.length ; i < n ; i++ ) {
                    let cloneMaterial = materials[ i ].clone()
                    cloneMaterial.color.set( 0x00c8ff )
                    cloneMaterials.push( cloneMaterial )
                }
                this.intersected.object.material = cloneMaterials

            } else {

                const cloneMaterial = materials.clone()
                cloneMaterial.color.set( 0x00c8ff )
                this.intersected.object.material = cloneMaterial

            }

            const intersectPoint = intersect.point
            if ( intersectPoint ) {
                //Todo: scale sphere in squared idstance to intersect origin and camera position
                let sphere     = this.viewport.scene.getObjectByName( 'SpherePointer' )
                sphere.visible = true
                sphere.position.set( intersectPoint.x, intersectPoint.y, intersectPoint.z )
            }

        },

        onNoIntersect () {

            if ( this.intersected.object ) {

                if ( this.intersected.object.material ) {

                    const materials = this.intersected.object.material
                    if ( Array.isArray( materials ) ) {
                        for ( let i = 0, n = materials.length ; i < n ; i++ ) {
                            materials[ i ].dispose()
                        }
                    } else {
                        materials.dispose()
                    }

                    this.intersected.object.material = this.intersected.originalMaterial

                }

                this.intersected.object           = undefined
                this.intersected.originalMaterial = undefined

            }

            let sphere     = this.viewport.scene.getObjectByName( 'SpherePointer' )
            sphere.visible = false

        },

        onSelect ( object ) {

            if ( object && (object.type === 'Group' || object.type === 'Scene') ) {
                return
            }

            if ( !this.intersected.object ) { this.onIntersect( { object } ) }

            // In case we already have a selected object and it is different from intersected
            // Reset the current selection before new selection assignement
            if ( this.selected.object && (this.selected.object.uuid !== this.intersected.object.uuid) ) {

                this.selected.object.material      = this.selected.originalMaterial
                this.selected.object.isRaycastable = true

            }

            // Update selection with intersected object
            this.selected.object               = this.intersected.object
            this.selected.originalMaterial     = this.intersected.originalMaterial
            this.selected.object.isRaycastable = false

            // Clear current intersected object
            this.intersected.object           = undefined
            this.intersected.originalMaterial = undefined

        },

        onDeselect () {

            if ( this.selected.object ) {

                if ( this.selected.object.material ) {

                    const materials = this.selected.object.material
                    if ( Array.isArray( materials ) ) {
                        for ( let i = 0, n = materials.length ; i < n ; i++ ) {
                            materials[ i ].dispose()
                        }
                    } else {
                        materials.dispose()
                    }

                    this.selected.object.material = this.selected.originalMaterial

                }
                this.selected.object.isRaycastable = true

                this.selected.object           = undefined
                this.selected.originalMaterial = undefined

            }

        },

    },
    created () {
        'use strict'

        this._createEnvironement()

    },
    mounted () {
        'use strict'

        this.viewport.fitCamera = true

    }
}

const UploadPage = {
    template: `
<TContainerHorizontal vAlign="stretch" hAlign="stretch" expand="true">

    <TContainerVertical vAlign="stretch" hAlign="stretch" expand="true">
    
        <h3 class="align-center" style="flex: 0;">Fichiers à traiter</h3>
        
        <TContainerVertical class="container model-drop-down-inputs" vAlign="center" hAlign="stretch" expand="true">
                
            <h5 class="align-center">Selectionner le model à populer</h5>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                <label class="input-group-text" for="select-company">Compagnies</label>
                </div>
                <select id="select-company" class="form-control" v-model="selectedCompany" v-on:change="onCompanyChange">
                <option disabled selected value="">Choisissez</option>
                <option v-for="company in companies" v-bind:value="company._id">{{company.name}} ({{company._id}})</option>
            </select>
            </div>
            
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                <label class="input-group-text" for="select-site">Sites</label>
                </div>
                <select id="select-site" class="form-control" v-model="selectedSite" v-on:change="onSiteChange">
                <option disabled selected value="">Choisissez</option>
                <option v-for="site in sites" v-bind:value="site._id">{{site.name}} ({{site._id}})</option>
            </select>
            </div>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                <label class="input-group-text" for="select-building">Bâtiments</label>
                </div>
                <select id="select-building" class="form-control" v-model="selectedBuilding">
                <option disabled selected value="">Choisissez</option>
                <option v-for="building in buildings" v-bind:value="building._id">{{building.name}} ({{building._id}})</option>
            </select>
            </div>

        </TContainerVertical>
        
        <TContainerHorizontal vAlign="stretch" hAlign="start" expand="true">
        
            <TContainerVertical class="container" vAlign="start" hAlign="stretch" expand="true">

                <h5 class="align-center">Selectionner les fichiers depuis votre ordinateur</h5>
                <TInputFile :onChange=displayPreview />

            </TContainerVertical>
     
            <div class="d-flex flex-column align-items-center justify-content-center stretchChildren">
                <TDivider orientation="vertical" style="margin-bottom: 0px;" />
                <div style="flex: 0; border: 1px solid white; border-radius: 50%; padding: 5px;">OU</div>
                <TDivider orientation="vertical" style="margin-top: 0px;" />
            </div>
     
            <TContainerVertical class="container" vAlign="start" hAlign="stretch" expand="true">

                <h5 class="align-center">Glissez-déposez les fichiers ci-dessous</h5>
                <TContainerVertical vAlign="stretch" hAlign="stretch" expand="true" >
                    <div class="drop-area" v-on:dragover.prevent v-on:dragleave.prevent v-on:drop.stop.prevent="onDrop" ></div>
                </TContainerVertical>

            </TContainerVertical>
        
        </TContainerHorizontal>
    </TContainerVertical>
    
    <div class="container d-flex flex-column align-items-center justify-content-center stretchChildren" style="flex: 0;">
        <TDivider orientation="vertical"/>
    </div>
            
    <TContainerVertical vAlign="stretch" hAlign="stretch" expand="true" overflowY="scroll">
        <div class="container">
            <h3 class="align-center">Fichiers traités</h3>
            <ul id="files-list" class="list-group">
            </ul>
        </div>
    </TContainerVertical>
    
    <div id="modal-file-data" v-on:click="toggleModalVisibility('modal-file-data')" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 80%;">
            <div v-on:click.stop class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">{{modalData.title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click.stop="toggleModalVisibility('modal-file-data')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                               
                    <TProgress v-if="progressBar.isVisible" :isVisible="progressBar.isVisible" v-bind:done=progressBar.done v-bind:todo=progressBar.todo style="width:100%; margin: 0 15px;"></TProgress>
                    <TContainerHorizontal v-else vAlign="stretch" hAlign="stretch" expand="true" height="600px">
                        <TViewport3D v-bind="viewport" />
                    </TContainerHorizontal>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click.stop="toggleModalVisibility('modal-file-data')">Fermer</button>
                    <button type="button" class="btn btn-primary" v-on:click.stop="startUpload( filesList )">Valider</button>
                </div>
            </div>
        </div>
    </div>

    
</TContainerHorizontal>
    `,
    data:     function () {

        return {
            objectsManager:   new Itee.TDataBaseManager(),
            companiesManager: new Itee.TDataBaseManager(),
            companies:        [],
            selectedCompany:  '',
            sites:            [],
            selectedSite:     '',
            buildings:        [],
            selectedBuilding: '',
            parentId:         '',
            filesList:        [],
            filesNames:       [],
            loadedGroup:      undefined,
            modalData:        {
                title:  'Prévisualisation',
                inputs: {
                    name:      '',
                    translate: [ 0, 0, 0 ],
                    //                    rotateX:     0,
                    //                    rotateY:     0,
                    //                    rotateZ:     0,
                    //                    rotateOrder: 'XYZ'
                }
            },
            viewport:         {
                scene:           new Itee.Scene(),
                control:         "orbit",
                effect:          "none",
                renderer:        "webgl",
                camera:          {
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
                showStat:        false,
                backgroundColor: 0xb2b2b2,
                needResize:      false,
                fitCamera:       false
            },
            progressBar:      {
                done:      0,
                todo:      1,
                isVisible: false
            }
        }

    },
    methods:  {

        ///// GLOBAL

        onProgress ( progressEvent ) {
            'use strict'

            if ( progressEvent.lengthComputable ) {

                this.progressBar.done = progressEvent.loaded
                this.progressBar.todo = progressEvent.total

                if ( !this.progressBar.show ) {
                    this.progressBar.show = true
                }

                this.progressBar.done = progressEvent.loaded
                this.progressBar.todo = progressEvent.total

                if ( this.progressBar.done === this.progressBar.todo ) {

                    if ( this.progressBar.timeoutId ) {
                        clearTimeout( this.progressBar.timeoutId )
                    }

                    this.progressBar.timeoutId = setTimeout( () => {
                        this.progressBar.show = false
                    }, 1000 )

                }

            }

        },

        onError ( error ) {
            'use strict'

            console.error( error )

        },

        ////// fetch data

        readCompanies ( companiesIds ) {
            'use strict'

            const self = this

            self.companiesManager.read( companiesIds, companies => {

                self.companies       = companies
                self.selectedCompany = ''
                self.resetSites()
                self.resetBuildings()

            } )

        },

        readSites ( sitesIds ) {
            'use strict'

            const self = this

            self.objectsManager.read( sitesIds, sites => {

                self.sites        = sites
                self.selectedSite = ''
                self.resetBuildings()

            } )

        },

        readBuildings ( buildingsIds ) {
            'use strict'

            const self = this

            self.objectsManager.read( buildingsIds, buildings => {

                self.buildings        = buildings
                self.selectedBuilding = ''

            } )

        },

        onCompanyChange ( changeEvent ) {
            'use strict'

            const selectedId     = changeEvent.target.value
            const currentCompany = this.companies.find( company => { return company._id === selectedId } )

            if ( currentCompany.sites ) {
                this.readSites( currentCompany.sites )
            } else {
                this.resetSites()
            }

        },

        onSiteChange ( changeEvent ) {
            'use strict'

            const selectedId  = changeEvent.target.value
            const currentSite = this.sites.find( site => { return site._id === selectedId } )

            if ( currentSite.children ) {
                this.readBuildings( currentSite.children )
            } else {
                this.resetBuildings()
            }

        },

        resetCompanies () {
            'use strict'

            this.companies       = []
            this.selectedCompany = ''

        },

        resetSites () {
            'use strict'

            this.sites        = []
            this.selectedSite = ''

        },

        resetBuildings () {
            'use strict'

            this.buildings        = []
            this.selectedBuilding = ''

        },

        /////////

        displayPreview ( files ) {
            'use strict'

            this.filesList = files

            // Update input label
            let filesNames = []
            for ( let i = 0, n = this.filesList.length ; i < n ; i++ ) {
                let file = this.filesList[ i ]
                filesNames.push( file.name )
            }
            this.filesNames = filesNames

            // Need to Force viewport resize :-s
            this.toggleModalVisibility( 'modal-file-data' )
            this.toggleProgressBarVisibility()

            // clearScene()
            this.viewport.scene.children = []
            const envGroup               = new Itee.Group()
            envGroup.add( new Itee.GridHelper( 200, 20 ) )

            // Ambiant light
            envGroup.add( new Itee.AmbientLight( 0x777777 ) )
            this.viewport.scene.add( envGroup )

            this.importFilesToViewportScene( this.filesList )

        },

        importFilesToViewportScene ( fileList ) {
            'use strict'
            console.log( 'importFilesToViewportScene' )

            if ( !fileList ) { return }

            const self            = this
            const universalLoader = new Itee.TUniversalLoader()

            // reset data for camera centering
            for ( let fileIndex = 0, numberOfFiles = fileList.length ; fileIndex < numberOfFiles ; fileIndex++ ) {
                let file = fileList[ fileIndex ]

                universalLoader.load(
                    file,
                    ( data ) => {

                        self.loadedGroup = data
                        self.toggleProgressBarVisibility()

                        data.traverse( object => {

                            if ( object.isMesh || object.isLineSegments ) {
                                object.isRaycastable = true
                                object.geometry.computeFaceNormals()
                                object.geometry.computeVertexNormals()
                            }

                        } )

                        self.viewport.scene.add( data )
                        self.viewport.fitCamera = true

                    },
                    self.onProgress,
                    self.onError
                )

            }

        },

        updateProgressBar ( progressEvent ) {
            'use strict'

            if ( progressEvent.lengthComputable ) {

                this.progressBar.done = progressEvent.loaded
                this.progressBar.todo = progressEvent.total

            }

        },

        toggleProgressBarVisibility () {
            'use strict'

            this.progressBar.isVisible = !this.progressBar.isVisible

        },

        toggleModalVisibility ( modalId ) {
            'use strict'

            console.log( 'toggleModalVisibility' )

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

        /////////

        upload ( data, methods, route, view ) {

            const request              = new XMLHttpRequest()
            request.onreadystatechange = onReadyStateChange
            request.upload.addEventListener( 'progress', onUploadProgress, false )
            request.onload     = onLoad
            request.onprogress = onServerProgress
            request.onerror    = onError

            request.open( methods, route )
            request.send( data )

            function onReadyStateChange () {

                if ( request.readyState === 4 ) {

                    var response = getRequestResponse( request )

                    if ( request.status === 200 ) {

                        view.setSuccess( response )

                    } else {

                        view.setError( response )

                    }

                }

            }

            function onUploadProgress ( progressEvent ) {

                if ( progressEvent.lengthComputable ) {
                    const progressValue = Math.ceil( (progressEvent.loaded / progressEvent.total ) * 100 ) + '%';
                    view.setProgress( progressValue )
                } else {
                    // Impossible de calculer la progression puisque la taille totale est inconnue
                }

            }

            function onServerProgress ( progressEvent ) {

                if ( progressEvent.lengthComputable ) {
                    const progressValue = Math.ceil( (progressEvent.loaded / progressEvent.total ) * 100 ) + '%';
                    view.setProgress( progressValue )
                } else {
                    // Impossible de calculer la progression puisque la taille totale est inconnue
                }

            }

            function onLoad ( loadEvent ) {

                console.log( loadEvent );

            }

            function onError ( errorEvent ) {

                view.setError( "Une erreur " + errorEvent.target.status + " s'est produite au cours de la réception du document." )

            }

            function getRequestResponse ( request ) {

                var responses = ( request.response ) ? JSON.parse( request.response ) : {}
                var response  = undefined
                var message   = ""

                for ( var field in responses ) {

                    if ( responses.hasOwnProperty( field ) ) {

                        response = responses[ field ]

                        message += response.title + ': ' + response.message + '\n'

                    }

                }

                return message

            }

        },

        startUpload ( files ) {

            this.toggleModalVisibility( 'modal-file-data' )

            if ( files.length === 0 ) {
                return;
            }

            files = this.convertFilesObjectToArray( files )

            let view = undefined
            let file = undefined
            for ( var fileIndex = files.length - 1 ; fileIndex >= 0 ; fileIndex-- ) {

                file = files.splice( fileIndex )[ 0 ]

                if ( !file ) { continue }

                view = this.createViewForFileUpload()

                // if file is associative search for the other else if not found set view in pending mode
                var fileName      = file.name
                var fileExtension = this.getFileExtention( fileName )

                if ( fileExtension === null ) {

                    view.setLabel( fileName )
                    view.setError( 'Mauvaise extension de fichier: Les fichier sans extension ne sont pas géré !' )

                } else if ( fileExtension === 'shp' || fileExtension === 'dbf' ) {

                    var associateExtension = ( fileExtension === 'shp' ) ? 'dbf' : 'shp'
                    view.setLabel( fileName + '/' + associateExtension )

                    var associateFileName = fileName.split( '.' )[ 0 ] + '.' + associateExtension
                    var associatedFile    = this.searchFileWithName( associateFileName, files )

                    if ( !associatedFile ) {

                        console.warn( `Impossible de trouver le fichier ${associateFileName} à associer...` );
                        this.upload( this.convertFileToFormData( file ), 'POST', '../uploads', view )

                    } else {

                        this.upload( this.convertFilesToFormData( [ file, associatedFile ] ), 'POST', '../uploads', view )

                    }

                } else if ( fileExtension === 'obj' || fileExtension === 'mtl' ) {

                    var associateExtension = ( fileExtension === 'obj' ) ? 'mtl' : 'obj'
                    view.setLabel( fileName + '/' + associateExtension )

                    var associateFileName = fileName.split( '.' )[ 0 ] + '.' + associateExtension
                    var associatedFile    = this.searchFileWithName( associateFileName, files )

                    if ( !associatedFile ) {

                        //						view.setWarning( 'Impossible de trouver le fichier ' + associateFileName + ' à associer...' )
                        //						continue

                        console.warn( `Impossible de trouver le fichier ${associateFileName} à associer...` );

                        this.upload( this.convertFileToFormData( file ), 'POST', '../uploads', view )

                    } else {

                        this.upload( this.convertFilesToFormData( [ file, associatedFile ] ), 'POST', '../uploads', view )

                    }

                } else {

                    // Single file
                    view.setLabel( fileName )
                    this.upload( this.convertFileToFormData( file ), 'POST', '../uploads', view )

                }

            }

        },

        convertFilesObjectToArray ( files ) {

            var fileArray = []

            for ( var field in files ) {

                if ( files.hasOwnProperty( field ) ) {

                    fileArray.push( files[ field ] )

                }

            }

            return fileArray

        },

        convertFilesToFormData ( files ) {

            let data = new FormData()
            data.append( 'parentId', this.$data.selectedBuilding )

            let file = undefined
            for ( let fileIndex = 0, numberOfFiles = files.length ; fileIndex < numberOfFiles ; fileIndex++ ) {
                file = files[ fileIndex ]
                data.append( file.name, file )
            }

            return data
        },

        convertFileToFormData ( file ) {

            let parentId = undefined
            if ( this.selectedBuilding.length > 0 ) {
                parentId = this.selectedBuilding
            } else if ( this.selectedSite.length > 0 ) {
                parentId = this.selectedSite
            } else if ( this.selectedCompany.length > 0 ) {
                parentId = this.selectedCompany
            } else {
                console.error( 'Invalide id parent !!!' )
                return
            }

            let data = new FormData()
            data.append( 'parentId', parentId )
            data.append( file.name, file )

            return data
        },

        getFileExtention ( fileName ) {

            const splitName      = fileName.split( '.' )
            const numberOfSplits = splitName.length

            return ( numberOfSplits >= 2 ) ? splitName[ numberOfSplits - 1 ] : null

        },

        searchFileWithName ( fileName, files ) {

            let file = undefined

            const indexOfFile = files.findIndex( function ( file ) {

                return file.name === fileName

            } )

            if ( indexOfFile > -1 ) {
                file = files.splice( indexOfFile, 1 )[ 0 ]
            }

            return file

        },

        createViewForFileUpload () {

            const fileList = document.getElementById( 'files-list' )

            const listItem     = document.createElement( 'li' )
            listItem.className = 'list-group-item'
            fileList.appendChild( listItem )

            const label     = document.createElement( 'span' )
            label.className = 'label'
            listItem.appendChild( label )

            const message         = document.createElement( 'span' )
            message.className     = 'message'
            message.style.display = "none"
            listItem.appendChild( message )

            const progress     = document.createElement( 'div' )
            progress.className = 'progress'
            listItem.appendChild( progress )

            const progressBar     = document.createElement( 'div' )
            progressBar.className = 'progress-bar bg-success'
            progressBar.setAttribute( 'role', 'progressbar' )
            progressBar.setAttribute( 'aria-valuemin', 0 )
            progressBar.setAttribute( 'aria-valuemax', 100 )
            progressBar.style.width = "0%"
            progressBar.innerText   = "0%"

            progress.appendChild( progressBar )

            const badge         = document.createElement( 'span' )
            badge.className     = 'badge'
            badge.style.display = "none"
            listItem.appendChild( badge )

            return {
                listItem:    listItem,
                label:       label,
                message:     message,
                progress:    progress,
                progressBar: progressBar,
                badge:       badge,
                setLabel ( labelValue ) {

                    this.label.innerText = labelValue

                },
                setProgress ( progressValue ) {

                    this.progressBar.style.width = progressValue
                    this.progressBar.innerText   = progressValue

                },
                setSuccess ( message ) {

                    this.listItem.className += " d-flex justify-content-between list-group-item-success"
                    this.progress.style.display = "none"
                    this.message.innerText      = message
                    this.message.style.display  = "block"
                    this.badge.innerText        = "Succès"
                    this.badge.className += " alert-success"
                    this.badge.style.display    = "block"

                },
                setWarning ( message ) {

                    this.listItem.className += " d-flex justify-content-between list-group-item-warning"
                    this.progress.style.display = "none"
                    this.message.innerText      = message
                    this.message.style.display  = "block"
                    this.badge.innerText        = "Attention"
                    this.badge.className += " alert-warning"
                    this.badge.style.display    = "block"

                },
                setError ( message ) {

                    this.listItem.className += " d-flex justify-content-between list-group-item-danger"
                    this.progress.style.display = "none"
                    this.message.innerText      = message
                    this.message.style.display  = "block"
                    this.badge.innerText        = "Erreur"
                    this.badge.className += " alert-danger"
                    this.badge.style.display    = "block"

                }
            }
        },

        //// Handlers

        onDrop ( dropEvent ) {
            'use strict'

            this.displayPreview( dropEvent.dataTransfer.files )

        }

    },
    created () {

        // récupérer les données lorsque la vue est créée et
        // que les données sont déjà observées
        this.objectsManager.basePath   = '/objects'
        this.companiesManager.basePath = '/companies'
        this.readCompanies( {} ) // all

        // Create default stuff for 3d preview
        const envGroup = new Itee.Group()
        envGroup.add( new Itee.GridHelper( 200, 20 ) )

        // Ambiant light
        envGroup.add( new Itee.AmbientLight( 0x777777 ) )

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
        envGroup.add( directionalLight )

        this.viewport.scene.add( envGroup )

    }

}

const DatabasePage = {
    template: `
        <TContainerVertical class="database-page" vAlign="start" hAlign="center" expand="true" overflowY="auto" style="padding-top: 15px; padding-bottom: 15px;">
        
            <div id="accordion" class="container">
                <div class="list-group">
                    <div v-for="(values, key) in collections" class="list-group-item" v-on:click="onToggleContent">
                        <label>{{key}}</label>
                        <span class="badge badge-primary badge-pill">{{values.length}}</span>
                        <span v-on:click.stop style="float: right;">
                            <button class="btn btn-sm btn-outline-success" v-on:click="toggleModalVisibility('modal-' + key)">Ajouter une nouvelle entrée</button>
                            <button class="btn btn-sm btn-outline-primary" v-on:click="onUpdateAll(key)">Mettre tout à jour</button>
                            <button class="btn btn-sm btn-outline-danger" v-on:click="onDeleteAll(key)">Supprimer tout</button>
                        </span>
                        <div v-on:click.stop class="collapse" style="border-right: 1px solid white; border-left: 1px solid white;">
                            <div class="container" style="padding-top: 15px; padding-bottom: 15px;">
                                <select class="form-control mb-3" v-model="selectedId[key]" v-on:change="onSelectChange(key)" >
                                    <option disabled selected value="">Choisissez</option>
                                    <option v-for="value in values" v-bind:value="value._id" >{{value.name}} ({{value._id}})</option>
                                </select>
                                <div v-if="selectedElement[key]">
                                    <div v-for="(subValue, subKey) in selectedElement[key]" class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text">{{subKey}}</label>
                                        </div>
                                        <input v-if="(subKey === '_id') || (subKey === '__v')" type="text" class="form-control" :value="subValue" readonly>
                                        <input v-else-if="(typeof subValue === 'string')" type="text" class="form-control" v-model="selectedElement[key][subKey]">
                                        <input v-else-if="(typeof subValue === 'number')" type="number" class="form-control" v-model="selectedElement[key][subKey]">
                                        <div v-else-if="(typeof subValue === 'boolean')" class="form-control">
                                            <input v-model="selectedElement[key][subKey]" type="checkbox" :value="subValue">
                                        </div>
                                        <div v-else-if="Array.isArray(subValue)" class="list-group" style="flex: 1 1 auto;">
                                            <div v-if="subValue.length > 0" v-for="(subSubValue, index) in subValue" class="list-group-item" >
                                                <div class="input-group">
                                                    <input type="text" class="form-control" v-model="selectedElement[key][subKey][index]">
                                                    <div class="input-group-append">
                                                        <button class="btn btn-danger" v-on:click="onDeleteArrayItem(key, subKey, index)">X</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="list-group-item">
                                                <button class="btn btn-success btn-block" v-on:click="onAddArrayItem( key, subKey )">Ajouter</button>
                                            </div>
                                        </div>
                                        <input v-else type="text" class="form-control" value="undefined" readonly>
                                    </div>
                                    <button class="btn btn-primary" v-on:click.stop.prevent="onUpdateOne(key)">Mettre à jour</button>
                                    <button class="btn btn-danger" v-on:click.stop.prevent="onDeleteOne(key)">Supprimer</button>
                                </div>
                            </div>
                        </div>
                    </div>             
                </div>      
            </div>
           
<!-- Modals -->
<div v-for="(modalData, key) in schemas" v-on:click="toggleModalVisibility('modal-' + key)" :id="'modal-' + key" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="overflow:scroll;">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div v-on:click.stop class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">{{modalData.title}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click.stop="toggleModalVisibility('modal-' + key)">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
        
                <div v-for="(inputValue, inputKey) in modalData.inputs" class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text">{{inputKey}}</label>
                    </div>
                    <input v-if="(typeof inputValue === 'string')" type="text" class="form-control" v-model="schemas[key].inputs[inputKey]">
                    <input v-else-if="(typeof inputValue === 'number')" type="number" class="form-control" v-model="schemas[key].inputs[inputKey]">
                    <div v-else-if="(typeof inputValue === 'boolean')" class="form-control">
                        <input v-model="schemas[key].inputs[inputKey]" type="checkbox" :value="inputValue">
                    </div>
                    <div v-else-if="Array.isArray(inputValue)" class="list-group" style="flex: 1 1 auto;">
                        <div v-if="inputValue.length > 0" v-for="(arrayInputValue, index) in inputValue" class="list-group-item" >
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="schemas[key].inputs[inputKey][index]">
                                <div class="input-group-append">
                                    <button class="btn btn-danger" v-on:click="onDeleteModalArrayItem( key, inputKey, index )">X</button>
                                </div>
                            </div>
                        </div>
                        <div class="list-group-item">
                            <button class="btn btn-success btn-block" v-on:click="onAddModalArrayItem( key, inputKey )">Ajouter</button>
                        </div>
                    </div>
                    <div v-else-if="(typeof inputValue === 'object')" v-for="(subValue, subKey) in inputValue" class="form-control">
                        <span>{{subKey}}:{{subValue}}</span>
                    </div>
                    <input v-else type="text" class="form-control" value="undefined" readonly>
                </div>
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click.stop="toggleModalVisibility('modal-' + key)">Fermer</button>
                <button type="button" class="btn btn-primary" v-on:click.stop="onCreate(key)">Valider</button>
            </div>
        </div>
    </div>
</div>
            
        </TContainerVertical>
    `,
    data:     function () {

        return {

            dbManager:       new Itee.TDataBaseManager(),
            collections:     {
                users:      [],
                companies:  [],
                objects:    [],
                curves:     [],
                geometries: [],
                materials:  [],
                textures:   []
            },
            schemas:         {
                users:      {
                    title:  'Créer un nouvelle utilisateur',
                    inputs: {
                        email:    '',
                        password: '',
                    }
                },
                companies:  {
                    title:  'Créer une nouvelle compagnie',
                    inputs: {
                        name:  '',
                        sites: []
                    }
                },
                objects:    {
                    title:  'Créer un nouvel objet 3d',
                    inputs: {
                        name:     '',
                        type:     '',
                        parent:   '',
                        children: [],
                        position: {
                            x: 0,
                            y: 0,
                            z: 0
                        },
                        rotation: {
                            x:     0,
                            y:     0,
                            z:     0,
                            order: ''
                        },
                        scale:    {
                            x: 0,
                            y: 0,
                            z: 0
                        },
                        layers:   0,
                        visible:  true
                    }
                },
                curves:     {
                    title:  'Créer une nouvelle courbe',
                    inputs: {
                        name: ''
                    }
                },
                geometries: {
                    title:  'Créer un nouvel utilisateur',
                    inputs: {
                        name: ''
                    }
                },
                materials:  {
                    title:  'Créer un nouveau materiel',
                    inputs: {
                        name: ''
                    }
                },
                textures:   {
                    title:  'Créer une nouvelle texture',
                    inputs: {
                        name: ''
                    }
                }
            },
            selectedId:      {
                users:      '',
                companies:  '',
                objects:    '',
                curves:     '',
                geometries: '',
                materials:  '',
                textures:   ''
            },
            selectedElement: {
                users:      undefined,
                companies:  undefined,
                objects:    undefined,
                curves:     undefined,
                geometries: undefined,
                materials:  undefined,
                textures:   undefined
            }

        }

    },
    methods:  {

        ////////////////////////////////////////////////////////////////////

        create ( key, data, callback ) {
            'use strict'

            const self = this

            self.dbManager.basePath = `/${key}`
            self.dbManager.create(
                data,
                savedData => {

                    self.collections[ key ].push( savedData[ 0 ] )
                    if ( callback ) {
                        callback()
                    }

                },
                null,
                error => console.error( `error: ${error}` )
            )

        },

        ////////////////////////////////////////////////////////////////////

        read ( key, query, callback ) {
            'use strict'

            const self          = this
            const multiParts    = (query && query.length > self.dbManager.bunchSize)
            const numberOfParts = (query) ? Math.ceil( query.length / self.dbManager.bunchSize ) : 1
            let numberOfReturns = 0

            // reset data before read
            self.collections[ key ] = []

            self.dbManager.basePath = `/${key}`
            self.dbManager.read( query || {}, datas => {

                if ( multiParts ) {

                    for ( let i = 0, n = datas.length ; i < n ; i++ ) {
                        self.collections[ key ].push( datas[ i ] )
                    }

                    if ( callback ) {
                        checkEndOfReturn()
                    }

                } else {

                    self.collections[ key ] = datas

                    if ( callback ) {
                        callback()
                    }

                }

            } )

            function checkEndOfReturn () {

                numberOfReturns++
                if ( numberOfReturns < numberOfParts ) {
                    return
                }

                callback()

            }

        },

        ////////////////////////////////////////////////////////////////////

        update ( key, id, data, callback ) {
            'use strict'

            // Update DB
            const self              = this
            self.dbManager.basePath = `/${key}`
            self.dbManager.update(
                id,
                data,
                updated => {

                    console.log( `success: ${updated}` )
                    if ( callback ) {
                        callback()
                    }

                },
                null,
                error => console.error( `error: ${error}` )
            )

        },

        ////////////////////////////////////////////////////////////////////

        delete ( key, id, callback ) {
            'use strict'

            const self = this

            self.dbManager.basePath = `/${key}`
            self.dbManager.delete( id, ( done ) => {

                console.log( `Delete: ${done}` )
                if ( callback ) {
                    callback()
                }

            } )

        },

        //// Handlers

        onToggleContent ( clickEvent ) {
            'use strict'

            console.log( 'onToggleContent' )

            const elementToToggle     = clickEvent.target.children[ 3 ]
            elementToToggle.className = (elementToToggle.className === 'collapse') ? 'collapse show' : 'collapse'

        },

        toggleModalVisibility ( modalId ) {
            'use strict'

            console.log( 'toggleModalVisibility' )

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

        onSelectChange ( key ) {
            'use strict'

            const selectedId            = this.selectedId[ key ]
            const selectedElement       = this.collections[ key ].find( element => { return element._id === selectedId } )
            this.selectedElement[ key ] = selectedElement

            if ( key === 'scenes' ) {

                this.read( 'objects', selectedElement.children, () => {

                    const geometriesIds = this.collections[ 'objects' ].map( object => object.geometry ).filter( ( value, index, self ) => {
                        return self.indexOf( value ) === index
                    } )

                    this.read( 'geometries', geometriesIds, () => {

                        console.log( 'Geometries fetched !' )

                    } )

                    const materialsArray       = this.collections[ 'objects' ].map( object => object.material )
                    const concatMaterialsArray = [].concat.apply( [], materialsArray )
                    const materialsIds         = concatMaterialsArray.filter( ( value, index, self ) => {
                        return self.indexOf( value ) === index
                    } )

                    this.read( 'materials', materialsIds, () => {

                        console.log( 'Materials fetched !' )

                    } )

                } )

            }

        },

        onCreate ( key ) {
            'use strict'

            console.log( 'onCreate' )

            this.create( key, this.schemas[ key ].inputs, this.read.bind( this, key ) )
            this.toggleModalVisibility( `modal-${key}` )

        },

        onUpdateOne ( key ) {
            'use strict'

            console.log( 'onUpdateOne' )

            const selectionToUpdate = this.selectedElement[ key ]
            this.update( key, selectionToUpdate._id, selectionToUpdate )

        },

        onUpdateAll ( key ) {
            'use strict'

            console.log( 'onUpdateAll' )

        },

        onDeleteOne ( key ) {
            'use strict'

            console.log( 'onDeleteOne' )

            const selectionToDelete = this.selectedElement[ key ]

            this.selectedId[ key ]      = ''
            this.selectedElement[ key ] = undefined

            this.delete( key, selectionToDelete._id, this.read.bind( this, key ) )

        },

        onDeleteAll ( key ) {
            'use strict'

            console.log( 'onDeleteAll' )

            const elementsIdsToDelete = this.collections[ key ].map( element => {return element._id} )

            this.selectedId[ key ]      = ''
            this.selectedElement[ key ] = undefined

            this.delete( key, {}, this.read.bind( this, key ) )
            //            this.delete( key, elementsIdsToDelete, this.read.bind( this, key ) )

        },

        onDeleteArrayItem ( key, subKey, index ) {
            'use strict'

            this.selectedElement[ key ][ subKey ].splice( index, 1 )

        },

        onAddArrayItem ( key, subKey ) {
            'use strict'

            this.selectedElement[ key ][ subKey ].push( '' )

        },

        onDeleteModalArrayItem ( key, inputKey, index ) {
            'use strict'

            this.schemas[ key ].inputs[ inputKey ].splice( index, 1 )

        },

        onAddModalArrayItem ( key, inputKey ) {
            'use strict'

            this.schemas[ key ].inputs[ inputKey ].push( '' )

        }

    },
    created () {

        this.read( 'users' )
        this.read( 'companies' )
        this.read( 'objects' )
        this.read( 'curves' )
        this.read( 'geometries' )
        this.read( 'materials' )
        this.read( 'textures' )

    }
}

const NotFound = {
    template: `
        <div>
            Uuuuhhhh, you got a 404 !
        </div>
    `
}

var TConfigParameters = {
    launchingSite: '#itee-application-root',
    routes:        [
        {
            path:      '/',
            component: AppPage,
            children:  [
                {
                    path:      '',
                    component: ViewerPage
                },
                {
                    path:      '/editor',
                    component: EditorPage
                },
                {
                    path:      '/upload',
                    component: UploadPage
                },
                {
                    path:      '/database',
                    component: DatabasePage
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
