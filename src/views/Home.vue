<template lang="pug">
  include ../bemto/bemto.pug

  +b.SECTION.todolist
    +e.container
      +e.card-wrapper
        +b.card
          +e.title Insert task
          InputTodo
        +e.list-wrap
          TaskList

</template>

<script>
import InputTodo from '../components/InputTodo'
import TaskList from '../components/TaskList'

export default {
  name: 'home',
  components: {
    InputTodo,
    TaskList
  }
}
</script>

<style lang="stylus">
  .todolist
    &__container
      max-width 1440px
      padding 0 25px
      margin 0 auto

    &__card-wrapper
      display flex
      justify-content center
      flex-direction column
      align-items center

    &__list-wrap
      margin-top 50px
</style>
