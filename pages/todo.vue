<template>
  <div>
  <!-- {{ todo }} -->
    <ul>
      <li v-for="todo in todo" :key="todo.id">
        {{ todo }}
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
    }
  },
  computed: {
    todo() {
      return this.$store.state.todo.todo
    }
  }
}
</script>
