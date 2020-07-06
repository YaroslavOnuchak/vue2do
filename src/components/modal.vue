<template>
  <modal name="modal" :classes="modal" @before-open="beforeOpen" @before-close="beforeClose">
    <span class="ask">
      Do you want
      <span>{{(!togle)? 'delete Note and exit':'exit from Edit'}}</span>?
    </span>
    <button type="button" @click="agree">Yes</button>
    <button type="button" @click="disegree">No</button>
  </modal>
</template>

<script>
export default {
  name: "ExampleModal",
  data() {
    return {
      time: 0,
      duration: 5000,
      data: {},
      togle: Boolean
    };
  },
  methods: {
    beforeOpen(event) {
      this.data.id = event.params.delNote;
      if (this.data.id === undefined) {
        this.togle = true;
      } else {
        this.togle = false;
      }
      // Set the opening time of the modal
      this.time = Date.now();
    },
    beforeClose(event) {
      // If modal was open less then 5000 ms - prevent closing it
      if (this.time + this.duration < Date.now()) {
        event.cancel();
      }
    },
    // click YES on modal
    agree() {
      this.data.agree = true;
      this.$emit("agree", this.data);
    },
    // click NO on modal
    disegree() {
      this.data.agree = false;
      this.$emit("disegree", this.data);
    }
  }
};
</script>

<style >
.modal,
.vm--modal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 40% !important;
  min-height: 5rem !important;
  max-height: 10rem !important;
  border-radius: 3rem;
}
.ask {
  width: 100%;
}
</style>