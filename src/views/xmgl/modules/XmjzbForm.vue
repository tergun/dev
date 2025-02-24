<template>
   <a-spin :spinning="confirmLoading">
     <j-form-container :disabled="formDisabled">
       <!-- 主表单区域 -->
       <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
         <a-row>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="调度层级" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="ddcj">
              <j-dict-select-tag type="radio" v-model="model.ddcj"  dictCode="ddcj" placeholder="请选择调度层级" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="xmmc">
              <a-input v-model="model.xmmc" placeholder="请输入项目名称" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="投资主体" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="tzzt">
              <a-input v-model="model.tzzt" placeholder="请输入投资主体" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="建设性质" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="jsxz">
              <j-dict-select-tag type="radio" v-model="model.jsxz"  dictCode="jsxz" placeholder="请选择建设性质" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="总投资" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="ztz">
              <a-input-number v-model="model.ztz" placeholder="请输入总投资" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="2025年计划完成投资" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="jhwc">
              <a-input-number v-model="model.jhwc" placeholder="请输入2025年计划完成投资" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="完成情况" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="wcqk">
              <a-input-number v-model="model.wcqk" placeholder="请输入完成情况" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="计划开复工时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fgsj">
              <j-date placeholder="请选择计划开复工时间" v-model="model.fgsj" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="计划完共时间" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="wgsj">
              <j-date placeholder="请选择计划完共时间" v-model="model.wgsj" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="项目进展情况" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="xmjzqk">
              <a-input v-model="model.xmjzqk" placeholder="请输入项目进展情况" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="分管领导" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fgld">
              <a-input v-model="model.fgld" placeholder="请输入分管领导" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="负责单位" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fzdw">
              <a-input v-model="model.fzdw" placeholder="请输入负责单位" ></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
     </j-form-container>
      <!-- 子表单区域 -->
      <a-tabs v-model="activeKey" @change="handleChangeTabs">
        <a-tab-pane tab="重点项目管理子表" :key="refKeys[0]" :forceRender="true">
          <j-editable-table
            :ref="refKeys[0]"
            :loading="xmjzbListTable.loading"
            :columns="xmjzbListTable.columns"
            :dataSource="xmjzbListTable.dataSource"
            :maxHeight="300"
            :disabled="formDisabled"
            :rowNumber="true"
            :rowSelection="false"
            :actionButton="false"/>
        </a-tab-pane>
      </a-tabs>
    </a-spin>
</template>

