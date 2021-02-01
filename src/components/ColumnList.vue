<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="item in list" :key="item._id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            v-if="item.avatar && item.avatar.fitUrl"
            class="rounded-circle border border-light pb-25 my-3"
            style="width: 100px; height: 100px"
            :src="item.avatar.url"
            :alt="item.title"
          />
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-left text-truncate">
            {{ item.description }}
          </p>
          <router-link
            tag="a"
            :to="{ name: 'column', params: { id: item._id } }"
            class="btn btn-outline-primary"
            href="#"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { ColumnProps, ListProps } from "@/store";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true,
    },
  },

  setup(props) {
    return {};
  },
});
</script>
