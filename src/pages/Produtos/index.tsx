
import { ProdutoType } from "../../types/produto";
import Produto from "./Produto";
import "./Produtos.css";
import { useEffect, useState } from "react";

export default function Produtos(){

    const [produtos, setProdutos] = useState<ProdutoType[]>([])

    function aoDeletar(id : number){
      fetch(`https://localhost:7148/produto/produtos/${id}`, {
        method: "DELETE",
        headers: {
          'content-type': 'application/json;charset=utf-8',
        }
      });
      console.log(id)
      setProdutos(produtos.filter(produto => produto.Id != id))
      console.log(produtos)
    }

    const fetchProdutos = async () => {
      try {
        const resposta = await fetch(`https://localhost:7148/produto/produtos`, {
          method: "GET",
          headers: {
            'content-type': 'application/json;charset=utf-8',
          }
        });
    
        if (!resposta.ok) {
          throw new Error(`Erro na solicitação: ${resposta.status}`);
        }
    
        const dados = await resposta.json();
        console.log(dados)
    
        const novoProduto = dados.map(produto => ({
          Id: produto.id,
          Titulo: produto.titulo,
          Categoria: produto.categoria,
          Preco: produto.preco,
          Quantidade: produto.quantidade,
          UnidadeMedida: produto.unidadeMedida
        }));
    
        setProdutos([...novoProduto]);
      } catch (erro) {
        console.error("Erro ao obter produtos:", erro);
        // Trate o erro aqui, exibindo uma mensagem para o usuário ou realizando outras ações apropriadas.
      }
    };

    async function aoAtualizarProduto(valorId, valorTitulo, valorCategoria
      ,valorPreco,valorQuantidade){

        console.log(valorId, valorTitulo, valorCategoria,valorPreco,valorQuantidade)

        var preco = parseInt(valorPreco)
        console.log(preco)

      const endpoint = `https://localhost:7148/produto/produtos/${valorId}`

      console.log("passou")

      const novosDados = {
          titulo: valorTitulo,
          categoria: valorCategoria,
          preco: parseFloat(valorPreco),
          quantidade: parseInt(valorQuantidade)
      }

      console.log(novosDados)

      const fetchApi = await fetch(endpoint, {
          method: "PUT",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(novosDados)
      })

      if(fetchApi.ok){
        console.log("cert")
      }else{
        console.log("errado")
      }
    }

    useEffect(() => {
        fetchProdutos();
      }, []);

    return (
        <div className="produtos">
            <table className="tabela-produtos">
              <thead>
                <tr className="titulo">
                    <td>Id</td>
                    <td colSpan={2}>Titulo</td>
                    <td>Categoria</td>
                    <td>Preço</td>
                    <td>Quantidade Disp.</td>
                    <td></td>
                    <td></td>
                </tr>
              </thead>
              <tbody>
                {produtos.map( produto => (
                  <Produto
                      key={produto.Id}
                      produto={produto}
                      Deletar={aoDeletar}
                      produtos={produtos}
                      setProdutos={setProdutos}
                      aoAtualizarProduto={aoAtualizarProduto}
                    />
                    ))}
              </tbody>     
            </table>
        </div>
    )
}