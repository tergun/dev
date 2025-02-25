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
          tzzt: [{ required: true, message: '请输入投资主体!'}],
          jsxz: [{ required: true, message: '请输入建设性质!'}],
          ztz: [{ required: true, message: '请输入总投资!'}],
          jhwc: [{ required: true, message: '请输入2025年计划完成投资!'}],
          wcqk: [{ required: true, message: '请输入完成情况!'}],
          fgsj: [{ required: true, message: '请输入计划开复工时间!'}],
          wgsj: [{ required: true, message: '请输入计划完共时间!'}],
          xmjzqk: [{ required: true, message: '请输入项目进展情况!'}],
          fgld: [{ required: true, message: '请输入分管领导!'}],
          fzdw: [{ required: true, message: '请输入负责单位!'}],
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
                if (event === '是') {
                  // Clear fields when status is "是"
                  record.blqx = ''
                  record.blcj = ''
                  record.zjqk = ''
                  // Force update to trigger re-render
                  this.$forceUpdate()
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
              defaultValue:'',
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
              defaultValue:'',
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
              defaultValue:'',
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
        getRefPromise(this, key).then(editableTable => {
          editableTable.resetScrollTop()
        })
      }
    }
  }
</script>
