<template>
    <form @submit.prevent="onSubmit">
        <div class=" grid grid-cols-3 gap-4">
            <div>   
            </div>
            <ul>
                <input type="text"
                    id="new-todo-input"
                    name="new-todo"
                    autocomplete="off"
                    v-model="title"
                    placeholder="Task Title" class="  my-5  py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />

                <textarea type="text"
                    id="new-task-input"
                    name="new-task"
                    autocomplete="off"
                    v-model="taskDetails"
                    placeholder="What needs to be done?" class=" my-3 py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" rows="10"/>
                    
            <label  class="block mt-3 text-sm font-medium text-gray-700" for="start">Due Date:</label>
            <input class="block w-full mt-1 py-2 px-3 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md sm:text-sm" type="date" id="start" name="trip-start" min="minDate" max="08-31-2029" v-model="dueDate" />
            <button class="mt-3 mx-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-sm" type="submit">ADD TASK</button>
        </ul>
    
        </div>
    </form>
</template>

<script>
export default {
    methods: {
        onSubmit() {
            if(this.title === '' || this.taskDetails === '' || this.dueDate === '') {
                return;
            }
            this.$emit("todo-added", this.title, this.taskDetails, this.dueDate)
            this.title='';
            this.taskDetails = '';
        
            // FINDOUT! this below caused it to produce the taskdetails as a title, find out why
            // this.$emit("todo-added", this.taskDetails)
            
        }, 
    },
    data() {
        return {
            title: "",
            taskDetails: "",
            dueDate: null,  
        }
    }
};
</script>
