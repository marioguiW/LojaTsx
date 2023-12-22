import { useState } from 'react'
import './Contador.css'
import BotaoEnviar from 'Components/BotaoEnviar';

export default function Contador({contador, setContador}){

    const incrementar = (evento) => {
        evento.preventDefault();
        setContador(contador + 1);
    };

    const decrementar = (evento) => {
        evento.preventDefault();
        if (contador > 1) {
            setContador(contador - 1);
        }
    };

    return (
        <div className='contador'>
            <h2>Quantidade: {contador}</h2>
            <button onClick={evento => incrementar(evento)}>+</button>
            <button onClick={evento => decrementar(evento)}>-</button>
        </div>
    )
}