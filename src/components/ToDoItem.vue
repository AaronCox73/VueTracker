<script>
import { ref } from 'vue'
import { VueElement } from 'vue';
import axios from 'axios'
const API_URL='http://localhost:3000/';
import ToDoItemEditForm from "./ToDoEditFom.vue";

export default {
  components: {
    ToDoItemEditForm
  },
    props: {
        title: {required: true, type: String},
        taskDetails: {required: true, type: String},
        dueDate : {required: true, type: String},
        _id: {required: true, type: String},  
    },
    data() {
        return {
            // key:value
            isDone: this.done,
            isEditing: false,
        }
    }, 
    computed: {
        formattedDueDate() {
            // Parse the current dueDate as a Date object
            const parsedDate = new Date(this.dueDate);
            
            // Array of month names
            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            
            // Get the month name from the array
            const monthName = monthNames[parsedDate.getMonth()];
            
            // Format the date as Month Day, Year
            const formattedDate = `${monthName} ${parsedDate.getDate()}, ${parsedDate.getFullYear()}`;
            
            return formattedDate;
        }
    },
    methods: {
      toggleToItemEditForm() {
      this.isEditing = true;
    },
    itemEdited(newTitle) {
      this.$emit('item-edited', newTitle);
      this.isEditing = false;
},
editCancelled() {
  this.isEditing = false;
}
  }
}
</script>

<template>
  
<div 
  class="mt-5 mx-auto max-w-md block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
  <div
    class="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
    TASK
  </div>
  <div class="p-6">
    <h5
      class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
      {{ title }}
      
    </h5>
    <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        {{ taskDetails }}
    </p>
  </div>

  <div class="">
    <to-do-item-edit-form :id="id" :label="title" @item-edited="itemEdited"
  @edit-cancelled="editCancelled" v-if="isEditing"></to-do-item-edit-form>
  <div v-else>
    <div class="">
    </div>
  </div>
    <div class="">
      <button type="button" class="btn" @click="toggleToItemEditForm">
        Edit Title <span class="visually-hidden"></span>
      </button>
    </div>
  </div>

  <div
    class="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
 Finish this by: {{ formattedDueDate }}
  </div>

    </div>
</template>

