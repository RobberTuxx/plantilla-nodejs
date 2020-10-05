import axios from 'axios'

const HOST = process.env.NEXMO_HOST
const ServiceNexmo = axios.create({
    baseURL: HOST,
    responseType: 'json',
    timeout: 50000
})

ServiceNexmo.interceptors.request.use(async config => {
    const buffer = new Buffer(process.env.API_KEY + ':' + process.env.API_SECRET)
    config.headers.Authorization = 'Basic ' + buffer.toString('base64')
    return config
})

ServiceNexmo.interceptors.response.use(function (response){
    return response
}, function (error){
    console.log('Error: ', error)
    return Promise.reject(error)
})

export default ServiceNexmo
