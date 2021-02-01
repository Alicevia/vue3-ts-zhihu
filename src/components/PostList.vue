<template>
  <div class="card mt-4" v-for="item in postList" :key="item._id">
    <div class="card-body">
      <router-link
        :to="{ name: 'post', params: { id: item._id } }"
        class="card-title font-weight-bold d-block mb-2 text-decoration-none text-dark"
        >{{ item.title }}</router-link
      >

      <div class="row">
        <div class="col-md-2 col-sm-12 align-self-center" v-if="item.image">
          <img
            :src="item.image.fitUrl"
            class="card-img-top"
            :alt="item.title"
          />
        </div>
        <div class="col-10 pt-3">
          <p class="card-text sl">
            {{ item.excerpt }}
          </p>
        </div>
        <p class="card-text py-2">
          <small class="text-muted">{{ item.createdAt }}</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ImageProps, PostProps } from "@/store";
import { generateFitUrl } from "@/utils";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true,
    },
  },
  setup(props) {
    const postList = computed(() => {
      return props.list.map((item) => {
        generateFitUrl(item.image as ImageProps, 200, 110, ["m_fill"]);
        return item;
      });
    });
    return { postList };
  },
});
</script>

<style scoped>
</style>