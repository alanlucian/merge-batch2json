const merge = require('../src/index');

var myJson = {
    connections:{
        webservice:{
            ip    :"%SERVER_IP%",
            port  :"%SERVER_PORT%"
        }
    }
};
(async ()=>{

    var uno = await merge( myJson , __dirname + '\\myVars.bat'  );

    var duo =  await merge( __dirname + '\\myConfig.json', __dirname + '\\myVars.bat'  );

    console.log(  uno, duo)
})()


