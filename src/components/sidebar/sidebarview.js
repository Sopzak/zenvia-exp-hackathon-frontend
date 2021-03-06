import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './sidebarstyle.css';
import ApiConnector from '../../api/apiconnector';
import ApiEndpoints from '../../api/apiendpoints';
import CategorySkeleton from '../skeleton/category/categoryskeletonview';

export default class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		};
	}

	getSidebarStyle = () => {
		return !this.props.isShowSidebar ? {left: '-200px'} : {};
	}

	getCategoryLink = (categoryId) => `/c/${categoryId}`;

	categorySuccessHandler = (categories) => {
		this.setState({categories: categories});
	}

	errorHandler = (error) => {
		console.error(error);
	} //TODO:show error right below of header

	componentDidMount() {
		ApiConnector.sendRequest(
			ApiEndpoints.CATEGORY_URL,
			this.categorySuccessHandler,
			this.errorHandler
		);
		var categories_test = [{ "id": 1, "name": "Hot-Dogs"}];
		this.setState({categories: categories_test });
	}

	render() {
		return (
			<div id='sideBarContainer' style={this.getSidebarStyle()}>
				<div id='sideBarBody'>
					{this.state.categories.length > 0 ?
						<ul>
							<Link to='/'><li>Todos</li></Link>
							{this.state.categories.map((category) => (
								<Link key={category.id} to={this.getCategoryLink(category.id)}>
									<li>{category.name}</li>
								</Link>
							))}
						</ul>
						:
						<CategorySkeleton />
					}
				</div>
			</div>
		);
	}
}