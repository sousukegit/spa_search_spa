<template>
    <div v-if="props.result.length === 0 && props.isSearched ">
        <h2>結果</h2>
        <span >
        検索結果がありませんでした。
    </span>
    </div>
    <div v-else-if="props.result.length > 0">
        <h2>結果</h2>
        <span>
            検索結果は{{ props.result.length }}件です。
        </span>
    </div>
   
   
    <div>
        <div class="box_row">
            <div v-for="(spa,index) in result">
                <NuxtLink :to="`/map/${spa.place_id}`">
                <div class="box_item">
                    <div>
                        <img :src="spa.photos[0].getUrl()" class="pic">
                    </div>
                        {{ spa.name }}
                       
                    <br>
                    {{spa.rating}}
                </div>
                </NuxtLink>
            </div>
        </div>
    </div>
  


</template>
<script lang="ts" setup>
interface Props{
    result:Array<google.maps.places.PlaceResult>
    isSearched:boolean
}

const props = withDefaults(defineProps<Props>(),{
    result:()=>[],
    isSearched:false

})


const check = ():void =>{
    console.log(props)
}


</script>

<style scoped>

.box_row{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-around;
}
.box_item{
    flex: 0 0 calc(50% - 10px);
    width: 160px;
    justify-content: center;
    border: solid;   
    text-decoration: none;
    color:inherit;
    


    

}
 .pic{
    height: 150px;
    width: 160px;
    object-fit: cover;
    
 }
</style>