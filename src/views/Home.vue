<template lang="pug">
  include ../bemto/bemto.pug

  +b.SECTION.todolist
    +e.container
      +e.card-wrapper
        +b.card
          +e.title Insert task
          InputTodo
        +e.list-wrap
          +b.card
            +e.title Tasks list
            Taskitem

</template>

<script>
import InputTodo from '../components/InputTodo'
import Taskitem from '../components/Taskitem'

export default {
  name: 'home',
  components: {
    InputTodo,
    Taskitem
  }
}
</script>

<style lang="stylus">
  .todolist
    padding-top 50px

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
      margin-top 30px
</style>
