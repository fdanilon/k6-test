/*

registration e auth: buscar crocodilos
-realizar o a busca de todos os crocodilos e busca por id
- é esperado um rps de 200 req/s para a api de listagem de crocodilos durante 30seg
- para busca por id, o sistema deve atender 50 usuarios onde
cada usuario realiza ate 20 solicitações em ate 1 min
    - crocodilos par devem realizar buscar ao crocodilo de id de 2
    - crocodilos impar devem realizar buscar ao crocodilo de id de 1

- ambos os testes devem ser executados simultanemente

*/

import http from 'k6/http';

const BASE_URL = 'https://test-api.k6.io'

export const options = {
    scenarios: {
        listar: {
            executor: 'constant-arrival-rate',
            exec: 'listar',
            duration: '30s',
            rate:200,
            timeUnit: '1s',
            preAllocatedVUs: 150,
            gracefulStop: '10s',
            tags: { test_type: 'listagem_crocodilos'}
        },
        buscar: {
            executor: 'per-vu-iterations',
            exec: 'buscar',
            vus: 50,
            iterations: 20,
            maxDuration: '1m',
            gracefulStop: '10s',
            tags: { test_type: 'busca_crocodilos'}
        }
    }
};

export function listar() {
    http.get(`${BASE_URL}/public/crocodiles`)
}

export function buscar() {
    if(__VU % 2 === 0 ){
        http.get(`${BASE_URL}/public/crocodiles/2`)
    } else {
        http.get(`${BASE_URL}/public/crocodiles/1`)
    }
    
}


