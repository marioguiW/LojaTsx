import { useEffect, useState } from "react"
import "./Clientes.css"
import { useSearchParams } from "react-router-dom"
import CardCliente from "Components/CardCliente"

export default function Clientes(){
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    async function getClientes() {
      const endpoint = `https://localhost:7148/cliente/clientes`;

      try {
        const retornoFetch = await fetch(endpoint, {
          method: "GET",
          headers: {
            'content-type': 'application/json;charset=utf-8',
          },
        });

        const retornoJson = await retornoFetch.json();
        setClientes(retornoJson);

        console.log(clientes);
      } catch (error) {
        console.error("Erro ao obter clientes:", error);
      }
    }

    getClientes();
  }, []);

  return(
    <div className="clientes">
      <table class="clientes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
        {clientes.map( cliente => (
          <CardCliente
            key={cliente.id}
            id={cliente.id}
            nome={cliente.nome}
            endereco={cliente.enderecoDeEntrega}
            email={cliente.email}
            senha={cliente.senha}
            clientes={clientes}
            setClientes={setClientes}
          /> ))}
        </tbody>
      </table>
    </div>
  )
  {/* {clientes.map( cliente => (
  <CardCliente
    key={cliente.id}
    id={cliente.id}
    nome={cliente.nome}
    endereco={cliente.enderecoDeEntrega}
    email={cliente.email}
    senha={cliente.senha}
  /> ))} */}

  


}