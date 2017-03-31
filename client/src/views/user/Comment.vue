<template>
<div>
  <div class="btns">
      <Button type="info" @click="modal1 = true">添加数据</Button>
      <Button type="error" @click="removes">删除数据</Button>
      <Input icon="search" v-model="filter.name" placeholder="请输入..." style="width: 200px"></Input>
      <Button type="ghost" @click="search">搜索数据</Button>
  </div>

  <Modal
        v-model="modal1"
        title="普通的Modal对话框标题"
  >
        <div slot="footer">
            Tip:本模块是用户添加及修改模块!
        </div>
         
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <Form-item label="姓名" prop="name">
              <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
          </Form-item>
          <Form-item label="介绍" prop="desc">
              <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
          </Form-item>
          <Form-item>
              <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
              <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </Form-item>
      </Form>

    </Modal>


  <Table border :context="self" :columns="columns" :data="list" @on-selection-change="handlerSelectionChange"></Table>


  <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
          <Page :total="filter.total" :current="filter.page" :page-size="5" @on-change="changePage"></Page>
      </div>
  </div>

</div>

</template>

<script>
    import Base from '../../common/Base.js'

    export default {
        mixins:[Base],
        data () {
            return {
                module:'comment',
                formValidate: {
                    _id: null,
                    name: '1',
                    desc: '111111111111111111111111111111111111111111111'
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                },
                columns:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        render (row, column, index) {
                            return `<Icon type="person"></Icon> <strong>${row.name}</strong>`;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `
                            <i-button type="primary" size="small" @click="edit('${index}')">编辑</i-button> 
                            <i-button type="error" size="small" @click="remove(${index})">删除</i-button>
                            `;
                        }
                    }
                ]
            }
        }
    }
</script>

<style lang="scss">
  .btns {
    padding:10px;
  }
</style>