import React, { useState } from 'react'// Certifique-se de que o caminho está correto para o seu modal
import './CardCliente.css';
import ModalCliente from 'Components/ModalCliente';

export default function CardCliente({ id, nome, endereco, email, senha, clientes, setClientes }) {

  const [modalOpen, setModalOpen] = useState(false);

  console.log(endereco)

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <tr className="row-cliente" onClick={handleOpenModal}>
        <td className="id-cliente">{id}</td>
        <td className="nome-cliente">{nome}</td>
        <td className="email-cliente">{email}</td>
      </tr>

      {modalOpen && (
        <ModalCliente
          id={id}
          nome={nome}
          endereco={endereco}
          email={email}
          senha={senha}
          onClose={handleCloseModal}
          clientes={clientes}
          setClientes={setClientes}
        />
      )}
    </>
  );
}
