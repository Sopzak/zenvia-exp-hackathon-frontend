import ServerUrl from '../lib/serverurl';
import ApiUtils from './apiutils';

const sendRequest = (relativeUrl, successHandler, erorHandler) => {
	let url = ServerUrl.BASE_URL + relativeUrl;
	//alert(url + ' ' + 'https://zenvia-exp-hackathon-backend.herokuapp.com/api/v1/companies');
	fetch(url)
	.then(ApiUtils.statusHandler)
	.then(ApiUtils.jsonHandler)
	.then(successHandler)
	.catch(erorHandler);
};

const ApiConnector = {
	sendRequest: sendRequest
};

export default ApiConnector;