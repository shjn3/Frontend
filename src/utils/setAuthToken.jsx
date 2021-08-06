import axios from 'axios'


const setAuthToken = accessToken =>{
    accessToken
    ?axios.defaults.headers.common['Authorization'] = `Barer ${accessToken}`
    :delete axios.defaults.headers.common['Authorization']  
}

export default setAuthToken