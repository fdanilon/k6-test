/*

registration e auth: registro
-realizar registro de um novo usuario
-performance test
    - carga 10 vu por 10s
-limites
    - requisição com falha < 1%
    - duracao requisicao p(95) < 500
    - requisicao com sucesso superior a 95%

*/

import http from 'k6/http'
import { check, sleep } from 'k6'
import { SharedArray } from 'k6/data'

export const options = {
    stages: [
        { duration: '10s', target: 10 },
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 200'],
        http_req_failed: ['rate < 0.01']
    }
}

const data = new SharedArray('Leitura do json', function() {
    return JSON.parse(open('./dados.json')).crocodilos
})

export default function () {
    const BASE_URL = 'http://localhost:3000';
    const user = `${Math.random().toString(36).substring(2)}@mail.com`;
    const pass = "user123";
    const data = {
        nome: user,
        email: user,
        password: pass,
        administrador: "true"
    };

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    console.log(user+","+pass)
    const res = http.post(`${BASE_URL}/usuarios`, JSON.stringify(data), params);

    check(res, {
        'status code 201': (r) => r.status === 201,
    });

    sleep(1);
}