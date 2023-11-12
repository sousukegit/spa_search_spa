<template>
<div class="sheet">

    <div>
            <div v-for="(photo, i) in spa.photos" :key="i" eager>
                <div v-if="i===1">
                <a :href="spa.url" target="_blank"
            ><img class="pic" :src="photo.getUrl()" /></a>
                </div>
            </div>

        
            <div class="table_box">
        <tbody>
            <th>項目</th>
            <th>詳細</th> 
            <tr>
                <td>店名</td>
                <td>{{ spa.name }}</td>             
            </tr>
            <tr>
                <td>評価</td>
                <td>{{ spa.rating }}</td>  
            </tr>
            <tr>
                <td>住所</td>
                <td>{{ spa.vicinity }}</td>  
            </tr>
            <tr>
                <td>営業ステータス</td>
                <!-- //営業中か判定する -->
                <td v-if="spa.opening_hours?.isOpen()">
                    営業中
                </td>  
                <td v-else>
                    営業時間外
                </td>  
            </tr>
            <tr>
                <td>営業時間</td>
                <td>
                    <div v-for="(opentime,index) in spa.opening_hours?.weekday_text"
                    :key="opentime">
                    {{ opentime }}
                    </div>
                </td>             
            </tr>
            <tr>
                <td>WEbサイト</td>
                <td><a :href="spa.website" target="_blank">{{ spa.website }}</a></td>  
            </tr>
        </tbody>
        </div>

    </div>
        <div class="x_scroll">
            <div v-for="(review) in spa.reviews" >
                <div class="review_card">
                    <img :src="review.profile_photo_url"  class="review_card_pic">
                    <p>{{ review.author_name }}</p>
                    <p>{{ review.text }}</p>
        
                </div>
            </div>
        </div>

        <h2>周辺マップ</h2>
        <div id='map' class="map_size">
            google map
        </div>
</div>       
</template>
<script lang="ts" setup>


//ルートIDをURLより取得
const route = useRoute()
const queryPlaceID =route.params.id 
const{reviewer,setDialogData} = useDialog()

//spaで空のオブジェクトを宣言
const spa = ref<google.maps.places.PlaceResult>({})
console.log(spa.value)

onMounted(()=>{
    const loader = useGoogle()

    loader
    .load()
    .then((google)=>{

                //mapインスタンス作成 初期描画用
                const map = new google.maps.Map(document.getElementById('map') ,{
                    //初期表示設定
                    //適当な値で表示
                    zoom:17,
                    center: new google.maps.LatLng(0,0),
                    fullscreenControl:false,
                    mapTypeControl:false,
                    streetViewControl:true,
                    streetViewControlOptions:{
                        position:google.maps.ControlPosition.LEFT_BOTTOM
                    },
                    scaleControl:true
                })
                const service = new google.maps.places.PlacesService(map)

                //受け取ったパラメータを元にmap情報の詳細を検索
                //getDetails（A,B）
                //Aでリクエスト送る
                //Bで戻ってきた関数の実行
                service.getDetails({
                    placeId:queryPlaceID
                },
                
                    (place,status)=>{
                        if(status === google.maps.places.PlacesServiceStatus.OK){
                            spa.value = place
                            useHead({title: spa.value.name})
                            //位置情報を取得
                            map.setCenter(
                                new google.maps.LatLng(
                                place.geometry.location.lat(),
                                place.geometry.location.lng()
                                )
                            )
                            //マーカーオブジェクトをつける
                            new google.maps.Marker({
                                map,
                                position: new google.maps.LatLng(
                                    place.geometry.location.lat(),
                                    place.geometry.location.lng()
                                )
                            })
                        }
                    }
                )

            }
        )
        .catch(()=>{})
})
console.log(spa)
//レビューオブジェクトの型宣言関数
//実際は
function useDialog(){
    //
    const reviewer = reactive({name:'',src:'',content:''})
    const setDialogData = (name:string,src:string,content:string) => {
        reviewer.name = name
        reviewer.src = src
        reviewer.content = content
        activateDialog.value = true
    }
    return{reviewer,setDialogData}

}



</script>
<style scoped>
  .table_box{
    background: aliceblue;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;

  }

  .pic{
    height: 300px;
    width: 100%;
    object-fit: cover;
    
 }

 .review_card{
    padding: 10px 6px;
    border: solid;
    margin: 10% 2%;
    height: 207px;
    width: 131px;
    overflow: hidden;

 }
 .review_card_pic{
    height: 70px;
 }

 .x_scroll{
    display:flex; 
    overflow-x: scroll; 
    flex-shrink: 0;
 }
  
 .map_size{
    width:100%; 
    height:500px;
    margin: auto;

 }
 .sheet{
    margin: 10px 10px;
    
 }

</style>
