<!-- Emiut練習用 -->


<template>
    <div>
        <h2>
            子コンポーネント
        </h2>
        <button @click="sendDataToParent">
                親にデータ送信
        </button>
    </div>


</template>

<script lang="ts" setup>


interface Emits{
    (e:childget, data:string):void

}

const emits = defineEmits<Emits>()


const sendDataToParent = (): void =>{

    
    const data = '子コンポーネントのデータ'
    emits('childget',data)
  
}




</script>