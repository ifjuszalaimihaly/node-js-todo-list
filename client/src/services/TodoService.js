import Api from '@/services/Api'

export default {
    index () {
        return Api().get('/todos')
    },
    post (todo) {
        return Api().post('/todos', todo)
    }
}