import axios from 'axios';

const API_URI = 'http://localhost:8000'

const API_GMAIL = async (urlObject, payload) => {
    // const { params, urlParams, ...body } = requestData;

    return await axios({
        method: urlObject.method,
        url: `${API_URI}/${urlObject.endpoint}`,
        data: payload
    })
}

export default API_GMAIL;