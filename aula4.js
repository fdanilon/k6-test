import http from 'k6/http'
import { Counter, Gauge, Rate, Trend } from 'k6/metrics'

export const options = {
    vus: 2,
    duration: '3s'
}

const chamadas = new Counter('quantidade')
const myGauge = new Gauge('Tempo_bloqueado')
const myRate = new Rate('taxa_req_200')
const myTrend = new Trend('taxa_espera')

export default function(){
    const req = http.get('http://k6.io')
    chamadas.add(1)
    myGauge.add(req.timings.blocked)
    myRate.add(req.status === 200)
    myTrend.add(req.timings.waiting)
}