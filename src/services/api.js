import axios from 'axios';
import json from '../secret/token.json';

axios.defaults.baseURL = 'https://bettors.000webhostapp.com/index.php';
let api = axios;

export default api;

export function formDatas(datas = {}){
    let formData = new FormData()
    formData.append('auth', json.auth)
    Object.keys(datas).forEach((element) => {
      formData.append(element, datas[element])
    })
    return formData;
}