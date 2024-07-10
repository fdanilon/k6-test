/*

registration e auth: login
-realizar o login com um novo usuario
-stress test
    - ramp up 5 vu em 5s
    - carga 5 vu por 5s
    - ramp 50 vu em 2s
    - carga de 50 vu em 2s
    - ramp down 0 vu em 5s
-limites
    - requisição com falha < 1%

*/

import http from 'k6/http'
import { check, sleep } from 'k6'
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'

export const options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '5s', target: 5 },
        { duration: '2s', target: 50 },
        { duration: '2s', target: 50 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_failed: ['rate < 0.01']
    }
}

const csv_data = new SharedArray('Ler dados', function(){
    return papaparse.parse(open('usuarios.csv'), { header: true }).data
})

export default function () {
    const BASE_URL = 'http://localhost:3000';

    const data = {
        email: csv_data[Math.floor(Math.random() * csv_data.length)].email,
        password: "user123"
    };

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const res = http.post(`${BASE_URL}/login`, JSON.stringify(data), params);

    check(res, {
        'status code 200': (r) => r.status === 200,
        'token': (r) => r.json('authorization') !== ''
    });

    sleep(1);
}