<template>
  <div class="container">
      <h2>上传文件</h2>
      <vue-base64-file-upload 
        class="v1"
        accept="image/png,image/jpeg"
        image-class="v1-image"
        input-class="v1-image"
        :max-size="customImageMaxSize"
        @size-exceeded="onSizeExceeded"
        @file="onFile"
        @load="onLoad" />

       <Button type="primary" @click="uploadImage">上传图片</Button>

    </div>
</template>

<script>
  import VueBase64FileUpload from 'vue-base64-file-upload';
  export default{
    components: {
      VueBase64FileUpload
    },
  
    data() {
      return {
        file:{
          lastModified:'',
          name:'',
          size:0,
          type:'',
          data:''
        },
        customImageMaxSize: 3 // megabytes 
      };
    },
  
    methods: {
      onFile(file) {
        this.file = file;
      },
      onLoad(dataUri) {
        // console.log(dataUri); // data-uri string 
        this.file = Object.assign(this.file,{"data":dataUri});
        console.log(this.file);
      },
  
      onSizeExceeded(size) {
        alert(`Image ${size}Mb size exceeds limits of ${this.customImageMaxSize}Mb!`);
      },
      uploadImage(){
        var _this = this;
        _this.$http({
               url: `http://localhost:3000/uploads/data`,
               method: 'POST',
               data: {name:_this.file.name,data:_this.file.data}
             })
             .then(function (response) {
              console.log(response)
             })

      },
      getImage(id){
        var _this = this;
        _this.$http({
               url: `http://localhost:3000/uploads/${id}`,
               method: 'GET'
             })
             .then(function (response) {
              console.log(response)
             })
      }
    },
    created(){
      this.getImage('58dc68654e9b0519bd80c476')
    }

  }
</script>