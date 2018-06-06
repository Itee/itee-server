
//////////////////////////////////////////////////////////////////////////////////////////////////

var REVISION = '85dev';
var MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };
var CullFaceNone = 0;
var CullFaceBack = 1;
var CullFaceFront = 2;
var CullFaceFrontBack = 3;
var FrontFaceDirectionCW = 0;
var FrontFaceDirectionCCW = 1;
var BasicShadowMap = 0;
var PCFShadowMap = 1;
var PCFSoftShadowMap = 2;
var FrontSide = 0;
var BackSide = 1;
var DoubleSide = 2;
var FlatShading = 1;
var SmoothShading = 2;
var NoColors = 0;
var FaceColors = 1;
var VertexColors = 2;
var NoBlending = 0;
var NormalBlending = 1;
var AdditiveBlending = 2;
var SubtractiveBlending = 3;
var MultiplyBlending = 4;
var CustomBlending = 5;
var AddEquation = 100;
var SubtractEquation = 101;
var ReverseSubtractEquation = 102;
var MinEquation = 103;
var MaxEquation = 104;
var ZeroFactor = 200;
var OneFactor = 201;
var SrcColorFactor = 202;
var OneMinusSrcColorFactor = 203;
var SrcAlphaFactor = 204;
var OneMinusSrcAlphaFactor = 205;
var DstAlphaFactor = 206;
var OneMinusDstAlphaFactor = 207;
var DstColorFactor = 208;
var OneMinusDstColorFactor = 209;
var SrcAlphaSaturateFactor = 210;
var NeverDepth = 0;
var AlwaysDepth = 1;
var LessDepth = 2;
var LessEqualDepth = 3;
var EqualDepth = 4;
var GreaterEqualDepth = 5;
var GreaterDepth = 6;
var NotEqualDepth = 7;
var MultiplyOperation = 0;
var MixOperation = 1;
var AddOperation = 2;
var NoToneMapping = 0;
var LinearToneMapping = 1;
var ReinhardToneMapping = 2;
var Uncharted2ToneMapping = 3;
var CineonToneMapping = 4;
var UVMapping = 300;
var CubeReflectionMapping = 301;
var CubeRefractionMapping = 302;
var EquirectangularReflectionMapping = 303;
var EquirectangularRefractionMapping = 304;
var SphericalReflectionMapping = 305;
var CubeUVReflectionMapping = 306;
var CubeUVRefractionMapping = 307;
var RepeatWrapping = 1000;
var ClampToEdgeWrapping = 1001;
var MirroredRepeatWrapping = 1002;
var NearestFilter = 1003;
var NearestMipMapNearestFilter = 1004;
var NearestMipMapLinearFilter = 1005;
var LinearFilter = 1006;
var LinearMipMapNearestFilter = 1007;
var LinearMipMapLinearFilter = 1008;
var UnsignedByteType = 1009;
var ByteType = 1010;
var ShortType = 1011;
var UnsignedShortType = 1012;
var IntType = 1013;
var UnsignedIntType = 1014;
var FloatType = 1015;
var HalfFloatType = 1016;
var UnsignedShort4444Type = 1017;
var UnsignedShort5551Type = 1018;
var UnsignedShort565Type = 1019;
var UnsignedInt248Type = 1020;
var AlphaFormat = 1021;
var RGBFormat = 1022;
var RGBAFormat = 1023;
var LuminanceFormat = 1024;
var LuminanceAlphaFormat = 1025;
var RGBEFormat = RGBAFormat;
var DepthFormat = 1026;
var DepthStencilFormat = 1027;
var RGB_S3TC_DXT1_Format = 2001;
var RGBA_S3TC_DXT1_Format = 2002;
var RGBA_S3TC_DXT3_Format = 2003;
var RGBA_S3TC_DXT5_Format = 2004;
var RGB_PVRTC_4BPPV1_Format = 2100;
var RGB_PVRTC_2BPPV1_Format = 2101;
var RGBA_PVRTC_4BPPV1_Format = 2102;
var RGBA_PVRTC_2BPPV1_Format = 2103;
var RGB_ETC1_Format = 2151;
var LoopOnce = 2200;
var LoopRepeat = 2201;
var LoopPingPong = 2202;
var InterpolateDiscrete = 2300;
var InterpolateLinear = 2301;
var InterpolateSmooth = 2302;
var ZeroCurvatureEnding = 2400;
var ZeroSlopeEnding = 2401;
var WrapAroundEnding = 2402;
var TrianglesDrawMode = 0;
var TriangleStripDrawMode = 1;
var TriangleFanDrawMode = 2;
var LinearEncoding = 3000;
var sRGBEncoding = 3001;
var GammaEncoding = 3007;
var RGBEEncoding = 3002;
var LogLuvEncoding = 3003;
var RGBM7Encoding = 3004;
var RGBM16Encoding = 3005;
var RGBDEncoding = 3006;
var BasicDepthPacking = 3200;
var RGBADepthPacking = 3201;

//////////////////////////////////////////////////////////////////////////////////////////////////

var DefaultLoadingManager = new LoadingManager();

var Cache = {

    enabled: false,

    files: {},

    add: function ( key, file ) {

        if ( this.enabled === false ) return;

        // console.log( 'THREE.Cache', 'Adding key:', key );

        this.files[ key ] = file;

    },

    get: function ( key ) {

        if ( this.enabled === false ) return;

        // console.log( 'THREE.Cache', 'Checking key:', key );

        return this.files[ key ];

    },

    remove: function ( key ) {

        delete this.files[ key ];

    },

    clear: function () {

        this.files = {};

    }

};

var _Math = {

    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,

    generateUUID: function () {

        // http://www.broofa.com/Tools/Math.uuid.htm

        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split( '' );
        var uuid = new Array( 36 );
        var rnd = 0, r;

        return function generateUUID() {

            for ( var i = 0; i < 36; i ++ ) {

                if ( i === 8 || i === 13 || i === 18 || i === 23 ) {

                    uuid[ i ] = '-';

                } else if ( i === 14 ) {

                    uuid[ i ] = '4';

                } else {

                    if ( rnd <= 0x02 ) rnd = 0x2000000 + ( Math.random() * 0x1000000 ) | 0;
                    r = rnd & 0xf;
                    rnd = rnd >> 4;
                    uuid[ i ] = chars[ ( i === 19 ) ? ( r & 0x3 ) | 0x8 : r ];

                }

            }

            return uuid.join( '' );

        };

    }(),

    clamp: function ( value, min, max ) {

        return Math.max( min, Math.min( max, value ) );

    },

    // compute euclidian modulo of m % n
    // https://en.wikipedia.org/wiki/Modulo_operation

    euclideanModulo: function ( n, m ) {

        return ( ( n % m ) + m ) % m;

    },

    // Linear mapping from range <a1, a2> to range <b1, b2>

    mapLinear: function ( x, a1, a2, b1, b2 ) {

        return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

    },

    // https://en.wikipedia.org/wiki/Linear_interpolation

    lerp: function ( x, y, t ) {

        return ( 1 - t ) * x + t * y;

    },

    // http://en.wikipedia.org/wiki/Smoothstep

    smoothstep: function ( x, min, max ) {

        if ( x <= min ) return 0;
        if ( x >= max ) return 1;

        x = ( x - min ) / ( max - min );

        return x * x * ( 3 - 2 * x );

    },

    smootherstep: function ( x, min, max ) {

        if ( x <= min ) return 0;
        if ( x >= max ) return 1;

        x = ( x - min ) / ( max - min );

        return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

    },

    // Random integer from <low, high> interval

    randInt: function ( low, high ) {

        return low + Math.floor( Math.random() * ( high - low + 1 ) );

    },

    // Random float from <low, high> interval

    randFloat: function ( low, high ) {

        return low + Math.random() * ( high - low );

    },

    // Random float from <-range/2, range/2> interval

    randFloatSpread: function ( range ) {

        return range * ( 0.5 - Math.random() );

    },

    degToRad: function ( degrees ) {

        return degrees * _Math.DEG2RAD;

    },

    radToDeg: function ( radians ) {

        return radians * _Math.RAD2DEG;

    },

    isPowerOfTwo: function ( value ) {

        return ( value & ( value - 1 ) ) === 0 && value !== 0;

    },

    nearestPowerOfTwo: function ( value ) {

        return Math.pow( 2, Math.round( Math.log( value ) / Math.LN2 ) );

    },

    nextPowerOfTwo: function ( value ) {

        value --;
        value |= value >> 1;
        value |= value >> 2;
        value |= value >> 4;
        value |= value >> 8;
        value |= value >> 16;
        value ++;

        return value;

    }

};

var UniformsUtils = {

    merge: function ( uniforms ) {

        var merged = {};

        for ( var u = 0; u < uniforms.length; u ++ ) {

            var tmp = this.clone( uniforms[ u ] );

            for ( var p in tmp ) {

                merged[ p ] = tmp[ p ];

            }

        }

        return merged;

    },

    clone: function ( uniforms_src ) {

        var uniforms_dst = {};

        for ( var u in uniforms_src ) {

            uniforms_dst[ u ] = {};

            for ( var p in uniforms_src[ u ] ) {

                var parameter_src = uniforms_src[ u ][ p ];

                if ( parameter_src && ( parameter_src.isColor ||
                    parameter_src.isMatrix3 || parameter_src.isMatrix4 ||
                    parameter_src.isVector2 || parameter_src.isVector3 || parameter_src.isVector4 ||
                    parameter_src.isTexture ) ) {

                    uniforms_dst[ u ][ p ] = parameter_src.clone();

                } else if ( Array.isArray( parameter_src ) ) {

                    uniforms_dst[ u ][ p ] = parameter_src.slice();

                } else {

                    uniforms_dst[ u ][ p ] = parameter_src;

                }

            }

        }

        return uniforms_dst;

    }

};

//////////////////////////////////////////////////////////////////////////////////////////////////

function Vector2( x, y ) {

    this.x = x || 0;
    this.y = y || 0;

}

Object.defineProperties( Vector2.prototype, {

    "width" : {

        get: function () {

            return this.x;

        },

        set: function ( value ) {

            this.x = value;

        }

    },

    "height" : {

        get: function () {

            return this.y;

        },

        set: function ( value ) {

            this.y = value;

        }

    }

} );

