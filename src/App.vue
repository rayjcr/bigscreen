<template>
  <div id="app">
    <noumenon></noumenon>
  </div>
</template>

<script>
import noumenon from './views/Noumenon.vue'
export default {
  name: 'App',
  components:{
    noumenon
  },
  data(){
    return {
    }
  },
  created() {  
  },
  methods:{
  },
  watch:{
  }
}
</script>
<style>

.zoom-enter-active{
    animation-name: zoomIn;
    animation-duration: .3s;
}
.zoom-leave-active{
    animation-name: zoomOut;
    animation-duration: .3s;
}
*{
	margin: 0;
  padding: 0;
}
html,body{height:100%}
</style>