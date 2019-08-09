<template lang="pug">
  include ../bemto/bemto.pug

  +b.insert
    +e.wrapper
      +b.INPUT.input-todo(
        type="text"
        v-model="title"
        placeholder="Введите задание *"
        v-on:keyup.enter="addTodo"
      )

      +b.INPUT.input-todo(
        type="text"
        v-model="description"
        placeholder="Введите описание"
        v-on:keyup.enter="addTodo"
      )

      +e.btn-wrap
        button.btn(
          @click="addTodo"
          :disabled="!title"
        )
          | Apply

</template>

<script>
import global from '../assets/global/variables.js'

export default {
  name: 'InputTodo',
  data() {
    return {
      title: '',
      description: '',
      tasks: []
    }
  },
  methods: {
    addTodo() {
      if (this.title) {
        if (localStorage.getItem(global.STORAGE_KEY)) {
          this.tasks = JSON.parse(localStorage.getItem(global.STORAGE_KEY))
        }

        this.tasks.push({
                    title: this.title,
                    description: this.description,
                    completed: false,
                    id: this.tasks.length + 1
                  })
        localStorage.setItem(global.STORAGE_KEY, JSON.stringify(this.tasks))

        this.title = this.description = ''
        // this.$store.state.status = true
        this.$store.commit('toggle', true)
      }
    },
  },
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

