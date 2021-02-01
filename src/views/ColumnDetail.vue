<template>
  <div class="column-detail-page mx-auto w-75">
    <div class="border-bottom row pb-4 align-items-center" v-if="columnInfo">
      <div class="col-3">
        <img
          class="w-75 rounded-circle border"
          :src="columnInfo.avatar && columnInfo.avatar.fitUrl"
          :alt="columnInfo.title"
        />
      </div>
      <div class="col-9">
        <h4>{{ columnInfo.title }}</h4>
        <p class="text-black-50 small">
          {{ columnInfo.description }}
        </p>
      </div>
    </div>
    <div class="px-4">
      <PostList :list="postListData"></PostList>
    </div>
  </div>
</template>

<script lang="ts">
import PostList from "@/components/PostList.vue";
import { ColumnProps, StoreProps } from "@/store";
import { addColumnAvatar } from "@/utils";
import {
  computed,
  defineComponent,
  onBeforeUpdate,
  onMounted,
  reactive,
  watch,
  ref,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    PostList,
  },

  setup() {
    const route = useRoute();
    const store = useStore<StoreProps>();
    const columnId = ref(route.params.id);
    watch(
      () => route.params.id,
      (newValue) => {
        columnId.value = newValue;
        console.log("-=", columnId.value);
        store.dispatch("fetchColumnPostList", {
          id: columnId.value,
          currentPage: page.currentPage,
          pageSize: page.pageSize,
        });
      }
    );
    const page = reactive({
      currentPage: 1,
      pageSize: 5,
    });
    const postListData = computed(() =>
      store.getters.getPostInfoById(columnId.value)
    );
    const columnInfo = computed(() => {
      let a = store.getters.getColumnInfoById(columnId.value) as ColumnProps;
      if (a) {
        addColumnAvatar(a, 100, 100);
      } else {
        store.dispatch("fetchColumnInfoById", columnId.value);
      }
      return a;
    });

    onMounted(() => {
      store.dispatch("fetchColumnPostList", {
        id: columnId.value,
        currentPage: page.currentPage,
        pageSize: page.pageSize,
      });
    });

    return { postListData, columnInfo };
  },
});
</script>

<style lang='less' scoped>
.sl {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>