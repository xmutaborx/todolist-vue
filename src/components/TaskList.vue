<template lang="pug">
  include ../bemto/bemto.pug

  +b.card
    +e.card-buttons
      +b.BUTTON.btn-card(v-bind:class="{ active: activePage }"
                        @click="toggleActivePage") Active
      +b.BUTTON.btn-card(v-bind:class="{ active: !activePage }"
                        @click="toggleCompletedPage") Completed

    +e.title {{activePage ? 'Active Tasks' : 'Completed Task'}}
    +b.task
      ul
        //- active tasks
        li(v-for="(task, key) in tasks"
          v-if="activePage && task.completed == false")
          +e.wrap
            +e.row
              +e.id ID: {{ task.id }}

            +e.row
              +e.type Task:
              +e.text(v-if="taskStatusEdit != key"
                      v-on:dblclick="editTask(task, key)")
                | {{ task.title }}

              textarea.edit-todo(type="text"
                            v-model="task.title"
                            v-if="taskStatusEdit == key"
                            v-on:keyup.enter="editTask(task, key)")

            +e.row
              +e.type Desciption:
              +e.text(v-if="taskStatusEdit != key") {{ task.description }}

              textarea.edit-todo(type="text"
                            v-model="task.description"
                            v-if="taskStatusEdit == key"
                            v-on:keyup.enter="editTask(task, key)")

          +e.btn-wrap
            +b.BUTTON.btn--delete(@click="deleteTask(key)") Delete
            +b.BUTTON.btn(@click="editTask(task, key)") Edit
            +b.BUTTON.btn(@click="completeTask(task, key)") Complete

        //- completed tasks

        li.completed(v-for="(task, key) in tasks"
                    v-if="!activePage && task.completed == true")
          .wrap
            +e.row
              +e.id ID: {{ task.id }}

            +e.row
              +e.type Task:
              +e.text {{ task.title }}

            +e.row
              +e.type Desciption:
              +e.text {{ task.description }}

          +e.btn-wrap
            +b.BUTTON.btn--delete(@click="deleteTask(key)") Delete
            +b.BUTTON.btn--incompleted(@click="completeTask(task, key)") Incompleted

</template>

<script>
const STORAGE_KEY = 'todos'
import { mapState } from 'vuex'

export default {
  name: 'TaskList',
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
    padding 10px
    display flex
    justify-content space-between

    & + &
      margin-top 10px

    &.completed
      background rgba(115, 222, 174, 0.4)
      border-radius 15px

  .task
    &__wrap
      width 100%
      padding-right 30px

    &__id
      font-size 13px
      font-weight 600

    &__type
      font-weight 600
      margin-bottom 5px

    &__row
      margin-bottom 15px
      display flex
      flex-direction column

    &__btn-wrap
      display flex
      flex-direction column

      button + button
        margin-top 5px
</style>
