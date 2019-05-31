const fs = require('fs');
const replacer = require('replace-by-map');
const batchParser = require('batch-var-parser');

module.exports = async (json, batchFile ) =>{
    
    let mapVars = new Map();
    const HANDLER = {
        STRING : ( s )=>{
            return new Promise((resolve, reject)=>{
                if( !s.match(/\.json/i) ){
                    resolve ( JSON.parse( replacer.exec( s, mapVars, '%' ) ) ) ;
                    return;    
                }
                if( !fs.existsSync( s ) ){
                    reject(` File not found: ${s}`);
                    return;
                }

                HANDLER.STRING( fs.readFileSync(s, 'utf8')).then(resolve);
            });
        },
        OBJECT : ( json )=>{
            return HANDLER.STRING( JSON.stringify( json ) );
        }
    }

    return new Promise( async (resolve, reject)=>{
        if( !fs.existsSync(batchFile)){
            reject(`Unable to read batch file : ${batchFile}`);
        }
        mapVars = await batchParser.extract( batchFile );
        var type = (typeof json).toUpperCase();
        HANDLER[type](json).then(resolve)
  
    })    
}