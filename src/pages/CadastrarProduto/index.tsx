import CampoTexto from 'Components/CampoTexto';
import './CadastrarProduto.css'
import BotaoEnviar from 'Components/BotaoEnviar';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CadastrarProduto = ({notification})=> {
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [preco, setPreco] = useState('');
    const [unidadeMedida, setUnidadeMedida] = useState('');
    const [quantidade, setQuantidade] = useState('');


    const aoCadastrarProduto = (evento) => {
        evento.preventDefault();
        console.log(titulo,categoria,preco,unidadeMedida,quantidade);
        postProduto()
    }   

    if(notification){
        toast.success("Admin logado com sucesso!")
    }

    

    const postProduto = ()=>{
        fetch("https://localhost:7148/produto/produtos", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                Titulo: titulo,
                Categoria: categoria,
                Preco: preco,
                UnidadeMedida: unidadeMedida,
                Quantidade: quantidade
            })
        })

        setTitulo('');
        setCategoria('');
        setPreco(0)
        setUnidadeMedida('')
        setQuantidade('')
        alert("Produto criado com sucesso!")
    }

    return(
        <div className='cadastro_produto'>
            
            <form onSubmit={aoCadastrarProduto} className='formulario-produto'>
                <CampoTexto
                    tipo="text"
                    titulo={"Titulo"}
                    valor={titulo}
                    aoAlterar={valor => setTitulo(valor)}
                >Digite o Titulo do produto
                </CampoTexto>

                <CampoTexto
                    tipo="text"
                    titulo={"Categoria"}
                    valor={categoria}
                    aoAlterar={valor => setCategoria(valor)}
                >Digite a Categoria do produto
                </CampoTexto>

                <CampoTexto
                    tipo="number"
                    titulo={"Preço"}
                    valor={preco}
                    aoAlterar={valor => setPreco(valor)}
                >Digite o Preço do produto
                </CampoTexto>

                <div className='campo-duplo'>
                    <CampoTexto
                        tipo="text"
                        titulo={"Unidade de Medida"}
                        valor={unidadeMedida}
                        aoAlterar={valor => setUnidadeMedida(valor)}
                    >Digite a unidade de medida do produto
                    </CampoTexto>

                    <CampoTexto
                        tipo="number"
                        titulo={"Quantidade no Estoque"}
                        valor={quantidade}
                        aoAlterar={valor => setQuantidade(valor)}
                    >Digite a quantidade no estoque
                    </CampoTexto>
                </div>

                <BotaoEnviar conteudo="Cadastrar"/>
            </form>
        </div>
    )
}

export default CadastrarProduto;