<template lang="html">
  <div :class="classObject" @click="captureClick">
    {{ day.format('D') }}
    <ul class="event-list">
      <li v-for="event in events">{{ event.description }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: [ 'day' ],
    
    computed: {
      events(){
        return this.$store.state.events.filter(event => event.date.isSame(this.day, 'day'));
      },
      classObject(){
        let eventFormActive = this.$store.state.eventFormActive;
        return { 
          day: true,
          today: this.day.isSame(this.$moment(), 'day'),
          past: this.day.isBefore(this.$moment(), 'day'),
          active: eventFormActive && this.$store.state.eventFormDate.isSame(this.day, 'day') 
        };
      }
    },
    
    methods: {
      captureClick(event){
        this.$store.commit('setEventFormPos', { x: event.clientX, y: event.clientY });
        this.$store.commit('setEventFormActive', true);
        this.$store.commit('setEventFormDate', this.day);
      }
    }
  }
</script>

<style lang="css">
</style>
