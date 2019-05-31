# replace by map
Replace string data with data from Map and a given pattern


Install using:

```
npm install merge-batch2json --save
```


Simple usage :

```js
const merge = require('merge-batch2json');
var configData = await merge( __dirname + '\\myConfig.json', __dirname + '\\myVars.bat'  );
 ```

The myConfig.json has the following content:
```js
{
    "connections":{
        "webservice":{
            "ip"    :"%SERVER_IP%",
            "port"  :"%SERVER_PORT%"
        }
    }
}
```

myVars.bat has the following content:
```
@ECHO OFF
cd %~dp0
SET SERVER_IP= 127.0.0.1
SET SERVER_PORT= 1234
```

The result output will be:

```json
{
    "connections":{
        "webservice":{
            "ip"    :"127.0.0.1",
            "port"  :"1234"
        }
    }
}
```