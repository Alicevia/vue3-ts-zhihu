<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到Alicevia</h5>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱</label>
        <validate-input
          v-model="email"
          :rules="emailRules"
          placeholder="请输入邮箱"
          type="text"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          v-model="password"
          :rules="passwordRules"
          placeholder="请输入密码"
          type="password"
        ></validate-input>
      </div>
      <!-- <template #submit>
        <button class="btn btn-danger">提交</button>
      </template> -->
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ValidateForm from "@/components/ValidateForm.vue";
import { instance } from "@/axios";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const email = ref("");
    const emailRules: RulesProp = [
      { type: "required", message: "不能为空" },
      { type: "email", message: "邮箱不合法" },
    ];
    const password = ref("");
    const passwordRules: RulesProp = [
      { type: "required", message: "不能为空" },
    ];
    const router = useRouter();
    const store = useStore();

    const onFormSubmit = (res: boolean) => {
      store
        .dispatch("loginAndFetchUserInfo", {
          email: email.value,
          password: password.value,
        })
        .then(() => {
          router.push({ path: "/" });
        })
        .catch((res) => {
          console.log("xxx1", res);
        });
    };
    onMounted(() => {
      // instance({
      //   url: "/api/user/login",
      //   method: "post",
      //   data: {
      //     email: "12312@qq.com",
      //     password: "123123",
      //   },
      // });
    });

    return {
      emailRules,
      email,
      password,
      passwordRules,
      onFormSubmit,
    };
  },
});
</script>

<style scoped>
</style>