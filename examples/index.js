const merge = require('../src/index');

var myJson = {
    connections:{
        webservice:{
            ip    :"%SERVER_IP%",
            port  :"%SERVER_PORT%"
        }
    }
};


    var uno = merge( myJson , __dirname + '\\myVars.bat'  );

    var duo = merge( __dirname + '\\myConfig.json', __dirname + '\\myVars.bat'  );

    var foo = merge( __dirname + '\\myConfig.json'  );
    console.log(  uno, duo, foo)



