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
        
            <THeader id="appHeader" style="min-height: 60px;">
                <TAppBar height="60px">
                    <TContainer vAlign="center" hAlign="start">
                        <TLabel class="tBrand" icon="eye" label="Geomap-Imagis" />
                        <!--<TLabel class="tBrand" label="Geomap-Imagis" icon="rocket" />-->
                    </TContainer>
                    <TMenu>
                        <TMenuItem label="Home" :onClickHandler="function() { routeTo('/') }" />
                        <TMenuItem label="Documentation" :onClickHandler="function() { routeTo('/documentation') }" />
                        <TMenuItem label="Database" :onClickHandler="function() { routeTo('/database') }" />
                        <TMenuItem label="Téléversement" :onClickHandler="function() { routeTo('/upload') }" />
                        <TMenuItem label="Visualiseur 3D" :onClickHandler="function() { routeTo('/viewer') }" />
                        <TMenuItem label="Utilisateur" :onClickHandler="function() { routeTo('/users') }" />
                        <TMenuDropDown popAt="bottom" label="A propos">
                            <TMenuItem label="SubMenuA" :onClickHandler=alertFooBar />
                            <TMenuItem label="SubMenuB" :onClickHandler=alertFooBar />
                            <TMenuDropDown popAt="rightUp" label="SubDropDown">
                                <TMenuItem label="SubSubMenuA" :onClickHandler=alertFooBar />
                                <TMenuItem label="SubSubMenuB" :onClickHandler=alertFooBar />
                                <TMenuItem label="SubSubMenuC" :onClickHandler=alertFooBar />
                                <TMenuDropDown popAt="rightUp" label="SubSubDropDown">
                                    <TMenuItem label="FarAwayMenuA" :onClickHandler=alertFooBar />
                                    <TMenuItem label="FarAwayMenuB" :onClickHandler=alertFooBar />
                                    <TMenuItem label="FarAwayMenuC" :onClickHandler=alertFooBar />
                                    <TMenuItem label="FarAwayMenuD" :onClickHandler=alertFooBar />
                                    <TMenuItem label="FarAwayMenuE" :onClickHandler=alertFooBar />
                                </TMenuDropDown>
                            </TMenuDropDown>
                            <TMenuItem label="SubMenuC" :onClickHandler=alertFooBar />
                            <TMenuItem label="SubMenuD" :onClickHandler=alertFooBar />
                            <TMenuItem label="SubMenuE" :onClickHandler=alertFooBar />
                        </TMenuDropDown>
                    </TMenu>
                    <TContainer vAlign="center" hAlign="end">
                        <div>loginbtn</div>
                    </TContainer>
                </TAppBar>
            </THeader>
            
            <TContent id="appContent" >
                <router-view></router-view>
            </TContent>
            
            <TFooter id="appFooter" style="min-height: 30px;">
                <!--<TProgress id="footerProgress" style="display: none;" ></TProgress>-->
                <!--<div id="footerProgress" class="progress" style="display: none; flex: 1; margin-left: 15px; margin-right: 15px;">-->
                    <!--<div class="progress-bar" role="progressbar" style="width: 0%;">0%</div>-->
                <!--</div>-->
            </TFooter>
            
            <TContainerCentered id="splashScreen" expand=true>
                <img src="./resources/images/Geomap-Imagis_V_700px.png">
                <TIcon icon="spinner" spin></TIcon>
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

            document.getElementById( 'appHeader' ).style.display    = 'none'
            document.getElementById( 'appContent' ).style.display   = 'none'
            document.getElementById( 'appFooter' ).style.display    = 'none'
            document.getElementById( 'splashScreen' ).style.display = 'flex'

            setTimeout( function () {

                document.getElementById( 'appHeader' ).style.display    = 'flex'
                document.getElementById( 'appContent' ).style.display   = 'flex'
                document.getElementById( 'appFooter' ).style.display    = 'flex'
                document.getElementById( 'splashScreen' ).style.display = 'none'

            }, 20 )

            self.isInit = true

        }

    }
}

const HomePage = {
    template: `
   <TContainerVertical vAlign="start" hAlign="stretch" expand="true">
     
        HOME - Blabla
        
    </TContainerVertical>
    `
}

