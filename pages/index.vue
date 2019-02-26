<template>
  <div ref="container" class="container" :style="{width: (topTimeline.length+1)*400+windowWidth/2+'px'}">
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
    location:"Uttar Pradesh", 
    year: "500", 
    body: "This temple is made of stone mined at the nearby river and is\
      one of the earliest examples of hindu architecture. \
      Inscriptions are written in Hindu, Jain and Buddhist. \
      Sculpted panels are seen with carved figurines of river goddesses \
      Ganga and Yamuna. The figure sitting in the middle is Vishnu. \
      He is four-armed, holds his iconic conch shell in his rear left \
      hand, the iconic chakra in his rear right, front right hand is in \
      abhaya mudra while the left front is on his thigh.",
    url: "https://en.wikipedia.org/wiki/Dashavatara_Temple,_Deogarh",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Anantasayi_Vishnu_Deogarh.jpg"
  },
  { 
    title: "Elephanta Caves", 
    location:" Elephanta Island, Maharashtra", 
    year: "550", 
    body: "They were named Elefante – which morphed to Elephanta – \
      by the colonial Portuguese when they found elephant statues on it.\
      They established a base on the island, and its soldiers damaged \
      the sculpture and caves. This photo is of Sadasiva: Trimurti. Considered the most \
      important masterpiece in the caves, it is 20ft tall. \
      The three heads represent three essential aspects of Shiva: \
      creation, protection, and destruction",
    url: "https://en.wikipedia.org/wiki/Elephanta_Caves",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Trimurti%2C_Cave_No._1%2C_Elephanta_Caves_-_1.jpg"
  },
  { 
    title: "Descent of the Ganges", 
    location:"Kancheepuram", 
    year: "650", 
    body: "The relief was created to celebrate the victory of the \
    Narasimhavarman dynasty in the 7th century. It was carved \
    on two large boulders of pink granite. The sculptures carved \
    in the natural fissure that divides the cliff not only depict a \
    cosmic event of Ganges descending to earth (a popular narration and \
    depiction in the iconography of Shiva) at the command of Shiva but \
    also shows the event being watched by scores of gods, goddesses, \
    mythical figurines of Kinnara, Gandharva, Apsara, Gana, Nagas, \
    and also wild and domestic animals, all admiringly looking up at \
    the scene",
    url: "https://en.wikipedia.org/wiki/Descent_of_the_Ganges_(Mahabalipuram)",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/India_-_Mamallapuram_-_030_-_Arjunas_Penance_Bas_Relief_%28490988077%29.jpg"
  },
  { 
    title: "Shiva as Lord of Dance (Nataraja)", 
    location:"Tamil Nadu", 
    year: "1000", 
    body: "In this era, bronze casting starts to get popular.\
      As a symbol, Shiva Nataraja is a brilliant invention. \
      It combines in a single image Shiva's roles as creator, preserver, \
      and destroyer of the universe and conveys the Indian conception of \
      the never-ending cycle of time. You can see in the shape of the arms, \
      they make a circular structure and this has meaning. His top right \
      hand has the drum of the creation of the world. The upper left hand \
      holds the fire that will destroy the universe. His lower hands cup \
      his troubled soul.",
    url: "https://www.metmuseum.org/art/collection/search/39328",
    image: "https://images.metmuseum.org/CRDImages/as/original/DT240.jpg"
  },
  { 
    title: "Vajravarahi in Wrathful Posture", 
    location:"Central Tibet", 
    year: "1200", 
    body: "Cast in Bronze, with colored sections of turquoise and silver.\
    Vajravarahi derives from the boar-headed Hindu goddess \
    Varahi, the female aspect of Vishnu’s boar avatar, Varaha. \
    What is she dancing on, and what is she holding?",
    url: "https://www.metmuseum.org/art/collection/search/665922",
    image: "https://images.metmuseum.org/CRDImages/as/original/DP702272.jpg"
  },
  { 
    title: "Durga as Slayer of the Buffalo Demon Mahishasura", 
    location:"Nepal", 
    year: "1350", 
    body: "Cast in gilded bronze with precious stones, \
    Durga is the warrior goddess. The word Durga (दुर्गा)(দুর্গা) \
    literally means 'impassable', 'invincible', 'unassailable'. \
    She usually carries a weapon and defeated multiple big demons. ",
    url: "https://www.metmuseum.org/toah/works-of-art/1986.498/",
    image: "https://www.metmuseum.org/toah/images/hb/hb_1986.498.jpg"
  },
  { 
    title: "Head of Bhairava", 
    location:"Nepal, Kathmandu Valley", 
    year: "1500", 
    body: "This image is another depiction of Shiva. Bhairava embodies rage and is another form of Shiva. Why is his mouth pierced?",
    url: "https://www.metmuseum.org/art/collection/search/78187",
    image: "https://images.metmuseum.org/CRDImages/as/original/DP307219.jpg"
  },
  { 
    title: "Melancholy Courtesan", 
    location:"India (Rajasthan, Bundi, or Kota)", 
    year: "1750", 
    body: "While not explicitly about Hinduism, this is an example \
      of how Hindu art adapted later on. The practice of making images \
      of courtesans migrated from Persia into the artistic repertoire \
      of Muslim India and from there to Hindu painting. This compositional\
      formula derives from Mughal prototypes, but the handling of \
      color, pattern, and space is purely Rajput.  ",
    url: "https://www.metmuseum.org/art/collection/search/38012",
    image: "https://images.metmuseum.org/CRDImages/as/original/DT3878.jpg"
  },
  { 
    title: "Kali", 
    location:"Kolkata, India", 
    year: "1885", 
    body: "Lithograph: This image of Kali, \
      the ferocious slayer of demons, appeared in various versions \
      till as late as the 1920s. This image was actually used \
      primarily as a cigarette ad. 'If you care to improve the \
      manufacture of national products, if the welfare of the nation’s \
      poor laborers is your concern, if you have a sense of good and\
      bad, then O Hindu brothers, smoke these Kali cigarettes'",
    url: "https://www.metmuseum.org/art/collection/search/78257",
    image :"https://images.metmuseum.org/CRDImages/as/original/DP702072.jpg"
  },
  { 
    title: "Lakshmi", 
    location:"India", 
    year: "1894", 
    body: "This is one of the earliest and most famous examples \
    of Hindu lithographs. Lakshmi is the Hindu goddess of wealth, \
    fortune and prosperity. ",
    url: "https://www.metmuseum.org/art/collection/search/78264",
    image: "https://images.metmuseum.org/CRDImages/as/original/DP702078.jpg"
  },

]
export default {
  components: {
    VPoint
  },
  data: () => ({ scroll: 10, timeline, windowWidth: 700 }),
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
  },
  destroyed() {
    if (process.server) return
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    handleScroll(e) {
      this.scroll = window.pageXOffset
      this.windowWidth = window.innerWidth
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
  background: white;
  /* border-top: solid blue 1px;
  border-bottom: solid blue 1px; */
  top: 50%;
  left: 20px;
  transition: ease 0.2s all;
}
.vline {
  display: block;
  position: absolute;
  width: 4px;
  height: 100px;
  background: white;
  /* border-left: solid blue 1px;
  border-right: solid blue 1px; */
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
