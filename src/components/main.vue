<template>
  <div>
    <AddNote />
    <modal @agree="hide" @disegree="hide" />
    <ul v-if="notes.length">
      <li class="note" v-for="note of notes" :key="note.title">
        <div class="wrap_btn">
          <button type="button" @click="show(note)">del</button>
          <button type="button">
            <router-link :to="{ name: 'edit', params: { note: note }}">edit</router-link>
          </button>
        </div>
        <strong>{{note.title}}</strong>
        <ul class="listTodo">
          <li v-for="todo of note.todos" :key="todo">
            <input type="checkbox" v-bind:checked="todo.completed" disabled />
            <span v-bind:class="{done: todo.completed}">{{todo.title}}</span>
          </li>
        </ul>
      </li>
    </ul>

    <span v-else>No NOTES, create one</span>
  </div>
</template>

<script>
import { db } from "../firebaseDb";
import modal from "@/components/modal";
import AddNote from "@/components/AddNewNote";
export default {
  name: "App",
  data() {
    return {
      notes: []
    };
  },

  props: {
    note: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    db.collection("notes").onSnapshot(snapshotChange => {
      this.notes = [];
      snapshotChange.forEach(doc => {
        this.notes.push({
          key: doc.id,
          title: doc.data().title,
          todos: doc.data().todos,
          id: doc.id
        });
      });
    });
  },
  mounted() {},
  components: {
    modal,
    AddNote
  },
  methods: {
    delNote(id) {
      db.collection("notes")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document deleted!");
        })
        .catch(error => {
          console.error(error);
        });
      this.$modal.hide("modal");
    },
    show(note) {
      this.$modal.show("modal", { note: note });
    },
    hide(el) {
      this.$modal.hide("modal");
      if (el.agree) {
        this.delNote(el.id);
      }
    }
  }
};
</script>

<style scoped>
li {
  margin-bottom: 0.5rem;
}
li span {
  margin-left: 0.5rem;
}
.listTodo {
  height: 5rem;
  overflow: hidden;
  box-shadow: 0 0 5rem inset lightcyan;
  border-radius: 20%;
}
</style>
