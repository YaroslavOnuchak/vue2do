<template>
  <div>
    <AddNote @add-Note="addNote" />
    <modal @agree="hide" @disegree="hide" />
    <ul>
      <li class="note" v-for="note of notes" :key="note">
        <div class="wrap_btn">
          <button type="button" @click="show(note.id)">del</button>
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
  </div>
</template>

<script>
import AddNote from "@//components/AddNewNote";
import modal from "@//components/modal";
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
  mounted() {
    this.getNote();
  },
  components: {
    AddNote,
    modal
  },
  methods: {
    delNote(note) {
      fetch(`http://localhost:3000/notes/${note}`, {
        method: "DELETE"
      }).then(response => {
        if (response.status === 200) {
          this.getNote();
        }
      });
    },
    getNote() {
      fetch("http://localhost:3000/notes")
        .then(response => response.json())
        .then(json => (this.notes = json));
    },
    addNote(newNote) {
      fetch("http://localhost:3000/notes", {
        method: "POST",
        body: JSON.stringify(newNote),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => {
          response.json();
        })
        .then(json => {
          this.notes = json;
          this.getNote();
        });
    },
    show(id) {
      this.$modal.show("modal", { delNote: id });
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
</style>
