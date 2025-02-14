const Ajv = require("ajv");
const ajv = new Ajv()
const ajvFormats = require('ajv-formats');
ajvFormats(ajv);
const assert = require("assert");

const schema = {
    "type": "object",
    "properties": {
        "email": { "type": "string" },
        "password": { "type": "string" }
    },
    "required": ["email", "password"],  // Hanya email dan password yang wajib
    "additionalProperties": false
}

describe('Create User', function () {

    it('User Create should be success', async function () {
        this.timeout(10000)
        const requestData = {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        };

        const response = await fetch('https://reqres.in/api/register', 
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const Responsedata = await response.json()
        console.log("Response POST:")
        console.log(JSON.stringify(Responsedata,null, 1));

        // Untuk assert email sama dengan 'eve.holt@reqres.in'
        assert.strictEqual(requestData.email, "eve.holt@reqres.in");
    })

    it('JSON Schema', async function () {
                this.timeout(10000)
                //jika menggunakan body tidak perlu menggunakan await fetch
                // const response = await fetch('https://reqres.in/api/register')
                // const data = await response.json()

                const requestBody = {
                    "email": "eve.holt@reqres.in",
                    "password": "pistol"
                }

                const validate = ajv.compile(schema);
                const valid = validate(requestBody);

                // Jalankan validasi, hasilnya true/false
                if (!valid) {
                   // Menampilkan error jika muncul error
                   console.log(validate.errors);
                   }
                   // Ikut tampil karena tidak menggunakan else
                   console.log("Response JSON:")
                   console.log(JSON.stringify(requestBody,null, 1));
    
                   assert.ok(valid, "Response JSON harus sesuai dengan schema");
            })

})