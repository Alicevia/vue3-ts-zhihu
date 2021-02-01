<template>
  <form>
    <slot></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn w-100 btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import mitt from "mitt";
interface validateFunc {
  (): boolean;
}
export const emitter = mitt();
let funAry: validateFunc[] = [];
export default defineComponent({
  emits: ["form-submit"],
  setup(props, context) {
    const submitForm = () => {
      let result = funAry.map((item) => item()).every((a) => a);
      context.emit("form-submit", result);
    };
    const callback = (func?: validateFunc) => {
      if (func) {
        funAry.push(func);
      }
    };
    emitter.on("form-item-created", callback);
    onUnmounted(() => {
      emitter.off("form-item-created", callback);
      funAry = [];
    });
    return { submitForm };
  },
});
</script>

<style scoped>
</style>