import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://codeserver:7777'
})

instance.defaults.headers.common['SOMETHING'] = 'something'


export default instance