Object.assign( Vector2.prototype, {

    isVector2: true,

    set: function ( x, y ) {

        this.x = x;
        this.y = y;

        return this;

    },

    setScalar: function ( scalar ) {

        this.x = scalar;
        this.y = scalar;

        return this;

    },

    setX: function ( x ) {

        this.x = x;

        return this;

    },

    setY: function ( y ) {

        this.y = y;

        return this;

    },

    setComponent: function ( index, value ) {

        switch ( index ) {

            case 0: this.x = value; break;
            case 1: this.y = value; break;
            default: throw new Error( 'index is out of range: ' + index );

        }

        return this;

    },

    getComponent: function ( index ) {

        switch ( index ) {

            case 0: return this.x;
            case 1: return this.y;
            default: throw new Error( 'index is out of range: ' + index );

        }

    },

    clone: function () {

        return new this.constructor( this.x, this.y );

    },

    copy: function ( v ) {

        this.x = v.x;
        this.y = v.y;

        return this;

    },

    add: function ( v, w ) {

        if ( w !== undefined ) {

            console.warn( 'THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
            return this.addVectors( v, w );

        }

        this.x += v.x;
        this.y += v.y;

        return this;

    },

    addScalar: function ( s ) {

        this.x += s;
        this.y += s;

        return this;

    },

    addVectors: function ( a, b ) {

        this.x = a.x + b.x;
        this.y = a.y + b.y;

        return this;

    },

    addScaledVector: function ( v, s ) {

        this.x += v.x * s;
        this.y += v.y * s;

        return this;

    },

    sub: function ( v, w ) {

        if ( w !== undefined ) {

            console.warn( 'THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
            return this.subVectors( v, w );

        }

        this.x -= v.x;
        this.y -= v.y;

        return this;

    },

    subScalar: function ( s ) {

        this.x -= s;
        this.y -= s;

        return this;

    },

    subVectors: function ( a, b ) {

        this.x = a.x - b.x;
        this.y = a.y - b.y;

        return this;

    },

    multiply: function ( v ) {

        this.x *= v.x;
        this.y *= v.y;

        return this;

    },

    multiplyScalar: function ( scalar ) {

        if ( isFinite( scalar ) ) {

            this.x *= scalar;
            this.y *= scalar;

        } else {

            this.x = 0;
            this.y = 0;

        }

        return this;

    },

    divide: function ( v ) {

        this.x /= v.x;
        this.y /= v.y;

        return this;

    },

    divideScalar: function ( scalar ) {

        return this.multiplyScalar( 1 / scalar );

    },

    min: function ( v ) {

        this.x = Math.min( this.x, v.x );
        this.y = Math.min( this.y, v.y );

        return this;

    },

    max: function ( v ) {

        this.x = Math.max( this.x, v.x );
        this.y = Math.max( this.y, v.y );

        return this;

    },

    clamp: function ( min, max ) {

        // This function assumes min < max, if this assumption isn't true it will not operate correctly

        this.x = Math.max( min.x, Math.min( max.x, this.x ) );
        this.y = Math.max( min.y, Math.min( max.y, this.y ) );

        return this;

    },

    clampScalar: function () {

        var min = new Vector2();
        var max = new Vector2();

        return function clampScalar( minVal, maxVal ) {

            min.set( minVal, minVal );
            max.set( maxVal, maxVal );

            return this.clamp( min, max );

        };

    }(),

    clampLength: function ( min, max ) {

        var length = this.length();

        return this.multiplyScalar( Math.max( min, Math.min( max, length ) ) / length );

    },

    floor: function () {

        this.x = Math.floor( this.x );
        this.y = Math.floor( this.y );

        return this;

    },

    ceil: function () {

        this.x = Math.ceil( this.x );
        this.y = Math.ceil( this.y );

        return this;

    },

    round: function () {

        this.x = Math.round( this.x );
        this.y = Math.round( this.y );

        return this;

    },

    roundToZero: function () {

        this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
        this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

        return this;

    },

    negate: function () {

        this.x = - this.x;
        this.y = - this.y;

        return this;

    },

    dot: function ( v ) {

        return this.x * v.x + this.y * v.y;

    },

    lengthSq: function () {

        return this.x * this.x + this.y * this.y;

    },

    length: function () {

        return Math.sqrt( this.x * this.x + this.y * this.y );

    },

    lengthManhattan: function() {

        return Math.abs( this.x ) + Math.abs( this.y );

    },

    normalize: function () {

        return this.divideScalar( this.length() );

    },

    angle: function () {

        // computes the angle in radians with respect to the positive x-axis

        var angle = Math.atan2( this.y, this.x );

        if ( angle < 0 ) angle += 2 * Math.PI;

        return angle;

    },

    distanceTo: function ( v ) {

        return Math.sqrt( this.distanceToSquared( v ) );

    },

    distanceToSquared: function ( v ) {

        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;

    },

    distanceToManhattan: function ( v ) {

        return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y );

    },

    setLength: function ( length ) {

        return this.multiplyScalar( length / this.length() );

    },

    lerp: function ( v, alpha ) {

        this.x += ( v.x - this.x ) * alpha;
        this.y += ( v.y - this.y ) * alpha;

        return this;

    },

    lerpVectors: function ( v1, v2, alpha ) {

        return this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );

    },

    equals: function ( v ) {

        return ( ( v.x === this.x ) && ( v.y === this.y ) );

    },

    fromArray: function ( array, offset ) {

        if ( offset === undefined ) offset = 0;

        this.x = array[ offset ];
        this.y = array[ offset + 1 ];

        return this;

    },

    toArray: function ( array, offset ) {

        if ( array === undefined ) array = [];
        if ( offset === undefined ) offset = 0;

        array[ offset ] = this.x;
        array[ offset + 1 ] = this.y;

        return array;

    },

    fromBufferAttribute: function ( attribute, index, offset ) {

        if ( offset !== undefined ) {

            console.warn( 'THREE.Vector2: offset has been removed from .fromBufferAttribute().' );

        }

        this.x = attribute.getX( index );
        this.y = attribute.getY( index );

        return this;

    },

    rotateAround: function ( center, angle ) {

        var c = Math.cos( angle ), s = Math.sin( angle );

        var x = this.x - center.x;
        var y = this.y - center.y;

        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;

        return this;

    }

} );

//////////////////////////////////////////////////////////////////////////////////////////////////

var ColorKeywords = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
    'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
    'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
    'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
    'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
    'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
    'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
    'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
    'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
    'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
    'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
    'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
    'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
    'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
    'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
    'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
    'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
    'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
    'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
    'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
    'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
    'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
    'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
    'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32 };

function Color( r, g, b ) {

    if ( g === undefined && b === undefined ) {

        // r is THREE.Color, hex or string
        return this.set( r );

    }

    return this.setRGB( r, g, b );

}

Object.assign( Color.prototype, {

    isColor: true,

    r: 1, g: 1, b: 1,

    set: function ( value ) {

        if ( value && value.isColor ) {

            this.copy( value );

        } else if ( typeof value === 'number' ) {

            this.setHex( value );

        } else if ( typeof value === 'string' ) {

            this.setStyle( value );

        }

        return this;

    },

    setScalar: function ( scalar ) {

        this.r = scalar;
        this.g = scalar;
        this.b = scalar;

        return this;

    },

    setHex: function ( hex ) {

        hex = Math.floor( hex );

        this.r = ( hex >> 16 & 255 ) / 255;
        this.g = ( hex >> 8 & 255 ) / 255;
        this.b = ( hex & 255 ) / 255;

        return this;

    },

    setRGB: function ( r, g, b ) {

        this.r = r;
        this.g = g;
        this.b = b;

        return this;

    },

    setHSL: function () {

        function hue2rgb( p, q, t ) {

            if ( t < 0 ) t += 1;
            if ( t > 1 ) t -= 1;
            if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
            if ( t < 1 / 2 ) return q;
            if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );
            return p;

        }

        return function setHSL( h, s, l ) {

            // h,s,l ranges are in 0.0 - 1.0
            h = _Math.euclideanModulo( h, 1 );
            s = _Math.clamp( s, 0, 1 );
            l = _Math.clamp( l, 0, 1 );

            if ( s === 0 ) {

                this.r = this.g = this.b = l;

            } else {

                var p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s );
                var q = ( 2 * l ) - p;

                this.r = hue2rgb( q, p, h + 1 / 3 );
                this.g = hue2rgb( q, p, h );
                this.b = hue2rgb( q, p, h - 1 / 3 );

            }

            return this;

        };

    }(),

    setStyle: function ( style ) {

        function handleAlpha( string ) {

            if ( string === undefined ) return;

            if ( parseFloat( string ) < 1 ) {

                console.warn( 'THREE.Color: Alpha component of ' + style + ' will be ignored.' );

            }

        }


        var m;

        if ( m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec( style ) ) {

            // rgb / hsl

            var color;
            var name = m[ 1 ];
            var components = m[ 2 ];

            switch ( name ) {

                case 'rgb':
                case 'rgba':

                    if ( color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

                        // rgb(255,0,0) rgba(255,0,0,0.5)
                        this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;
                        this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;
                        this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;

                        handleAlpha( color[ 5 ] );

                        return this;

                    }

                    if ( color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

                        // rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
                        this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;
                        this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;
                        this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;

                        handleAlpha( color[ 5 ] );

                        return this;

                    }

                    break;

                case 'hsl':
                case 'hsla':

                    if ( color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec( components ) ) {

                        // hsl(120,50%,50%) hsla(120,50%,50%,0.5)
                        var h = parseFloat( color[ 1 ] ) / 360;
                        var s = parseInt( color[ 2 ], 10 ) / 100;
                        var l = parseInt( color[ 3 ], 10 ) / 100;

                        handleAlpha( color[ 5 ] );

                        return this.setHSL( h, s, l );

                    }

                    break;

            }

        } else if ( m = /^\#([A-Fa-f0-9]+)$/.exec( style ) ) {

            // hex color

            var hex = m[ 1 ];
            var size = hex.length;

            if ( size === 3 ) {

                // #ff0
                this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 0 ), 16 ) / 255;
                this.g = parseInt( hex.charAt( 1 ) + hex.charAt( 1 ), 16 ) / 255;
                this.b = parseInt( hex.charAt( 2 ) + hex.charAt( 2 ), 16 ) / 255;

                return this;

            } else if ( size === 6 ) {

                // #ff0000
                this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 1 ), 16 ) / 255;
                this.g = parseInt( hex.charAt( 2 ) + hex.charAt( 3 ), 16 ) / 255;
                this.b = parseInt( hex.charAt( 4 ) + hex.charAt( 5 ), 16 ) / 255;

                return this;

            }

        }

        if ( style && style.length > 0 ) {

            // color keywords
            var hex = ColorKeywords[ style ];

            if ( hex !== undefined ) {

                // red
                this.setHex( hex );

            } else {

                // unknown color
                console.warn( 'THREE.Color: Unknown color ' + style );

            }

        }

        return this;

    },

    clone: function () {

        return new this.constructor( this.r, this.g, this.b );

    },

    copy: function ( color ) {

        this.r = color.r;
        this.g = color.g;
        this.b = color.b;

        return this;

    },

    copyGammaToLinear: function ( color, gammaFactor ) {

        if ( gammaFactor === undefined ) gammaFactor = 2.0;

        this.r = Math.pow( color.r, gammaFactor );
        this.g = Math.pow( color.g, gammaFactor );
        this.b = Math.pow( color.b, gammaFactor );

        return this;

    },

    copyLinearToGamma: function ( color, gammaFactor ) {

        if ( gammaFactor === undefined ) gammaFactor = 2.0;

        var safeInverse = ( gammaFactor > 0 ) ? ( 1.0 / gammaFactor ) : 1.0;

        this.r = Math.pow( color.r, safeInverse );
        this.g = Math.pow( color.g, safeInverse );
        this.b = Math.pow( color.b, safeInverse );

        return this;

    },

    convertGammaToLinear: function () {

        var r = this.r, g = this.g, b = this.b;

        this.r = r * r;
        this.g = g * g;
        this.b = b * b;

        return this;

    },

    convertLinearToGamma: function () {

        this.r = Math.sqrt( this.r );
        this.g = Math.sqrt( this.g );
        this.b = Math.sqrt( this.b );

        return this;

    },

    getHex: function () {

        return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;

    },

    getHexString: function () {

        return ( '000000' + this.getHex().toString( 16 ) ).slice( - 6 );

    },

    getHSL: function ( optionalTarget ) {

        // h,s,l ranges are in 0.0 - 1.0

        var hsl = optionalTarget || { h: 0, s: 0, l: 0 };

        var r = this.r, g = this.g, b = this.b;

        var max = Math.max( r, g, b );
        var min = Math.min( r, g, b );

        var hue, saturation;
        var lightness = ( min + max ) / 2.0;

        if ( min === max ) {

            hue = 0;
            saturation = 0;

        } else {

            var delta = max - min;

            saturation = lightness <= 0.5 ? delta / ( max + min ) : delta / ( 2 - max - min );

            switch ( max ) {

                case r: hue = ( g - b ) / delta + ( g < b ? 6 : 0 ); break;
                case g: hue = ( b - r ) / delta + 2; break;
                case b: hue = ( r - g ) / delta + 4; break;

            }

            hue /= 6;

        }

        hsl.h = hue;
        hsl.s = saturation;
        hsl.l = lightness;

        return hsl;

    },

    getStyle: function () {

        return 'rgb(' + ( ( this.r * 255 ) | 0 ) + ',' + ( ( this.g * 255 ) | 0 ) + ',' + ( ( this.b * 255 ) | 0 ) + ')';

    },

    offsetHSL: function ( h, s, l ) {

        var hsl = this.getHSL();

        hsl.h += h; hsl.s += s; hsl.l += l;

        this.setHSL( hsl.h, hsl.s, hsl.l );

        return this;

    },

    add: function ( color ) {

        this.r += color.r;
        this.g += color.g;
        this.b += color.b;

        return this;

    },

    addColors: function ( color1, color2 ) {

        this.r = color1.r + color2.r;
        this.g = color1.g + color2.g;
        this.b = color1.b + color2.b;

        return this;

    },

    addScalar: function ( s ) {

        this.r += s;
        this.g += s;
        this.b += s;

        return this;

    },

    sub: function( color ) {

        this.r = Math.max( 0, this.r - color.r );
        this.g = Math.max( 0, this.g - color.g );
        this.b = Math.max( 0, this.b - color.b );

        return this;

    },

    multiply: function ( color ) {

        this.r *= color.r;
        this.g *= color.g;
        this.b *= color.b;

        return this;

    },

    multiplyScalar: function ( s ) {

        this.r *= s;
        this.g *= s;
        this.b *= s;

        return this;

    },

    lerp: function ( color, alpha ) {

        this.r += ( color.r - this.r ) * alpha;
        this.g += ( color.g - this.g ) * alpha;
        this.b += ( color.b - this.b ) * alpha;

        return this;

    },

    equals: function ( c ) {

        return ( c.r === this.r ) && ( c.g === this.g ) && ( c.b === this.b );

    },

    fromArray: function ( array, offset ) {

        if ( offset === undefined ) offset = 0;

        this.r = array[ offset ];
        this.g = array[ offset + 1 ];
        this.b = array[ offset + 2 ];

        return this;

    },

    toArray: function ( array, offset ) {

        if ( array === undefined ) array = [];
        if ( offset === undefined ) offset = 0;

        array[ offset ] = this.r;
        array[ offset + 1 ] = this.g;
        array[ offset + 2 ] = this.b;

        return array;

    },

    toJSON: function () {

        return this.getHex();

    }

} );

