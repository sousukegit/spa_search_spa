<template>
  <div>
    <header
      class="bg center header_font">
      <a href="http://localhost:3000/" class="a_color_del">サウナ探そうぜ！</a>
    </header>
    <div class="center">
      <nav>検索トップへ戻る</nav>
      <div><slot /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

.a_color_del{
  text-decoration: none;
  color:inherit;
}
.bg{
    background-color: lightblue;
}
.center{
    text-align: center;
}
.header_font{
    font-size: 30px;
    color: aliceblue;
    font-family:'Times New Roman', Times, serif;
    font-weight: bold;

}


</style>