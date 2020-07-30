import axios from "axios";
const baseUrl = "https://localhost:44352/api/";

export default {
    dPlayer(url = baseUrl + 'dplayers/') {
        return {
            fetchAll: () => axios.get(url),
            fetchByID: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}