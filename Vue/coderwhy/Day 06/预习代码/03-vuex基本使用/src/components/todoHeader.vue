<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入您的任务名称, 按回车确认"
      v-model="title" @keyup.enter="addItem">
  </div>
</template>

<script>
  export default {
    name: "todoHeader",
    data() {
      return {
        title: null
      }
    },
    methods: {
      addItem() {
        const title = this.title && this.title.trim()
        if (title) {
          const todo = {
            title,
            complete: false
          }
          this.$store.dispatch('addToto', todo)
          this.title = null
        }
      }
    }
  }
</script>

<style scoped>
  .toto-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
  }

  .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, .8);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(82,168,236,.6);
  }
</style>
