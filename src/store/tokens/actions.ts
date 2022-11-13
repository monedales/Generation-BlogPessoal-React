export type Action = {type: "ADD_TOKEN", payload: string} //em caps pra quem coda saber que sao infos que o usuairo desconhece
//action: objeto - type: tipo da action - payload: armazena o token, info que a action leva

export const addToken = (token: string): Action => ({ //funçao que é do tipo action(func acima)
    type: "ADD_TOKEN", //método que vai ser enviado pelo despacho
    payload: token,
})