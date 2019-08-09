<template lang="pug">
  include ../bemto/bemto.pug

  +b.card
    +e.card-buttons
      +b.BUTTON.btn-card(
        v-bind:class="{ active: activePage }"
        @click="togglePage('active')"
      )
        | Active
        +e.active {{taskCount}}

      +b.BUTTON.btn-card(
        v-bind:class="{ active: !activePage }"
        @click="togglePage('completed')"
      )
        | Completed

    +e.title {{activePage ? 'Active Tasks' : 'Completed Tasks'}}
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
              +e.text(
                v-if="taskStatusEdit != key"
                v-on:dblclick="editTask(task, key)"
              )
                | {{ task.title }}

              textarea.edit-todo(
                type="text"
                v-model="task.title"
                v-if="taskStatusEdit == key"
                @keyup.enter="editTask(task, key)"
              )

            +e.row
              +e.type Desciption:
              +e.text(
                v-if="taskStatusEdit != key"
                @dblclick="editTask(task, key)"
              )
                | {{ task.description }}

              textarea.edit-todo(
                type="text"
                v-model="task.description"
                v-if="taskStatusEdit == key"
                @keyup.enter="editTask(task, key)"
              )

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
import global from '../assets/global/variables.js'
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
      this.tasks.splice(id, 1)
      localStorage.setItem(global.STORAGE_KEY, JSON.stringify(this.tasks))
      this.$store.commit('toggle', true)
    },
    editTask(task, key) {
      if (this.taskStatusEdit != key) {
        this.taskStatusEdit = key
      } else {
        this.tasks[key].title = task.title
        this.tasks[key].description = task.description
        localStorage.setItem(global.STORAGE_KEY, JSON.stringify(this.tasks))
        this.$store.commit('toggle', true)
        this.taskStatusEdit = 'close'
      }
    },
    completeTask(task, key) {
      this.tasks[key].completed = !this.tasks[key].completed
      localStorage.setItem(global.STORAGE_KEY, JSON.stringify(this.tasks))
      this.$store.commit('toggle', true)
    },
    togglePage(param) {
      if (!this.activePage && param == 'active') {
        this.activePage = true
      } else if (this.activePage && param == 'completed') {
        this.activePage = false
      }
    },
  },
  computed: {
    taskCount() {
      let count = 0
      for (var key in this.tasks) {
        if (this.tasks[key].completed == false) {
          count++
        }
      }
      return count
    }
  },
  created() {
    this.tasks = JSON.parse(localStorage.getItem(global.STORAGE_KEY))
  },
  mounted() {
    this.$store.watch(
      (state) => {
        if (state.status == true) {
          this.tasks = JSON.parse(localStorage.getItem(global.STORAGE_KEY))
          this.$store.commit('toggle', false)
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
