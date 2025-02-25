<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <!-- 主表单区域 -->
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="调度层级" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="ddcj">
              <j-dict-select-tag type="radio" v-model="model.ddcj" dictCode="ddcj" placeholder="请选择调度层级" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="xmmc">
              <a-input v-model="model.xmmc" placeholder="请输入项目名称" ></a-input>
            </a-form-model-item>
          </a-col>
          <!-- 其他主表单字段 -->
        </a-row>
      </a-form-model>

      <!-- 子表单区域 -->
      <a-tabs v-model="activeKey" @change="handleChangeTabs">
        <a-tab-pane tab="重点项目管理子表" :key="refKeys[0]" :forceRender="true">
          <j-editable-table
            ref="xmjzbList"
            :loading="xmjzbListTable.loading"
            :columns="xmjzbListTable.columns"
            :dataSource="xmjzbListTable.dataSource"
            :maxHeight="300"
            :rowNumber="true"
            :rowSelection="true"
            :actionButton="false"
          />
        </a-tab-pane>
      </a-tabs>
    </j-form-container>
  </a-spin>
</template>

<script>
  import { FormTypes,getRefPromise,VALIDATE_NO_PASSED } from '@/utils/JEditableTableUtil'
  import { JEditableTableModelMixin } from '@/mixins/JEditableTableModelMixin'
  import { validateDuplicateValue } from '@/utils/util'
  import JEditableTable from '@/components/jeecg/JEditableTable'

  export default {
    name: 'XmjzbForm',
    mixins: [JEditableTableModelMixin],
    components: {
      JEditableTable
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
        model:{},
        validatorRules: {
          ddcj: [{ required: true, message: '请输入调度层级!'}],
          xmmc: [{ required: true, message: '请输入项目名称!'}],
          // 其他验证规则...
        },
        refKeys: ['xmjzbList'],
        activeKey: 'xmjzbList',
        xmjzbListTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '办理过程',
              key: 'blgc',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入办理过程',
            },
            {
              title: '项目状态',
              key: 'xmzt',
              type: FormTypes.select,
              dictCode:"spzt",
              width:"200px",
              placeholder: '请选择项目状态',
              onChange: function(event, record) {
                if (event === '是') {
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
              disabled: function(record) {
                return record.xmzt === '是'
              }
            },
            {
              title: '办理层级',
              key: 'blcj',
              type: FormTypes.select,
              dictCode:"ddcj",
              width:"200px",
              placeholder: '请选择办理层级',
              disabled: function(record) {
                return record.xmzt === '是'
              }
            },
            {
              title: '组卷情况',
              key: 'zjqk',
              type: FormTypes.textarea,
              width:"200px",
              placeholder: '请输入组卷情况',
              disabled: function(record) {
                return record.xmzt === '是'
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
            }
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
    methods: {
      addBefore(){
        // 添加12个默认的办理流程
        this.xmjzbListTable.dataSource=[
          { blgc: '立项', xmzt: '否', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '建设工程文物保护和考古许可（预审意见或许可）', xmzt: '否', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '用地预审和规划选址意见书', xmzt: '否', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '新增建设用地审批', xmzt: '否', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '建设用地规划许可审批', xmzt: '否', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '建设工程规划许可审批', xmzt: '否', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '节能审查', xmzt: '否', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '林地征占手续', xmzt: '否', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '草地征占手续', xmzt: '否', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '环境影响评价手续', xmzt: '否', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '取水许可手续', xmzt: '否', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '开工许可手续', xmzt: '否', blqx: '', blcj: '', zjqk: '', spqk: '' }
        ]
      },
      handleChangeTabs(key) {
        // Reset scroll when switching tabs
        getRefPromise(this, key).then(editableTable => {
          editableTable.resetScrollTop()
        })
      }
    }
  }
</script>

<style scoped>
</style>
