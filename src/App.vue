<template>
  <div class="container">
    <GlobalHeader :user="user"></GlobalHeader>
    <!-- <ColumnList :list="list"></ColumnList> -->
    <Loader v-if="isLoading"></Loader>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-3">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>
<script lang='ts'>
import "bootstrap/dist/css/bootstrap.min.css";
import api from "@/api/user.ts";
import Loader from "@/components/Loader.vue";
import {
  defineComponent,
  ref,
  reactive,
  computed,
  onMounted,
  watch,
} from "vue";
import ColumnList from "@/components/ColumnList.vue";
import GlobalHeader from "@/components/GlobalHeader.vue";
import { useStore } from "vuex";
import Message from "@/components/Message";
export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);
    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value;
        if (status && message) {
          Message("error", message);
        }
      }
    );
    return { user, isLoading };
  },
  methods: {},
  components: {
    ColumnList,
    GlobalHeader,
    Loader,
  },
});
</script>

<style lang="less">
</style>
