<template>
  <form @submit.prevent="onSubmit">
    <input type="text" placeholder="add new Note" v-model="note.title" />
    <button type="submit" @click="reset(event)">create</button>
    <hr />
  </form>
</template>

<script>
import { db } from "../firebaseDb";

export default {
  data() {
    return {
      title: "",
      note: {
        title: "",
        todos: [
          {
            title: "edit todo",
            completed: false,
            edit: false
          }
        ]
      }
    };
  },
  methods: {
    onSubmit(event) {
      db.collection("notes")
        .add(this.note)
        .then(() => {
        })
        .catch(error => {
          console.log(error);
        });
      event.preventDefault(), event.target.reset();
    }
  }
};
</script>

<style scoped>
</style>