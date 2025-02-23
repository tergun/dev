<template>
  <div>
    <a-table
      rowKey="id"
      size="middle"
      bordered
      :loading="loading"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false"
    >
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
        <div v-else>
          <a-button ghost type="primary" icon="eye" size="small" style="margin-right: 5px" @click="previewFile(text)">
            <span>预览</span>
          </a-button>
          <a-button ghost type="primary" icon="download" size="small" @click="downloadFile(text)">
            <span>下载</span>
          </a-button>
        </div>
      </template>
    </a-table>
    <pdf-preview-modal ref="pdfModal"></pdf-preview-modal>
  </div>
</template>

<script>
  import { getAction } from '@api/manage'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import PdfPreviewModal from '@/views/jeecg/modules/PdfPreviewModal'
  import { ACCESS_TOKEN } from "@/store/mutation-types"
  import Vue from 'vue'

  export default {
    name: 'XmjzbListSubTable',
    mixins: [JeecgListMixin],
    components: {
      PdfPreviewModal
    },
    props: {
      record: {
        type: Object,
        default: null,
      }
    },
    data() {
      return {
        description: '重点项目管理子表内嵌列表',
        disableMixinCreated: true,
        loading: false,
        dataSource: [],
        columns: [
          {
            title: '办理过程',
            align: 'center',
            dataIndex: 'blgc',
          },
          {
            title: '项目状态',
            align: 'center',
            dataIndex: 'xmzt_dictText'
          },
          {
            title: '办理期限',
            align: 'center',
            dataIndex: 'blqx',
          },
          {
            title: '办理层级',
            align: 'center',
            dataIndex: 'blcj_dictText'
          },
          {
            title: '组卷情况',
            align: 'center',
            dataIndex: 'zjqk',
          },
          {
            title: '审批情况',
            align: 'center',
            dataIndex: 'spqk',
            scopedSlots: {customRender: 'fileSlot'}
          },
        ],
        url: {
          listByMainId: '/xmgl/xmjzb/queryXmjzbListByMainId',
        },
      }
    },
    watch: {
      record: {
        immediate: true,
        handler() {
          if (this.record != null) {
            this.loadData(this.record)
          }
        }
      }
    },
    methods: {
      loadData(record) {
        this.loading = true
        this.dataSource = []
        getAction(this.url.listByMainId, {
          id: record.id
        }).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
          }
        }).finally(() => {
          this.loading = false
        })
      },
      previewFile(text) {
        const token = Vue.ls.get(ACCESS_TOKEN)
        this.$refs.pdfModal.previewFiles(text, token)
      },
    },
  }
</script>

<style scoped>
</style>
