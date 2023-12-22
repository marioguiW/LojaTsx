import './Produto.css'
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useState } from 'react';
import ModalProduto from 'Components/ModalProduto';


export default function Produto({aoAtualizarProduto,produto, Deletar}){

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [id, setId] = useState(produto.Id)
    const [titulo, setTitulo] = useState(produto.Titulo)
    const [categoria, setCategoria] = useState(produto.Categoria)
    const [preco, setPreco] = useState(produto.Preco)
    const [quantidade, setQuantidade] = useState(produto.Quantidade)
    const [unidadeMedida, setUnidadeMedida] = useState(produto.UnidadeMedida)

    

    function aoDeletar(id){
        console.log(id)
        Deletar(id)
    }

    return(
        <tr className='produto' id={Id}>
            <td>{Id}</td>
            <td  colSpan={2}>{titulo}</td>
            <td>{categoria}</td>
            <td>{`R$ ${preco}`}</td>
            <td>{quantidade}</td>
            <td>
                    <p onClick={() => setModalIsOpen(!modalIsOpen)} className='botao-edit'><BiEdit/></p>
            </td>
            <td>
                    <p onClick={() => aoDeletar(id)} className='botao-delete'><MdDeleteForever/></p>
            </td>
            <ModalProduto
                valorId = {id}
                valorTitulo = {titulo}
                valorCategoria = {categoria}
                valorPreco = {preco}
                valorQuantidade = {quantidade}
                valorUnidadeMedida= {unidadeMedida}

                setTitulo= {setTitulo}
                setCategoria={setCategoria}
                setPreco={setPreco}
                setQuantidade={setQuantidade}
                setUnidadeMedida={setUnidadeMedida}

                isOpen={modalIsOpen}
                setModal={setModalIsOpen}

                aoAtualizarProduto={aoAtualizarProduto}
            />
        </tr>
    )
}