import http from 'k6/http'
import { check } from 'k6'
import { group } from 'k6';

export const options = {
    vus: 4,
    duration: '3s',
    thresholds: {
        'http_req_duration{tipo:busca-todos}':['p(95) < 500']
      },
}

export default function(){

    group('grupo 1', function() {
        const res = http.get('http://k6.io', {
            tags: {
                tipo:"busca-todos"
            }
        })

        check(res, {
            'status code = 200': (r) => r.status === 200
        })
    })

    group('grupo 2', function() {
        const res = http.get('http://k6.io')    
        check(res, {
            'status code = 200': (r) => r.status === 200
        })
    })
    
}