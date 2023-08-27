<script>
import './assets/tailwind.css'
import ToDoItem from './components/ToDoItem.vue';
import { ref } from 'vue'
import ToDoForm from './components/ToDoForm.vue';
import axios from 'axios'
const API_URL='http://localhost:3000/'


export default {
  name: "app",
  components: {
    ToDoItem,
    ToDoForm
},
  data() {
    return {
      ToDoItems: [],
    }
  },
  async mounted() {
    const response = await axios.get(API_URL+"todos");
    this.ToDoItems = response.data;
  },
  methods: {
    async addToDo(toDoTitle, toDoTask, dueDate) {
      const response = await axios.post(API_URL+"todos", {
        title: toDoTitle, 
        taskDetails: toDoTask, 
        dueDate: dueDate, 
      });
      this.ToDoItems.push(response.data);
      this.toDoTitle = "";
      this.toDoTask = "";
      this.dueDate = "";
    },
   async removeTodo(item) {
  const index = this.ToDoItems.findIndex(todo => todo._id === item._id);
  if (index !== -1) {
    await axios.delete(API_URL + `todos/${item._id}`);
    this.ToDoItems.splice(index, 1);
  }
}, 
//oppsed to writing this twice I should just put it into a function and call the function
   async finishedTodo(item) {
    alert("Congrats on finishing this TODO. PROUD OF YOU, CHAMP!")
  const index = this.ToDoItems.findIndex(todo => todo._id === item._id);
  if (index !== -1) {
    await axios.delete(API_URL + `todos/${item._id}`);
    this.ToDoItems.splice(index, 1);
  }
}, 
// deleteToDo(toDoId) {
//   const itemIndex = this.ToDoItems.findIndex((item) => item.id === toDoId);
//   this.ToDoItems.splice(itemIndex, 1);
// },
editToDo(item, newTitle) {
  const toDoToEdit = this.ToDoItems.find(todo => todo.id === item._id);
  toDoToEdit.title = newTitle;
}
}
};

</script>


<template>
   <h1 class="text-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">just TODO it</span></h1>
   <ToDoForm @todo-added="addToDo" />
   
    <ul>
      <!-- v-for is basically a for in loop -->
      <!-- we do need a key attribute hence uniqueId and :key -->
     <li  v-for="item in ToDoItems" :key="item._id">
      <ToDoItem 
        :title ="item.title" 
        :task-details="item.taskDetails"
        :due-date="item.dueDate"
        :done ='item.done' 
        :id="item._id"
        @checkbox-changed="updateDoneStatus(item._id)"
        @item-deleted="deleteToDo(item._id)"
        @item-edited="editToDo(item._id, $event)"
      >
     
      </ToDoItem>
      <div class="text-center mt-2">
      <button class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded mb-2" @click="removeTodo(item)">Delete TODO</button>
      <br>
      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" @click="finishedTodo(item)">Complete TODO</button>
      </div>
    </li>

  </ul>
  
  
</template>


<style>

</style>
