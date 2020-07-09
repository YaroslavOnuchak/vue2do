<template>
  <div class="wrap_note">
    <span>
      Name of note:
      <strong>{{note.title}}</strong>
    </span>
    <ul>
      <modal @agree="hide" @disegree="hide" />
      <div class="wrap_note_btn">
        <button type="button" @click="addTodo">add todo</button>
        <button type="button" @click="save(note)">save</button>
        <button type="button" id="cancel" @click="show">cancel edit</button>
        <button type="button" id="delE" @click="show(note)">del note</button>
        <button type="button" @click="removeEdit">remove edit</button>
        <button type="button" @click="repeadEdit">repead edit</button>
      </div>
      <li v-for="(todo, i) of note.todos" :key="i" class="note" @click="saveStepEdit">
        <div class="wrap_todo_btn">
          <button type="button" @click="editTodo(todo)">edit todo</button>
          <button type="button" @click="delTodo(i)">del todo {{todo.id}}</button>
        </div>
        <input
          type="checkbox"
          v-bind:checked="todo.completed"
          v-on:click="todo.completed = !todo.completed"
        />
        <span v-bind:class="{done: todo.completed}" v-if="!todo.edit">{{todo.title}}</span>
        <span v-else>
          <input type="text" v-model="todo.title" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from "../firebaseDb";
import modal from "@/components/modal";
export default {
  props: {
    note: Object,
    required: true
  },
  components: { modal },

  mounted() {
    // if (
    //   localStorage.getItem("note") === undefined ||
    //   localStorage.getItem("note") === null
    // ) {
    localStorage.setItem("note", JSON.stringify(this.note));
    // } else {
    //   this.note = JSON.parse(localStorage.getItem("note"));
    // }
    // console.log("local", this.note.key);
    console.log("local", this.note);
  },
  methods: {
    addTodo() {
      this.note.todos.push({
        title: `edit todo`,
        completed: false,
        edit: false
      });
    },
    delTodo(el) {
      this.note.todos.splice(el, 1);
    },
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
      window.localStorage.clear();
      window.sessionStorage.clear();
      this.$router.push("/");
    },
    editTodo(el) {
      if (el.edit == false) {
        el.edit = true;
      }
    },
    removeEdit() {
      this.note = JSON.parse(localStorage.getItem("note"));
    },
    saveStepEdit() {
      sessionStorage.setItem("saveStepEdit", JSON.stringify(this.note));
    },
    repeadEdit() {
      this.note = JSON.parse(sessionStorage.getItem("saveStepEdit"));
    },
    cancelEdit() {
      this.note.edit = true;
      this.$router.push("/");
      window.localStorage.clear();
      window.sessionStorage.clear();
    },
    save(note) {
      note.todos.forEach(el => {
        if (el.edit == true) {
          el.title = el.title;
          el.edit = false;
        }
      });
      db.collection("notes")
        .doc(this.note.key)
        .update(this.note)
        .then(() => {
          // this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        });
      // localStorage.clear();
    },
    show(note) {
      this.$modal.show("modal", { note: note });
    },
    hide(el) {
      this.$modal.hide("modal");
      if (el.agree) {
        if (!el.cancelBtn) {
          this.delNote(el.id);
        } else {
          this.$router.push("/");
        }
      } else {
      }
    }
  }
};
</script>

<style scoped>
.wrap_note {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
li {
  border: 1px solid #000;
  margin: 0;
}
.wrap_todo_btn {
  display: flex;
  flex-direction: column;
}
</style>