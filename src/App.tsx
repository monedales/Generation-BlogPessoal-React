import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/estaticos/navbar/Navbar";
import Footer from "./componentes/estaticos/footer/Footer";
import Home from "./paginas/home/Home";
import Login from "./paginas/login/Login";
import CadastroUsuario from "./paginas/cadastroUsuario/CadastroUsuario";
import "./App.css";
import ListaPostagem from "./componentes/postagens/listapostagem/ListaPostagem";
import ListaTema from "./componentes/temas/listatema/ListaTema";
import CadastroPostagem from './componentes/postagens/cadastroPostagem/CadastroPostagem';
import CadastroTema from "./componentes/temas/cadastroTema/CadastroTema";
import DeletarTema from "./componentes/temas/deletarTema/DeletarTema";
import DeletarPostagem from './componentes/postagens/deletarPostagem/DeletarPostagem';
import store from './store/store';
import { Provider } from "react-redux";


function App() {
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<div style={{ minHeight: "100vh" }}>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/login" element={<Login />} />
						<Route path="/home" element={<Home />} />
						<Route path="/cadastroUsuario" element={<CadastroUsuario />} />
						<Route path="/temas" element={<ListaTema />} />
						<Route path="/posts" element={<ListaPostagem />} />
						<Route path="/formularioPostagem" element={<CadastroPostagem />} />
						<Route path="/formularioPostagem/:id" element={<CadastroPostagem />} />
						<Route path="/formularioTema" element={<CadastroTema />} />
						<Route path="/formularioTema/:id" element={<CadastroTema />} />
						<Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
						<Route path="/deletarTema/:id" element={<DeletarTema />} />
					</Routes>
				</div>
				<Footer />
			</Router>
		</Provider>
	);
}

export default App;
