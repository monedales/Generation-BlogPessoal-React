export type Action = {type: "ADD_TOKEN", payload: string} //em caps pra quem coda saber que sao infos que o usuairo desconhece


export const addToken = (token: string): Action => ({
    type: "ADD_TOKEN",
    payload: token
})