//////////////////////////////////////////////////////////////////////////////////////////////////

var materialId = 0;

function Material() {

    Object.defineProperty( this, 'id', { value: materialId ++ } );

    this.uuid = _Math.generateUUID();

    this.name = '';
    this.type = 'Material';

    this.fog = true;
    this.lights = true;

    this.blending = NormalBlending;
    this.side = FrontSide;
    this.shading = SmoothShading; // THREE.FlatShading, THREE.SmoothShading
    this.vertexColors = NoColors; // THREE.NoColors, THREE.VertexColors, THREE.FaceColors

    this.opacity = 1;
    this.transparent = false;

    this.blendSrc = SrcAlphaFactor;
    this.blendDst = OneMinusSrcAlphaFactor;
    this.blendEquation = AddEquation;
    this.blendSrcAlpha = null;
    this.blendDstAlpha = null;
    this.blendEquationAlpha = null;

    this.depthFunc = LessEqualDepth;
    this.depthTest = true;
    this.depthWrite = true;

    this.clippingPlanes = null;
    this.clipIntersection = false;
    this.clipShadows = false;

    this.colorWrite = true;

    this.precision = null; // override the renderer's default precision for this material

    this.polygonOffset = false;
    this.polygonOffsetFactor = 0;
    this.polygonOffsetUnits = 0;

    this.alphaTest = 0;
    this.premultipliedAlpha = false;

    this.overdraw = 0; // Overdrawn pixels (typically between 0 and 1) for fixing antialiasing gaps in CanvasRenderer

    this.visible = true;

    this._needsUpdate = true;

}

Object.defineProperty( Material.prototype, "needsUpdate", {

    get: function() {

        return this._needsUpdate;

    },

    set: function(value) {

        if ( value === true ) this.update();
        this._needsUpdate = value;

    }

});

Object.assign( Material.prototype, EventDispatcher.prototype, {

    isMaterial: true,

    setValues: function ( values ) {

        if ( values === undefined ) return;

        for ( var key in values ) {

            var newValue = values[ key ];

            if ( newValue === undefined ) {

                console.warn( "THREE.Material: '" + key + "' parameter is undefined." );
                continue;

            }

            var currentValue = this[ key ];

            if ( currentValue === undefined ) {

                console.warn( "THREE." + this.type + ": '" + key + "' is not a property of this material." );
                continue;

            }

            if ( currentValue && currentValue.isColor ) {

                currentValue.set( newValue );

            } else if ( ( currentValue && currentValue.isVector3 ) && ( newValue && newValue.isVector3 ) ) {

                currentValue.copy( newValue );

            } else if ( key === 'overdraw' ) {

                // ensure overdraw is backwards-compatible with legacy boolean type
                this[ key ] = Number( newValue );

            } else {

                this[ key ] = newValue;

            }

        }

    },

    toJSON: function ( meta ) {

        var isRoot = meta === undefined;

        if ( isRoot ) {

            meta = {
                textures: {},
                images: {}
            };

        }

        var data = {
            metadata: {
                version: 4.4,
                type: 'Material',
                generator: 'Material.toJSON'
            }
        };

        // standard Material serialization
        data.uuid = this.uuid;
        data.type = this.type;

        if ( this.name !== '' ) data.name = this.name;

        if ( this.color && this.color.isColor ) data.color = this.color.getHex();

        if ( this.roughness !== undefined ) data.roughness = this.roughness;
        if ( this.metalness !== undefined ) data.metalness = this.metalness;

        if ( this.emissive && this.emissive.isColor ) data.emissive = this.emissive.getHex();
        if ( this.specular && this.specular.isColor ) data.specular = this.specular.getHex();
        if ( this.shininess !== undefined ) data.shininess = this.shininess;
        if ( this.clearCoat !== undefined ) data.clearCoat = this.clearCoat;
        if ( this.clearCoatRoughness !== undefined ) data.clearCoatRoughness = this.clearCoatRoughness;

        if ( this.map && this.map.isTexture ) data.map = this.map.toJSON( meta ).uuid;
        if ( this.alphaMap && this.alphaMap.isTexture ) data.alphaMap = this.alphaMap.toJSON( meta ).uuid;
        if ( this.lightMap && this.lightMap.isTexture ) data.lightMap = this.lightMap.toJSON( meta ).uuid;
        if ( this.bumpMap && this.bumpMap.isTexture ) {

            data.bumpMap = this.bumpMap.toJSON( meta ).uuid;
            data.bumpScale = this.bumpScale;

        }
        if ( this.normalMap && this.normalMap.isTexture ) {

            data.normalMap = this.normalMap.toJSON( meta ).uuid;
            data.normalScale = this.normalScale.toArray();

        }
        if ( this.displacementMap && this.displacementMap.isTexture ) {

            data.displacementMap = this.displacementMap.toJSON( meta ).uuid;
            data.displacementScale = this.displacementScale;
            data.displacementBias = this.displacementBias;

        }
        if ( this.roughnessMap && this.roughnessMap.isTexture ) data.roughnessMap = this.roughnessMap.toJSON( meta ).uuid;
        if ( this.metalnessMap && this.metalnessMap.isTexture ) data.metalnessMap = this.metalnessMap.toJSON( meta ).uuid;

        if ( this.emissiveMap && this.emissiveMap.isTexture ) data.emissiveMap = this.emissiveMap.toJSON( meta ).uuid;
        if ( this.specularMap && this.specularMap.isTexture ) data.specularMap = this.specularMap.toJSON( meta ).uuid;

        if ( this.envMap && this.envMap.isTexture ) {

            data.envMap = this.envMap.toJSON( meta ).uuid;
            data.reflectivity = this.reflectivity; // Scale behind envMap

        }

        if ( this.gradientMap && this.gradientMap.isTexture ) {

            data.gradientMap = this.gradientMap.toJSON( meta ).uuid;

        }

        if ( this.size !== undefined ) data.size = this.size;
        if ( this.sizeAttenuation !== undefined ) data.sizeAttenuation = this.sizeAttenuation;

        if ( this.blending !== NormalBlending ) data.blending = this.blending;
        if ( this.shading !== SmoothShading ) data.shading = this.shading;
        if ( this.side !== FrontSide ) data.side = this.side;
        if ( this.vertexColors !== NoColors ) data.vertexColors = this.vertexColors;

        if ( this.opacity < 1 ) data.opacity = this.opacity;
        if ( this.transparent === true ) data.transparent = this.transparent;

        data.depthFunc = this.depthFunc;
        data.depthTest = this.depthTest;
        data.depthWrite = this.depthWrite;

        if ( this.alphaTest > 0 ) data.alphaTest = this.alphaTest;
        if ( this.premultipliedAlpha === true ) data.premultipliedAlpha = this.premultipliedAlpha;
        if ( this.wireframe === true ) data.wireframe = this.wireframe;
        if ( this.wireframeLinewidth > 1 ) data.wireframeLinewidth = this.wireframeLinewidth;
        if ( this.wireframeLinecap !== 'round' ) data.wireframeLinecap = this.wireframeLinecap;
        if ( this.wireframeLinejoin !== 'round' ) data.wireframeLinejoin = this.wireframeLinejoin;

        data.skinning = this.skinning;
        data.morphTargets = this.morphTargets;

        // TODO: Copied from Object3D.toJSON

        function extractFromCache( cache ) {

            var values = [];

            for ( var key in cache ) {

                var data = cache[ key ];
                delete data.metadata;
                values.push( data );

            }

            return values;

        }

        if ( isRoot ) {

            var textures = extractFromCache( meta.textures );
            var images = extractFromCache( meta.images );

            if ( textures.length > 0 ) data.textures = textures;
            if ( images.length > 0 ) data.images = images;

        }

        return data;

    },

    clone: function () {

        return new this.constructor().copy( this );

    },

    copy: function ( source ) {

        this.name = source.name;

        this.fog = source.fog;
        this.lights = source.lights;

        this.blending = source.blending;
        this.side = source.side;
        this.shading = source.shading;
        this.vertexColors = source.vertexColors;

        this.opacity = source.opacity;
        this.transparent = source.transparent;

        this.blendSrc = source.blendSrc;
        this.blendDst = source.blendDst;
        this.blendEquation = source.blendEquation;
        this.blendSrcAlpha = source.blendSrcAlpha;
        this.blendDstAlpha = source.blendDstAlpha;
        this.blendEquationAlpha = source.blendEquationAlpha;

        this.depthFunc = source.depthFunc;
        this.depthTest = source.depthTest;
        this.depthWrite = source.depthWrite;

        this.colorWrite = source.colorWrite;

        this.precision = source.precision;

        this.polygonOffset = source.polygonOffset;
        this.polygonOffsetFactor = source.polygonOffsetFactor;
        this.polygonOffsetUnits = source.polygonOffsetUnits;

        this.alphaTest = source.alphaTest;

        this.premultipliedAlpha = source.premultipliedAlpha;

        this.overdraw = source.overdraw;

        this.visible = source.visible;
        this.clipShadows = source.clipShadows;
        this.clipIntersection = source.clipIntersection;

        var srcPlanes = source.clippingPlanes,
            dstPlanes = null;

        if ( srcPlanes !== null ) {

            var n = srcPlanes.length;
            dstPlanes = new Array( n );

            for ( var i = 0; i !== n; ++ i )
                dstPlanes[ i ] = srcPlanes[ i ].clone();

        }

        this.clippingPlanes = dstPlanes;

        return this;

    },

    update: function () {

        this.dispatchEvent( { type: 'update' } );

    },

    dispose: function () {

        this.dispatchEvent( { type: 'dispose' } );

    }

} );

//////////////////////////////////////////////////////////////////////////////////////////////////

function ShaderMaterial( parameters ) {

    Material.call( this );

    this.type = 'ShaderMaterial';

    this.defines = {};
    this.uniforms = {};

    this.vertexShader = 'void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}';
    this.fragmentShader = 'void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}';

    this.linewidth = 1;

    this.wireframe = false;
    this.wireframeLinewidth = 1;

    this.fog = false; // set to use scene fog
    this.lights = false; // set to use scene lights
    this.clipping = false; // set to use user-defined clipping planes

    this.skinning = false; // set to use skinning attribute streams
    this.morphTargets = false; // set to use morph targets
    this.morphNormals = false; // set to use morph normals

    this.extensions = {
        derivatives: false, // set to use derivatives
        fragDepth: false, // set to use fragment depth values
        drawBuffers: false, // set to use draw buffers
        shaderTextureLOD: false // set to use shader texture LOD
    };

    // When rendered geometry doesn't include these attributes but the material does,
    // use these default values in WebGL. This avoids errors when buffer data is missing.
    this.defaultAttributeValues = {
        'color': [ 1, 1, 1 ],
        'uv': [ 0, 0 ],
        'uv2': [ 0, 0 ]
    };

    this.index0AttributeName = undefined;

    if ( parameters !== undefined ) {

        if ( parameters.attributes !== undefined ) {

            console.error( 'THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead.' );

        }

        this.setValues( parameters );

    }

}

ShaderMaterial.prototype = Object.create( Material.prototype );
ShaderMaterial.prototype.constructor = ShaderMaterial;

ShaderMaterial.prototype.isShaderMaterial = true;

