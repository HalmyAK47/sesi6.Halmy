const Ajv = require("ajv");
const ajv = new Ajv()
const ajvFormats = require('ajv-formats');
ajvFormats(ajv);
const assert = require("assert");

const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "data": {
            "type": "object",
            "properties": {
                "id": { "type": "integer" },
                "email": { "type": "string", "format": "email" },
                "first_name": { "type": "string" },
                "last_name": { "type": "string" },
                "avatar": { "type": "string", "format": "uri" }
            },
            "required": ["id", "email", "first_name", "last_name", "avatar"],
            "additionalProperties": false
        },
        "support": {
            "type": "object",
            "properties": {
                "url": { "type": "string", "format": "uri" },
                "text": { "type": "string" }
            },
            "required": ["url", "text"],
            "additionalProperties": false
        }
    },
    "required": ["data", "support"],
    "additionalProperties": false
};

describe('Validation get and JSON Schema', function () {

    it('User get detail Booking should be sucess', async function () {
        this.timeout(1000)
        const response = await fetch('https://reqres.in/api/users/2')

        // Untuk mencetak response API
        const Responsedata = await response.json()
        console.log("Response GET:")
        console.log(JSON.stringify(Responsedata,["id","email","first_name","last_name","data"], 1));
           
        assert.strictEqual(response.status, 200, "Status harus 200");

    })

    it('JSON Schema', async function () {
            //this.timeout(10000)
            const response = await fetch('https://reqres.in/api/users/2')
        
            const data = await response.json()
            const validate = ajv.compile(schema);
    
            // Jalankan validasi, hasilnya true/false
            const valid = validate(data);
            if (!valid) {
               // Menampilkan error jika muncul error
               console.log(validate.errors);
               }
               // Ikut tampil karena tidak menggunakan else
               console.log("Response JSON:")
               console.log(JSON.stringify(data,null, 1));

               assert.ok(valid, "Response JSON harus sesuai dengan schema");
    
        })

})



