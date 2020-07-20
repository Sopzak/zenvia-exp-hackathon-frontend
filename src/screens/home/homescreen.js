import React, {Component} from 'react';
import './homescreenstyle.css';
import Header from '../../components/header/headerview';
import SideBar from '../../components/sidebar/sidebarview';
import Body from '../../components/body/bodyview';
import ShoppingCart from '../../components/shoppingcart/shoppingcartview';
import ApiConnector from '../../api/apiconnector';
import ApiEndpoints from '../../api/apiendpoints';
import QueryParam from '../../api/apiqueryparams';


const 	Modal = ({ handleClose, show, children }) => {
	const showHideClassName = show ? "modal display-block" : "modal display-none";
  
	return (
	  <div className={showHideClassName}>
		<section className="modal-main">
		  {children}
		</section>
	  </div>
	);
};

export default class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowSidebar: true,
			isShowShoppingCart: false,
			products: {},
			cart: {},
			company: {},
			store: {id:0},
			chooseStore: true,
			totalCartItem: 0
		}
	}

	toggleSidebar = () => {
		this.setState({isShowSidebar: !this.state.isShowSidebar});
	}

	toggleShoppingCart = () => {
		this.setState({isShowShoppingCart: !this.state.isShowShoppingCart});
	}

	productSuccessHandler = (products) => {
		console.log(products);
		this.setState({products: {"products" : products} });
	}

	erorHandler = (error) => {
		var products_teste = [
			{	"id":123,
				"price": 10.99,
				"title": "teste de teste",
				"image": "http://t2.rg.ltmcdn.com/pt/images/0/6/3/img_cachorro_quente_americano_6360_600.jpg" 
			},
			{	"id":111,
				"price": 10.99,
				"title": "teste de teste",
				"image": "http://t2.rg.ltmcdn.com/pt/images/0/6/3/img_cachorro_quente_americano_6360_600.jpg" 
			},
			{	"id":222,
				"price": 10.99,
				"title": "teste de teste",
				"image": "http://t2.rg.ltmcdn.com/pt/images/0/6/3/img_cachorro_quente_americano_6360_600.jpg" 
			},
				{	"id":33,
				"price": 10.99,
				"title": "teste de teste",
				"image": "https://t2.rg.ltmcdn.com/pt/images/0/6/3/img_cachorro_quente_americano_6360_600.jpg" 
			},
				{	"id":44,
				"price": 10.99,
				"title": "teste de teste",
				"image": "https://t2.rg.ltmcdn.com/pt/images/0/6/3/img_cachorro_quente_americano_6360_600.jpg" 
			},
			{	"id":125553,
				"price": 10.99,
				"title": "teste de teste",
				"image": "https://t2.rg.ltmcdn.com/pt/images/0/6/3/img_cachorro_quente_americano_6360_600.jpg" 
				},
		];
		this.setState({products: {products : products_teste}});
		console.error(error);
		//alert("sdhfkshd");
	}; //TODO:show error right below of header

	getCategoryId = (props) => {
		return props.match ? props.match.params.categoryId : null;
	}

	companySuccessHandler = (company) => {
		//alert('Yes');
		this.setState({company: company});
		if(this.state.store.id !== 0){
			this.setState({store: company[0]});
		}
	}

	errorHandlerCompany = (error) => {

		//alert(this.state.store.id );
		if(this.state.store.id !== 0){
			if(this.state.store.id === 1){
				this.setState({store: this.state.company[0] });
			}else{
				if(this.state.store.id === 2){
					this.setState({store: this.state.company[1] });
				}
			}
		}
		var company_test = [
			{ "id": 1, "name": "Jesiel lanches",  "cnpj": "12345678000101"},
			{ "id": 2, "name": "Ju store",  "cnpj": "12345678000101"},
			];
		this.setState({company: company_test });
		//console.error(error);
	} //TODO:show error right below of header


	getProductEndpoint = (searchKeyword) => {
		let categoryId = this.getCategoryId(this.props);
		//let endPoint = ApiEndpoints.PRODUCT_URL;
		let endPoint = ApiEndpoints.COMPANY_URL + '/1/departments/1/products';
		if (searchKeyword) {
			return endPoint + '?'+ QueryParam.SEARCH + '=' + searchKeyword;
		}
		if (categoryId) {
			return endPoint + '?'+ QueryParam.CATEGORY_ID + '=' + categoryId;
		}
		return endPoint;
	}

	fetchProducts = (searchKeyword=null) => {
		ApiConnector.sendRequest(
			this.getProductEndpoint(searchKeyword),
			this.productSuccessHandler,
			this.erorHandler
		);
	}

	componentDidUpdate(prevProps) {
		let catId = this.getCategoryId(this.props);
		let prevCatId = this.getCategoryId(prevProps);
		if (catId !== prevCatId) {
			this.fetchProducts();
		}

	}

	fetchCompany = (storedId) =>{
		if(storedId !== 0){
			ApiConnector.sendRequest(
				ApiEndpoints.COMPANY_URL + '/' + storedId,
				this.companySuccessHandler,
				this.errorHandlerCompany
			);
		}else{
			ApiConnector.sendRequest(
				ApiEndpoints.COMPANY_URL,
				this.companySuccessHandler,
				this.errorHandlerCompany
			);
		}
	}

	componentDidMount() {
		this.fetchProducts();
		if (this.state.store.id !== this.props.match.params.storeId){
			//alert('achei');
			this.setState( {store: {"id":this.props.match.params.storeId, "name": 'teste'}});
			this.fetchCompany(this.props.match.params.storeId);
		}else{
			this.fetchCompany(0);
		}
	}

	productSearchHandler = (searchKeyword) => {
		this.fetchProducts(searchKeyword);
	}

	getTotalCartItem = () => {
		return Object.values(this.state.cart).length;
	}

	addToCartHandler = (product) => {
		let cart = this.state.cart;
		cart[product.id] = {product: product, quantity: 1};
		this.setState({cart: cart, totalCartItem: this.getTotalCartItem()});
	}

	setProductQuantityToCart = (productId, quantity) => {
		let cart = this.state.cart;
		cart[productId].quantity = quantity;
		this.setState({cart: cart});
	}

	productRemoveHandler = (productId) => {
		let cart = this.state.cart;
		delete cart[productId];
		this.setState({cart: cart, totalCartItem: this.getTotalCartItem()});
	}

	render() {	
		
		if (this.state.company.length > 0 && this.state.store.id === '0'){
			return (
				<Modal show={true} handleClose={false}>
					{
						this.state.company.map((store) => (
							<div style={{flex:1, flexDirection: "column"}}>
								<div id='logo' style={{flex:2,}}>
									<a href={'/'+ store.id}>{store.name}</a>
								</div>
							</div>
						))
					}
					
				</Modal>
			);
		}
		else{		
			return (
				<React.Fragment>
					<Header
						toggleSidebar={this.toggleSidebar}
						toggleShoppingCart={this.toggleShoppingCart}
						totalCartItem={this.state.totalCartItem}
						productSearchHandler={this.productSearchHandler}
						store={(this.state.company? this.state.company.name : 'Loja')}
					/>
					<div id='bodyContainer'>
						<SideBar isShowSidebar={this.state.isShowSidebar} />
						<Body
							products={this.state.products.products}
							addToCartHandler={this.addToCartHandler}
							isShowSidebar={this.state.isShowSidebar}
							isShowShoppingCart={this.state.isShowShoppingCart}
						/>
						<ShoppingCart
							isShowShoppingCart={this.state.isShowShoppingCart}
							cart={this.state.cart}
							products={this.state.products.products}
							setProductQuantityToCart={this.setProductQuantityToCart}
							productRemoveHandler={this.productRemoveHandler}
						/>
					</div>
				</React.Fragment>
			);
		}
	}
}