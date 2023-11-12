<template>
    <div>
        <form v-on:submit.prevent>
            <label >検索地</label>
            <br>
            <input 
            type="text" 
            label="検索地" 
            v-model="searchPoint"
            placeholder="例）横浜" 
            v-bind:rules="[required]"               
            >

            
            <br>
            <label >検索条件</label>
            <br>
            <input 
            type="text" 
            label="検索条件" 
            v-model="searchCondition"
            placeholder="例）サウナ　今治" 
            >
            <br>
            <button v-on:click="getData">検索</button>
            <p>検索地:{{ searchPoint_w }}</p>
            <p>検索条件:{{ searchCondition_w }}</p>
            


        </form>

    </div>
    

</template>

<script lang="ts" setup>

//親に返すEmitsオブジェクト宣言
interface Emits{
    (e:'getdatas',value:any[]):void
}

//defineEmits関数にセット
//この関数を処理の最後に用いて親のイベントと戻り値を紐づける
const emits = defineEmits<Emits>()


//inputに当たる変数を宣言・refで初期化
const searchPoint = ref('')
const searchCondition = ref('')

const searchPoint_w = ref('')
const searchCondition_w = ref('')

//未入力を監視

const loading = ref(false)
const required = computed(() =>{
    return !!searchPoint.value || '必ず入力してください'
})

//googlemap　API関数



const loader = useGoogle()

const getData = ():void =>{

    //検索結果宣言
    const searchResult = ref([])

    //検索実行関数
    loader.load().then((google) => {
       
        const geocoder = new google.maps.Geocoder()
        //位置情報のインスタンス化
        let latLng: google.maps.LatLng = new google.maps.LatLng(0.0)
        geocoder.geocode({
        //入力した値をリクエスト
        //クエリパラメータにある指定都市の名称をリクエスト
            address:searchPoint.value

        },
        //callback関数
        //結果オブジェクトとステータスオブジェクトが帰ってくる
        (result:any,status) => {
            //レスポンスとステータスを引数に取れる
            if(status === google.maps.GeocoderStatus.OK){
                //周辺検索用に緯度と経度を取得する
                const center = result[0]
                latLng = center.geometry.location
            }
            }
        )

        //html要素を持たせたマッププレイスサービスを定義
        const map = new google.maps.Map(document.createElement('div'))
    　　const service = new google.maps.places.PlacesService(map)
     //テキスト検索用のリクエスト
     service.textSearch(
    {
        //緯度経度
        location:latLng,
        //検索する半径
        radius:2000,
        //検索ワード
        query:
         'サウナ' + ' ' + searchPoint.value + ' ' + searchCondition.value,
         //レスポンス言語
        language:'ja'
    },
    //第二引数で処理
    //callback関数
    //結果オブジェクトとステータスオブジェクトが帰ってくる
    (result,status) =>{
    //レスポンスとステータスを引数にとれる
    if(
        status === google.maps.places.PlacesServiceStatus.OK ||
        status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS
    ){
        result!.forEach((element) => {
            const format =element.formatted_address!.slice(12)
            element.formatted_address = format
        })
        searchResult.value =result!
        emits('getdatas',searchResult.value)

        }        
    }
    
   )
    })
    .catch(
        () =>{

        })
 
    //検索値を表示
    searchPoint_w.value=searchPoint.value
    searchCondition_w.value=searchCondition.value
    //textを空に
    // searchPoint.value=""
    // searchCondition.value=""


}



// const required = computed(()=>{
//     return !!seachPoint.value ||'必ず入力してください'
// })





</script>

<style>

</style>