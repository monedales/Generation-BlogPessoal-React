import axios from "axios"; // interceptar nossas requisições

// criando objeto api que sera exportado depois e recebera toda biblioteca que o axios possui
export const api = axios.create
({
    baseURL: "https://blogpessoal-73dl.onrender.com"

}) // axios está operando dentro da aplicação

    // url é a concatenação da url acima com a url de login (/usuarios/logar)
    //dados: dados que a gnt vai enviar pra api - usuario/senha - passar via body objeto json
    //setDado - recebe a resposta da api, um objeto json contendo os dados do usuario e um token(p autenticar usuario na api)
    export const login = async(url: any, dados: any, setDados:any) => {
        const resposta = await api.post(url, dados) //acionando o metodo post os dois parametros / 
        setDados(resposta.data.token) // dentro da funcao setdado preciso dos valores da constante resposta que vai conter todos os dados da resposta da api - token/nomedeusuario/senha
        // o método é assincrono pois é preciso que ele aguarde(await) o retorno da api para que entao seja acionada a funcao set dado
    }

	export const cadastroUsuario = async(url: any, dados: any, setDados:any) => {
        const resposta = await api.post(url, dados) 
        setDados(resposta.data)
    }