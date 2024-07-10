import http from 'k6/http'
import { check } from 'k6'
import { group } from 'k6';

export const options = {
    vus: 4,
    duration: '3s'
}

export default function(){

    const BASE_URL = __ENV.URL
       const res = http.get(BASE_URL)

        check(res, {
            'status code = 200': (r) => r.status === 200
        })
}
    
