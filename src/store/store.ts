//o store.ts armazena todos os estados da aplicação
import { tokensReducer } from "./tokens/tokensReducer"; 
import {legacy_createStore as createStore} from 'redux';

//gerenciamento com o reducer sendo o parametro ois ele vai interceptar as infos e armazená-las
const store = createStore(tokensReducer)

export default store;