ShaderMaterial.prototype.copy = function ( source ) {

    Material.prototype.copy.call( this, source );

    this.fragmentShader = source.fragmentShader;
    this.vertexShader = source.vertexShader;

    this.uniforms = UniformsUtils.clone( source.uniforms );

    this.defines = source.defines;

    this.wireframe = source.wireframe;
    this.wireframeLinewidth = source.wireframeLinewidth;

    this.lights = source.lights;
    this.clipping = source.clipping;

    this.skinning = source.skinning;

    this.morphTargets = source.morphTargets;
    this.morphNormals = source.morphNormals;

    this.extensions = source.extensions;

    return this;

};

ShaderMaterial.prototype.toJSON = function ( meta ) {

    var data = Material.prototype.toJSON.call( this, meta );

    data.uniforms = this.uniforms;
    data.vertexShader = this.vertexShader;
    data.fragmentShader = this.fragmentShader;

    return data;

};

//////////////////////////////////////////////////////////////////////////////////////////////////

function SpriteMaterial( parameters ) {

    Material.call( this );

    this.type = 'SpriteMaterial';

    this.color = new Color( 0xffffff );
    this.map = null;

    this.rotation = 0;

    this.fog = false;
    this.lights = false;

    this.setValues( parameters );

}

SpriteMaterial.prototype = Object.create( Material.prototype );
SpriteMaterial.prototype.constructor = SpriteMaterial;

SpriteMaterial.prototype.copy = function ( source ) {

    Material.prototype.copy.call( this, source );

    this.color.copy( source.color );
    this.map = source.map;

    this.rotation = source.rotation;

    return this;

};

//////////////////////////////////////////////////////////////////////////////////////////////////

function RawShaderMaterial( parameters ) {

    ShaderMaterial.call( this, parameters );

    this.type = 'RawShaderMaterial';

}

RawShaderMaterial.prototype = Object.create( ShaderMaterial.prototype );
RawShaderMaterial.prototype.constructor = RawShaderMaterial;

RawShaderMaterial.prototype.isRawShaderMaterial = true;

//////////////////////////////////////////////////////////////////////////////////////////////////

function PointsMaterial( parameters ) {

    Material.call( this );

    this.type = 'PointsMaterial';

    this.color = new Color( 0xffffff );

    this.map = null;

    this.size = 1;
    this.sizeAttenuation = true;

    this.lights = false;

    this.setValues( parameters );

}

PointsMaterial.prototype = Object.create( Material.prototype );
PointsMaterial.prototype.constructor = PointsMaterial;

PointsMaterial.prototype.isPointsMaterial = true;

PointsMaterial.prototype.copy = function ( source ) {

    Material.prototype.copy.call( this, source );

    this.color.copy( source.color );

    this.map = source.map;

    this.size = source.size;
    this.sizeAttenuation = source.sizeAttenuation;

    return this;

};

//////////////////////////////////////////////////////////////////////////////////////////////////

function MeshPhongMaterial( parameters ) {

    Material.call( this );

    this.type = 'MeshPhongMaterial';

    this.color = new Color( 0xffffff ); // diffuse
    this.specular = new Color( 0x111111 );
    this.shininess = 30;

    this.map = null;

    this.lightMap = null;
    this.lightMapIntensity = 1.0;

    this.aoMap = null;
    this.aoMapIntensity = 1.0;

    this.emissive = new Color( 0x000000 );
    this.emissiveIntensity = 1.0;
    this.emissiveMap = null;

    this.bumpMap = null;
    this.bumpScale = 1;

    this.normalMap = null;
    this.normalScale = new Vector2( 1, 1 );

    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;

    this.specularMap = null;

    this.alphaMap = null;

    this.envMap = null;
    this.combine = MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;

    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinecap = 'round';
    this.wireframeLinejoin = 'round';

    this.skinning = false;
    this.morphTargets = false;
    this.morphNormals = false;

    this.setValues( parameters );

}

MeshPhongMaterial.prototype = Object.create( Material.prototype );
MeshPhongMaterial.prototype.constructor = MeshPhongMaterial;

MeshPhongMaterial.prototype.isMeshPhongMaterial = true;

MeshPhongMaterial.prototype.copy = function ( source ) {

    Material.prototype.copy.call( this, source );

    this.color.copy( source.color );
    this.specular.copy( source.specular );
    this.shininess = source.shininess;

    this.map = source.map;

    this.lightMap = source.lightMap;
    this.lightMapIntensity = source.lightMapIntensity;

    this.aoMap = source.aoMap;
    this.aoMapIntensity = source.aoMapIntensity;

    this.emissive.copy( source.emissive );
    this.emissiveMap = source.emissiveMap;
    this.emissiveIntensity = source.emissiveIntensity;

    this.bumpMap = source.bumpMap;
    this.bumpScale = source.bumpScale;

    this.normalMap = source.normalMap;
    this.normalScale.copy( source.normalScale );

    this.displacementMap = source.displacementMap;
    this.displacementScale = source.displacementScale;
    this.displacementBias = source.displacementBias;

    this.specularMap = source.specularMap;

    this.alphaMap = source.alphaMap;

    this.envMap = source.envMap;
    this.combine = source.combine;
    this.reflectivity = source.reflectivity;
    this.refractionRatio = source.refractionRatio;

    this.wireframe = source.wireframe;
    this.wireframeLinewidth = source.wireframeLinewidth;
    this.wireframeLinecap = source.wireframeLinecap;
    this.wireframeLinejoin = source.wireframeLinejoin;

    this.skinning = source.skinning;
    this.morphTargets = source.morphTargets;
    this.morphNormals = source.morphNormals;

    return this;

};

//////////////////////////////////////////////////////////////////////////////////////////////////

function MeshStandardMaterial( parameters ) {

    Material.call( this );

    this.defines = { 'STANDARD': '' };

    this.type = 'MeshStandardMaterial';

    this.color = new Color( 0xffffff ); // diffuse
    this.roughness = 0.5;
    this.metalness = 0.5;

    this.map = null;

    this.lightMap = null;
    this.lightMapIntensity = 1.0;

    this.aoMap = null;
    this.aoMapIntensity = 1.0;

    this.emissive = new Color( 0x000000 );
    this.emissiveIntensity = 1.0;
    this.emissiveMap = null;

    this.bumpMap = null;
    this.bumpScale = 1;

    this.normalMap = null;
    this.normalScale = new Vector2( 1, 1 );

    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;

    this.roughnessMap = null;

    this.metalnessMap = null;

    this.alphaMap = null;

    this.envMap = null;
    this.envMapIntensity = 1.0;

    this.refractionRatio = 0.98;

    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinecap = 'round';
    this.wireframeLinejoin = 'round';

    this.skinning = false;
    this.morphTargets = false;
    this.morphNormals = false;

    this.setValues( parameters );

}

MeshStandardMaterial.prototype = Object.create( Material.prototype );
MeshStandardMaterial.prototype.constructor = MeshStandardMaterial;

MeshStandardMaterial.prototype.isMeshStandardMaterial = true;

MeshStandardMaterial.prototype.copy = function ( source ) {

    Material.prototype.copy.call( this, source );

    this.defines = { 'STANDARD': '' };

    this.color.copy( source.color );
    this.roughness = source.roughness;
    this.metalness = source.metalness;

    this.map = source.map;

    this.lightMap = source.lightMap;
    this.lightMapIntensity = source.lightMapIntensity;

    this.aoMap = source.aoMap;
    this.aoMapIntensity = source.aoMapIntensity;

    this.emissive.copy( source.emissive );
    this.emissiveMap = source.emissiveMap;
    this.emissiveIntensity = source.emissiveIntensity;

    this.bumpMap = source.bumpMap;
    this.bumpScale = source.bumpScale;

    this.normalMap = source.normalMap;
    this.normalScale.copy( source.normalScale );

    this.displacementMap = source.displacementMap;
    this.displacementScale = source.displacementScale;
    this.displacementBias = source.displacementBias;

    this.roughnessMap = source.roughnessMap;

    this.metalnessMap = source.metalnessMap;

    this.alphaMap = source.alphaMap;

    this.envMap = source.envMap;
    this.envMapIntensity = source.envMapIntensity;

    this.refractionRatio = source.refractionRatio;

    this.wireframe = source.wireframe;
    this.wireframeLinewidth = source.wireframeLinewidth;
    this.wireframeLinecap = source.wireframeLinecap;
    this.wireframeLinejoin = source.wireframeLinejoin;

    this.skinning = source.skinning;
    this.morphTargets = source.morphTargets;
    this.morphNormals = source.morphNormals;

    return this;

};

//////////////////////////////////////////////////////////////////////////////////////////////////

function MeshPhysicalMaterial( parameters ) {

    MeshStandardMaterial.call( this );

    this.defines = { 'PHYSICAL': '' };

    this.type = 'MeshPhysicalMaterial';

    this.reflectivity = 0.5; // maps to F0 = 0.04

    this.clearCoat = 0.0;
    this.clearCoatRoughness = 0.0;

    this.setValues( parameters );

}

MeshPhysicalMaterial.prototype = Object.create( MeshStandardMaterial.prototype );
MeshPhysicalMaterial.prototype.constructor = MeshPhysicalMaterial;

MeshPhysicalMaterial.prototype.isMeshPhysicalMaterial = true;

MeshPhysicalMaterial.prototype.copy = function ( source ) {

    MeshStandardMaterial.prototype.copy.call( this, source );

    this.defines = { 'PHYSICAL': '' };

    this.reflectivity = source.reflectivity;

    this.clearCoat = source.clearCoat;
    this.clearCoatRoughness = source.clearCoatRoughness;

    return this;

};

//////////////////////////////////////////////////////////////////////////////////////////////////

function MeshToonMaterial( parameters ) {

    MeshPhongMaterial.call( this );

    this.defines = { 'TOON': '' };

    this.type = 'MeshToonMaterial';

    this.gradientMap = null;

    this.setValues( parameters );

}

MeshToonMaterial.prototype = Object.create( MeshPhongMaterial.prototype );
MeshToonMaterial.prototype.constructor = MeshToonMaterial;

MeshToonMaterial.prototype.isMeshToonMaterial = true;

MeshToonMaterial.prototype.copy = function ( source ) {

    MeshPhongMaterial.prototype.copy.call( this, source );

    this.gradientMap = source.gradientMap;

    return this;

};

//////////////////////////////////////////////////////////////////////////////////////////////////

function MeshNormalMaterial( parameters ) {

    Material.call( this, parameters );

    this.type = 'MeshNormalMaterial';

    this.bumpMap = null;
    this.bumpScale = 1;

    this.normalMap = null;
    this.normalScale = new Vector2( 1, 1 );

    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;

    this.wireframe = false;
    this.wireframeLinewidth = 1;

    this.fog = false;
    this.lights = false;

    this.skinning = false;
    this.morphTargets = false;
    this.morphNormals = false;

    this.setValues( parameters );

}

MeshNormalMaterial.prototype = Object.create( Material.prototype );
MeshNormalMaterial.prototype.constructor = MeshNormalMaterial;

MeshNormalMaterial.prototype.isMeshNormalMaterial = true;

MeshNormalMaterial.prototype.copy = function ( source ) {

    Material.prototype.copy.call( this, source );

    this.bumpMap = source.bumpMap;
    this.bumpScale = source.bumpScale;

    this.normalMap = source.normalMap;
    this.normalScale.copy( source.normalScale );

    this.displacementMap = source.displacementMap;
    this.displacementScale = source.displacementScale;
    this.displacementBias = source.displacementBias;

    this.wireframe = source.wireframe;
    this.wireframeLinewidth = source.wireframeLinewidth;

    this.skinning = source.skinning;
    this.morphTargets = source.morphTargets;
    this.morphNormals = source.morphNormals;

    return this;

};

//////////////////////////////////////////////////////////////////////////////////////////////////

function MeshLambertMaterial( parameters ) {

    Material.call( this );

    this.type = 'MeshLambertMaterial';

    this.color = new Color( 0xffffff ); // diffuse

    this.map = null;

    this.lightMap = null;
    this.lightMapIntensity = 1.0;

    this.aoMap = null;
    this.aoMapIntensity = 1.0;

    this.emissive = new Color( 0x000000 );
    this.emissiveIntensity = 1.0;
    this.emissiveMap = null;

    this.specularMap = null;

    this.alphaMap = null;

    this.envMap = null;
    this.combine = MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;

    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinecap = 'round';
    this.wireframeLinejoin = 'round';

    this.skinning = false;
    this.morphTargets = false;
    this.morphNormals = false;

    this.setValues( parameters );

}

