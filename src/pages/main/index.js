import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
    // criar variavel de estado(objeto) para armazenar informações que retornam da api;
    state = {
        products: [], // iniciar com um array vazio;
        productInfo: {},
        page: 1,
    };
    
    // chamar Api:
    componentDidMount() { // método executado assim que componente for mostrado em tela.
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        //console.log(response.data.docs);

        // atribuir valor dos produtos recebido pela api a variavel de estado criada:
        this.setState({ products: docs, productInfo, page });
    };

    prevPage = () => {
        const { page, productInfo } = this.state;

        if (page === 1) return;
        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    };

    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;
        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    };
    
    // o método render fica escutando e se a variavel state sofrer alteração ele carrega essa nova alteração.
    render() {
        // return <h1>Contagem de produtos: {this.state.products.length}</h1>;

        const { products, page, productInfo } = this.state;

        return (
            <div className='product-list'>
                {products.map(product => (
                    <article key={product._id}>

                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        
                        <Link to={`/products/${product._id}`}>Acessar</Link>

                    </article>
                ))}

                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>
                        Anterior
                    </button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>
                        Próximo
                    </button>
                </div>

            </div>
        )
    }
}