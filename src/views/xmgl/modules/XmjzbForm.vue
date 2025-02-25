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
        </a-row>
      </a-form-model>
    </j-form-container>
    <!-- 子表单区域 -->
    <a-tabs v-model="activeKey" @change="handleChangeTabs">
      <a-tab-pane tab="重点项目管理子表" :key="refKeys[0]" :forceRender="true">
        <j-vxe-table
          ref="xmjzbList"
          keep-source
          :loading="xmjzbListTable.loading"
          :columns="xmjzbListTable.columns"
          :dataSource="xmjzbListTable.dataSource"
          :maxHeight="300"
          :rowNumber="true"
          :rowSelection="false"
          :toolbar="false"
          :actionButton="false"
        />
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>

<script>
  import { getRefPromise,VALIDATE_NO_PASSED } from '@/components/jeecg/JVxeTable/utils/vxeUtils'
  import { JVxeTableModelMixin } from '@/mixins/JVxeTableModelMixin'
  import { validateDuplicateValue } from '@/utils/util'
  import { JVXETypes } from '@/components/jeecg/JVxeTable'
  import JVxeTable from '@/components/jeecg/JVxeTable'

  export default {
    name: 'XmjzbForm',
    mixins: [JVxeTableModelMixin],
    components: {
      JVxeTable
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
              type: JVXETypes.input,
              width:"200px",
              placeholder: '请输入办理过程',
            },
            {
              title: '项目状态',
              key: 'xmzt',
              type: JVXETypes.select,
              dictCode:"spzt",
              width:"200px",
              placeholder: '请选择项目状态',
              onChange: ({ value, row }) => {
                if (value === '1' || value === '3') {
                  // Clear fields when status is 1 or 3
                  row.blqx = ''
                  row.blcj = ''
                  row.zjqk = ''
                  // Force update to ensure UI reflects changes
                  this.$refs.xmjzbList.refreshRow(row)
                }
              }
            },
            {
              title: '办理期限',
              key: 'blqx',
              type: JVXETypes.date,
              width:"200px",
              placeholder: '请选择办理期限',
              disabled: ({ row }) => row.xmzt === '1' || row.xmzt === '3',
              editRender: {
                name: 'ADatePicker',
                props: {
                  style: ({ row }) => {
                    return row.xmzt === '1' || row.xmzt === '3' ? {
                      backgroundColor: '#f5f5f5',
                      cursor: 'not-allowed',
                      pointerEvents: 'none'
                    } : {}
                  }
                }
              }
            },
            {
              title: '办理层级',
              key: 'blcj',
              type: JVXETypes.select,
              dictCode:"ddcj",
              width:"200px",
              placeholder: '请选择办理层级',
              disabled: ({ row }) => row.xmzt === '1' || row.xmzt === '3',
              editRender: {
                name: 'ASelect',
                props: {
                  style: ({ row }) => {
                    return row.xmzt === '1' || row.xmzt === '3' ? {
                      backgroundColor: '#f5f5f5',
                      cursor: 'not-allowed',
                      pointerEvents: 'none'
                    } : {}
                  }
                }
              }
            },
            {
              title: '组卷情况',
              key: 'zjqk',
              type: JVXETypes.input,
              width:"200px",
              placeholder: '请输入组卷情况',
              disabled: ({ row }) => row.xmzt === '1' || row.xmzt === '3',
              editRender: {
                name: 'AInput',
                props: {
                  style: ({ row }) => {
                    return row.xmzt === '1' || row.xmzt === '3' ? {
                      backgroundColor: '#f5f5f5',
                      cursor: 'not-allowed',
                      pointerEvents: 'none'
                    } : {}
                  }
                }
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
          { blgc: '立项', xmzt: '2', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '建设工程文物保护和考古许可（预审意见或许可）', xmzt: '2', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '用地预审和规划选址意见书', xmzt: '2', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '新增建设用地审批', xmzt: '2', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '建设用地规划许可审批', xmzt: '2', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '建设工程规划许可审批', xmzt: '2', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '节能审查', xmzt: '2', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '林地征占手续', xmzt: '2', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '草地征占手续', xmzt: '2', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '环境影响评价手续', xmzt: '2', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '取水许可手续', xmzt: '2', blqx: '', blcj: '', zjqk: '', spqk: '' },
          { blgc: '开工许可手续', xmzt: '2', blqx: '', blcj: '', zjqk: '', spqk: '' }
        ]
      },
      handleChangeTabs(key) {
        getRefPromise(this, key).then(editableTable => {
          editableTable.resetScrollTop()
        })
      }
    }
  }
</script>

<style scoped>
</style>