MeshLambertMaterial.prototype = Object.create( Material.prototype );
MeshLambertMaterial.prototype.constructor = MeshLambertMaterial;

MeshLambertMaterial.prototype.isMeshLambertMaterial = true;

MeshLambertMaterial.prototype.copy = function ( source ) {

    Material.prototype.copy.call( this, source );

    this.color.copy( source.color );

    this.map = source.map;

    this.lightMap = source.lightMap;
    this.lightMapIntensity = source.lightMapIntensity;

    this.aoMap = source.aoMap;
    this.aoMapIntensity = source.aoMapIntensity;

    this.emissive.copy( source.emissive );
    this.emissiveMap = source.emissiveMap;
    this.emissiveIntensity = source.emissiveIntensity;

    this.specularMap = source.specularMap;

    this.alphaMap = source.alphaMap;

    this.envMap = source.envMap;
    this.combine = source.combine;
    this.reflectivity = source.reflectivity;
    this.refractionRatio = source.refractionRatio;

    this.wireframe = source.wireframe;
    this.wireframeLinewidth = source.wireframeLinewidth;
    this.wireframeLinecap = source.wireframeLinecap;
    this.wireframeLinejoin = source.wireframeLinejoin;

    this.skinning = source.skinning;
    this.morphTargets = source.morphTargets;
    this.morphNormals = source.morphNormals;

    return this;

};

//////////////////////////////////////////////////////////////////////////////////////////////////

function MeshDepthMaterial( parameters ) {

    Material.call( this );

    this.type = 'MeshDepthMaterial';

    this.depthPacking = BasicDepthPacking;

    this.skinning = false;
    this.morphTargets = false;

    this.map = null;

    this.alphaMap = null;

    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;

    this.wireframe = false;
    this.wireframeLinewidth = 1;

    this.fog = false;
    this.lights = false;

    this.setValues( parameters );

}

MeshDepthMaterial.prototype = Object.create( Material.prototype );
MeshDepthMaterial.prototype.constructor = MeshDepthMaterial;

MeshDepthMaterial.prototype.isMeshDepthMaterial = true;

MeshDepthMaterial.prototype.copy = function ( source ) {

    Material.prototype.copy.call( this, source );

    this.depthPacking = source.depthPacking;

    this.skinning = source.skinning;
    this.morphTargets = source.morphTargets;

    this.map = source.map;

    this.alphaMap = source.alphaMap;

    this.displacementMap = source.displacementMap;
    this.displacementScale = source.displacementScale;
    this.displacementBias = source.displacementBias;

    this.wireframe = source.wireframe;
    this.wireframeLinewidth = source.wireframeLinewidth;

    return this;

};

//////////////////////////////////////////////////////////////////////////////////////////////////

function MeshBasicMaterial( parameters ) {

    Material.call( this );

    this.type = 'MeshBasicMaterial';

    this.color = new Color( 0xffffff ); // emissive

    this.map = null;

    this.lightMap = null;
    this.lightMapIntensity = 1.0;

    this.aoMap = null;
    this.aoMapIntensity = 1.0;

    this.specularMap = null;

    this.alphaMap = null;

    this.envMap = null;
    this.combine = MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;

    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinecap = 'round';
    this.wireframeLinejoin = 'round';

    this.skinning = false;
    this.morphTargets = false;

    this.lights = false;

    this.setValues( parameters );

}

MeshBasicMaterial.prototype = Object.create( Material.prototype );
MeshBasicMaterial.prototype.constructor = MeshBasicMaterial;

MeshBasicMaterial.prototype.isMeshBasicMaterial = true;

MeshBasicMaterial.prototype.copy = function ( source ) {

    Material.prototype.copy.call( this, source );

    this.color.copy( source.color );

    this.map = source.map;

    this.lightMap = source.lightMap;
    this.lightMapIntensity = source.lightMapIntensity;

    this.aoMap = source.aoMap;
    this.aoMapIntensity = source.aoMapIntensity;

    this.specularMap = source.specularMap;

    this.alphaMap = source.alphaMap;

    this.envMap = source.envMap;
    this.combine = source.combine;
    this.reflectivity = source.reflectivity;
    this.refractionRatio = source.refractionRatio;

    this.wireframe = source.wireframe;
    this.wireframeLinewidth = source.wireframeLinewidth;
    this.wireframeLinecap = source.wireframeLinecap;
    this.wireframeLinejoin = source.wireframeLinejoin;

    this.skinning = source.skinning;
    this.morphTargets = source.morphTargets;

    return this;

};

//////////////////////////////////////////////////////////////////////////////////////////////////

function LineDashedMaterial( parameters ) {

    Material.call( this );

    this.type = 'LineDashedMaterial';

    this.color = new Color( 0xffffff );

    this.linewidth = 1;

    this.scale = 1;
    this.dashSize = 3;
    this.gapSize = 1;

    this.lights = false;

    this.setValues( parameters );

}

LineDashedMaterial.prototype = Object.create( Material.prototype );
LineDashedMaterial.prototype.constructor = LineDashedMaterial;

LineDashedMaterial.prototype.isLineDashedMaterial = true;

LineDashedMaterial.prototype.copy = function ( source ) {

    Material.prototype.copy.call( this, source );

    this.color.copy( source.color );

    this.linewidth = source.linewidth;

    this.scale = source.scale;
    this.dashSize = source.dashSize;
    this.gapSize = source.gapSize;

    return this;

};

//////////////////////////////////////////////////////////////////////////////////////////////////

function LineBasicMaterial( parameters ) {

    Material.call( this );

    this.type = 'LineBasicMaterial';

    this.color = new Color( 0xffffff );

    this.linewidth = 1;
    this.linecap = 'round';
    this.linejoin = 'round';

    this.lights = false;

    this.setValues( parameters );

}

LineBasicMaterial.prototype = Object.create( Material.prototype );
LineBasicMaterial.prototype.constructor = LineBasicMaterial;

LineBasicMaterial.prototype.isLineBasicMaterial = true;

LineBasicMaterial.prototype.copy = function ( source ) {

    Material.prototype.copy.call( this, source );

    this.color.copy( source.color );

    this.linewidth = source.linewidth;
    this.linecap = source.linecap;
    this.linejoin = source.linejoin;

    return this;

};

//////////////////////////////////////////////////////////////////////////////////////////////////

function MultiMaterial( materials ) {

    this.uuid = _Math.generateUUID();

    this.type = 'MultiMaterial';

    this.materials = Array.isArray( materials ) ? materials : [];

    this.visible = true;

}

Object.assign( MultiMaterial.prototype, {

    isMultiMaterial: true,

    toJSON: function ( meta ) {

        var output = {
            metadata: {
                version: 4.2,
                type: 'material',
                generator: 'MaterialExporter'
            },
            uuid: this.uuid,
            type: this.type,
            materials: []
        };

        var materials = this.materials;

        for ( var i = 0, l = materials.length; i < l; i ++ ) {

            var material = materials[ i ].toJSON( meta );
            delete material.metadata;

            output.materials.push( material );

        }

        output.visible = this.visible;

        return output;

    },

    clone: function () {

        var material = new this.constructor();

        for ( var i = 0; i < this.materials.length; i ++ ) {

            material.materials.push( this.materials[ i ].clone() );

        }

        material.visible = this.visible;

        return material;

    }

} );

//////////////////////////////////////////////////////////////////////////////////////////////////

var textureId = 0;

function Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding ) {

    Object.defineProperty( this, 'id', { value: textureId ++ } );

    this.uuid = _Math.generateUUID();

    this.name = '';

    this.image = image !== undefined ? image : Texture.DEFAULT_IMAGE;
    this.mipmaps = [];

    this.mapping = mapping !== undefined ? mapping : Texture.DEFAULT_MAPPING;

    this.wrapS = wrapS !== undefined ? wrapS : ClampToEdgeWrapping;
    this.wrapT = wrapT !== undefined ? wrapT : ClampToEdgeWrapping;

    this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;
    this.minFilter = minFilter !== undefined ? minFilter : LinearMipMapLinearFilter;

    this.anisotropy = anisotropy !== undefined ? anisotropy : 1;

    this.format = format !== undefined ? format : RGBAFormat;
    this.type = type !== undefined ? type : UnsignedByteType;

    this.offset = new Vector2( 0, 0 );
    this.repeat = new Vector2( 1, 1 );

    this.generateMipmaps = true;
    this.premultiplyAlpha = false;
    this.flipY = true;
    this.unpackAlignment = 4;	// valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)


    // Values of encoding !== THREE.LinearEncoding only supported on map, envMap and emissiveMap.
    //
    // Also changing the encoding after already used by a Material will not automatically make the Material
    // update.  You need to explicitly call Material.needsUpdate to trigger it to recompile.
    this.encoding = encoding !== undefined ? encoding : LinearEncoding;

    this.version = 0;
    this.onUpdate = null;

}

Texture.DEFAULT_IMAGE = undefined;
Texture.DEFAULT_MAPPING = UVMapping;

Object.defineProperty( Texture.prototype, "needsUpdate", {

    set: function(value) {

        if ( value === true ) this.version ++;

    }

});

Object.assign( Texture.prototype, EventDispatcher.prototype, {

    constructor: Texture,

    isTexture: true,

    clone: function () {

        return new this.constructor().copy( this );

    },

    copy: function ( source ) {

        this.name = source.name;

        this.image = source.image;
        this.mipmaps = source.mipmaps.slice( 0 );

        this.mapping = source.mapping;

        this.wrapS = source.wrapS;
        this.wrapT = source.wrapT;

        this.magFilter = source.magFilter;
        this.minFilter = source.minFilter;

        this.anisotropy = source.anisotropy;

        this.format = source.format;
        this.type = source.type;

        this.offset.copy( source.offset );
        this.repeat.copy( source.repeat );

        this.generateMipmaps = source.generateMipmaps;
        this.premultiplyAlpha = source.premultiplyAlpha;
        this.flipY = source.flipY;
        this.unpackAlignment = source.unpackAlignment;
        this.encoding = source.encoding;

        return this;

    },

    toJSON: function ( meta ) {

        if ( meta.textures[ this.uuid ] !== undefined ) {

            return meta.textures[ this.uuid ];

        }

        function getDataURL( image ) {

            var canvas;

            if ( image.toDataURL !== undefined ) {

                canvas = image;

            } else {

                canvas = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );
                canvas.width = image.width;
                canvas.height = image.height;

                canvas.getContext( '2d' ).drawImage( image, 0, 0, image.width, image.height );

            }

            if ( canvas.width > 2048 || canvas.height > 2048 ) {

                return canvas.toDataURL( 'image/jpeg', 0.6 );

            } else {

                return canvas.toDataURL( 'image/png' );

            }

        }

        var output = {
            metadata: {
                version: 4.4,
                type: 'Texture',
                generator: 'Texture.toJSON'
            },

            uuid: this.uuid,
            name: this.name,

            mapping: this.mapping,

            repeat: [ this.repeat.x, this.repeat.y ],
            offset: [ this.offset.x, this.offset.y ],
            wrap: [ this.wrapS, this.wrapT ],

            minFilter: this.minFilter,
            magFilter: this.magFilter,
            anisotropy: this.anisotropy,

            flipY: this.flipY
        };

        if ( this.image !== undefined ) {

            // TODO: Move to THREE.Image

            var image = this.image;

            if ( image.uuid === undefined ) {

                image.uuid = _Math.generateUUID(); // UGH

            }

            if ( meta.images[ image.uuid ] === undefined ) {

                meta.images[ image.uuid ] = {
                    uuid: image.uuid,
                    url: getDataURL( image )
                };

            }

            output.image = image.uuid;

        }

        meta.textures[ this.uuid ] = output;

        return output;

    },

    dispose: function () {

        this.dispatchEvent( { type: 'dispose' } );

    },

    transformUv: function ( uv ) {

        if ( this.mapping !== UVMapping ) return;

        uv.multiply( this.repeat );
        uv.add( this.offset );

        if ( uv.x < 0 || uv.x > 1 ) {

            switch ( this.wrapS ) {

                case RepeatWrapping:

                    uv.x = uv.x - Math.floor( uv.x );
                    break;

                case ClampToEdgeWrapping:

                    uv.x = uv.x < 0 ? 0 : 1;
                    break;

                case MirroredRepeatWrapping:

                    if ( Math.abs( Math.floor( uv.x ) % 2 ) === 1 ) {

                        uv.x = Math.ceil( uv.x ) - uv.x;

                    } else {

                        uv.x = uv.x - Math.floor( uv.x );

                    }
                    break;

            }

        }

        if ( uv.y < 0 || uv.y > 1 ) {

            switch ( this.wrapT ) {

                case RepeatWrapping:

                    uv.y = uv.y - Math.floor( uv.y );
                    break;

                case ClampToEdgeWrapping:

                    uv.y = uv.y < 0 ? 0 : 1;
                    break;

                case MirroredRepeatWrapping:

                    if ( Math.abs( Math.floor( uv.y ) % 2 ) === 1 ) {

                        uv.y = Math.ceil( uv.y ) - uv.y;

                    } else {

                        uv.y = uv.y - Math.floor( uv.y );

                    }
                    break;

            }

        }

        if ( this.flipY ) {

            uv.y = 1 - uv.y;

        }

    }

} );

