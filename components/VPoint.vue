<template>
<transition name="fade">
  <div class="point" v-show="visible">
    <h2>{{point.title}}</h2>
    <p class="body">
      {{ point.body }}
    </p>
  </div>
</transition>
</template>
<script>
export default {
  props: {
    visible: {type: Boolean, required: true},
    point: {type: Object, required: false, default: {}}
  }
}
</script>
<style scoped>
.point {
  margin-left: 400px;
  border: solid grey 1px;
  padding: 2em;
  position: absolute;
  width: 150px;
}
.fade-enter-active, .fade-leave-active {
  transition: all .4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(0);
}
</style>
