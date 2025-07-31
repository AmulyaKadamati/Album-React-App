import axios from 'axios';

const API_VERSION = "/api/v1"

const fetchGetData = (uri) =>{
    const url = `${API_VERSION}${uri}`;
    return axios.get(url)           // it returns a promise
    .catch((error) => {
        // handle exceptions/errors
        console.error('Error fetching data from url: ', url);
        // You can throw error again if u want to handle it elsewhere
        throw error;
    });
};

// to send token
const fetchPostData = (uri, payload) =>{
    const url = `${API_VERSION}${uri}`;
    return axios.post(url, payload)
    .catch((error) => {
        // handle exceptions/errors
        console.error('Error fetching data from url: ', url);
        // You can throw error again if u want to handle it elsewhere
        throw error;

});
};

//to add Album
const fetchPostDataWithAuth = (uri, payload) =>{
    const token = localStorage.getItem('token');

    const url = `${API_VERSION}${uri}`;
    return axios.post(url, payload, {
        headers :{
        "accept": "application/json",                                 // passing headers
        "content-type": "application/json",
        "Authorization" : `Bearer ${token}`,
    },
    })
    .catch((error) => {
        // handle exceptions/errors
        console.error('Error fetching data from url: ', url, error.message);
        // You can throw error again if u want to handle it elsewhere
        throw error;
    });
};

const fetchPutDataWithAuth = (uri, payload) =>{
    const token = localStorage.getItem('token');

    const url = `${API_VERSION}${uri}`;
    return axios.put(url, payload, {
        headers :{
        "accept": "application/json",                                 // passing headers
        "content-type": "application/json",
        "Authorization" : `Bearer ${token}`,
    },
    })
    .catch((error) => {
        // handle exceptions/errors
        console.error('Error fetching data from url: ', url, error.message);
        // You can throw error again if u want to handle it elsewhere
        throw error;
    });
};

// to upload photos
const fetchPostFileUploadWithAuth = async(uri, formData) =>{
    const token = localStorage.getItem('token');

    const url = `${API_VERSION}${uri}`;
    try{
    const response = await axios.post(url, formData, {
        headers: {
             "accept" : "*/*",
             "Authorization" : `Bearer ${token}`,
             'Content-Type': 'multipart/form-data' 
            },
      });
    return response;
    }
    catch(error){
        // handle exceptions/errors
        console.error('Error fetching data from url: ', url, error.message);
        throw(error);
    }
};

// to retrieve albums
const fetchGetDataWithAuth = async (uri) =>{
    const token = localStorage.getItem('token');
    const url = `${API_VERSION}${uri}`;
    try{
    const response = await axios.get(url, {
        headers :{                                              // passing headers
        "Authorization" : `Bearer ${token}`,
    }}
    );
    return response;
    }
    catch(error){
        // handle exceptions/errors
        console.error('Error fetching data from url: ', url, error.message);
        throw(error);
    }
};

const fetchDeleteDataWithAuth = async (uri) =>{
    const token = localStorage.getItem('token');
    const url = `${API_VERSION}${uri}`;
    try{
    const response = await axios.delete(url, {
        headers :{                                              // passing headers
        "Authorization" : `Bearer ${token}`,
    }}
    );
    return response;
    }
    catch(error){
        // handle exceptions/errors
        console.error('Error fetching data from url: ', url, error.message);
        throw(error);
    }
};

const fetchGetDataWithAuthArrayBuffer = (uri) =>{

    const token = localStorage.getItem('token');
    const url = `${API_VERSION}${uri}`;
    try{
    const response = axios.get(url, {
        headers :{                                              // passing headers
        "Authorization" : `Bearer ${token}`,
    },  
    responseType : 'arraybuffer'                    // telling http call to return response as arrayBuffer
}
    );
    return response;
    }
    catch(error){
        // handle exceptions/errors
        console.error('Error fetching data from url: ', url, error.message);
        throw(error);
    }
}

// for downloadingphoto we need blob data
const fetchGetBlobDataWithAuth = async (uri) =>{
    const token = localStorage.getItem('token');
    const url = `${API_VERSION}${uri}`;
    try{
    const response = await axios.get(url, {
        headers :{                                              // passing headers
        "Authorization" : `Bearer ${token}`,
    },
    "responseType" : "blob"
}
    );
    return response;
    }
    catch(error){
        // handle exceptions/errors
        console.error('Error fetching data from url: ', url, error.message);
        throw(error);
    }
};

export default fetchGetData;
export {fetchPostData, fetchPostDataWithAuth, fetchGetDataWithAuth, fetchDeleteDataWithAuth,
    fetchPostFileUploadWithAuth, fetchPutDataWithAuth, fetchGetDataWithAuthArrayBuffer, fetchGetBlobDataWithAuth};
