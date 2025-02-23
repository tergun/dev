<template>
  <a-card class="j-inner-table-wrapper" :bordered="false">

    <!-- 查询区域 begin -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域 end -->

    <!-- 操作按钮区域 begin -->
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('重点项目管理表')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <!-- 高级查询区域 -->
      <j-super-query :fieldList="superFieldList" ref="superQueryModal" @handleSuperQuery="handleSuperQuery"></j-super-query>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            <span>删除</span>
          </a-menu-item>
        </a-menu>
        <a-button>
          <span>批量操作</span>
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>
    <!-- 操作按钮区域 end -->

    <!-- table区域 begin -->
    <div>

      <a-alert type="info" showIcon style="margin-bottom: 16px;">
        <template slot="message">
          <span>已选择</span>
          <a style="font-weight: 600;padding: 0 4px;">{{ selectedRowKeys.length }}</a>
          <span>项</span>
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </template>
      </a-alert>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        class="j-table-force-nowrap"
        :scroll="{x:true}"
        :loading="loading"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :expandedRowKeys="expandedRowKeys"
        :rowSelection="{selectedRowKeys, onChange: onSelectChange}"
        @expand="handleExpand"
        @change="handleTableChange"
      >

        <!-- 内嵌table区域 begin -->
        <template slot="expandedRowRender" slot-scope="record">
          <a-tabs tabPosition="top">
            <a-tab-pane tab="重点项目管理子表" key="xmjzbList" forceRender>
              <xmjzb-list-sub-table :record="record"/>
            </a-tab-pane>
          </a-tabs>
        </template>
        <!-- 内嵌table区域 end -->

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>

        <template slot="imgSlot" slot-scope="text,record">
          <div style="font-size: 12px;font-style: italic;">
            <span v-if="!text">无图片</span>
            <img v-else :src="getImgView(text)" :preview="record.id" alt="" style="max-width:80px;height:25px;"/>
          </div>
        </template>


        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            ghost
            type="primary"
            icon="download"
            size="small"
            @click="downloadFile(text)"
          >
            <span>下载</span>
          </a-button>
        </template>

        <template slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>

        </template>

      </a-table>
    </div>
    <!-- table区域 end -->

    <!-- 表单区域 -->
    <xmjzb-modal ref="modalForm" @ok="modalFormOk"/>

  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import XmjzbModal from './modules/XmjzbModal'
  import XmjzbListSubTable from './subTables/XmjzbListSubTable'
  import {filterMultiDictText} from '@/components/dict/JDictSelectUtil'
  import '@/assets/less/TableExpand.less'

  export default {
    name: 'XmjzbList',
    mixins: [JeecgListMixin],
    components: {
      XmjzbModal,
      XmjzbListSubTable,
    },
    data() {
      return {
        description: '重点项目管理表列表管理页面',
        // 表头
        columns: [
          {
            title: '#',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: (t, r, index) => parseInt(index) + 1
          },
          {
            title: '调度层级',
            align: 'center',
            dataIndex: 'ddcj_dictText'
          },
          {
            title: '项目名称',
            align: 'center',
            dataIndex: 'xmmc',
          },
          {
            title: '投资主体',
            align: 'center',
            dataIndex: 'tzzt',
          },
          {
            title: '建设性质',
            align: 'center',
            dataIndex: 'jsxz_dictText'
          },
          {
            title: '总投资',
            align: 'center',
            dataIndex: 'ztz',
          },
          {
            title: '2025年计划完成投资',
            align: 'center',
            dataIndex: 'jhwc',
          },
          {
            title: '完成情况',
            align: 'center',
            dataIndex: 'wcqk',
          },
          {
            title: '计划开复工时间',
            align: 'center',
            dataIndex: 'fgsj',
          },
          {
            title: '计划完共时间',
            align: 'center',
            dataIndex: 'wgsj',
          },
          {
            title: '项目进展情况',
            align: 'center',
            dataIndex: 'xmjzqk',
          },
          {
            title: '分管领导',
            align: 'center',
            dataIndex: 'fgld',
          },
          {
            title: '负责单位',
            align: 'center',
            dataIndex: 'fzdw',
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            width:147,
            scopedSlots: { customRender: 'action' },
          },
        ],
        // 字典选项
        dictOptions: {},
        // 展开的行test
        expandedRowKeys: [],
        url: {
          list: '/xmgl/xmjzb/list',
          delete: '/xmgl/xmjzb/delete',
          deleteBatch: '/xmgl/xmjzb/deleteBatch',
          exportXlsUrl: '/xmgl/xmjzb/exportXls',
          importExcelUrl: '/xmgl/xmjzb/importExcel',
        },
        superFieldList:[],
      }
    },
    created() {
      this.getSuperFieldList();
    },
    computed: {
      importExcelUrl() {
        return window._CONFIG['domianURL'] + this.url.importExcelUrl
      }
    },
    methods: {
      initDictConfig() {
      },

      handleExpand(expanded, record) {
        this.expandedRowKeys = []
        if (expanded === true) {
          this.expandedRowKeys.push(record.id)
        }
      },
      getSuperFieldList(){
        let fieldList=[];
        fieldList.push({type:'string',value:'ddcj',text:'调度层级',dictCode:'ddcj'})
        fieldList.push({type:'string',value:'xmmc',text:'项目名称',dictCode:''})
        fieldList.push({type:'string',value:'tzzt',text:'投资主体',dictCode:''})
        fieldList.push({type:'string',value:'jsxz',text:'建设性质',dictCode:'jsxz'})
        fieldList.push({type:'double',value:'ztz',text:'总投资',dictCode:''})
        fieldList.push({type:'double',value:'jhwc',text:'2025年计划完成投资',dictCode:''})
        fieldList.push({type:'int',value:'wcqk',text:'完成情况',dictCode:''})
        fieldList.push({type:'date',value:'fgsj',text:'计划开复工时间'})
        fieldList.push({type:'date',value:'wgsj',text:'计划完共时间'})
        fieldList.push({type:'string',value:'xmjzqk',text:'项目进展情况',dictCode:''})
        fieldList.push({type:'string',value:'fgld',text:'分管领导',dictCode:''})
        fieldList.push({type:'string',value:'fzdw',text:'负责单位',dictCode:''})
        this.superFieldList = fieldList
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~@assets/less/common.less';
</style>