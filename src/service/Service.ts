import axios from "axios"; // interceptar nossas requisições

// criando objeto api que sera exportado depois e recebera toda biblioteca que o axios possui
export const api = axios.create
    ({
        baseURL: "https://blogpessoal-73dl.onrender.com"

    }) // axios está operando dentro da aplicação

// url é a concatenação da url acima com a url de login (/usuarios/logar)
//dados: dados que a gnt vai enviar pra api - usuario/senha - passar via body objeto json
//setDado - recebe a resposta da api, um objeto json contendo os dados do usuario e um token(p autenticar usuario na api)
export const login = async (url: any, dados: any, setDados: any) => {
    const resposta = await api.post(url, dados); //acionando o metodo post os dois parametros / 
    setDados(resposta.data.token); // dentro da funcao setdado preciso dos valores da constante resposta que vai conter todos os dados da resposta da api - token/nomedeusuario/senha
    // o método é assincrono pois é preciso que ele aguarde(await) o retorno da api para que entao seja acionada a funcao set dado
}

export const cadastroUsuario = async (url: any, dados: any, setDados: any) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}
//preciso de um endpoint: url any; nao preciso enviar dados mas preciso buscar setdados e preciso passar token
export const busca = async (url: any, setDados: any, header: any) => {
    const resposta = await api.get(url,header);
    setDados(resposta.data);
}

export const buscaId = async (url:any, setDados: any, header: any) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
}

//precisa de um param extra, que sao os dados
export const post = async (url:any, dados: any, setDados: any, header: any) => {
    const resposta = await api.post(url,dados,header)
    setDados(resposta.data)    
}

export const put = async (url:any, dados: any, setDados: any, header: any) => {
    const resposta = await api.put(url,dados,header)
    setDados(resposta.data)    
}

export const deleteId = async(url: any, header: any) => {
    await api.delete(url,header) //, se o token for valido a postagem é excluida, nao precisa de const pq nao vai passar nenhuma informação para variavel
}