const Ajv = require("ajv");
const ajv = new Ajv()
const ajvFormats = require('ajv-formats');
ajvFormats(ajv);
const assert = require("assert");

const schema = {
}

describe('Delete User', function () {

    it('User Delete should be success', async function () {
        this.timeout(10000)
        const response = await fetch('https://reqres.in/api/users/2');
        const Responsedata = await response.json()

        console.log("Response Delete:")
        console.log(JSON.stringify(Responsedata,null, 1));
         assert.strictEqual(response.status, 200, "Status harus 202");
    })

    it('JSON Schema', async function () {
                this.timeout(10000)
                const response = await fetch('https://reqres.in/api/users/2')
                const data = await response.json()

                const validate = ajv.compile(schema);
                const valid = validate(data);

                // Jalankan validasi, hasilnya true/false
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