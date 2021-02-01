<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between px-4 mb-4">
    <a href="#" class="navbar-brand">ALicevia</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link :to="{ path: '/login' }" class="btn btn-outline-light my-2"
          >登录</router-link
        >
      </li>
      <li class="list-inline-item">
        <router-link
          :to="{ path: '/register', params: {}, query: {} }"
          class="btn btn-outline-light my-2"
          >注册</router-link
        >
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <Dropdown :buttonInfo="user.nickName">
          <DropdownItem
            ><router-link tag="a" to="/" class="dropdown-item" href="#"
              >我的主页</router-link
            ></DropdownItem
          >
          <DropdownItem
            ><router-link
              tag="a"
              :to="{ name: 'column', params: { id: user.column } }"
              class="dropdown-item"
              >我的专栏</router-link
            ></DropdownItem
          >
          <DropdownItem
            ><a @click="logout" class="dropdown-item" href="#"
              >退出登录</a
            ></DropdownItem
          >
        </Dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang='ts'>
import DropdownItem from "@/components/DropdownItem.vue";
import Dropdown from "@/components/Dropdown.vue";
import { computed, defineComponent, PropType } from "vue";
import { useStore } from "vuex";
import { UserProps } from "@/store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "GlobalHeader",
  components: { Dropdown, DropdownItem },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const logout = () => {
      store.commit("logout");
      router.push("/login");
    };
    return { logout };
  },
});
</script>

<style lang="less" scoped>
</style>