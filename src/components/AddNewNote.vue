<template>
  <form @submit.prevent="onSubmit">
    <input v-model="title" type="text" placeholder="add new Note" />
    <button type="submit" @click="onSubmit">create</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    onSubmit() {
      if (this.title.trim()) {
        const newNote = {
          title: this.title,
          todos: []
        };
        this.$emit("add-Note", newNote);
      }
      this.title = "";
    }
  }
};
</script>

<style scoped>
</style>