const DocPage = {
    template: `
        <div class="documentation">
            Welcome to documentation !
        </div>
    `
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
                            <button class="btn btn-sm btn-outline-success" v-on:click="onToggleModalVisibility('modal-' + key)">Ajouter une nouvelle entrée</button>
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
<div v-for="(modalData, key) in schemas" v-on:click="onToggleModalVisibility('modal-' + key)" :id="'modal-' + key" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div v-on:click.stop class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">{{modalData.title}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click.stop="onToggleModalVisibility('modal-' + key)">
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
                    <input v-else type="text" class="form-control" value="undefined" readonly>
                </div>
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click.stop="onToggleModalVisibility('modal-' + key)">Fermer</button>
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
                sites:      [],
                buildings:  [],
                scenes:     [],
                objects:    [],
                geometries: [],
                materials:  []
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
                sites:      {
                    title:  'Créer un nouveau site',
                    inputs: {
                        uuid:      '',
                        name:      '',
                        company:   '',
                        buildings: []
                    }
                },
                buildings:  {
                    title:  'Créer un nouveau bâtiment',
                    inputs: {
                        gmaoId: '',
                        name:   '',
                        site:   '',
                        scenes: [],
                        meshes: []
                    }
                },
                scenes:     {
                    title:  'Créer une nouvelle scene',
                    inputs: {
                        name: ''
                    }
                },
                objects:    {
                    title:  'Créer un nouvel objet 3d',
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
                }
            },
            selectedId:      {
                users:      '',
                companies:  '',
                sites:      '',
                buildings:  '',
                scenes:     '',
                objects:    '',
                geometries: '',
                materials:  ''
            },
            selectedElement: {
                users:      undefined,
                companies:  undefined,
                sites:      undefined,
                buildings:  undefined,
                scenes:     undefined,
                objects:    undefined,
                geometries: undefined,
                materials:  undefined
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

        updateCompany ( companyId, data, callback ) {
            'use strict'

            // Update local model
            this.selectedCompany.sites = this.sites.map( site => site._id )

            // Update DB
            this.companiesManager.update(
                companyId,
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

        updateSite ( siteId, data, callback ) {
            'use strict'

            // Update local model
            this.selectedSite.buildings = this.buildings.map( building => building._id )

            // Update DB
            this.sitesManager.update(
                siteId,
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

        deleteCompanies ( companies, callback ) {
            'use strict'

            const n = companies.length
            let r   = 0

            for ( let i = 0 ; i < n ; i++ ) {
                this.deleteCompany( companies[ i ], checkEndOfReturn )
            }

            function checkEndOfReturn () {

                r++
                if ( r < n ) {
                    return
                }

                callback()

            }

        },

        deleteCompany ( companyToDelete, callback ) {
            'use strict'

            const self     = this
            const children = companyToDelete.buildings

            // Remove in view
            self.companies = self.companies.filter( company => { return company._id !== companyToDelete._id } )

            // Remove in database
            self.companiesManager.delete( companyToDelete._id, deleted => {

                console.log( `deleted: ${deleted}` )

                // Delete children
                self.deleteSites( children, () => {

                    callback()

                } )

            } )

        },

        deleteSites ( sites, callback ) {
            'use strict'

            const n = sites.length
            let r   = 0

            for ( let i = 0 ; i < n ; i++ ) {
                this.deleteSite( sites[ i ], checkEndOfReturn )
            }

            function checkEndOfReturn () {

                r++
                if ( r < n ) {
                    return
                }

                callback()

            }

        },

        deleteSite ( siteToDelete, callback ) {
            'use strict'

            const self     = this
            const parent   = siteToDelete.company
            const children = siteToDelete.buildings

            // Remove in view
            self.sites = self.sites.filter( site => { return site._id !== siteToDelete._id } )

            // Remove in database
            self.sitesManager.delete( siteToDelete._id, deleted => {

                console.log( `deleted: ${deleted}` )

                // Remove parent entry
                self.updateCompany( parent, { sites: self.sites.map( site => site._id ) }, () => {

                    // Delete children
                    self.deleteBuildings( children, () => {

                        callback()

                    } )

                } )

            } )

        },

        deleteBuildings ( buildings, callback ) {
            'use strict'

            const n = buildings.length
            let r   = 0

            for ( let i = 0 ; i < n ; i++ ) {
                this.deleteBuilding( buildings[ i ], checkEndOfReturn )
            }

            function checkEndOfReturn () {

                r++
                if ( r < n ) {
                    return
                }

                callback()

            }

        },

        deleteBuilding ( buildingToDelete, callback ) {
            'use strict'

            const self   = this
            const parent = buildingToDelete.site

            // Remove in view
            self.buildings = self.buildings.filter( building => { return building._id !== buildingToDelete._id } )

            // Remove in database
            self.buildingsManager.delete( buildingToDelete._id, deleted => {

                console.log( `deleted: ${deleted}` )

                // Remove parent entry
                self.updateSite( parent, { buildings: self.buildings.map( building => building._id ) }, () => {

                    callback()

                } )

            } )

        },

        //// Handlers

        onToggleContent ( clickEvent ) {
            'use strict'

            console.log( 'onToggleContent' )

            const elementToToggle     = clickEvent.target.children[ 3 ]
            elementToToggle.className = (elementToToggle.className === 'collapse') ? 'collapse show' : 'collapse'

        },

        onToggleModalVisibility ( modalId ) {
            'use strict'

            console.log( 'onToggleModalVisibility' )

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
            this.onToggleModalVisibility( `modal-${key}` )

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

            this.delete( key, {} )
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
        this.read( 'sites' )
        this.read( 'buildings' )
        this.read( 'scenes' )

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
                <div class="input-group mb-3">
                    <div class="custom-file">
                        <input id="js-upload-files" class="custom-file-input" type="file" name="files[]" multiple v-on:click="resetFileInputLabel" v-on:change="displayPreview">
                        <label v-if="filesNames.length > 0" for="js-upload-files" class="custom-file-label">{{filesNames.toString()}}</label>
                        <label v-else for="js-upload-files" class="custom-file-label">Sélectionner les fichiers à téléverser</label>
                    </div>
                </div>

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
    
    <div id="modal-file-data" v-on:click="onToggleModalVisibility('modal-file-data')" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div v-on:click.stop class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">{{modalData.title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click.stop="onToggleModalVisibility('modal-file-data')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
            
                    <TContainerHorizontal vAlign="stretch" hAlign="start" expand="true">

                        <TContainerVertical class="container" vAlign="start" hAlign="stretch" expand="true">
                            <div v-for="(inputValue, inputKey) in modalData.inputs" class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <label class="input-group-text">{{inputKey}}</label>
                                </div>
                                <input v-if="(typeof inputValue === 'string')" type="text" class="form-control" v-model="modalData.inputs[inputKey]">
                                <input v-else-if="(typeof inputValue === 'number')" type="number" class="form-control" v-model="modalData.inputs[inputKey]">
                                <div v-else-if="(typeof inputValue === 'boolean')" class="form-control">
                                    <input v-model="modalData.inputs[inputKey]" type="checkbox" :value="inputValue">
                                </div>
                                <div v-else-if="Array.isArray(inputValue)" class="list-group" style="flex: 1 1 auto;">
                                    <div v-if="inputValue.length > 0" v-for="(arrayInputValue, index) in inputValue" class="list-group-item" >
                                        <div class="input-group">
                                            <input type="text" class="form-control" v-model="modalData.inputs[inputKey][index]">
                                            <div class="input-group-append">
                                                <button class="btn btn-danger" v-on:click="onDeleteModalArrayItem( key, inputKey, index )">X</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="list-group-item">
                                        <button class="btn btn-success btn-block" v-on:click="onAddModalArrayItem( key, inputKey )">Ajouter</button>
                                    </div>
                                </div>
                                <input v-else type="text" class="form-control" value="undefined" readonly>
                            </div>
                        </TContainerVertical>
    
                        <div class="d-flex flex-column align-items-center justify-content-center stretchChildren">
                            <TDivider orientation="vertical" style="margin-bottom: 0px;" />
                        </div>
    
                        <TContainerVertical class="container" vAlign="start" hAlign="stretch" expand="true">

                             <TViewport3D
                                id="previewViewportId"
                                style="display:flex; flex: 1;"
                                v-bind="previewViewport"
                             />
                             <TProgress :done="progressBarData.done" :todo="progressBarData.todo" :isVisible="progressBarData.isVisible"/>
                        </TContainerVertical>
                     
                    </TContainerHorizontal>
                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click.stop="onToggleModalVisibility('modal-file-data')">Fermer</button>
                    <button type="button" class="btn btn-primary" v-on:click.stop="startUpload( filesList )">Valider</button>
                </div>
            </div>
        </div>
    </div>

    
</TContainerHorizontal>
    `,
    data:     function () {

        return {
            companiesManager: new Itee.TDataBaseManager(),
            companies:        [],
            selectedCompany:  '',
            sitesManager:     new Itee.TDataBaseManager(),
            sites:            [],
            selectedSite:     '',
            buildingsManager: new Itee.TDataBaseManager(),
            buildings:        [],
            selectedBuilding: '',
            filesList:       [],
            filesNames:       [],
            modalData:        {
                title:  'Prévisualisation',
                inputs: {
                    rotateX:    0,
                    rotateY:    0,
                    rotateZ:    0,
                    translateX: 0,
                    translateY: 0,
                    translateZ: 0
                }
            },
            previewViewport:  {
                scene:           new Itee.Scene(),
                control:         "orbit",
                effect:          "none",
                renderer:        "webgl",
                camera:          {
                    type:     'perspective',
                    position: {
                        x: 7,
                        y: 2,
                        z: 5
                    },
                    target:   {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                },
                showStat:        false,
                backgroundColor: 0xb2b2b2,
                needResize: false
            },
            progressBarData:  {
                done:      0,
                todo:      1,
                isVisible: false
            }
        }

    },
    methods:  {

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

            self.sitesManager.read( sitesIds, sites => {

                self.sites        = sites
                self.selectedSite = ''
                self.resetBuildings()

            } )

        },

        readBuildings ( buildingsIds ) {
            'use strict'

            const self = this

            self.buildingsManager.read( buildingsIds, buildings => {

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

            if ( currentSite.buildings ) {
                this.readBuildings( currentSite.buildings )
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

        resetFileInputLabel ( clickEvent ) {
            'use strict'

            clickEvent.target.value = ''

        },

        displayPreview ( changeEvent ) {
            'use strict'

            this.filesList = changeEvent.target.files

            // Update input label
            let filesNames = []
            for ( let i = 0, n = this.filesList.length ; i < n ; i++ ) {
                let file = this.filesList[ i ]
                filesNames.push( file.name )
            }
            this.filesNames = filesNames

            // Need to Force viewport resize :-s
            this.onToggleModalVisibility( 'modal-file-data' )
            this.toggleProgressBarVisibility()

            // clearScene()
            this.previewViewport.scene.children = []
            const envGroup = new Itee.Group()
            envGroup.add( new Itee.GridHelper( 200, 20 ) )

            // Ambiant light
            envGroup.add( new Itee.AmbientLight( 0x777777 ) )
            this.previewViewport.scene.add(envGroup)

            this.importFilesToViewportScene( this.filesList )

        },

        importFilesToViewportScene ( fileList ) {
            'use strict'
            console.log( 'importFilesToViewportScene' )

            if ( !fileList ) { return }

            const self            = this
            const universalLoader = new Itee.TUniversalLoader()

            universalLoader.load(
                fileList,
                ( data ) => {

                    self.previewViewport.scene.add( data )

                },
                ( progress ) => {

                    console.log( progress )

                },
                ( error ) => {

                    console.error( error )

                },
            )

        },

        uploadFileInputData ( changeEvent ) {
            'use strict'

            this.startUpload( fileList )

        },

        onToggleModalVisibility ( modalId ) {
            'use strict'

            console.log( 'onToggleModalVisibility' )

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

            this.onToggleModalVisibility( 'modal-file-data' )

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

            let data = new FormData()
            data.append( 'parentId', this.selectedBuilding )
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

            this.startUpload( dropEvent.dataTransfer.files )

        }

    },
    created () {

        // récupérer les données lorsque la vue est créée et
        // que les données sont déjà observées
        this.companiesManager.basePath = '/companies'
        this.sitesManager.basePath     = '/sites'
        this.buildingsManager.basePath = '/buildings'
        this.readCompanies( {} ) // all

        // Create default stuff for 3d preview
        const envGroup = new Itee.Group()
        envGroup.add( new Itee.GridHelper( 200, 20 ) )

        // Ambiant light
        envGroup.add( new Itee.AmbientLight( 0x777777 ) )

        /// Hemi light
        //        const hemiLight = new Itee.HemisphereLight( 0xffffff, 0xffffff, 0.8 )
        //        hemiLight.color.setHSL( 0.6, 1, 0.6 )
        //        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 )
        //        hemiLight.position.set( -100, 400, 50 )
        //        envGroup.add( hemiLight )

        //        const hemiLightHelper = new Itee.HemisphereLightHelper( hemiLight, 100 )
        //        envGroup.add( hemiLightHelper )

        /// dir light
        //        const dirLight = new Itee.DirectionalLight( 0xffffff, 1 )
        //        dirLight.color.setHSL( 0.1, 1, 0.95 )
        //        dirLight.position.set( -100, 175, 50 )
        //        dirLight.target.set( -100, 0, -50 )
        //        dirLight.castShadow            = true
        //        dirLight.shadow.mapSize.width  = 2048
        //        dirLight.shadow.mapSize.height = 2048
        //        envGroup.add( dirLight )
        //
        //        const dirLightHeper = new Itee.DirectionalLightHelper( dirLight, 10 )
        //        envGroup.add( dirLightHeper )

        this.previewViewport.scene.add( envGroup )

    }

}

const ViewerPage = {
    template: `
   <TContainerVertical vAlign="start" hAlign="stretch" expand="true">
     
        <TToolBar>
            <TToolItem icon="hand-pointer" tooltip="Sélection" :onClick=toggleSelectionMode />
            <TToolItem icon="wifi" tooltip="Rayon X" :onClick=alertFooBar />
            <TToolItem icon="cut" tooltip="Outil de découpe" :onClick=alertFooBar />
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
                <TToolItem icon="cubes" label="Orthographique" :onClick=setCameraOfType onClickData="orthographic" />
                <TToolItem :icon="['fab', 'linode']" label="Perspective" :onClick=setCameraOfType onClickData="perspective" />
            </TToolDropDown>
            <TToolDropDown popAt="bottomLeft" tooltip="Choisir le type de contrôle de caméra" icon="gamepad">
                <TToolItem icon="globe" label="Orbital" tooltip="Permet de se déplacer en mode orbital autour du model 3D" :onClick=setControlOfType onClickData="orbital" />
                <TToolItem icon="street-view" label="Avatar" tooltip="Permet de se déplacer en mode immersif dans le model 3D" :onClick=setControlOfType onClickData="avatar" />
            </TToolDropDown>
            <TToolDropDown popAt="bottomLeft" tooltip="Choisir un effet de camera" icon="eye">
                <TToolItem icon="globe" label="Normal" tooltip="Vision de base" :onClick=setEffectOfType onClickData="normal" />
                <TToolItem :icon="['fab', 'nintendo-switch']" label="Anaglyphe" tooltip="Anaglyphe" :onClick=setEffectOfType onClickData="anaglyph" />
                <TToolItem :icon="{icon:['fab', 'simplybuilt'], flip: 'vertical'}" label="VR" tooltip="VR" :onClick=setEffectOfType onClickData="vr" />
            </TToolDropDown>

            <TDivider orientation="vertical" />
            
            <TToolItem icon="chart-bar" tooltip="Afficher les statistiques webgl" :onClick=toggleViewportStats />
            <TToolItem icon="cloud" :onClick=alertFooBar />
            <TToolDropDown popAt="bottomLeft" icon="th">
                <TToolItem label="Plan XY" :onClick=addGrid />
                <TToolItem label="Plan XZ" :onClick=alertFooBar />
                <TToolItem label="Plan YZ" :onClick=alertFooBar />
            </TToolDropDown>

        </TToolBar>
                    
        <TSplitter :isVertical=true :initPosition=20>
            <TTree slot="left" :items="viewport.scene.children" :filter=filterTreeItem></TTree>
            <TViewport3D slot="right" 
                :scene=viewport.scene 
                :camera=viewport.camera
                :control=viewport.control
                :effect=viewport.effect
                :renderer=viewport.renderer
                :showStat=viewport.showStat
                :backgroundColor=0x232323
             />
        </TSplitter>
        
        <TProgress v-if="showProgressBar" v-bind:done=progressBar.done v-bind:todo=progressBar.todo></TProgress>
        
    </TContainerVertical>
    `,
    data:     function () {

        return {
            dbManager:         new Itee.TDataBaseManager(),
            objectsManager:    new Itee.TObjectsManager(),
            geometriesManager: new Itee.TGeometriesManager(),
            materialsManager:  new Itee.TMaterialsManager(),
            viewport:          {
                scene:           new Itee.Scene(),
                camera:          'perspective',
                control:         'orbital',
                effect:          'normal',
                renderer:        new Itee.WebGLRenderer( { antialias: true } ),
                showStat:        true,
                backgroundColor: 0x123456,
            },
            progressBar:       {
                timeoutId: undefined,
                done:      0,
                todo:      0
            },
            showProgressBar:   false

        }

    },
    methods:  {

        addObjectOfType ( objectType ) {
            'use strict'

            const newObject = new Itee[ objectType ]()
            this.viewport.scene.add( newObject )

        },

        ////

        toggleSelectionMode () {
            'use strict'

            this.viewport.isRaycastable = !this.viewport.isRaycastable

        },

        setMesureModeOfType ( effectType ) {
            'use strict'

        },

        ////

        setCameraOfType ( cameraType ) {
            'use strict'

            this.viewport.camera = cameraType

        },

        setControlOfType ( controlType ) {
            'use strict'

            this.viewport.control = controlType

        },

        setEffectOfType ( effectType ) {
            'use strict'

        },

        ////

        toggleViewportStats () {
            'use strict'

            this.viewport.showStat = !this.viewport.showStat

        },

        alertFooBar () {
            'use strict'
            alert( 'foo bar' )
        },

        addGrid () {
            'use strict'

            let aidesGroup = this.viewport.scene.getObjectByName( "Environement" )
            if ( !aidesGroup ) {
                aidesGroup           = new Itee.Group()
                aidesGroup.name      = "Environement"
                aidesGroup.modifiers = [
                    {
                        type:    'checkbox',
                        value:   'checked',
                        onClick: this.toggleVisibilityOf( aidesGroup )
                    },
                    {
                        type:     'range',
                        onChange: function onChangeHandler ( changeEvent ) {

                            const opacity  = changeEvent.target.valueAsNumber / 100
                            const children = group.children

                            let child = undefined
                            for ( let childIndex = 0, numberOfChildren = children.length ; childIndex < numberOfChildren ; childIndex++ ) {
                                child = children[ childIndex ]

                                if ( !child.material.transparent ) {
                                    child.material.transparent = true
                                }
                                child.material.opacity = opacity

                            }

                        }
                    }
                ]
                this.viewport.scene.add( aidesGroup )
            }

            let gridGroup = aidesGroup.getObjectByName( "Grilles" )
            if ( !gridGroup ) {
                gridGroup           = new Itee.Group()
                gridGroup.name      = "Grilles"
                gridGroup.modifiers = [
                    {
                        type:    'checkbox',
                        value:   'checked',
                        onClick: this.toggleVisibilityOf( gridGroup )
                    },
                    {
                        type:     'range',
                        onChange: function onChangeHandler ( changeEvent ) {

                            const opacity  = changeEvent.target.valueAsNumber / 100
                            const children = group.children

                            let child = undefined
                            for ( let childIndex = 0, numberOfChildren = children.length ; childIndex < numberOfChildren ; childIndex++ ) {
                                child = children[ childIndex ]

                                if ( !child.material.transparent ) {
                                    child.material.transparent = true
                                }
                                child.material.opacity = opacity

                            }

                        }
                    }
                ]
                aidesGroup.add( gridGroup )
            }

            const gridHelperXZ_1 = new Itee.GridHelper( 20, 20 )
            gridHelperXZ_1.name  = "Grille XY - Mètrique"
            gridGroup.add( gridHelperXZ_1 )

            const gridHelperXZ_10 = new Itee.GridHelper( 200, 20 )
            gridHelperXZ_10.name  = "Grille XY - Décamètrique"
            gridGroup.add( gridHelperXZ_10 )

            const gridHelperXZ_100 = new Itee.GridHelper( 2000, 20 )
            gridHelperXZ_100.name  = "Grille XY - Hectomètrique"
            gridGroup.add( gridHelperXZ_100 )

        },

        filterTreeItem ( item ) {
            'use strict'

            return item.name.length > 0

        },

        toggleVisibilityOf ( object ) {
            'use strict'

            const _object = object

            return function toggleVisibility () {
                _object.visible = !_object.visible
            }

        },

        onProgress ( loaded, total ) {
            'use strict'

            if ( !this.showProgressBar ) {
                this.showProgressBar = true
            }

            this.progressBar.done = loaded
            this.progressBar.todo = total

            if ( loaded === total ) {

                if ( this.progressBar.timeoutId ) {
                    clearTimeout( this.progressBar.timeoutId )
                }

                this.progressBar.timeoutId = setTimeout( () => {
                    this.showProgressBar = false
                }, 1000 )

            }

        }

    },
    created () {
        'use strict'

        const self = this

        populate( 'companies', {}, self.viewport.scene, ( company, companyGroup ) => {

            populate( 'sites', company.sites, companyGroup, ( site, siteGroup ) => {

                populate( 'buildings', site.buildings, siteGroup, ( building, buildingGroup ) => {

                    populate( 'scenes', building.scenes, buildingGroup, ( scene, sceneGroup ) => {

                        let numberOfChildren = scene.children.length
                        let childrenDone     = 0

                        self.objectsManager.read( scene.children, objects => {

                            const geometriesIds = objects.map( object => object.geometry ).filter( ( value, index, self ) => {
                                return self.indexOf( value ) === index
                            } )

                            const materialsArray       = objects.map( object => object.material )
                            const concatMaterialsArray = [].concat.apply( [], materialsArray )
                            const materialsIds         = concatMaterialsArray.filter( ( value, index, self ) => {
                                return self.indexOf( value ) === index
                            } )

                            self.geometriesManager.read( geometriesIds, geometries => {

                                self.materialsManager.read( materialsIds, materials => {

                                    for ( let objectIndex = 0, numberOfObjects = objects.length ; objectIndex < numberOfObjects ; objectIndex++ ) {

                                        const childrenIds = objects[ objectIndex ].children
                                        if ( childrenIds.length > 0 ) {
                                            objects[ objectIndex ].children = []
                                            populateChildren( objects[ objectIndex ], childrenIds )
                                        }

                                        const geometryId = objects[ objectIndex ].geometry
                                        if ( geometryId ) {
                                            objects[ objectIndex ].geometry = geometries[ geometryId ]
                                        }

                                        const materialIds = objects[ objectIndex ].material
                                        if ( materialIds ) {
                                            objects[ objectIndex ].material = []
                                            for ( let materialIndex = 0, numberOfMaterial = materialIds.length ; materialIndex < numberOfMaterial ; materialIndex++ ) {
                                                objects[ objectIndex ].material.push( materials[ materialIds[ materialIndex ] ] )
                                            }
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
                                                onChange: function onChangeHandler ( changeEvent ) {

                                                    const opacity = changeEvent.target.valueAsNumber / 100

                                                    if ( !objects[ objectIndex ].material.transparent ) {
                                                        objects[ objectIndex ].material.transparent = true
                                                    }

                                                    objects[ objectIndex ].material.opacity = opacity

                                                }
                                            }
                                        ]

                                        sceneGroup.add( objects[ objectIndex ] )

                                        childrenDone++
                                        self.onProgress( childrenDone, numberOfChildren )

                                    }

                                } )

                            } )

                        } )

                    } )

                } )

            } )

        } )

        function populate ( collectionName, childrenIds, parentGroup, callback ) {

            self.dbManager.basePath = `/${collectionName}`
            self.dbManager.read(
                childrenIds,
                children => {

                    let child = undefined
                    for ( let i = 0, n = children.length ; i < n ; i++ ) {
                        child = children[ i ]

                        if ( collectionName === 'objects' ) {

                            callback( child, null )

                            parentGroup.add( child )

                        } else {

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
                                    onChange: function onChangeHandler ( changeEvent ) {

                                        const opacity = changeEvent.target.valueAsNumber / 100

                                        if ( !group.material.transparent ) {
                                            group.material.transparent = true
                                        }

                                        group.material.opacity = opacity

                                    }
                                }
                            ]

                            callback( child, group )

                            parentGroup.add( group )
                        }

                    }

                },
                //                self.onProgress
            )

        }

        function populateChildren ( parent, children ) {

            self.objectsManager.read(
                children,
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
                                                onChange: function onChangeHandler ( changeEvent ) {

                                                    const opacity = changeEvent.target.valueAsNumber / 100

                                                    if ( !objects[ objectIndex ].material.transparent ) {
                                                        objects[ objectIndex ].material.transparent = true
                                                    }

                                                    objects[ objectIndex ].material.opacity = opacity

                                                }
                                            }
                                        ]

                                        parent.add( objects[ objectIndex ] )

                                    }

                                },
                                //                                self.onProgress
                            )

                        },
                        //                        self.onProgress
                    )

                },
                //                self.onProgress
            )

        }

    }

}

const UsersPage = {
    template: `
        <div class="userList">
            <ul v-if="users">
                <li v-for="user in users">
                    <router-link :to="'/users/'+user.id">{{user.name}}</router-link>
                </li>
            </ul>
            <router-view></router-view>
        </div>
    `,
    props:    [ 'users' ]
}

const User = {
    template: `
        <div class="user">
            <h2>Utilisateur {{ user.name }} #{{ user.id }}</h2>
            <router-link :to="'/users/'+user.id+'/'">Global</router-link>
            <router-link :to="'/users/'+user.id+'/profile'">Profile</router-link>
            <router-link :to="'/users/'+user.id+'/posts'">Posts</router-link>
            <router-view></router-view>
        </div>
    `,
    props:    [ 'user' ]
}

const UserHome = {
    template: `
        <div class="user-home">
            Welcome to {{ $route.params.userId }}'s home !
        </div>
    `
}

const UserProfile = {
    template: `
        <div class="user-profile">
          This is {{ $route.params.userId }}'s profile !
        </div>
    `
}

const UserPosts = {
    template: `
        <div class="user-posts">
            Posts:
            <ul v-if="posts">
                <li v-for="post in posts">
                    <router-link :to="baseRoute+post.id">{{post.title}}</router-link>
                </li>
            </ul>
            <router-view></router-view>
        </div>
    `,
    props:    [ 'baseRoute' ]
}

const UserPost = {
    template: `
        <div class="post">
                
            <div class="loading" v-if="loading">
              Chargement...
            </div>
        
            <div v-if="error" class="error">
              {{ error }}
            </div>
        
            <div v-if="post" class="content">
              <h2>{{ post.title }}</h2>
              <p>{{ post.message }}</p>
            </div>
            
        </div>
    `,
    data () {
        return {
            loading: false,
            post:    null,
            error:   null
        }
    },
    created () {
        // récupérer les données lorsque la vue est créée et
        // que les données sont déjà observées
        this.fetchData()
    },
    watch:    {
        // appeler encore la méthode si la route change
        '$route': 'fetchData'
    },
    methods:  {
        fetchData () {

            this.error   = null
            this.post    = null
            this.loading = true

            // remplacer `getPost` par une fonction de récupération de données
            getUserPostById( this.$route.params.postId, ( error, post ) => {

                this.loading = false

                if ( error ) {

                    this.error = error.message

                } else {

                    this.post = post

                }

            } )

        }
    }
}

const NotFound = {
    template: `
        <div>
            Uuuuhhhh, you got a 404 !
        </div>
    `
}

/////////////////
// SIMULATE DB //
/////////////////

const fakeUsersData = [
    {
        id:   '123',
        name: 'Toto'
    }, {
        id:   '456',
        name: 'Tata'
    }, {
        id:   '789',
        name: 'TiTI'
    }
]

const fakeUserPostsData = [
    {
        id:      '12345',
        title:   'Hello world !',
        message: 'En utilisant cette approche, nous naviguons et faisons immédiatement le rendu du composant et récupérons les données via le hook created du composant. Cela nous donne l\'opportunité d\'afficher un état de chargement pendant que les données sont récupérées à travers le réseau, et nous pouvons aussi gérer le chargement différemment pour chaque vue.'
    },
    {
        id:      '654321',
        title:   'Awesome post',
        message: 'Récupération de données après la navigation : effectue la navigation en premier, et récupère les données dans le hook entrant du cycle de vie d\'un composant. Affiche un état de chargement pendant que les données sont en train d\'être récupérées.'
    }
]

function getUserPostById ( id, callback ) {
    'use strict'

    if ( id === '123456' ) {

        setTimeout( () => {
            callback( null, fakeUserPostsData[ 0 ] )
        }, 1000 )

    } else if ( id === '654321' ) {

        setTimeout( () => {
            callback( null, fakeUserPostsData[ 1 ] )
        }, 3000 )

    } else {

        callback( { message: 'Invalid post id !' }, null )

    }

}

//////////////
// MAIN APP //
//////////////

var TConfigParameters = {
    launchingSite: '#itee-application-root',
    routes:        [
        {
            path:      '/',
            component: AppPage,
            props:     {
                navLinks: [
                    {
                        id:    'homeId',
                        route: '/',
                        text:  'Home'
                    }, {
                        id:    'barId',
                        route: '/bar',
                        text:  'Bar'
                    }, {
                        id:    'usersId',
                        route: '/users',
                        text:  'Users'
                    }, {
                        id:    'deadlinkId',
                        route: '/deadlink',
                        text:  'Deadlink'
                    }
                ]
            },
            children:  [
                {
                    path:      '',
                    component: HomePage
                },
                {
                    path:      '/documentation',
                    component: DocPage
                },
                {
                    path:      '/database',
                    component: DatabasePage
                },
                {
                    path:      '/upload',
                    component: UploadPage
                },
                {
                    path:      '/viewer',
                    component: ViewerPage
                },
                {
                    path:      '/users',
                    component: UsersPage,
                    props:     {
                        users: fakeUsersData
                    },
                    children:  [
                        {
                            path:      ':userId',
                            component: User,
                            props:     ( route ) => {
                                'use strict'

                                const user = fakeUsersData.find( user => user.id === route.params.userId )

                                return {
                                    user
                                }

                            },
                            children:  [
                                {
                                    path:      '',
                                    component: UserHome
                                },
                                {
                                    path:      'profile',
                                    component: UserProfile
                                },
                                {
                                    path:      'posts',
                                    component: UserPosts,
                                    props:     ( route ) => ({ baseRoute: '/users/' + route.params.userId + '/posts' }),
                                    children:  [
                                        {
                                            path:      ':postId',
                                            component: UserPost
                                        }
                                    ]
                                },
                                {
                                    path:     '*',
                                    redirect: NotFound
                                }
                            ]
                        }
                    ]
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



