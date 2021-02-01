<template>
  <teleport to="#message">
    <div
      role="alert"
      v-if="isVisible"
      :class="classObj"
      class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
    >
      <span>{{ message }}</span>
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        @click.prevent="hide"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import useCreateDOM from "@/hooks/useCreateDOM";
type MessageProp = "success" | "error" | "default";
export default defineComponent({
  props: {
    message: String,
    type: {
      type: String as PropType<MessageProp>,
      default: "defalut",
    },
  },
  emits: ["close-message"],
  setup(props, context) {
    const isVisible = ref(true);
    const classObj = {
      "alert-success": props.type === "success",
      "alert-danger": props.type === "error",
      "alert-primary": props.type === "default",
    };
    useCreateDOM("message");
    const hide = () => {
      isVisible.value = false;
      context.emit("close-message");
    };
    return { classObj, isVisible, hide };
  },
});
</script>

<style scoped>
</style>