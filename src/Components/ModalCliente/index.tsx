import "./ModalCliente.css"

export default function ModalCliente({ id, nome, endereco, email, senha, onClose, clientes, setClientes }){

    async function exclui(){
        const endpoint = `https://localhost:7148/cliente/clientes/${id}`

        await fetch(endpoint, {
            method: "DELETE"
        })

        onClose()
        await setClientes(clientes => clientes.filter(cliente => cliente.id !== id));
    }

    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <p className="close-btn" onClick={onClose}>X</p>
                <h2>Detalhes do Cliente</h2>
                <p><strong>ID:</strong> {id}</p>
                <p><strong>Nome:</strong> {nome}</p>
                <p><strong>CEP:</strong> {endereco.cep}</p>
                <p><strong>Bairro:</strong> {endereco.bairro}</p>
                <p><strong>Rua:</strong> {endereco.logradouro}</p>
                <p><strong>Numero:</strong> {endereco.numero}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Senha:</strong> {senha}</p>
                <div className="buttons-modalcliente">
                    <button>Editar</button>
                    <button onClick={() => exclui()}>Excluir</button>
                </div>
            </div>
        </div>
    )
}