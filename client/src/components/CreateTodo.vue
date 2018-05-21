<template>
    <div class="container">
        <h1>TODO list</h1>
    <div class="row">
        <div class="col-sm-3">
            <div class="thumbnail">
            <form action="">
                <div class="row">
                    <div class="col-xs-9">
                    <label for="title">Title</label>
                    <input class="form-control" type="text" name="title" v-model="todo.title" v-validate="'required'">
                    <label for="type">Type</label>
                    <select class="form-control" name="type" v-model="todo.type">
                        <option selected="selected" value="good">Good</option>
                        <option value="bad">Bad</option>
                        <option value="juicy">Juicy</option>
                    </select>    
                    </div>
                    <div class="col-xs-3 button-container">
                        <button type="submit" class="btn" @click="create"><span class="glyphicon glyphicon-chevron-right" area-hidden="true"></span></button>
                    </div>
                </div>
            </form>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="thumbnail list">
            <h2 class="good">Good</h2>
                <div v-if="goods.length > 0">
                <div v-for="todo in todos" :key="todo.id">
                    <p v-if="todo.type === 'good'">{{todo.title}} </p>
                </div>
                </div>
                <div v-else>
                    <p class="no-item">There is no item in this category</p>
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="thumbnail list">
                <h2 class="bad">Bad</h2>
            <div v-if="bads.length > 0">
                <div v-for="todo in todos" :key="todo.id">
                    <p v-if="todo.type === 'bad'">{{todo.title}}</p>
                </div>
            </div>
            <div v-else>
                <p class="no-item">There is no item in this category</p>
            </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="thumbnail list">
                <h2 class="juicy">Juicy</h2>
            <div v-if="juicies.length > 0">
                <div v-for="todo in todos" :key="todo.id">
                    <p v-if="todo.type === 'juicy'">{{todo.title}}</p>
                </div>
            </div>
            <div v-else>
                <p class="no-item">There is no item in this category</p>
            </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import TodoService from '@/services/TodoService'
export default {
  data() {
      return {
          error: null,
          valid: null,
          todo: {
            title: null,
            type: null
          },
          todos: [],
          goods: [],
          bads: [],
          juicies: []
      }
  },
     async mounted (){
        this.todos = (await TodoService.index()).data
        this.fitlterByType()
  },
    methods: {
        async create(){
        try {
            await TodoService.post(this.todo);
            getAllTodos();
        } catch (e){
            console.log(e)
        }
      },
      async getAllTodos() {
          this.todos = null;
          this.todos = (await TodoService.index()).data
          this.fitlterByType()  
      },
      fitlterByType(){
          this.goods = this.todos.filter(todo => todo.type === 'good')
          this.bads = this.todos.filter(todo => todo.type === 'bad')
          this.juicies = this.todos.filter(todo => todo.type === 'juicy')  
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    button{
        width: 100%;
        height: 118px;
        padding: 0;
    }
    .button-container{
        padding-left: 0
    }
    h2{
        margin-top: 0;
        color: white;
        padding-bottom: 2px;
    }
    h2.good{
        background: #2ee55f;
    }
    h2.bad{
        background: #d44c4c;
    }
    h2.juicy{
        background: #ccd211;
    }
    .list{
        padding: 0;
    }
    .no-item{
        color: red;
    }
</style>