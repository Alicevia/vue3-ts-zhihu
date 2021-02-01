<template>
  <input
    v-if="tag === 'input'"
    v-model="inputRef.val"
    @blur="validateInput"
    class="form-control"
    :class="{ 'is-invalid': inputRef.error }"
    v-bind="attrs"
  />
  <textarea
    v-else
    v-model="inputRef.val"
    @blur="validateInput"
    class="form-control"
    :class="{ 'is-invalid': inputRef.error }"
    v-bind="attrs"
  ></textarea>
  <span v-if="inputRef.error" class="invalid-feedback">{{
    inputRef.message
  }}</span>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  PropType,
  ReactiveEffect,
  Ref,
  computed,
  onMounted,
} from "vue";
import { emitter } from "./ValidateForm.vue";

interface RuleProp {
  type: "required" | "email" | "custom";
  message: string;
  validator?: () => boolean;
}

interface inputProp {
  val: any;
  error: boolean;
  message: string;
}
export type RulesProp = RuleProp[];
export type TagType = "input" | "textarea";
export default defineComponent({
  props: {
    modelValue: String,
    rules: Array as PropType<RuleProp[]>,
    tag: {
      type: String as PropType<TagType>,
      default: "input",
    },
  },
  setup(props, context) {
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    // const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;

    const inputRef = reactive<inputProp>({
      val: computed({
        get: () => props.modelValue || "",
        set: (newValue) => {
          context.emit("update:modelValue", newValue);
        },
      }),
      error: false,
      message: "",
    });

    const validateInput = () => {
      if (!props.rules) {
        return true;
      }
      let pass = (props.rules as Array<RuleProp>).every((item) => {
        if (!validateObj[item.type](inputRef, item.validator)) {
          //去对象中取自带的验证逻辑
          return validateError(inputRef, item.message);
        } else {
          return true;
        }
      });
      if (pass) {
        inputRef.error = false;
        inputRef.message = "";
      }
      return pass;
    };
    const validateError = (valueRef: inputProp, message: string) => {
      valueRef.error = true;
      valueRef.message = message;
      return false;
    };
    const validateObj = {
      required(valueRef: inputProp) {
        return !(valueRef.val.trim() === "");
      },
      email(valueRef: inputProp) {
        return emailReg.test(valueRef.val);
      },
      custom(valueRef: inputProp, validator?: () => boolean) {
        return (validator as Function)();
      },
      // password(valueRef: inputProp) {
      //   return passwordReg.test(valueRef.val);
      // },
    };
    onMounted(() => {
      emitter.emit("form-item-created", validateInput);
    });
    return {
      inputRef,
      validateInput,
      attrs: context.attrs,
    };
  },
});
</script>

<style scoped>
</style>