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

       <!--iview-Tree树形控件-->
       <Tree :data="baseData" show-checkbox @on-select-change="selectChange"></Tree>

          <Button type="primary" @click="getTreeData">获取Tree</Button>
          <Button type="primary" @click="getTreeData">添加根节点</Button>
          <Button type="primary" @click="getTreeData">添加子节点</Button>

       <!--上传控件iview-Upload-->
       <Upload
        type="drag"
        multiple
        action="http://localhost:3000/uploads/filedata"
        name="avatar"
        :max-size="2048"
        :format="['jpg','jpeg','png']"
        :on-success="handleSuccess"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        >
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或将文件拖拽到这里上传</p>
        </div>
      </Upload>

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
        baseData: [{
            expand: true,
            title: 'parent 1',
            children: [{
                title: 'parent 1-0',
                expand: true,
                disabled: true,
                children: [{
                    title: 'leaf',
                    disableCheckbox: true
                }, {
                    title: 'leaf',
                }]
            }, {
                title: 'parent 1-1',
                expand: true,
                checked: true,
                children: [{
                    title: '<span style="color: red">leaf</span>',
                }]
            }]
        }],
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
      getTreeData () {//按钮获取Tree结构
        var _this = this;
        _this.$http.get('http://localhost:3000/cate').then(res=>{
          console.log(res);
          _this.baseData = res.data;
        })
      },
      selectChange (node) {
        console.log(node);
      },
      handleSuccess (res, file) {
          // 因为上传过程为实例，这里模拟添加 url
          file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
          file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
      handleMaxSize (file) {
          this.$Notice.warning({
              title: '超出文件大小限制',
              desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
          });
      },
      handleBeforeUpload () {
          // const check = this.uploadList.length < 5;
          // if (!check) {
          //     this.$Notice.warning({
          //         title: '最多只能上传 5 张图片。'
          //     });
          // }
          // return check;
      },
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