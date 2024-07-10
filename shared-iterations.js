import http from 'k6/http'
import { sleep } from 'k6'

export const options = {

    /*shared iterations 
    1. quando deseja que um numero especifico de vus
       complete um numero especifico de iteracoes
    2. Quantidade de iteracoes por VU nao é importante
    3. Tempo para concluir uma serie de iterações é importante
    
    per-vu-iterations
    1. numero especifico de VUs para completar o mesmo numero fixo de iterações
    2. particionar dados de teste entre as VUs

    constant-vus
    1. numero especifico de vus seja executado em um perio especificado de tempo

    constante-arrival-rate
    1. executor com foco em métricas como o RPS 
    
    */

    // scenarios: {
    //     contacts: {
    //         executor:'shared-iterations',
    //         vus:10,
    //         iterations:200,
    //         maxDuration:'30s'
    //     }
    // }
    // scenarios: {
    //     contacts: {
    //         executor:'per-vu-iterations',
    //         vus:10,
    //         iterations:20,
    //         maxDuration:'30s',
    //     }
    // }
    // scenarios: {
    //     contacts: {
    //         executor:'constant-vus',
    //         vus:10,
    //         duration:'30s',
    //     }
    // }
    scenarios: {
        contacts: {
            executor:'constant-arrival-rate',
            duration:'30s',
            rate:30,
            timeUnit: '1s',
            preAllocatedVUs: 50
        }
    }
}

export default function(){
    http.get('http://k6.io')
    sleep(0.5)
    
}