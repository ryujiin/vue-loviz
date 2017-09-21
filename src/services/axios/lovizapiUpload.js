import * as axios from 'axios';

const BASE_URL = 'http://localhost:8000';

function upload(formData) {
    const url = `${BASE_URL}/api/comentarioimgs/`;

    return axios.post(url, formData)
        // get data
        .then(res => res.data)
		.catch(err => err.data);
}

export { upload }