import CardProduto from 'Components/CardProduto'
import './Comprar.css'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


export default function Comprar({notification}){

    const [produtos, setProdutos] = useState([])

    if(notification){
        toast.success("Usuário Logado com sucesso!");
    }

    async function GetProdutos(){

        const endpoint = "https://localhost:7148/produto/produtos"

        const retornoFetchProdutos = await fetch(endpoint, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const retornoProdutosJson = await retornoFetchProdutos.json()

        setProdutos(retornoProdutosJson)
    }

    useEffect(() =>{
        GetProdutos()
    },[])

    console.log(produtos)

    return(
        <div className='comprar'>
            <div className='lista-produtos'>
                {produtos.map( produto => (
                    <CardProduto
                        produto={produto}
                    />
                ))}
            </div>
        </div>
    )
} 