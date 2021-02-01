<template>
  <div class="create-post-page">
    <h4>{{ isEditMode ? "编辑文章" : "新建文章" }}</h4>
    <Upload
      class="d-flex justify-content-center align-items-center bg-light text-secondary w-100 my-4"
      @fileUploaded="onFileUploaded"
      @fileUploadedError="onFileUploadedError"
      action="/api/upload"
      :before-upload="uploadFileCheckFn"
      :uploaded="uploadedData"
    >
      <div>
        <span class="display-6 text-info">点击上传图片</span>
      </div>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only"></span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="{ uploadedData }">
        <img class="mx-auto d-block" :src="uploadedData.data.url" alt="" />
      </template>
    </Upload>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="rules.title"
          v-model="formData.title"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="rules.content"
          v-model="formData.content"
        />
      </div>
      <template #submit>
        <div>
          <button class="btn btn-primary btn-large">
            {{ isEditMode ? "编辑文章" : "发表文章" }}
          </button>
        </div>
      </template>
    </validate-form>
    <!-- <Message></Message> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import ValidateForm from "../components/ValidateForm.vue";
import { ImageProps, PostProps, ResponseTypeProps, StoreProps } from "@/store";
import Upload from "@/components/Upload.vue";
import Message from "@/components/Message";
import api from "@/api";
export default defineComponent({
  name: "Login",
  setup() {
    const store = useStore<StoreProps>();
    const router = useRouter();
    const route = useRoute();
    const uploadedData = ref();
    const isEditMode = !!route.query.id;
    console.log("isEditMode", isEditMode);
    const { column, _id } = store.state.user;
    const formData = reactive<PostProps>({
      title: "",
      content: "",
      image: "",
      column,
      author: _id,
    });
    onMounted(() => {
      if (isEditMode) {
        store.dispatch("fetchPostInfoById", route.query.id).then((res) => {
          const currentPost = res.data;
          if (currentPost.image) {
            uploadedData.value = { data: currentPost.image };
          }
          formData.title = currentPost.title;
          formData.content = currentPost.content || "";
        });
      }
    });
    const uploadFileCheckFn = (file: File) => {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        Message("error", "请传入jpg");
      }
      return isJPG;
    };
    const onFileUploaded = (data: ImageProps) => {
      Message("success", "图片上传成功");
      formData.image = data._id as string;
    };
    const onFileUploadedError = (err: Error) => {
      Message("error", "图片上传失败");
    };

    let rules = {
      title: [{ type: "required", message: "文章标题不能为空" }],
      content: [{ type: "required", message: "文章详情不能为空" }],
    };

    const onFormSubmit = (res: boolean) => {
      if (res) {
        api
          .createPost({ data: formData })
          .then((res) => {
            Message("success", "创建成功");
            router.push({
              name: "column",
              params: { id: formData.column as string },
            });
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    return {
      rules,
      formData,
      onFormSubmit,
      uploadFileCheckFn,
      onFileUploaded,
      onFileUploadedError,
      uploadedData,
      isEditMode,
    };
  },
  components: {
    Upload,
    ValidateInput,
    ValidateForm,
  },
});
</script>
<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
