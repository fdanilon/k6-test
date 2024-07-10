//inicialização
import sleep from 'k6';

//configuração
export const options = {
    vus: 1,
    duration: '10s'
}
// execução
export default function(){
    console.log("testando o k6")
    sleep(1)
}

//desmontagem
export function teardown(data){
    console.log(data)
}