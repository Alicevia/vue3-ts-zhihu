<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
    >
      {{ buttonInfo }}
    </a>

    <ul
      v-show="isOpen"
      style="display: block"
      class="dropdown-menu"
      aria-labelledby="dropdownMenu2"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import useClickOutside from "@/hooks/useClickOutside";
export default defineComponent({
  props: {
    buttonInfo: String,
  },
  setup() {
    const dropdownRef = ref<null | HTMLElement>(null);

    const isOpen = ref(false);
    const isClickOutside = useClickOutside(dropdownRef);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    watch(isClickOutside, () => {
      if (isClickOutside.value && isOpen.value) {
        isOpen.value = false;
      }
    });

    return { isOpen, toggleOpen, dropdownRef };
  },
});
</script>

<style lang='less' scoped>
</style>