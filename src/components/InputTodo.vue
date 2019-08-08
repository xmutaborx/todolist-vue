<template lang="pug">
  include ../bemto/bemto.pug

  +b.insert
    +e.wrapper
      +b.INPUT.input-todo(type="text" v-model="title" placeholder="Введите задание *")
      +b.INPUT.input-todo(type="text" v-model="description" placeholder="Введите описание")

      +e.btn-wrap
        button.btn(@click="addTodo" :disabled="!title") Apply
</template>

<script>
export default {
  name: 'InputTodo',
  data() {
    return {
      title: '',
      description: '',
      task: []
    }
  },
  methods: {
    addTodo() {
      if (localStorage.getItem('todos')) {
        this.task = JSON.parse(localStorage.getItem('todos'))
      }

      this.task.push({title: this.title,
                  description: this.description,
                  completed: 'false',
                  id: this.task.length + 1})
      localStorage.setItem('todos', JSON.stringify(this.task))

      this.title = this.description = ''
      this.$store.state.status = true
    },
  }
}
</script>

<style lang="stylus">
  .insert
    &__wrapper
      display flex
      flex-direction column

      input + input
        margin-top 10px

    &__btn-wrap
      margin-top 20px

    &__alert
      margin-top 10px
      color tomato
</style>

