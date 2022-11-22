import {Action} from './actions'

export interface TokenState 
{
    tokens: string,
    id: string
}

const initialState = { //valor inicial vazio
    tokens: '',
    id: ''
}

//1 param recebe o state da aplicação e o 2 param é a alteração que vai acontecer nessa aplica
export const tokensReducer = (state: TokenState = initialState, action: Action) => { //variavel vai ser do tipo da model toekstate e tem valor vazio
    switch (action.type) //verificar o tipo da action - quando executar adiciona 
    {
        case "ADD_TOKEN": // se for desse tipo, o retorno vai ser o "tokens" recebendo o payload do actions, que é o token em si-preenchendo o tokens com o token pra autenticar a api
        {
            return {tokens: action.payload, id: state.id}
        }
        case "ADD_ID": 
        {
            return {id: action.payload, tokens: state.tokens}
        }
		default: return state //se nao tiver mais nada retorna ao estado original(vazio)
    }
}