<template>
  <div class="point" @mouseover="mouseover" @mouseleave="mouseleave" @mousemove="mousemove" :style="{backgroundImage: `url(${point.image})`, backgroundPosition:hovered? hoverPos: `0 0`}">
    <h2><a :href="point.url" target="_black" noopener>{{point.title}}</a></h2>
    <p class="year">Circa: {{point.year}}, <a :href="`https://maps.google.com/?q=${encodeURI(point.location)}`" target="_blank" noopener>{{point.location}}</a></p>
    <p class="body" v-if="hovered">
      {{ point.body }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    point: {type: Object, required: false, default: {}}
  },
  data: ()=>({x:0, y: 0, hovered: false}),
  methods: {
    mousemove(event) {
      this.x = event.clientX
      this.y = event.clientY
    },
    mouseleave(){
      this.x=0
      this.y=0
      this.hovered=false
    },
    mouseover(){
      this.hovered=true
    }

  },
  computed: {
    hoverPos(){
      let x = this.x > 400 ? 400 : this.x
      x = this.x < -400 ? -200 : x
      let y = this.y > 400 ? 400 : this.y
      y = this.y < -400 ? -400 : y
      return  `calc(${2*(x-400)}px) calc(${2*(y-400)}px)`
    }
  }
}
</script>
<style scoped>
.point {
  /* border: solid white 1px; */
  border-radius: 4px;
  padding: 10px;
  position: absolute;
  width: 250px;
  height: 25%;
  background-color: rgba(0,0,0,0.5);
  background-size: cover;
  background-repeat: no-repeat;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  background-blend-mode: darken;
  overflow: hidden;
  transition: background-color ease 0.2s, top 0.2s;
}
h2 {
  margin: 0;
}
a {
  color: #ffd048;
  text-decoration: none;
}
.point:hover{
  position: fixed;
  width: 90%;
  height: 90%;
  top: 5%;
  left: 5% !important;
  z-index: 10;
  font-size: 3em;
  background-size: 1500px;
  background-color: transparent;
  /* transform: translate(-10%, 0%); */
}
.body {
  font-size: 1.7rem;
  padding: 8px;
  max-width: 600px;
  border-radius: 4px;
  background-color: rgba(0,0,0,0.3);
}
</style>
