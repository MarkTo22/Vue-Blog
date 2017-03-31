<template>
  <div>
    <h2>Upload file</h2>
      <vue-base64-file-upload 
        class="v1"
        accept="image/png,image/jpeg"
        image-class="v1-image"
        input-class="v1-input"
        :max-size="customImageMaxSize"
        @size-exceeded="onSizeExceeded"
        @file="onFile"
        @load="onLoad" />

<form enctype="multipart/form-data">
    <Upload action="http://localhost:3000/users/upload" ref="upload" name="avatar" :on-exceeded-size="exceededSize" :max-size="50" :on-error="handleUploadError" :on-success="handleUploadSuccess">
        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>
</form>

  </div>
</template>

<script>
  import Vue from 'vue';
  import VueBase64FileUpload from 'vue-base64-file-upload';
  export default{
    data() {
      return {
        customImageMaxSize: 3 // megabytes
      };
    },
    methods: {
      handleUploadSuccess(res, file){
        console.log(res,file)
         //this.$refs.upload.clearFiles();
      },
      handleUploadError(error,file,fileList){
        console.log(error)
      },
      exceededSize(file,fileList){
        console.log(file);
      },
      onFile(file) {
        console.log(file); // file object
      },
      onLoad(dataUri) {
        console.log(dataUri); // data-uri string
      },

      onSizeExceeded(size) {
        alert(`Image ${size}Mb size exceeds limits of ${this.customImageMaxSize}Mb!`);
      }
    },
    components:{
       VueBase64FileUpload
    }
  }
</script>