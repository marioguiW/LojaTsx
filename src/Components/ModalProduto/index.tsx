import CampoTexto from 'Components/CampoTexto'
import './ModalProduto.css'
import BotaoEnviar from 'Components/BotaoEnviar'
import { useState } from 'react';
import { IoCloseCircle } from "react-icons/io5";

export default function ModalProduto({setProdutos,isOpen,setModal
    ,valorId, valorTitulo, setTitulo, valorCategoria,setCategoria
    , valorPreco,setPreco,valorQuantidade,setQuantidade, valorUnidadeMedida, setUnidadeMedida}){

    const [newTitulo, setNewTitulo] = useState(valorTitulo)
    const [newCategoria, setNewCategoria] = useState(valorCategoria)
    const [newPreco, setNewPreco] = useState(valorPreco)
    const [newQuantidade, setNewQuantidade] = useState(valorQuantidade)

    async function aoAtualizarProduto(evento){
        evento.preventDefault();
        const endpoint = `https://localhost:7148/produto/produtos/${valorId}`

        const novosDados = {
            titulo: newTitulo,
            categoria: newCategoria,
            unidadeMedida: valorUnidadeMedida,
            preco: newPreco,
            quantidade: newQuantidade
        }

        setTitulo(newTitulo)
        setCategoria(newCategoria)
        setUnidadeMedida(valorUnidadeMedida)
        setPreco(newPreco)
        setQuantidade(newQuantidade)

        const fetchApi = await fetch(endpoint, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novosDados)
        })

        setModal(!isOpen)
    }


    if(isOpen){
        return (
            <div className='modal'>
                <p onClick={() => setModal(!isOpen)} className='exit-modalproduto'><IoCloseCircle/></p>
                <h1>Produto: {valorId}</h1>
                <form onSubmit={evento => aoAtualizarProduto(evento)} className='formulario-modal'>
                    <CampoTexto
                        tipo="text"
                        titulo={"Titulo"}
                        valor={newTitulo}
                        aoAlterar={valor => setNewTitulo(valor)}
                    >Digite o Titulo do produto
                    </CampoTexto>
    
                    <CampoTexto
                        tipo="text"
                        titulo={"Categoria"}
                        valor={newCategoria}
                        aoAlterar={valor => setNewCategoria(valor)}
                    >Digite a Categoria do produto
                    </CampoTexto>
    
                    <CampoTexto
                        tipo="number"
                        titulo={"Preço"}
                        valor={newPreco}
                        aoAlterar={valor => setNewPreco(valor)}
                    >Digite o Preço do produto
                    </CampoTexto>

                    <CampoTexto
                        tipo="number"
                        titulo={"Quantidade no Estoque"}
                        valor={newQuantidade}
                        aoAlterar={valor => setNewQuantidade(valor)}
                    >Digite a quantidade no estoque
                    </CampoTexto>

    
                    <BotaoEnviar conteudo="Atualizar"/>
                </form>
            </div>
        )
    }
}