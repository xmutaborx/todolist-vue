<template lang="pug">
  include ../bemto/bemto.pug

  +b.card
    +e.card-buttons
      +b.BUTTON.btn-card(v-bind:class="{ active: activePage }"
                        @click="toggleActivePage") Active
      +b.BUTTON.btn-card(v-bind:class="{ active: !activePage }"
                        @click="toggleCompletedPage") Completed
    +e.title Tasks list
    +b.task
      ul
        //- active tasks
        li(v-for="(task, key) in tasks" v-if="activePage && task.completed == false")
          .wrap
            +e.text Id:
              span  {{ task.id }}

            +e.text Task:
              span(v-if="taskStatusEdit != key")
                |  {{ task.title }}

              input.input-todo(type="text"
                            v-model="task.title"
                            v-if="taskStatusEdit == key"
                            v-on:keyup.enter="editTask(task, key)")

            +e.text Desciption:
              span(v-if="taskStatusEdit != key") {{ task.description }}

              input.input-todo(type="text"
                            v-model="task.description"
                            v-if="taskStatusEdit == key"
                            v-on:keyup.enter="editTask(task, key)")

            +e.text Status:
              span  {{ task.completed }}

          +e.btn-wrap
            +b.BUTTON.btn--delete(@click="deleteTask(key)") Delete
            +b.BUTTON.btn(@click="editTask(task, key)") Edit
            +b.BUTTON.btn(@click="completeTask(task, key)") Complete

        //- completed tasks
        li(v-for="(task, key) in tasks" v-if="!activePage && task.completed == true")
          .wrap
            +e.text Id:
              span  {{ task.id }}

            +e.text Task:
              span(v-if="taskStatusEdit != key")
                |  {{ task.title }}

              input.input-todo(type="text"
                            v-model="task.title"
                            v-if="taskStatusEdit == key"
                            v-on:keyup.enter="editTask(task, key)")

            +e.text Desciption:
              span(v-if="taskStatusEdit != key") {{ task.description }}

              input.input-todo(type="text"
                            v-model="task.description"
                            v-if="taskStatusEdit == key"
                            v-on:keyup.enter="editTask(task, key)")

            +e.text Status:
              span  {{ task.completed }}

          +e.btn-wrap
            +b.BUTTON.btn--delete(@click="deleteTask(key)") Delete
            //- +b.BUTTON.btn(@click="editTask(task, key)") Edit
            +b.BUTTON.btn(@click="completeTask(task, key)") Incompleted

</template>

<script>
const STORAGE_KEY = 'todos'
import { mapState } from 'vuex'

export default {
  name: 'Taskitem',
  data() {
    return {
      tasks: [],
      taskStatusEdit: 'close',
      activePage: true,
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
      if (this.taskStatusEdit != key) {
        this.taskStatusEdit = key
      } else {
        let base = JSON.parse(localStorage.getItem(STORAGE_KEY))
        base[key].title = task.title
        base[key].description = task.description
        localStorage.setItem(STORAGE_KEY, JSON.stringify(base))
        this.$store.state.status = true
        this.taskStatusEdit = 'close'
      }
    },
    completeTask(task, key) {
      let base = JSON.parse(localStorage.getItem(STORAGE_KEY))
      base[key].completed = !base[key].completed
      localStorage.setItem(STORAGE_KEY, JSON.stringify(base))
      this.$store.state.status = true
    },
    toggleCompletedPage() {
      this.activePage = false
    },
    toggleActivePage() {
      this.activePage = true
    }
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
    padding-bottom 10px
    display flex
    justify-content space-between
    & + &
      margin-top 10px

  .task
    &__text
      font-weight 600
      margin-bottom 5px
      max-width 400px

      & span
        font-weight 400
        padding-left 10px
        word-wrap break-word

      & input
        margin-left 10px

    &__btn-wrap
      display flex
      flex-direction column

      button + button
        margin-top 5px
</style>
