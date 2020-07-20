const COMMON_API_PATH = 'api/v1/';

//https://zenvia-exp-hackathon-backend.herokuapp.com/api/v1/companies/{id}/departments?sort=ASC

const ApiEndpoints = {
	PRODUCT_URL: COMMON_API_PATH + 'companies/{id}/departments/{id}/products?sort=ASC',
	CATEGORY_URL: COMMON_API_PATH + 'companies/{id}/departments?sort=ASC',
	COMPANY_URL: COMMON_API_PATH + 'companies',
};

export default ApiEndpoints;