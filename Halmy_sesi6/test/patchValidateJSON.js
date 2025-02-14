const Ajv = require("ajv");
const ajv = new Ajv()
const ajvFormats = require('ajv-formats');
ajvFormats(ajv);
const assert = require("assert");

const schema = {
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "job": { "type": "string" }
    },
    "required": ["name", "job"],  // Hanya name dan job yang wajib
    "additionalProperties": false
}

describe('Update User', function () {

    it('User Update should be success', async function () {
        this.timeout(10000)
        const requestData = {
            "name": "Halmy",
            "job": "QA Engineer"
        };

        const response = await fetch('https://reqres.in/api/users/2', 
            {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const Responsedata = await response.json()
        console.log("Response PATCH:")
        console.log(JSON.stringify(Responsedata,null, 1));

        // Untuk assert job sama dengan 'QA Engineer'
        assert.strictEqual(requestData.job, "QA Engineer");
    })

    it('JSON Schema', async function () {
                this.timeout(10000)
                //jika menggunakan body tidak perlu menggunakan await fetch
                // const response = await fetch('https://reqres.in/api/users/2')
                // const data = await response.json()

                const requestBody = {
                    "name": "Halmy",
                    "job": "QA Engineer"
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