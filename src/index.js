const fs = require('fs');
const replacer = require('replace-by-map');
const batchParser = require('batch-var-parser');


module.exports = async (json, batchFile = null ) =>{
    
    let mapVars = new Map();
    const HANDLER = {
        STRING : ( s )=>{
            return new Promise((resolve, reject)=>{
                if( fs.existsSync( s ) ){
                    s = fs.readFileSync(s, 'utf8') ;
                }
                try{
                    var parsedJson = JSON.parse( replacer.exec( s, mapVars, '%' ) ) ;
                    resolve(parsedJson) ;
                    return;
                } catch(e){
                    reject(` File not found: ${s}`);
                }
            });
        },
        OBJECT : ( json )=>{
            return HANDLER.STRING( JSON.stringify( json ) );
        }
    }

    return new Promise( async (resolve, reject)=>{
        
        if( batchFile !== null && !fs.existsSync(batchFile)){
            reject(`Unable to read batch file : ${batchFile}`);
        }
        mapVars = new Map();
    
        if( batchFile !== null && fs.existsSync(batchFile)){
            mapVars = await batchParser.extract( batchFile );
        }
        var type = (typeof json).toUpperCase();
        HANDLER[type](json).then(resolve)
        
    })    
}