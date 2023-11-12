<template>
    <div>
        
        <Pagetitle :title="title"></Pagetitle>
        <SearchBox  @getdatas="getDatas"/>
        <SearchResult  v-model:result="searchConditions"
      v-model:isSearched="isSearched"> </SearchResult> 
        <!-- <Maptest/> -->
        
        
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const title = ref("ホーム")

//結果データの変数　初期値宣言
const searchConditions = ref([])
//検索されたかの変数　初期値宣言
const isSearched = ref(false)

const getDatas = (val:any[]) :void =>{
      isSearched.value =true
      searchConditions.value = val
      console.log(val)
      console.log(val[0].name)
 }


const test_txt_value = 'aaaa'
const test_txt = ref(test_txt_value)


 const test_getdata = (data:string) :void =>{
      test_txt.value = data
      console.log(data)
 }


</script>
