<template>
  <div>
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="基本信息" key="1">
            <a-form-item label="项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['xmmc', validatorRules.xmmc]" placeholder="请输入项目名称"></a-input>
            </a-form-item>
            <a-form-item label="投资主体" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['tzzt', validatorRules.tzzt]" placeholder="请输入投资主体"></a-input>
            </a-form-item>
            <a-form-item label="完成情况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['wcqk', validatorRules.wcqk]" placeholder="请输入完成情况"></a-input>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane tab="子表信息" key="2">
            <j-editable-table
              ref="editableTable"
              :loading="jEditableTableLoading"
              :columns="columns"
              :dataSource="dataSource"
              :maxHeight="300"
              :disabled="formDisabled"
              :rowNumber="true"
              :rowSelection="true"
              :actionButton="false"
            />
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
import { FormTypes } from '@/utils/JEditableTableUtil'
import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'

export default {
  name: 'XmjzbForm',
  mixins: [JEditableTableMixin],
  data() {
    return {
      form: this.$form.createForm(this),
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      validatorRules: {
        xmmc: [{ required: true, message: '请输入项目名称!' }],
        tzzt: [{ required: true, message: '请输入投资主体!' }],
        wcqk: [{ required: true, message: '请输入完成情况!' }],
      },
      url: {
        add: '/xmgl/xmjzb/add',
        edit: '/xmgl/xmjzb/edit',
        queryById: '/xmgl/xmjzb/queryById',
      },
      columns: [
        {
          title: '办理过程',
          key: 'blgc',
          type: FormTypes.input,
          width: '200px',
          placeholder: '请输入办理过程',
          defaultValue: '',
        },
        {
          title: '项目状态',
          key: 'xmzt',
          type: FormTypes.select,
          width: '200px',
          placeholder: '请选择项目状态',
          defaultValue: '',
          options: [
            {
              title: '是',
              value: '是',
            },
            {
              title: '否',
              value: '否',
            },
          ],
        },
        {
          title: '办理期限',
          key: 'blqx',
          type: FormTypes.date,
          width: '200px',
          placeholder: '请选择办理期限',
          defaultValue: '',
          disabled: function (record) {
            return record.xmzt === '是'
          },
          rules: [
            {
              required: function (record) {
                return record.xmzt === '否'
              },
              message: '请选择办理期限!',
            },
          ],
        },
        {
          title: '办理层级',
          key: 'blcj',
          type: FormTypes.select,
          dictCode: 'ddcj',
          width: '200px',
          placeholder: '请选择办理层级',
          defaultValue: '',
          disabled: function (record) {
            return record.xmzt === '是'
          },
          rules: [
            {
              required: function (record) {
                return record.xmzt === '否'
              },
              message: '请选择办理层级!',
            },
          ],
        },
        {
          title: '组卷情况',
          key: 'zjqk',
          type: FormTypes.textarea,
          width: '200px',
          placeholder: '请输入组卷情况',
          defaultValue: '',
          disabled: function (record) {
            return record.xmzt === '是'
          },
          rules: [
            {
              required: function (record) {
                return record.xmzt === '否'
              },
              message: '请输入组卷情况!',
            },
          ],
        },
        {
          title: '审批情况',
          key: 'spqk',
          type: FormTypes.file,
          width: '200px',
          placeholder: '请上传审批情况',
          defaultValue: '',
        },
      ],
    }
  },
  created() {},
  watch: {
    'model.xmzt': {
      handler(newVal) {
        if (newVal === '是') {
          this.validatorRules.blqx = []
          this.validatorRules.blcj = []
          this.validatorRules.zjqk = []
        } else {
          this.validatorRules.blqx = [{ required: true, message: '请输入办理期限!' }]
          this.validatorRules.blcj = [{ required: true, message: '请选择办理层级!' }]
          this.validatorRules.zjqk = [{ required: true, message: '请输入组卷情况!' }]
        }
      },
      immediate: true,
    },
  },
  methods: {
    addBefore() {
      this.model = {}
      return true
    },
  },
}
</script>
