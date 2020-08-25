<template>
  <div>
  <!-- {{ todo }} -->
    <ul>
      <li v-for="todo in todo" :key="todo.id">
        {{ todo.done }} {{ todo. name }} {{ todo.created }}
        <button v-on:click="remove(todo.id)">削除です</button>
      </li>
    </ul>
    <div class="form">
      <form v-on:submit.prevent="add">
        <input v-model="name">
        <button>todo追加</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      name: '',
      done: false
    }
  },
  created: function() {
    this.$store.dispatch('todo/init')
  },
  methods: {
    add() {
      this.$store.dispatch('todo/add', this.name),
      this.name = ''
    },
    remove(id) {
      this.$store.dispatch('todo/remove', id)
    }
  },
  computed: {
    todo() {
      return this.$store.state.todo.todo
    }
  }
}
</script>
