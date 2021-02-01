<template>
  <div class="post-detail-page">
    <article class="w-75 mx-auto mb-5 pb-3" v-if="postInfo">
      <img class="rounded-lg img-fluid my-4" :src="currentImageUrl" alt="" />
      <h2 class="mb-4">{{ postInfo.title }}</h2>
      <div
        class="user-profile-componet border-top border-bottom py-3 mb-5 align-items-center row g-0"
      >
        <div class="col">
          <user-profile
            :user="postInfo.author"
            v-if="typeof postInfo.author === 'object'"
          ></user-profile>
        </div>
        <span class="text-muted col text-right font-italic"
          >发表于：{{ postInfo.createdAt }}</span
        >
      </div>
      <div v-html="postInfo.excerpt"></div>
      <div class="btn-group mt-5">
        <router-link
          type="button"
          class="btn btn-success"
          :to="{ name: 'create', query: { id: postInfo._id } }"
        >
          编辑
        </router-link>
        <button
          @click="deletePost(postInfo._id)"
          type="button"
          class="btn btn-danger"
        >
          删除
        </button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import UserProfile from "@/components/UserProfile.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { addColumnAvatar } from "../utils";
import { ImageProps, PostProps } from "@/store";
import api from "@/api";
export default defineComponent({
  components: {
    UserProfile,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const id = route.params.id;

    const postInfo = computed<PostProps>(() => {
      return store.getters.getPostInfoById(id);
    });
    const currentImageUrl = computed(() => {
      if (postInfo.value && postInfo.value.image) {
        const { image } = postInfo.value;
        return (image as ImageProps).url + "?x-oss-process=image/resize,w_850";
      }
    });

    onMounted(() => {
      store.dispatch("fetchPostInfoById", id);
    });
    const deletePost = (id: string) => {
      store.dispatch("fetchDeletePostById", id).then((res) => {
        router.push({
          name: "column",
          params: { id: res.data.column },
          replace: true,
        });
      });
    };
    return { postInfo, deletePost, currentImageUrl };
  },
});
</script>

<style scoped>
</style>