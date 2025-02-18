/// <reference path="../../../../typings/index.d.ts" />

import type { ProjectStatus } from '../../../miniprogram_npm/project';
import { ProjectStatus as PS } from '../../../miniprogram_npm/constants/project';

Component({
  properties: {
    project: {
      type: Object,
      value: {}
    }
  },

  data: {
    statusText: ''
  },

  observers: {
    'project.status': function(status: ProjectStatus) {
      let statusText = '';
      switch (status) {
        case PS.NOT_STARTED:
          statusText = '未开始';
          break;
        case PS.IN_PROGRESS:
          statusText = '进行中';
          break;
        case PS.COMPLETED:
          statusText = '已完成';
          break;
        case PS.SUSPENDED:
          statusText = '已暂停';
          break;
      }
      this.setData({ statusText });
    }
  }
});
