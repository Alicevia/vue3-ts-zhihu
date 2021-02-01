<template>
  <div class="login-page mx-auto p-3 w-50">
    <h5 class="my-4 text-center">创建用户</h5>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱</label>
        <validate-input
          v-model="formData.email"
          :rules="emailRules"
          placeholder="请输入邮箱"
          type="text"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <validate-input
          v-model="formData.nickName"
          :rules="nickNameRules"
          placeholder="请输入昵称"
          type="text"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          v-model="formData.password"
          :rules="passwordRules"
          placeholder="请输入密码"
          type="password"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">再次输入</label>
        <validate-input
          v-model="formData.repeatPassword"
          :rules="repeatPasswordRules"
          placeholder="请输入密码"
          type="password"
        ></validate-input>
      </div>
      <template #submit>
        <button class="btn btn-primary w-100">创建用户</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ValidateForm from "@/components/ValidateForm.vue";
import { instance } from "@/axios";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";

import api from "@/api";
export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    console.log(api);
    const formData = reactive({
      email: "",
      nickName: "",
      password: "",
      repeatPassword: "",
    });
    const emailRules: RulesProp = [
      { type: "required", message: "不能为空" },
      { type: "email", message: "邮箱不合法" },
    ];
    const nickNameRules: RulesProp = [
      { type: "required", message: "不能为空" },
    ];
    const passwordRules: RulesProp = [
      { type: "required", message: "不能为空" },
      // {
      //   type: "custom",
      //   message: "两次密码不一致",
      //   validator: () => {
      //     return formData.password === formData.repeatPassword;
      //   },
      // },
    ];
    const repeatPasswordRules: RulesProp = [
      { type: "required", message: "不能为空" },
      {
        type: "custom",
        message: "两次密码不一致",
        validator: () => {
          return formData.password === formData.repeatPassword;
        },
      },
    ];
    const router = useRouter();
    const store = useStore();
    const onFormSubmit = (res: boolean) => {
      if (res) {
        let data = {
          email: formData.email,
          nickName: formData.nickName,
          password: formData.password,
        };
        api
          .createAccount({ data })
          .then((res) => {
            console.log(res);
            router.replace({ path: "/login" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
      formData,
      emailRules,
      nickNameRules,
      passwordRules,
      repeatPasswordRules,
      onFormSubmit,
    };
  },
});
</script>

<style scoped>
</style>