//////////////////////////////////////////////////////////////////////////////////////////////////

function EventDispatcher() {}

Object.assign( EventDispatcher.prototype, {

    addEventListener: function ( type, listener ) {

        if ( this._listeners === undefined ) this._listeners = {};

        var listeners = this._listeners;

        if ( listeners[ type ] === undefined ) {

            listeners[ type ] = [];

        }

        if ( listeners[ type ].indexOf( listener ) === - 1 ) {

            listeners[ type ].push( listener );

        }

    },

    hasEventListener: function ( type, listener ) {

        if ( this._listeners === undefined ) return false;

        var listeners = this._listeners;

        return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;

    },

    removeEventListener: function ( type, listener ) {

        if ( this._listeners === undefined ) return;

        var listeners = this._listeners;
        var listenerArray = listeners[ type ];

        if ( listenerArray !== undefined ) {

            var index = listenerArray.indexOf( listener );

            if ( index !== - 1 ) {

                listenerArray.splice( index, 1 );

            }

        }

    },

    dispatchEvent: function ( event ) {

        if ( this._listeners === undefined ) return;

        var listeners = this._listeners;
        var listenerArray = listeners[ event.type ];

        if ( listenerArray !== undefined ) {

            event.target = this;

            var array = [], i = 0;
            var length = listenerArray.length;

            for ( i = 0; i < length; i ++ ) {

                array[ i ] = listenerArray[ i ];

            }

            for ( i = 0; i < length; i ++ ) {

                array[ i ].call( this, event );

            }

        }

    }

} );

//////////////////////////////////////////////////////////////////////////////////////////////////

function LoadingManager( onLoad, onProgress, onError ) {

    var scope = this;

    var isLoading = false, itemsLoaded = 0, itemsTotal = 0;

    this.onStart = undefined;
    this.onLoad = onLoad;
    this.onProgress = onProgress;
    this.onError = onError;

    this.itemStart = function ( url ) {

        itemsTotal ++;

        if ( isLoading === false ) {

            if ( scope.onStart !== undefined ) {

                scope.onStart( url, itemsLoaded, itemsTotal );

            }

        }

        isLoading = true;

    };

    this.itemEnd = function ( url ) {

        itemsLoaded ++;

        if ( scope.onProgress !== undefined ) {

            scope.onProgress( url, itemsLoaded, itemsTotal );

        }

        if ( itemsLoaded === itemsTotal ) {

            isLoading = false;

            if ( scope.onLoad !== undefined ) {

                scope.onLoad();

            }

        }

    };

    this.itemError = function ( url ) {

        if ( scope.onError !== undefined ) {

            scope.onError( url );

        }

    };

}

//////////////////////////////////////////////////////////////////////////////////////////////////

function FileLoader( manager ) {

    this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

}

Object.assign( FileLoader.prototype, {

    load: function ( url, onLoad, onProgress, onError ) {

        if ( url === undefined ) url = '';

        if ( this.path !== undefined ) url = this.path + url;

        var scope = this;

        var cached = Cache.get( url );

        if ( cached !== undefined ) {

            scope.manager.itemStart( url );

            setTimeout( function () {

                if ( onLoad ) onLoad( cached );

                scope.manager.itemEnd( url );

            }, 0 );

            return cached;

        }

        // Check for data: URI
        var dataUriRegex = /^data:(.*?)(;base64)?,(.*)$/;
        var dataUriRegexResult = url.match( dataUriRegex );

        // Safari can not handle Data URIs through XMLHttpRequest so process manually
        if ( dataUriRegexResult ) {

            var mimeType = dataUriRegexResult[ 1 ];
            var isBase64 = !! dataUriRegexResult[ 2 ];
            var data = dataUriRegexResult[ 3 ];

            data = window.decodeURIComponent( data );

            if ( isBase64 ) data = window.atob( data );

            try {

                var response;
                var responseType = ( this.responseType || '' ).toLowerCase();

                switch ( responseType ) {

                    case 'arraybuffer':
                    case 'blob':

                        response = new ArrayBuffer( data.length );

                        var view = new Uint8Array( response );

                        for ( var i = 0; i < data.length; i ++ ) {

                            view[ i ] = data.charCodeAt( i );

                        }

                        if ( responseType === 'blob' ) {

                            response = new Blob( [ response ], { type: mimeType } );

                        }

                        break;

                    case 'document':

                        var parser = new DOMParser();
                        response = parser.parseFromString( data, mimeType );

                        break;

                    case 'json':

                        response = JSON.parse( data );

                        break;

                    default: // 'text' or other

                        response = data;

                        break;

                }

                // Wait for next browser tick
                window.setTimeout( function () {

                    if ( onLoad ) onLoad( response );

                    scope.manager.itemEnd( url );

                }, 0 );

            } catch ( error ) {

                // Wait for next browser tick
                window.setTimeout( function () {

                    if ( onError ) onError( error );

                    scope.manager.itemError( url );

                }, 0 );

            }

        } else {

            var request = new XMLHttpRequest();
            request.open( 'GET', url, true );

            request.addEventListener( 'load', function ( event ) {

                var response = event.target.response;

                Cache.add( url, response );

                if ( this.status === 200 ) {

                    if ( onLoad ) onLoad( response );

                    scope.manager.itemEnd( url );

                } else if ( this.status === 0 ) {

                    // Some browsers return HTTP Status 0 when using non-http protocol
                    // e.g. 'file://' or 'data://'. Handle as success.

                    console.warn( 'THREE.FileLoader: HTTP Status 0 received.' );

                    if ( onLoad ) onLoad( response );

                    scope.manager.itemEnd( url );

                } else {

                    if ( onError ) onError( event );

                    scope.manager.itemError( url );

                }

            }, false );

            if ( onProgress !== undefined ) {

                request.addEventListener( 'progress', function ( event ) {

                    onProgress( event );

                }, false );

            }

            request.addEventListener( 'error', function ( event ) {

                if ( onError ) onError( event );

                scope.manager.itemError( url );

            }, false );

            if ( this.responseType !== undefined ) request.responseType = this.responseType;
            if ( this.withCredentials !== undefined ) request.withCredentials = this.withCredentials;

            if ( request.overrideMimeType ) request.overrideMimeType( this.mimeType !== undefined ? this.mimeType : 'text/plain' );

            request.send( null );

        }

        scope.manager.itemStart( url );

        return request;

    },

    setPath: function ( value ) {

        this.path = value;
        return this;

    },

    setResponseType: function ( value ) {

        this.responseType = value;
        return this;

    },

    setWithCredentials: function ( value ) {

        this.withCredentials = value;
        return this;

    },

    setMimeType: function ( value ) {

        this.mimeType = value;
        return this;

    }

} );

//////////////////////////////////////////////////////////////////////////////////////////////////

function ImageLoader( manager ) {

    this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

}

Object.assign( ImageLoader.prototype, {

    load: function ( url, onLoad, onProgress, onError ) {

        if ( url === undefined ) url = '';

        if ( this.path !== undefined ) url = this.path + url;

        var scope = this;

        var cached = Cache.get( url );

        if ( cached !== undefined ) {

            scope.manager.itemStart( url );

            setTimeout( function () {

                if ( onLoad ) onLoad( cached );

                scope.manager.itemEnd( url );

            }, 0 );

            return cached;

        }

        var image = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'img' );

        image.addEventListener( 'load', function () {

            Cache.add( url, this );

            if ( onLoad ) onLoad( this );

            scope.manager.itemEnd( url );

        }, false );

        /*
         image.addEventListener( 'progress', function ( event ) {

         if ( onProgress ) onProgress( event );

         }, false );
         */

        image.addEventListener( 'error', function ( event ) {

            if ( onError ) onError( event );

            scope.manager.itemError( url );

        }, false );

        if ( this.crossOrigin !== undefined ) image.crossOrigin = this.crossOrigin;

        scope.manager.itemStart( url );

        image.src = url;

        return image;

    },

    setCrossOrigin: function ( value ) {

        this.crossOrigin = value;
        return this;

    },

    setPath: function ( value ) {

        this.path = value;
        return this;

    }

} );

//////////////////////////////////////////////////////////////////////////////////////////////////

function TextureLoader( manager ) {

    this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

}

Object.assign( TextureLoader.prototype, {

    load: function ( url, onLoad, onProgress, onError ) {

        var texture = new Texture();

        //        [TV-PATCH] just return default texture instead of trying to access DOM in _server side...

//        var loader = new ImageLoader( this.manager );
//        loader.setCrossOrigin( this.crossOrigin );
//        loader.setPath( this.path );
//        loader.load( url, function ( image ) {
//
//            // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
//            var isJPEG = url.search( /\.(jpg|jpeg)$/ ) > 0 || url.search( /^data\:image\/jpeg/ ) === 0;
//
//            texture.format = isJPEG ? RGBFormat : RGBAFormat;
//            texture.image = image;
//            texture.needsUpdate = true;
//
//            if ( onLoad !== undefined ) {
//
//                onLoad( texture );
//
//            }
//
//        }, onProgress, onError );

        return texture;

    },

    setCrossOrigin: function ( value ) {

        this.crossOrigin = value;
        return this;

    },

    setPath: function ( value ) {

        this.path = value;
        return this;

    }

} );

//////////////////////////////////////////////////////////////////////////////////////////////////

function MaterialLoader( manager ) {

    this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;
    this.textures = {};

}

