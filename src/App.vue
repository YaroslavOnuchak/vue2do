<template>
  <div id="app">
    <h2>Todo SPA</h2>
    <button type="button" @click="cleanLocStor">
      <router-link :to="{name: 'main'}">Main</router-link>
    </button>
    <hr />
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  methods: {
    cleanLocStor() {
      localStorage.clear();
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  display: inline-block;
  color: black;
  padding: 0 0.5rem;
  margin: 1rem;
  border: 1px solid rgb(35, 30, 30);
  background: none;
  border-radius: 0.5rem;
  min-width: 3rem;
  height: 2rem;
  cursor: pointer;
  outline: none;
  text-align: center;
  text-decoration: none;
}
input[type="text"] {
  padding: 0.5rem;
  color: red;
  outline: none;
  border-color: seagreen;
  border-radius: 1rem;
}
a {
  text-decoration: none;
  color: #000;
}
button:hover {
  box-shadow: 0 0 1rem lightgreen;
  background: lightgray;
  color: #000;
  text-shadow: 0 0 5px white;
}
li.note {
  border: 1px solid #000;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin: 1rem auto;
  max-width: 100%;
  box-shadow: 0 0 1rem lightblue;

  width: 60%;
}
.wrap_btn {
  max-width: 20%;
}
ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.listTodo {
  max-width: 40%;
  margin: 0;
}
li {
  display: flex;
  justify-self: flex-end;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}
strong {
  flex-grow: 1;
  text-align: center;
}
.note {
  align-items: center;
}
.done {
  text-decoration: line-through;
}
</style>
