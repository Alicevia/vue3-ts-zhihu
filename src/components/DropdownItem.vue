<template>
  <li class="dropdown-item" type="button"><slot></slot></li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang='less' scoped>
.dropdown-item.is-disabled {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>