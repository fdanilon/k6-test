/*

registration e auth: buscar usuarios
-realizar o a busca de todos os usuarios
-performance test test
    - 100 vu por 10s
-limites
    - requisição com falha < 1%

*/

import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    vus: 100,
    duration: '10s',
    thresholds: {
        http_req_failed: ['rate < 0.001'],
        http_req_duration: ['p(95) < 250']
    }
}



// pra buscar o token
// export function setup(){
//     const loginRes = http.post(URL, { 
//         username: '',
//         password: ''
//     })

//     const token = loginRes.json(nome da propriedade to token)
// }

//quando precisar de token de autenticacao

// const params = {
//     headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'
//     }
// }


export default function () {
    const BASE_URL = 'http://localhost:3000';

    const res = http.get(`${BASE_URL}/usuarios`);

    check(res, {
        'status code 200': (r) => r.status === 200
    });

    sleep(1);
}