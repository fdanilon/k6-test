import http from 'k6/http'
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.4.0/aws.js'
import runTest from './aula1.js'
import { check } from 'k6'

export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: [{threshold:'p(95) < 200', abortOnFaile:true, delayAbortEval: '10s'}],
        checks: ['rate > 0.99']
      },
}

export default function(){
    const res = http.get('http://k6.io')    
    check(res, {
        'status code = 200': (r) => r.status === 200
    })
}