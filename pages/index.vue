<template>
  <div class="container" :style="{width: (topTimeline.length+1)*400+windowWidth/2+'px'}">
    <div class="section top">
      <transition-group class="section top" name="fade">
      <v-point
        v-for="(point, index) in topTimeline"
        :key="'top-point-'+point.year"
        v-show="scrollRight > index*400+400"
        :style="{left: index*400+300+'px'}"
        :scroll="scrollRight"
        :point="point"
      >
      </v-point>
      </transition-group>
      <transition-group name="lineT">
      <div v-for="(point, index) in topTimeline"
        :key="'top-line-'+point.year"
        v-show="scrollRight > index*400+400" 
        :style="{left: index*400+'px'}"
        class="vline">
      </div>
      </transition-group>
    </div>
    <div class="line" :style="{ width }" />
    <div class="section bottom">
      <transition-group class="section bottom" name="fade">
      <v-point
        v-for="(point, index) in bottomTimeline"
        :key="'bottom-point-'+point.year"
        v-show="scrollRight > index*400+200"
        :style="{left: index*400+100+'px'}"
        :point="point"
      >
      </v-point>
      </transition-group>
      <transition-group name="lineT">
      <div v-for="(point, index) in bottomTimeline"
        :key="'bottom-line-'+point.year"
        v-show="scrollRight > index*400+200" 
        :style="{left: index*400-200+'px'}"
        class="vline">
      </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import VPoint from '~/components/VPoint'
const timeline = [
  { 
    title: "Krishna Killing the Horse Demon Keshi", 
    location:"Uttar Pradesh", 
    year: "400", 
    body: "This is a sculpture made of taracotta. \
      It depicts Vishnu, in the farm of a warrior-king defeating \
      the demon Krishna in the form of a horse. Early Hindu cultures \
      believed in horse sacrifices. The viewpoint is straight on, and \
      it's almost like a 2d painting extended into 3d space. ",
    url: "https://www.metmuseum.org/toah/works-of-art/1991.300/",
    image: "https://www.metmuseum.org/toah/images/hb/hb_1991.300.jpg"
  },
  { 
    title: "Dashavatara Temple", 
    location:"Deogarh, Uttar Pradesh in north-central india", 
    year: "500", 
    body: "Architecture: ",
    url: "https://en.wikipedia.org/wiki/Dashavatara_Temple,_Deogarh",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Deogarh01.jpg"
  },
  { 
    title: "Elephanta Caves", 
    location:"Deogarh, Uttar Pradesh in north-central india", 
    year: "550", 
    body: "Architecture: ",
    url: "https://en.wikipedia.org/wiki/Elephanta_Caves",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Trimurti%2C_Cave_No._1%2C_Elephanta_Caves_-_1.jpg"
  },
  { 
    title: "Descent of the Ganges", 
    location:"Deogarh, Uttar Pradesh in north-central india", 
    year: "650", 
    body: "Architecture: ",
    url: "https://en.wikipedia.org/wiki/Descent_of_the_Ganges_(Mahabalipuram)",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/India_-_Mamallapuram_-_030_-_Arjunas_Penance_Bas_Relief_%28490988077%29.jpg"
  },
  { 
    title: "Shiva as Lord of Dance (Nataraja)", 
    location:"Deogarh, Uttar Pradesh in north-central india", 
    year: "1000", 
    body: "Architecture: ",
    url: "https://www.metmuseum.org/art/collection/search/39328",
    image: "https://images.metmuseum.org/CRDImages/as/original/DT240.jpg"
  },
  { 
    title: "Vajravarahi in Wrathful Posture", 
    location:"Central Tibet", 
    year: "1200", 
    body: "Architecture: ",
    url: "https://www.metmuseum.org/art/collection/search/665922",
    image: "https://images.metmuseum.org/CRDImages/as/original/DP702272.jpg"
  },
  { 
    title: "Durga as Slayer of the Buffalo Demon Mahishasura", 
    location:"Nepal", 
    year: "1350", 
    body: "Architecture: ",
    url: "https://www.metmuseum.org/toah/works-of-art/1986.498/",
    image: "https://www.metmuseum.org/toah/images/hb/hb_1986.498.jpg"
  },
  { 
    title: "Head of Bhairava", 
    location:"Nepal, Kathmandu Valley", 
    year: "1500", 
    body: "Architecture: ",
    url: "https://www.metmuseum.org/art/collection/search/78187",
    image: "https://images.metmuseum.org/CRDImages/as/original/DP307219.jpg"
  },
  { 
    title: "Melancholy Courtesan", 
    location:"India (Rajasthan, Bundi, or Kota [?])", 
    year: "1750", 
    body: "Architecture: ",
    url: "https://www.metmuseum.org/art/collection/search/38012",
    image: "https://images.metmuseum.org/CRDImages/as/original/DT3878.jpg"
  },
  { 
    title: "Kali", 
    location:"Kolkata, India", 
    year: "1885", 
    body: "Architecture: ",
    url: "https://www.metmuseum.org/art/collection/search/78257",
    image :"https://images.metmuseum.org/CRDImages/as/original/DP702072.jpg"
  },
  { 
    title: "Lakshmi", 
    location:"India", 
    year: "1894", 
    body: "Architecture: ",
    url: "https://www.metmuseum.org/art/collection/search/78264",
    image: "https://images.metmuseum.org/CRDImages/as/original/DP702078.jpg"
  },

]
export default {
  components: {
    VPoint
  },
  data: () => ({ scroll: 10, timeline, windowWidth: 0 }),
  computed: {
    width() {
      return `calc(50vw + ${this.scroll}px)`
    },
    scrollRight(){
      return this.windowWidth*0.6 + this.scroll
    },
    topTimeline(){
      return timeline.filter((elem, index) => index % 2 != 0)
    },
    bottomTimeline(){
      return timeline.filter((elem, index) => index % 2 == 0)
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
@import url('https://fonts.googleapis.com/css?family=Nanum+Myeongjo');
html, body {
  margin: 0;
  overflow-y: hidden;
  font-family: 'Nanum Myeongjo', serif;
  color: white;
}
</style>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  height: 100%;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#1e5799+0,efa12b+100 */
  background: #1e5799; /* Old browsers */
  background: -moz-linear-gradient(left, #1e5799 0%, #efa12b 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(left, #1e5799 0%,#efa12b 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to right, #1e5799 0%,#efa12b 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#efa12b',GradientType=1 ); /* IE6-9 */
}
.section {
  display: flex;
  flex-basis: 100%;
  height: 100%;
}
.top {
  align-items: flex-end;
  margin-bottom: 60px;
}
.bottom {
  margin-top: 60px
}
.line {
  height: 7px;
  background: orange;
  border-top: solid blue 1px;
  border-bottom: solid blue 1px;
  top: 50%;
  left: 20px;
  transition: ease 0.2s all;
}
.vline {
  display: block;
  position: absolute;
  width: 4px;
  height: 100px;
  background: orange;
  border-left: solid blue 1px;
  border-right: solid blue 1px;
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

.fade-enter-active, .fade-leave-active {
  transition: ease transform .4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(0);
}

</style>
