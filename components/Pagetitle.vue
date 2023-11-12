<template>
    <div>
    <h2 class="gold">{{title}}</h2>

    </div>
   
</template>
<script lang="ts" setup>
  interface Props {
    title: string
  }

  withDefaults(defineProps<Props>(), {
    title: ''
  })


</script>

<style scoped>
    .gold{
    background-color: goldenrod;
}


</style>