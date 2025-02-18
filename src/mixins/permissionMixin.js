import { mapGetters } from 'vuex'
import { USER_ROLES, checkPermission } from '../utils/auth'

export default {
  computed: {
    ...mapGetters('user', ['canEdit', 'canReview', 'isDepartment']),
    
    isGovOffice() {
      return this.$store.state.user.role === USER_ROLES.GOV_OFFICE
    },
    
    isPeopleOffice() {
      return this.$store.state.user.role === USER_ROLES.PEOPLE_OFFICE
    },
    
    isConsultOffice() {
      return this.$store.state.user.role === USER_ROLES.CONSULT_OFFICE
    }
  },
  
  methods: {
    checkPermission(requiredRole) {
      return checkPermission(this.$store.state.user.role, requiredRole)
    },
    
    handleUnauthorized() {
      uni.showToast({
        title: '您没有权限执行此操作',
        icon: 'none'
      })
    }
  }
}
