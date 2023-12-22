import React from 'react';
import './CardProduto.css';

export default function CardProduto({ produto }) {
  return (
    <div className="product-card">
      <img
        src="https://amway.com.br/_ui/responsive/theme-blue/images/missing-product-300x300.jpg"
        alt={produto.titulo}
        className="product-image"
      />
      <div className="product-details">
        <h3 className="product-title">{produto.titulo}</h3>
        <p className="product-price">{`R$ ${produto.preco}`}</p>
      </div>
      <button className="buy-button">Comprar</button>
    </div>
  );
}
