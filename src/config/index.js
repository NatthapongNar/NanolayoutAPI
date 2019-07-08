export const configAccessHeader = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type', 'x-access-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Charset', 'UTF-8');
    next();
}

const server_name_p = ''
const server_name_u = ''

const database_name_pcis = ''
const database_name_nano = ''

const server_user = ''
const server_pass = ''

export const config = {
    hostname: 'http://localhost',
    servername: 'localhost',
    port: 5090,
    database: {
        pcis: {
            server: server_name_p,
            database: database_name_pcis,
            user: server_user,
            password: server_pass,
            connectionTimeout: 50000,
            parseJSON: true,
            option: { encrypt: false }
        },
        nano: {
            server: server_name_u,
            database: database_name_nano,
            user: server_user,
            password: server_pass,
            connectionTimeout: 50000,
            parseJSON: true,
            option: { encrypt: false }
        }
    }
}