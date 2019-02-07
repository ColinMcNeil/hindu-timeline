<template>
  <div class="container" :style="{width: (topTimeline.length+2)*400+'px'}">
    <div class="section top">
      <v-point
        v-for="(point, index) in topTimeline"
        :key="point.year"
        :visible="scrollCenter-400 > index*400"
        :style="{left: index*400+200+'px'}"
        :point="point"
      >
      </v-point>
      <transition-group name="lineT">
      <div v-for="(point, index) in bottomTimeline"
        :key="'line'+point.year"
        v-show="scrollCenter-420 > index*400" 
        :style="{left: index*400+300+'px'}"
        class="vline">
      </div>
      </transition-group>
    </div>
    <div class="line" :style="{ width }" />
    <div class="section bottom">
      <v-point
        v-for="(point, index) in bottomTimeline"
        :key="'point'+point.year"
        :visible="scrollCenter-200 > index*400"
        :style="{left: index*400+'px'}"
        :point="point"
      >
      </v-point>
      <transition-group name="lineT">
      <div v-for="(point, index) in bottomTimeline"
        :key="'line'+point.year"
        v-show="scrollCenter-180 > index*400" 
        :style="{left: index*400+100+'px'}"
        class="vline">
      </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import VPoint from '~/components/VPoint'
const timeline = [
  { year: "500AD", body: "stuff", title:"Title" },
  { year: "600AD", body: "stuff" },
  { year: "700AD", body: "stuff" },
  { year: "800AD", body: "stuff" },
  { year: "1000AD", body: "stuff" },
  { year: "1100AD", body: "stuff" },
  { year: "1200AD", body: "stuff" },
  { year: "1300AD", body: "stuff" }
]
export default {
  components: {
    VPoint
  },
  data: () => ({ scroll: 0, timeline, windowWidth: 0 }),
  computed: {
    width() {
      return `calc(73vw + ${this.scroll}px)`
    },
    scrollCenter(){
      return this.windowWidth/2 + this.scroll
    },
    topTimeline(){
      return timeline.filter((elem, index) => index % 2 == 0)
    },
    bottomTimeline(){
      return timeline.filter((elem, index) => index % 2 != 0)
    }
  },
  created() {
    if (process.server) return
    window.addEventListener("scroll", this.handleScroll)
    this.windowWidth = window.innerWidth
  },
  destroyed() {
    if (process.server) return
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    handleScroll(e) {
      this.scroll = e.pageX
      this.windowWidth = e.view.innerWidth
    }
  }
}
</script>
<style>
html,
html, body {
  margin: 0;
  overflow-y: hidden;
}
</style>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  height: 100%;
  
}
.section {
  display: flex;
  flex-basis: 100%;
  height: 100%;
  padding: 3em;
}
.bottom {
  align-items: flex-end;
}
.line {
  height: 5px;
  background: black;
  top: 50%;
  left: 20px;
  transition: ease 0.2s all;
}
.vline {
  display: block;
  position: absolute;
  width: 2px;
  height: 100px;
  background: black;
  margin-left: 400px;
  bottom: 50%;
}
.bottom .vline {
  top: 50%;
}

.bottom .vline:nth-of-type(1){
  /* margin-left: 100px; */
}
.lineT-enter-active, .lineT-leave-active {
  transition: all .4s;
}
.lineT-enter, .lineT-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0;
}

</style>
