

<template>
    <div>
        <h1>
            map
        </h1>
        <div ref="gmap" class="map_size"></div>
    </div>
</template>

<script lang="ts" setup>
    import {ref} from 'vue'
    import {Loader} from '@googlemaps/js-api-loader'


    const gmap = ref<HTMLElement>()
    
    console.log(gmap.value)



    const mapOptions = {
        center: {
            lat: 34.60,
            lng: 135.52
        },
        zoom: 15
        };


onMounted(()=>{
    const loader = new Loader({
        apiKey:"AIzaSyDOD3zKKeyFhO_UJV38OlMKdXbl-_ICRLQ",
        version:"weekly",
        libraries:["places"]
    })


    loader
    .load()
    .then((google) => {
        new google.maps.Map(gmap.value, mapOptions);
        console.log('a')
        console.log(gmap.value)
        console.log('a')
    })
    .catch(e => {
        // do something
    });
})



</script>

<style>
  .map_size{
    width:500px; 
    height:500px;
    margin: auto;

 }


</style>