Object.assign( MaterialLoader.prototype, {

    load: function ( url, onLoad, onProgress, onError ) {

        var scope = this;

        var loader = new FileLoader( scope.manager );
        loader.load( url, function ( text ) {

            onLoad( scope.parse( JSON.parse( text ) ) );

        }, onProgress, onError );

    },

    setTextures: function ( value ) {

        this.textures = value;

    },

    parse: function ( json ) {

        var textures = this.textures;

        function getTexture( name ) {

            if ( textures[ name ] === undefined ) {

                console.warn( 'THREE.MaterialLoader: Undefined texture', name );

            }

            return textures[ name ];

        }

        var material = new Materials[ json.type ]();

        if ( json.uuid !== undefined ) material.uuid = json.uuid;
        if ( json.name !== undefined ) material.name = json.name;
        if ( json.color !== undefined ) material.color.setHex( json.color );
        if ( json.roughness !== undefined ) material.roughness = json.roughness;
        if ( json.metalness !== undefined ) material.metalness = json.metalness;
        if ( json.emissive !== undefined ) material.emissive.setHex( json.emissive );
        if ( json.specular !== undefined ) material.specular.setHex( json.specular );
        if ( json.shininess !== undefined ) material.shininess = json.shininess;
        if ( json.clearCoat !== undefined ) material.clearCoat = json.clearCoat;
        if ( json.clearCoatRoughness !== undefined ) material.clearCoatRoughness = json.clearCoatRoughness;
        if ( json.uniforms !== undefined ) material.uniforms = json.uniforms;
        if ( json.vertexShader !== undefined ) material.vertexShader = json.vertexShader;
        if ( json.fragmentShader !== undefined ) material.fragmentShader = json.fragmentShader;
        if ( json.vertexColors !== undefined ) material.vertexColors = json.vertexColors;
        if ( json.fog !== undefined ) material.fog = json.fog;
        if ( json.shading !== undefined ) material.shading = json.shading;
        if ( json.blending !== undefined ) material.blending = json.blending;
        if ( json.side !== undefined ) material.side = json.side;
        if ( json.opacity !== undefined ) material.opacity = json.opacity;
        if ( json.transparent !== undefined ) material.transparent = json.transparent;
        if ( json.alphaTest !== undefined ) material.alphaTest = json.alphaTest;
        if ( json.depthTest !== undefined ) material.depthTest = json.depthTest;
        if ( json.depthWrite !== undefined ) material.depthWrite = json.depthWrite;
        if ( json.colorWrite !== undefined ) material.colorWrite = json.colorWrite;
        if ( json.wireframe !== undefined ) material.wireframe = json.wireframe;
        if ( json.wireframeLinewidth !== undefined ) material.wireframeLinewidth = json.wireframeLinewidth;
        if ( json.wireframeLinecap !== undefined ) material.wireframeLinecap = json.wireframeLinecap;
        if ( json.wireframeLinejoin !== undefined ) material.wireframeLinejoin = json.wireframeLinejoin;
        if ( json.skinning !== undefined ) material.skinning = json.skinning;
        if ( json.morphTargets !== undefined ) material.morphTargets = json.morphTargets;

        // for PointsMaterial

        if ( json.size !== undefined ) material.size = json.size;
        if ( json.sizeAttenuation !== undefined ) material.sizeAttenuation = json.sizeAttenuation;

        // maps

        if ( json.map !== undefined ) material.map = getTexture( json.map );

        if ( json.alphaMap !== undefined ) {

            material.alphaMap = getTexture( json.alphaMap );
            material.transparent = true;

        }

        if ( json.bumpMap !== undefined ) material.bumpMap = getTexture( json.bumpMap );
        if ( json.bumpScale !== undefined ) material.bumpScale = json.bumpScale;

        if ( json.normalMap !== undefined ) material.normalMap = getTexture( json.normalMap );
        if ( json.normalScale !== undefined ) {

            var normalScale = json.normalScale;

            if ( Array.isArray( normalScale ) === false ) {

                // Blender exporter used to export a scalar. See #7459

                normalScale = [ normalScale, normalScale ];

            }

            material.normalScale = new Vector2().fromArray( normalScale );

        }

        if ( json.displacementMap !== undefined ) material.displacementMap = getTexture( json.displacementMap );
        if ( json.displacementScale !== undefined ) material.displacementScale = json.displacementScale;
        if ( json.displacementBias !== undefined ) material.displacementBias = json.displacementBias;

        if ( json.roughnessMap !== undefined ) material.roughnessMap = getTexture( json.roughnessMap );
        if ( json.metalnessMap !== undefined ) material.metalnessMap = getTexture( json.metalnessMap );

        if ( json.emissiveMap !== undefined ) material.emissiveMap = getTexture( json.emissiveMap );
        if ( json.emissiveIntensity !== undefined ) material.emissiveIntensity = json.emissiveIntensity;

        if ( json.specularMap !== undefined ) material.specularMap = getTexture( json.specularMap );

        if ( json.envMap !== undefined ) material.envMap = getTexture( json.envMap );

        if ( json.reflectivity !== undefined ) material.reflectivity = json.reflectivity;

        if ( json.lightMap !== undefined ) material.lightMap = getTexture( json.lightMap );
        if ( json.lightMapIntensity !== undefined ) material.lightMapIntensity = json.lightMapIntensity;

        if ( json.aoMap !== undefined ) material.aoMap = getTexture( json.aoMap );
        if ( json.aoMapIntensity !== undefined ) material.aoMapIntensity = json.aoMapIntensity;

        if ( json.gradientMap !== undefined ) material.gradientMap = getTexture( json.gradientMap );

        // MultiMaterial

        if ( json.materials !== undefined ) {

            for ( var i = 0, l = json.materials.length; i < l; i ++ ) {

                material.materials.push( this.parse( json.materials[ i ] ) );

            }

        }

        return material;

    }

} );

//////////////////////////////////////////////////////////////////////////////////////////////////

function Loader() {

    this.onLoadStart = function () {};
    this.onLoadProgress = function () {};
    this.onLoadComplete = function () {};

}

Loader.Handlers = {

    handlers: [],

    add: function ( regex, loader ) {

        this.handlers.push( regex, loader );

    },

    get: function ( file ) {

        var handlers = this.handlers;

        for ( var i = 0, l = handlers.length; i < l; i += 2 ) {

            var regex = handlers[ i ];
            var loader = handlers[ i + 1 ];

            if ( regex.test( file ) ) {

                return loader;

            }

        }

        return null;

    }

};

Object.assign( Loader.prototype, {

    crossOrigin: undefined,

    extractUrlBase: function ( url ) {

        var parts = url.split( '/' );

        if ( parts.length === 1 ) return './';

        parts.pop();

        return parts.join( '/' ) + '/';

    },

    initMaterials: function ( materials, texturePath, crossOrigin ) {

        var array = [];

        for ( var i = 0; i < materials.length; ++ i ) {

            array[ i ] = this.createMaterial( materials[ i ], texturePath, crossOrigin );

        }

        return array;

    },

    createMaterial: ( function () {

        var BlendingMode = {
            NoBlending: NoBlending,
            NormalBlending: NormalBlending,
            AdditiveBlending: AdditiveBlending,
            SubtractiveBlending: SubtractiveBlending,
            MultiplyBlending: MultiplyBlending,
            CustomBlending: CustomBlending
        };

        var color = new Color();
        var textureLoader = new TextureLoader();
        var materialLoader = new MaterialLoader();

        return function createMaterial( m, texturePath, crossOrigin ) {

            // convert from old material format

            var textures = {};

            function loadTexture( path, repeat, offset, wrap, anisotropy ) {

                var fullPath = texturePath + path;
                var loader = Loader.Handlers.get( fullPath );

                var texture;

                if ( loader !== null ) {

                    texture = loader.load( fullPath );

                } else {

                    textureLoader.setCrossOrigin( crossOrigin );
                    texture = textureLoader.load( fullPath );

                }

                if ( repeat !== undefined ) {

                    texture.repeat.fromArray( repeat );

                    if ( repeat[ 0 ] !== 1 ) texture.wrapS = RepeatWrapping;
                    if ( repeat[ 1 ] !== 1 ) texture.wrapT = RepeatWrapping;

                }

                if ( offset !== undefined ) {

                    texture.offset.fromArray( offset );

                }

                if ( wrap !== undefined ) {

                    if ( wrap[ 0 ] === 'repeat' ) texture.wrapS = RepeatWrapping;
                    if ( wrap[ 0 ] === 'mirror' ) texture.wrapS = MirroredRepeatWrapping;

                    if ( wrap[ 1 ] === 'repeat' ) texture.wrapT = RepeatWrapping;
                    if ( wrap[ 1 ] === 'mirror' ) texture.wrapT = MirroredRepeatWrapping;

                }

                if ( anisotropy !== undefined ) {

                    texture.anisotropy = anisotropy;

                }

                var uuid = _Math.generateUUID();

                textures[ uuid ] = texture;

                return uuid;

            }

            //

            var json = {
                uuid: _Math.generateUUID(),
                type: 'MeshLambertMaterial'
            };

            for ( var name in m ) {

                var value = m[ name ];

                switch ( name ) {

                    case 'DbgColor':
                    case 'DbgIndex':
                    case 'opticalDensity':
                    case 'illumination':
                        break;
                    case 'DbgName':
                        json.name = value;
                        break;
                    case 'blending':
                        json.blending = BlendingMode[ value ];
                        break;
                    case 'colorAmbient':
                    case 'mapAmbient':
                        console.warn( 'THREE.Loader.createMaterial:', name, 'is no longer supported.' );
                        break;
                    case 'colorDiffuse':
                        json.color = color.fromArray( value ).getHex();
                        break;
                    case 'colorSpecular':
                        json.specular = color.fromArray( value ).getHex();
                        break;
                    case 'colorEmissive':
                        json.emissive = color.fromArray( value ).getHex();
                        break;
                    case 'specularCoef':
                        json.shininess = value;
                        break;
                    case 'shading':
                        if ( value.toLowerCase() === 'basic' ) json.type = 'MeshBasicMaterial';
                        if ( value.toLowerCase() === 'phong' ) json.type = 'MeshPhongMaterial';
                        if ( value.toLowerCase() === 'standard' ) json.type = 'MeshStandardMaterial';
                        break;
                    case 'mapDiffuse':
                        json.map = loadTexture( value, m.mapDiffuseRepeat, m.mapDiffuseOffset, m.mapDiffuseWrap, m.mapDiffuseAnisotropy );
                        break;
                    case 'mapDiffuseRepeat':
                    case 'mapDiffuseOffset':
                    case 'mapDiffuseWrap':
                    case 'mapDiffuseAnisotropy':
                        break;
                    case 'mapEmissive':
                        json.emissiveMap = loadTexture( value, m.mapEmissiveRepeat, m.mapEmissiveOffset, m.mapEmissiveWrap, m.mapEmissiveAnisotropy );
                        break;
                    case 'mapEmissiveRepeat':
                    case 'mapEmissiveOffset':
                    case 'mapEmissiveWrap':
                    case 'mapEmissiveAnisotropy':
                        break;
                    case 'mapLight':
                        json.lightMap = loadTexture( value, m.mapLightRepeat, m.mapLightOffset, m.mapLightWrap, m.mapLightAnisotropy );
                        break;
                    case 'mapLightRepeat':
                    case 'mapLightOffset':
                    case 'mapLightWrap':
                    case 'mapLightAnisotropy':
                        break;
                    case 'mapAO':
                        json.aoMap = loadTexture( value, m.mapAORepeat, m.mapAOOffset, m.mapAOWrap, m.mapAOAnisotropy );
                        break;
                    case 'mapAORepeat':
                    case 'mapAOOffset':
                    case 'mapAOWrap':
                    case 'mapAOAnisotropy':
                        break;
                    case 'mapBump':
                        json.bumpMap = loadTexture( value, m.mapBumpRepeat, m.mapBumpOffset, m.mapBumpWrap, m.mapBumpAnisotropy );
                        break;
                    case 'mapBumpScale':
                        json.bumpScale = value;
                        break;
                    case 'mapBumpRepeat':
                    case 'mapBumpOffset':
                    case 'mapBumpWrap':
                    case 'mapBumpAnisotropy':
                        break;
                    case 'mapNormal':
                        json.normalMap = loadTexture( value, m.mapNormalRepeat, m.mapNormalOffset, m.mapNormalWrap, m.mapNormalAnisotropy );
                        break;
                    case 'mapNormalFactor':
                        json.normalScale = [ value, value ];
                        break;
                    case 'mapNormalRepeat':
                    case 'mapNormalOffset':
                    case 'mapNormalWrap':
                    case 'mapNormalAnisotropy':
                        break;
                    case 'mapSpecular':
                        json.specularMap = loadTexture( value, m.mapSpecularRepeat, m.mapSpecularOffset, m.mapSpecularWrap, m.mapSpecularAnisotropy );
                        break;
                    case 'mapSpecularRepeat':
                    case 'mapSpecularOffset':
                    case 'mapSpecularWrap':
                    case 'mapSpecularAnisotropy':
                        break;
                    case 'mapMetalness':
                        json.metalnessMap = loadTexture( value, m.mapMetalnessRepeat, m.mapMetalnessOffset, m.mapMetalnessWrap, m.mapMetalnessAnisotropy );
                        break;
                    case 'mapMetalnessRepeat':
                    case 'mapMetalnessOffset':
                    case 'mapMetalnessWrap':
                    case 'mapMetalnessAnisotropy':
                        break;
                    case 'mapRoughness':
                        json.roughnessMap = loadTexture( value, m.mapRoughnessRepeat, m.mapRoughnessOffset, m.mapRoughnessWrap, m.mapRoughnessAnisotropy );
                        break;
                    case 'mapRoughnessRepeat':
                    case 'mapRoughnessOffset':
                    case 'mapRoughnessWrap':
                    case 'mapRoughnessAnisotropy':
                        break;
                    case 'mapAlpha':
                        json.alphaMap = loadTexture( value, m.mapAlphaRepeat, m.mapAlphaOffset, m.mapAlphaWrap, m.mapAlphaAnisotropy );
                        break;
                    case 'mapAlphaRepeat':
                    case 'mapAlphaOffset':
                    case 'mapAlphaWrap':
                    case 'mapAlphaAnisotropy':
                        break;
                    case 'flipSided':
                        json.side = BackSide;
                        break;
                    case 'doubleSided':
                        json.side = DoubleSide;
                        break;
                    case 'transparency':
                        console.warn( 'THREE.Loader.createMaterial: transparency has been renamed to opacity' );
                        json.opacity = value;
                        break;
                    case 'depthTest':
                    case 'depthWrite':
                    case 'colorWrite':
                    case 'opacity':
                    case 'reflectivity':
                    case 'transparent':
                    case 'visible':
                    case 'wireframe':
                        json[ name ] = value;
                        break;
                    case 'vertexColors':
                        if ( value === true ) json.vertexColors = VertexColors;
                        if ( value === 'face' ) json.vertexColors = FaceColors;
                        break;
                    default:
                        console.error( 'THREE.Loader.createMaterial: Unsupported', name, value );
                        break;

                }

            }

            if ( json.type === 'MeshBasicMaterial' ) delete json.emissive;
            if ( json.type !== 'MeshPhongMaterial' ) delete json.specular;

            if ( json.opacity < 1 ) json.transparent = true;

            materialLoader.setTextures( textures );

            return materialLoader.parse( json );

        };

    } )()

} );

