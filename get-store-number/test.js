//import your handler file
let handler = require('./main');

// get .env variables
const dotenv = require('dotenv');
const result = dotenv.config({path: '../../.env'});
const { parsed: envs } = result;
console.log(envs);

// {context, event, callback}
handler.handler({
        ACCOUNT_SID: envs.ACCOUNT_SID,
        AUTH_TOKEN: envs.AUTH_TOKEN,
        AIRTABLE_API_KEY: envs.AIRTABLE_API_KEY,
        AIRTABLE_TABLE_NAME: envs.AIRTABLE_TABLE_NAME,
        AIRTABLE_BASE_ID: envs.AIRTABLE_BASE_ID
    }, // context
    {
        "Body": "654321"
    }, // event 
    (error, result) => {
        if (error) console.error(JSON.stringify(error, null, 2));
        else console.log(JSON.stringify(result, null, 2));
    }
);