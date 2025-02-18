interface Department {
  id: string;
  name: string;
  selected?: boolean;
}

/// <reference path="../../../typings/index.d.ts" />

Component({
  data: {
    departments: [
      { id: '1', name: '发展和改革委员会', selected: false },
      { id: '2', name: '教育局', selected: false },
      { id: '3', name: '科学技术局', selected: false },
      { id: '4', name: '工业和信息化局', selected: false },
      { id: '5', name: '民政局', selected: false }
    ] as Department[],
    hasSelection: false
  },

  methods: {
    toggleDepartment(e: any) {
      const { id } = e.currentTarget.dataset;
      const { departments } = this.data;
      const newDepartments = departments.map(dept => 
        dept.id === id ? { ...dept, selected: !dept.selected } : dept
      );
      
      this.setData({
        departments: newDepartments,
        hasSelection: newDepartments.some(dept => dept.selected)
      });
    },

    clearSelection() {
      const newDepartments = this.data.departments.map(dept => ({
        ...dept,
        selected: false
      }));
      
      this.setData({
        departments: newDepartments,
        hasSelection: false
      });
    },

    confirmSelection() {
      const selectedDepartments = this.data.departments.filter(dept => dept.selected);
      this.triggerEvent('select', { departments: selectedDepartments });
    }
  }
});
