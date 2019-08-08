<template lang="pug">
  include ../bemto/bemto.pug

  +b.task
    ul
      li(v-for="(task, key) in tasks")
        .wrap
          +e.text Id:
            span  {{ task.id }}
          +e.text Task:
            span(v-if="!taskStatus")
              |  {{ task.title }}
            input.input-todo(type="text"
                          v-model="task.title"
                          v-if="taskStatus")
          +e.text Desciption:
            span(v-if="!taskStatus") {{ task.description }}
            input.input-todo(type="text"
                          v-model="task.description"
                          v-if="taskStatus")
          +e.text Status:
            span  {{ task.completed }}
        +e.btn-wrap
          button.btn(@click="deleteTask(key)") X
          button.btn(@click="editTask(task, key)") Edit

</template>

<script>
const STORAGE_KEY = 'todos'
import { mapState } from 'vuex'

export default {
  name: 'Taskitem',
  data() {
    return {
      tasks: [],
      taskStatus: false,
    }
  },
  methods: {
    deleteTask(id) {
      let base = JSON.parse(localStorage.getItem(STORAGE_KEY))
      base.splice(id, 1)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(base))
      this.$store.state.status = true
    },
    editTask(task, key) {
      this.taskStatus = !this.taskStatus

      if (this.taskStatus == false) {
        let base = JSON.parse(localStorage.getItem(STORAGE_KEY))
        base[key].title = task.title
        base[key].description = task.description
        localStorage.setItem(STORAGE_KEY, JSON.stringify(base))
        this.$store.state.status = true
      }
    },
  },
  created() {
    this.tasks = JSON.parse(localStorage.getItem(STORAGE_KEY))
  },
  mounted() {
    this.$store.watch(
      (state) => {
        if (state.status == true) {
          this.tasks = JSON.parse(localStorage.getItem(STORAGE_KEY))
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

      & input
        margin-left 10px

    &__btn-wrap
      display flex
      flex-direction column

      button + button
        margin-top 5px
</style>
