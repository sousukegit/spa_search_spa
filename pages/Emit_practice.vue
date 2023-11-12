<template>
    <div>
        
        <Pagetitle :title="title"></Pagetitle>
        <!-- <SearchBox  @getdatas="getDatas"/> -->
        <ChildComponent @childget="test_getdata"/>
        <p>{{ test_txt }}</p>
        <!-- <SearchResult/> -->
        <!-- <Maptest/> -->
        
        
    </div>
</template>
<script lang="ts" setup>

import {  ref } from 'vue';
const test_txt_value = 'aaaa'
const test_txt = ref(test_txt_value)



  const title = ref("ホーム")
  // const searchConditions = ref([])

 const test_getdata = (data:string) :void =>{
      test_txt.value = data
      console.log(data)
 }


</script>
