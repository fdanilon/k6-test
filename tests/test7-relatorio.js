import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


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

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }