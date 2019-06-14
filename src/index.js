const fs = require('fs');
const replacer = require('replace-by-map');
const batchParser = require('batch-var-parser');

module.exports = (json, batchFile = null ) =>{
    
    let mapVars = new Map();
    const HANDLER = {
        STRING : ( s )=>{
            
            if( fs.existsSync( s ) ){
                s = fs.readFileSync(s, 'utf8') ;
            }
            try{
                var parsedJson = JSON.parse( replacer.exec( s, mapVars, '%' ) ) ;
                return parsedJson;
            } catch(e){
                throw new Error( ` File not found: ${s}`);
            }
            
        },
        OBJECT : ( json )=>{
            return HANDLER.STRING( JSON.stringify( json ) );
        }
    }

    if( batchFile !== null && !fs.existsSync(batchFile)){
        throw new Error( `Unable to read batch file : ${batchFile}` );
    }
    mapVars = new Map();
    var type = (typeof json).toUpperCase();

    if( batchFile !== null && fs.existsSync(batchFile)){
        mapVars = batchParser.extract( batchFile )
    }
    
    return  HANDLER[type](json);
    
    
        
}