<template>
  <div class="file-upload">
    <div
      v-bind="$attrs"
      class="file-upload-container"
      @click.prevent="triggerUpload"
    >
      <slot name="loading" v-if="fileState === 'loading'">
        <button class="btn btn-primary" disabled>正在上传</button>
      </slot>
      <slot
        name="uploaded"
        :uploadedData="uploadedData"
        v-else-if="fileState === 'success'"
      >
        <button class="btn btn-success" disabled>上传成功</button>
      </slot>
      <slot v-else>
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      @change="handleFileChange"
      type="file"
      class="file-input d-none"
      ref="fileInput"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import api from "@/api";
import { ResponseTypeProps } from "@/store";
import { ObjToArr } from "@/utils";
type UploadState = "ready" | "loading" | "success" | "error";
type CheckFun = (file: File) => boolean;
export default defineComponent({
  inheritAttrs: false,
  props: {
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckFun>,
    },
    uploaded: {
      type: Object,
    },
  },
  emits: ["file-uploaded", "file-uploaded-error"],
  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileState = ref<UploadState>("ready");
    const uploadedData = ref(props.uploaded);
    watch(
      () => props.uploaded,
      (newValue) => {
        fileState.value = "success";
        uploadedData.value = newValue;
      }
    );
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const files = Array.from(target.files);
        const uploadedFile = files[0];
        if (props.beforeUpload) {
          if (!props.beforeUpload(uploadedFile)) return;
        }
        fileState.value = "loading";
        const formdata = new FormData();
        formdata.append(uploadedFile.name, uploadedFile);
        api
          .uploadFile({
            url: props.action ? props.action : undefined,
            data: formdata,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            fileState.value = "success";
            uploadedData.value = res.data;
            context.emit("file-uploaded", res.data);
          })
          .catch((err) => {
            fileState.value = "error";
            context.emit("file-uploaded-error", err);
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = "";
            }
          });
      }
    };
    return {
      triggerUpload,
      fileInput,
      fileState,
      handleFileChange,
      uploadedData,
    };
  },
});
</script>

<style scoped>
</style>