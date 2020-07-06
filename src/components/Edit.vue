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
        <button type="button" @click="show()">cancel edit</button>
        <button type="button" @click="show(note.id)">del note</button>
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
import modal from "@//components/modal";
export default {
  props: {
    note: Object,
    required: true
  },
  components: { modal },
  mounted() {
    if (
      localStorage.getItem("note") === undefined ||
      localStorage.getItem("note") === null
    ) {
      localStorage.setItem("note", JSON.stringify(this.note));
    } else {
      this.note = JSON.parse(localStorage.getItem("note"));
    }
  },
  methods: {
    addTodo() {
      this.note.todos.push({
        title: `enter todo`,
        completed: false,
        edit: false
      });
    },
    delTodo(el) {
      this.note.todos.splice(el, 1);
    },
    delNote(id) {
      fetch(`http://localhost:3000/notes/${id}`, {
        method: "DELETE"
      });
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
      localStorage.clear();
    },
    save(note) {
      note.todos.forEach(el => {
        if (el.edit == true) {
          el.title = el.title;
          el.edit = false;
        }
      });
      fetch(`http://localhost:3000/notes/${note.id}`, {
        method: "PUT",
        body: JSON.stringify(note),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    },
    show(id) {
      this.$modal.show("modal", { delNote: id });
    },
    hide(el) {
      this.$modal.hide("modal");
      if (el.agree) {
        this.delNote(el.id);
        this.$router.push("/");
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