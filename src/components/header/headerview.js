import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './headerstyle.css';


export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			store: ( this.props.store ?  this.props.store : 'LOJA')
		};
	}

	searchButtonSubmitHandler = (event) => {
		event.preventDefault();
		let searchKeyword = this.state.search.trim();
		this.props.productSearchHandler(searchKeyword);
	}

	searchChangeHandler = (event) => {
		this.setState({search: event.target.value});
	}

	renderSearch = () => {
		return (
			<div id='search'>
				<form onSubmit={this.searchButtonSubmitHandler}>
					<input
						id='searchInput'
						type='text'
						placeholder='Pesquisar'
						onChange={this.searchChangeHandler}
						value={this.state.search}
					/>
					<button type='submit' id='searchButton'>
						Pesquisar
					</button>
				</form>
			</div>
		);
	}

	render() {
		return (
			<div id='headerContainer'>
				<div id='logoContainer'>
					<div id='burgerIconContainer' onClick={this.props.toggleSidebar}>
						<div className='burgerSlice'></div>
						<div className='burgerSlice'></div>
						<div className='burgerSlice'></div>
					</div>
					<div id='logo'><Link to='/'>{this.state.store}</Link></div>
				</div>
				{this.renderSearch()}
				<div id='cartIconContainer'>
					<i
						onClick={this.props.toggleShoppingCart}
						id='cartIcon'
						className='fa fa-shopping-basket'
					></i>
					<span id='cartCounter'>{this.props.totalCartItem}</span>
				</div>
				<div id='signIn'>Entrar</div>
			</div>
		);
	}
}