//////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

MTLLoader = function ( manager ) {

    this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

};

MTLLoader.prototype = {

    constructor: MTLLoader,

    /**
     * Loads and parses a MTL asset from a URL.
     *
     * @param {String} url - URL to the MTL file.
     * @param {Function} [onLoad] - Callback invoked with the loaded object.
     * @param {Function} [onProgress] - Callback for download progress.
     * @param {Function} [onError] - Callback for download errors.
     *
     * @see setPath setTexturePath
     *
     * note: In order for relative texture references to resolve correctly
     * you must call setPath and/or setTexturePath explicitly prior to load.
     */
    load: function ( url, onLoad, onProgress, onError ) {

        var scope = this;

        var loader = new FileLoader( this.manager );
        loader.setPath( this.path );
        loader.load( url, function ( text ) {

            onLoad( scope.parse( text ) );

        }, onProgress, onError );

    },

    /**
     * Set base path for resolving references.
     * If set this path will be prepended to each loaded and found reference.
     *
     * @see setTexturePath
     * @param {String} path
     *
     * @example
     *     mtlLoader.setPath( 'assets/obj/' );
     *     mtlLoader.load( 'my.mtl', ... );
     */
    setPath: function ( path ) {

        this.path = path;

    },

    /**
     * Set base path for resolving texture references.
     * If set this path will be prepended found texture reference.
     * If not set and setPath is, it will be used as texture base path.
     *
     * @see setPath
     * @param {String} path
     *
     * @example
     *     mtlLoader.setPath( 'assets/obj/' );
     *     mtlLoader.setTexturePath( 'assets/textures/' );
     *     mtlLoader.load( 'my.mtl', ... );
     */
    setTexturePath: function ( path ) {

        this.texturePath = path;

    },

    setBaseUrl: function ( path ) {

        console.warn( 'MTLLoader: .setBaseUrl() is deprecated. Use .setTexturePath( path ) for texture path or .setPath( path ) for general base path instead.' );

        this.setTexturePath( path );

    },

    setCrossOrigin: function ( value ) {

        this.crossOrigin = value;

    },

    setMaterialOptions: function ( value ) {

        this.materialOptions = value;

    },

    /**
     * Parses a MTL file.
     *
     * @param {String} text - Content of MTL file
     * @return {MTLLoader.MaterialCreator}
     *
     * @see setPath setTexturePath
     *
     * note: In order for relative texture references to resolve correctly
     * you must call setPath and/or setTexturePath explicitly prior to parse.
     */
    parse: function ( text ) {

        var lines = text.split( '\n' );
        var info = {};
        var delimiter_pattern = /\s+/;
        var materialsInfo = {};

        for ( var i = 0; i < lines.length; i ++ ) {

            var line = lines[ i ];
            line = line.trim();

            if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

                // Blank line or comment ignore
                continue;

            }

            var pos = line.indexOf( ' ' );

            var key = ( pos >= 0 ) ? line.substring( 0, pos ) : line;
            key = key.toLowerCase();

            var value = ( pos >= 0 ) ? line.substring( pos + 1 ) : '';
            value = value.trim();

            if ( key === 'newmtl' ) {

                // New material

                info = { name: value };
                materialsInfo[ value ] = info;

            } else if ( info ) {

                if ( key === 'ka' || key === 'kd' || key === 'ks' ) {

                    var ss = value.split( delimiter_pattern, 3 );
                    info[ key ] = [ parseFloat( ss[ 0 ] ), parseFloat( ss[ 1 ] ), parseFloat( ss[ 2 ] ) ];

                } else {

                    info[ key ] = value;

                }

            }

        }

        var materialCreator = new MTLLoader.MaterialCreator( this.texturePath || this.path, this.materialOptions );
        materialCreator.setCrossOrigin( this.crossOrigin );
        materialCreator.setManager( this.manager );
        materialCreator.setMaterials( materialsInfo );
        return materialCreator;

    }

};

/**
 * Create a new THREE-MTLLoader.MaterialCreator
 * @param baseUrl - Url relative to which textures are loaded
 * @param options - Set of options on how to construct the materials
 *                  side: Which side to apply the material
 *                        FrontSide (default), BackSide, DoubleSide
 *                  wrap: What type of wrapping to apply for textures
 *                        RepeatWrapping (default), ClampToEdgeWrapping, MirroredRepeatWrapping
 *                  normalizeRGB: RGBs need to be normalized to 0-1 from 0-255
 *                                Default: false, assumed to be already normalized
 *                  ignoreZeroRGBs: Ignore values of RGBs (Ka,Kd,Ks) that are all 0's
 *                                  Default: false
 * @constructor
 */

MTLLoader.MaterialCreator = function ( baseUrl, options ) {

    this.baseUrl = baseUrl || '';
    this.options = options;
    this.materialsInfo = {};
    this.materials = {};
    this.materialsArray = [];
    this.nameLookup = {};

    this.side = ( this.options && this.options.side ) ? this.options.side : FrontSide;
    this.wrap = ( this.options && this.options.wrap ) ? this.options.wrap : RepeatWrapping;

};

MTLLoader.MaterialCreator.prototype = {

    constructor: MTLLoader.MaterialCreator,

    setCrossOrigin: function ( value ) {

        this.crossOrigin = value;

    },

    setManager: function ( value ) {

        this.manager = value;

    },

    setMaterials: function ( materialsInfo ) {

        this.materialsInfo = this.convert( materialsInfo );
        this.materials = {};
        this.materialsArray = [];
        this.nameLookup = {};

    },

    convert: function ( materialsInfo ) {

        if ( ! this.options ) return materialsInfo;

        var converted = {};

        for ( var mn in materialsInfo ) {

            // Convert materials info into normalized form based on options

            var mat = materialsInfo[ mn ];

            var covmat = {};

            converted[ mn ] = covmat;

            for ( var prop in mat ) {

                var save = true;
                var value = mat[ prop ];
                var lprop = prop.toLowerCase();

                switch ( lprop ) {

                    case 'kd':
                    case 'ka':
                    case 'ks':

                        // Diffuse color (color under white light) using RGB values

                        if ( this.options && this.options.normalizeRGB ) {

                            value = [ value[ 0 ] / 255, value[ 1 ] / 255, value[ 2 ] / 255 ];

                        }

                        if ( this.options && this.options.ignoreZeroRGBs ) {

                            if ( value[ 0 ] === 0 && value[ 1 ] === 0 && value[ 2 ] === 0 ) {

                                // ignore

                                save = false;

                            }

                        }

                        break;

                    default:

                        break;

                }

                if ( save ) {

                    covmat[ lprop ] = value;

                }

            }

        }

        return converted;

    },

    preload: function () {

        for ( var mn in this.materialsInfo ) {

            this.create( mn );

        }

    },

    getIndex: function ( materialName ) {

        return this.nameLookup[ materialName ];

    },

    getAsArray: function () {

        var index = 0;

        for ( var mn in this.materialsInfo ) {

            this.materialsArray[ index ] = this.create( mn );
            this.nameLookup[ mn ] = index;
            index ++;

        }

        return this.materialsArray;

    },

    create: function ( materialName ) {

        if ( this.materials[ materialName ] === undefined ) {

            this.createMaterial_( materialName );

        }

        return this.materials[ materialName ];

    },

    createMaterial_: function ( materialName ) {

        // Create material

        var scope = this;
        var mat = this.materialsInfo[ materialName ];
        var params = {

            name: materialName,
            side: this.side

        };

        function resolveURL( baseUrl, url ) {

            if ( typeof url !== 'string' || url === '' )
                return '';

            // Absolute URL
            if ( /^https?:\/\//i.test( url ) ) return url;

            return baseUrl + url;

        }

        function setMapForType( mapType, value ) {

            if ( params[ mapType ] ) return; // Keep the first encountered texture

            var texParams = scope.getTextureParams( value, params );
            var map = scope.loadTexture( resolveURL( scope.baseUrl, texParams.url ) );

            map.repeat.copy( texParams.scale );
            map.offset.copy( texParams.offset );

            map.wrapS = scope.wrap;
            map.wrapT = scope.wrap;

            params[ mapType ] = map;

        }

        for ( var prop in mat ) {

            var value = mat[ prop ];

            if ( value === '' ) continue;

            switch ( prop.toLowerCase() ) {

                // Ns is material specular exponent

                case 'kd':

                    // Diffuse color (color under white light) using RGB values

                    params.color = new Color().fromArray( value );

                    break;

                case 'ks':

                    // Specular color (color when light is reflected from shiny surface) using RGB values
                    params.specular = new Color().fromArray( value );

                    break;

                case 'map_kd':

                    // Diffuse texture map

                    setMapForType( "map", value );

                    break;

                case 'map_ks':

                    // Specular map

                    setMapForType( "specularMap", value );

                    break;

                case 'map_bump':
                case 'bump':

                    // Bump texture map

                    setMapForType( "bumpMap", value );

                    break;

                case 'ns':

                    // The specular exponent (defines the focus of the specular highlight)
                    // A high exponent results in a tight, concentrated highlight. Ns values normally range from 0 to 1000.

                    params.shininess = parseFloat( value );

                    break;

                case 'd':

                    if ( value < 1 ) {

                        params.opacity = value;
                        params.transparent = true;

                    }

                    break;

                case 'Tr':

                    if ( value > 0 ) {

                        params.opacity = 1 - value;
                        params.transparent = true;

                    }

                    break;

                default:
                    break;

            }

        }

        this.materials[ materialName ] = new MeshPhongMaterial( params );
        return this.materials[ materialName ];

    },

    getTextureParams: function ( value, matParams ) {

        var texParams = {

            scale: new Vector2( 1, 1 ),
            offset: new Vector2( 0, 0 )

        };

        var items = value.split( /\s+/ );
        var pos;

        pos = items.indexOf( '-bm' );

        if ( pos >= 0 ) {

            matParams.bumpScale = parseFloat( items[ pos + 1 ] );
            items.splice( pos, 2 );

        }

        pos = items.indexOf( '-s' );

        if ( pos >= 0 ) {

            texParams.scale.set( parseFloat( items[ pos + 1 ] ), parseFloat( items[ pos + 2 ] ) );
            items.splice( pos, 4 ); // we expect 3 parameters here!

        }

        pos = items.indexOf( '-o' );

        if ( pos >= 0 ) {

            texParams.offset.set( parseFloat( items[ pos + 1 ] ), parseFloat( items[ pos + 2 ] ) );
            items.splice( pos, 4 ); // we expect 3 parameters here!

        }

        texParams.url = items.join( ' ' ).trim();
        return texParams;

    },

    loadTexture: function ( url, mapping, onLoad, onProgress, onError ) {

        var texture;
        var loader = Loader.Handlers.get( url );
        var manager = ( this.manager !== undefined ) ? this.manager : DefaultLoadingManager;

        if ( loader === null ) {

            loader = new TextureLoader( manager );

        }

        if ( loader.setCrossOrigin ) loader.setCrossOrigin( this.crossOrigin );
        texture = loader.load( url, onLoad, onProgress, onError );

        if ( mapping !== undefined ) texture.mapping = mapping;

//        [TV-PATCH] set url as name to load it on client side
        texture.name = getFileName( url )

        return texture;

        function getFileName( url ) {

            var splits = url.split('\\')
            var numberOfSplits = splits.length

            return splits[ numberOfSplits - 1 ]

        }

    }

};

module.exports = MTLLoader
