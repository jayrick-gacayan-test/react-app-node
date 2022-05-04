import axios from "axios";

const axiosFetch = (url, method, datum = null) => {
    return axios(
        (datum === null) ? { url : url,
                            method: method,
                        } :
                        {
                            url : url,
                            method: method,
                            data : datum
                        }
    );
}

export default axiosFetch;