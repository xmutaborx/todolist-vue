<template lang="pug">
  include ../bemto/bemto.pug

  +b.task
    ul
      li(v-for="(task, key) in tasks")
        .wrap
          +e.text Id:
            span  {{ task.id }}
          +e.text Task:
            span  {{ task.title }}
          +e.text Desciption:
            span  {{ task.description }}
          +e.text Status:
            span  {{ task.completed }}
        .btn-wrap
          button.btn(@click="deleteTask(key)") X

</template>

<script>
const STORAGE_KEY = 'todos'

import { mapState } from 'vuex'

export default {
  name: 'Taskitem',
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    deleteTask(id) {
      let base = JSON.parse(localStorage.getItem('todos'))
      base.splice(id, 1)
      localStorage.setItem('todos', JSON.stringify(base))
      this.$store.state.status = true
    }
  },
  created() {
    this.tasks = JSON.parse(localStorage.getItem('todos'))
  },
  mounted() {
    this.$store.watch(
      (state) => {
        if (state.status == true) {
          this.tasks = JSON.parse(localStorage.getItem('todos'))
          state.status = false
        }
      }
    )
  }
}

</script>

<style lang="stylus" scoped>
  ul
    list-style none
    text-align left
    padding 0
  li
    border-bottom 1px solid #dedede
    padding-bottom 3px
    display flex
    justify-content space-between
    & + &
      margin-top 10px

  .task
    &__text
      font-weight 600
      margin-bottom 5px

      & span
        font-weight 400
        padding-left 10px
</style>
