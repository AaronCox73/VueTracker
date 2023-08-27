<template>
  <form class="stack-small" @submit.prevent="onSubmit">
    <div>
      <label class="edit-label">Edit</label>
      <input
        :id="id"
        type="text"
        autocomplete="off"
        v-model.lazy.trim="newTitle" />
    </div>
    <div class="btn-group">
      <button type="submit" class="btn btn__primary">
        Save
      </button>
      <br>
      <button type="button" class="btn" @click="onCancel">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      taskDetails: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        newTitle: this.title,
        newTaskDetails: this.taskDetails
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
<style scoped>
  .edit-label {
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #0b0c0c;
    display: block;
    margin-bottom: 5px;
  }
  input {
    display: inline-block;
    margin-top: 0.4rem;
    width: 100%;
    min-height: 4.4rem;
    padding: 0.4rem 0.8rem;
    border: 2px solid #565656;
  }
  form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  form > * {
    flex: 0 0 100%;
  }
</style>