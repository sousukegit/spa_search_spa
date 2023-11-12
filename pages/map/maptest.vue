

<template>
    <div>
        <h1>
            map
        </h1>
        <div ref="gmap"></div>
    </div>
</template>

<script lang="ts" >
    import {ref,onMounted} from 'vue'
    import {Loader} from '@googlemaps/js-api-loader'


    const gmap =ref<HTMLElement>()

    console.log(gmap)

    const mapOptions = {
        center: {
            lat:34.60,
            leg:135.52
        },

        zoom:15

    };

onMounted(()=>{

    console.log(gmap)

    // const loader = new Loader({
    //     apiKey:"AIzaSyDOD3zKKeyFhO_UJV38OlMKdXbl-_ICRLQ",
    //     version:"weekly",
    //     libraries:["places"]
    // })

    // loader.load().then((google)=>{
    //     new google.maps.Map(gmap.value, mapOptions);


    // })
    // .catch(e =>{

    //     console.log('エラー')
    // });

}
)



</script>