<script>
  import { FormTypes,getRefPromise,VALIDATE_NO_PASSED } from '@/utils/JEditableTableUtil'
  import { JEditableTableModelMixin } from '@/mixins/JEditableTableModelMixin'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: 'XmjzbForm',
    mixins: [JEditableTableModelMixin],
    components: {
    },
    data() {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        model:{
        },
        validatorRules: {
           ddcj: [
              { required: true, message: '请输入调度层级!'},
           ],
           xmmc: [
              { required: true, message: '请输入项目名称!'},
           ],
           tzzt: [
              { required: true, message: '请输入投资主体!'},
           ],
           jsxz: [
              { required: true, message: '请输入建设性质!'},
           ],
           ztz: [
              { required: true, message: '请输入总投资!'},
           ],
           jhwc: [
              { required: true, message: '请输入2025年计划完成投资!'},
           ],
           wcqk: [
              { required: true, message: '请输入完成情况!'},
           ],
           fgsj: [
              { required: true, message: '请输入计划开复工时间!'},
           ],
           wgsj: [
              { required: true, message: '请输入计划完共时间!'},
           ],
           xmjzqk: [
              { required: true, message: '请输入项目进展情况!'},
           ],
           fgld: [
              { required: true, message: '请输入分管领导!'},
           ],
           fzdw: [
              { required: true, message: '请输入负责单位!'},
           ],
        },
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        refKeys: ['xmjzbList', ],
        tableKeys:['xmjzbList', ],
        activeKey: 'xmjzbList',
        // 重点项目管理子表
        xmjzbListTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '办理过程',
              key: 'blgc',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '项目状态',
              key: 'xmzt',
              type: FormTypes.select,
              dictCode:"spzt",
              width:"200px",
              placeholder: '请选择项目状态',
              defaultValue:'',
              onChange: function(event, record) {
                if (event === '是' || event === '无需办理') {
                  record.blqx = ''
                  record.blcj = ''
                  record.zjqk = ''
                }
              }
            },
            {
              title: '办理期限',
              key: 'blqx',
              type: FormTypes.date,
              width:"200px",
              placeholder: '请选择办理期限',
              defaultValue:'',
              disabled: function(record) {
                return record.xmzt === '是' || record.xmzt === '无需办理'
              }
            },
            {
              title: '办理层级',
              key: 'blcj',
              type: FormTypes.select,
              dictCode:"ddcj",
              width:"200px",
              placeholder: '请选择办理层级',
              defaultValue:'',
              disabled: function(record) {
                return record.xmzt === '是' || record.xmzt === '无需办理'
              }
            },
            {
              title: '组卷情况',
              key: 'zjqk',
              type: FormTypes.textarea,
              width:"200px",
              placeholder: '请输入组卷情况',
              defaultValue:'',
              disabled: function(record) {
                return record.xmzt === '是' || record.xmzt === '无需办理'
              }
            },
            {
              title: '审批情况',
              key: 'spqk',
              type: FormTypes.file,
              token:true,
              responseName:"message",
              width:"200px",
              placeholder: '请选择文件',
              defaultValue:'',
            },
          ]
        },
        url: {
          add: "/xmgl/xmjzb/add",
          edit: "/xmgl/xmjzb/edit",
          xmjzbList: {
            list: '/xmgl/xmjzb/queryXmjzbListByMainId'
          },
        }
      }
    },
    props: {
      //表单禁用
      disabled: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    computed: {
      formDisabled(){
        return this.disabled
      },
    },
    created () {
    },
    methods: {
      add() {
        this.tableReset()
        if (typeof this.addBefore === 'function') this.addBefore()
        this.edit({})
      },
      edit(record) {
        if (record && '{}'!=JSON.stringify(record) && record.id) {
          this.tableReset()
        }
        this.visible = true
        this.activeKey = this.refKeys[0]
        this.$refs.form.resetFields()
        this.model = Object.assign({}, record)
        if (typeof this.editAfter === 'function') this.editAfter(this.model)
      },
     addBefore(){
            // 添加12个默认的办理流程
            this.xmjzbListTable.dataSource=[
              { blgc: '立项', xmzt: '否', blqx: '', blcj: '', zjqk: '', spqk: '' },
              { blgc: '建设工程文物保护和考古许可（预审意见或许可）', xmzt: '否', blqx: '', blcj: '', zjqk: '', spqk: '' },
              { blgc: '用地预审和规划选址意见书', xmzt: '', blqx: '', blcj: '', zjqk: '', spqk: '' },
              { blgc: '新增建设用地审批', xmzt: '', blqx: '', blcj: '', zjqk: '', spqk: '' },
              { blgc: '建设用地规划许可审批', xmzt: '', blqx: '', blcj: '', zjqk: '', spqk: '' },
              { blgc: '建设工程规划许可审批', xmzt: '', blqx: '', blcj: '', zjqk: '', spqk: '' },
              { blgc: '节能审查', xmzt: '', blqx: '', blcj: '', zjqk: '', spqk: '' },
              { blgc: '林地征占手续', xmzt: '', blqx: '', blcj: '', zjqk: '', spqk: '' },
              { blgc: '草地征占手续', xmzt: '', blqx: '', blcj: '', zjqk: '', spqk: '' },
              { blgc: '环境影响评价手续', xmzt: '', blqx: '', blcj: '', zjqk: '', spqk: '' },
              { blgc: '取水许可手续', xmzt: '', blqx: '', blcj: '', zjqk: '', spqk: '' },
              { blgc: '开工许可手续', xmzt: '', blqx: '', blcj: '', zjqk: '', spqk: '' }
            ]
      },
      getAllTable() {
        let values = this.tableKeys.map(key => getRefPromise(this, key))
        return Promise.all(values)
      },
      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.xmjzbList.list, params, this.xmjzbListTable)
        }
      },
      //校验所有一对一子表表单
    validateSubForm(allValues){
        return new Promise((resolve,reject)=>{
          Promise.all([
          ]).then(() => {
            resolve(allValues)
          }).catch(e => {
            if (e.error === VALIDATE_NO_PASSED) {
              // 如果有未通过表单验证的子表，就自动跳转到它所在的tab
              this.activeKey = e.index == null ? this.activeKey : this.refKeys[e.index]
            } else {
              console.error(e)
            }
          })
        })
    },
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)

        return {
          ...main, // 展开
          xmjzbListList: allValues.tablesValue[0].values,
        }
      },
      validateError(msg){
        this.$message.error(msg)
      },
     close() {
        this.visible = false
        this.$emit('close')
        this.$refs.form.clearValidate();
      },
    }
  }
</script>

<style scoped>
</style>
