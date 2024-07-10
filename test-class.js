import http from 'k6/http';
import { sleep, check } from 'k6'

export const options = {
    // vus: 30,
    // duration: '30s'
    stages: [
        { duration: '10s', target: 5 },
        { duration: '15s', target: 10 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 200'],
        checks: ['rate > 0.9'],
    }
}

export default function () {
    const res =  http.get('https://test.k6.io');
    check(res, {
        "response code was 200": (res) => res.status == 200
    })
    sleep(1)
}