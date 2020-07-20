import React, {Component} from 'react';
import './productstyle.css';

export default class Product extends Component {
	render() {
		return (
			<div id='productContainer'>
				<div id='productImageContainer'>
					<img id='productImage' src={(this.props.product.image? this.props.product.image: 'https://www.ferramentastenace.com.br/wp-content/uploads/2017/11/sem-foto.jpg')} alt='Product'/>
				</div>
				<div id='productTitle'>
					<p>{this.props.product.description}</p>
				</div>
				<div id='productPrice'>
					<p>R$ {this.props.product.price}</p>
				</div>
				<div>
					<button
						id='addToCartButton'
						onClick={() => this.props.addToCartHandler(this.props.product)}
					>
						Adicionar ao carrinho
					</button>
				</div>
			</div>
		);
	}
}