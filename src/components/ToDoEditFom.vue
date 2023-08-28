<template>
  <form class="stack-small" @submit.prevent="onSubmit">
    <div>
      <input
        :id="_id"
        type="text"
        autocomplete="off"
        v-model="newTitle"
        placeholder="New Title" 
        class="text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
    </div>
    <div class="btn-group">
      <button type="submit" class="">
        Save
      </button>
      <br>
      <button type="button" class="" @click="onCancel">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
  export default {
    props: {
        title: {required: true, type: String},
        taskDetails: {required: true, type: String},
        dueDate : {required: true, type: String},
        _id: {required: true, type: String},  
    },
    data() {
      return {
        newTitle: this.title,
      };
    },
    methods: {
      onSubmit() {
        if (this.newTitle && this.newTitle !== this.title) {
        this.$emit("item-edited", this.newTitle); 
    
  }
      },
      onCancel() {
        this.$emit("edit-cancelled");
      },
    },
  };
</script>
