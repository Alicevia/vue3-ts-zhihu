<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link tag="a" to="/create" class="btn btn-primary my-2"
              >开始写文章</router-link
            >
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="columnList"></column-list>
    <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
      @click="loadMorePage"
      v-if="!isLastPage"
    >
      加载更多
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import ColumnList from "@/components/ColumnList.vue";
import useLoadMore from "@/hooks/useLoadMore";
import { addColumnAvatar } from "@/utils";
import { ColumnProps } from "@/store";
export default defineComponent({
  components: {
    ColumnList,
  },
  setup() {
    const store = useStore();
    const total = computed(() => store.state.columns.total);
    const columnList = computed(() => {
      let list = store.getters.getColumnList;
      return list.map((item: ColumnProps) => {
        addColumnAvatar(item, 50, 50);
        return item;
      });
    });
    console.log("list", columnList);

    const {
      loadMorePage,
      isLastPage,
      currentPage,
    } = useLoadMore("fetchColumnList", total, { pageSize: 6, currentPage: 2 });
    onMounted(() => {
      store.dispatch("fetchColumnList", { currentPage: 1, pageSize: 6 });
    });

    return { columnList, loadMorePage, isLastPage };
  },
});
</script>

<style scoped>
</style>