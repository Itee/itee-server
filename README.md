
<h1 align="center">[Itee Server]</h1>
<br>

<p align="center">The itee server is the back end part of the itee solution predicted for running WebGL 3d content.
It allow to CRUD operation throught an RestFull Api in link with a mongo database.</p>
<br>

<p align="center">
    <a href="https://www.npmjs.com/package/itee-server" target="_blank" rel="noopener noreferrer">
        <img src="https://img.shields.io/npm/v/itee-server" alt="Current package version">
    </a>
    <a href="https://github.com/Itee/itee-server" target="_blank" rel="noopener noreferrer">
        <img src="https://github.com/Itee/itee-server/actions/workflows/node.js.yml/badge.svg" alt="Itee-Server CI">
    </a>
    <a href="https://github.com/semantic-release/semantic-release" target="_blank" rel="noopener noreferrer">
        <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="Build status">
    </a>
</p>

<br>
<h2>How to install</h2>

From npm:

    npm install itee-server

If you want to build the repository from source follow these instructions:

    git clone https://github.com/Itee/itee-server.git
    npm install
    npm run build
    
<br>
<h2>How to use</h2>

<p align="center">At begin was <a href="https://itee.github.io/itee-server/">RTFM</a> !</p>
<br>
In case you have clone the repository you could also auto-generate the library documentation using: 

    npm run doc

then you will be able to use like this:

    import { TBackendManager } from 'itee-server'
        
    const backendManager = new TBackendManager({
    
        rootPath:     path.join( __dirname, '..', 'servers' ),
           
        databases:    [
            {
                type:                 'TMongoDBDatabase',
                name:                 'MongoDB',
                databaseUrl:          `mongodb://127.0.0.1:27017/mydb`,
                plugins:              []
            }
        ],
           
        applications: {
        
            // All express configs, see: https://expressjs.com/en/4x/api.html#app.set
            env:      process.env.NODE_ENV,
            
            // All express middleswares
            middlewares: {
            
                morgan: {
                    interval:      '1d',
                    directoryPath: path.join( __dirname, '..', 'servers/logs/access.log' ),
                    fileName:      'access.log'
                },
                
                favicon: {
                    path: path.join( __dirname, '..', 'servers/resources/favicon.ico' )
                },
                
                //...
            
            },
            
            // Static routers
            routers: {
                '/':          'index/index.js',
                '/downloads': 'downloads/downloads.js',
                '/resources': 'resources/resources.js'
            },
            
        },
               
        servers:      {
            type:              'http',
            max_headers_count: 1100,
            timeout:           30000
        }
       
       })


<br>
<h2>License (BSD-3-Clause)</h2>

<div class="prettyprint source">
<code style=" color: #ddd; font-size: 16px; ">
<p><b>Copyright (c) 2015-Present, Itee, Valcke Tristan <a href="https://github.com/Itee">https://github.com/Itee</a>. All rights reserved.</b></p>

<p>Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:</p>

<ul>
<li>Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.</li>

<li>Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.</li>

<li>Neither the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.</li>
</ul>

<p>THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.</p>

<p>You should have received a copy of the <a href="https://opensource.org/licenses/BSD-3-Clause">BSD-3-Clause</a> along 
with this program.  If not, see <a href="https://opensource.org/licenses/BSD-3-Clause">https://opensource.org/licenses/BSD-3-Clause</a>.</p>
</code>
</div>

