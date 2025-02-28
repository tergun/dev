<template>
	<view class="detail-container">
		<!-- 审批手续弹窗 -->
		<uni-popup ref="popup" type="center" :mask-click="false">
			<view class="popup-wrapper">
				<view class="popup-content">
					<view class="popup-header">
						<text class="popup-title">审批手续办理情况</text>
					</view>
					<scroll-view class="scroll-container" scroll-y>
						<view class="table-content">
							<view class="table-row" v-for="(row, index) in tableData" :key="index">
								<view class="table-cell">
									<text class="cell-label"
										:title="row.header1">{{truncateText(row.header1, 10)}}</text>
									<view class="cell-value-container">
										<view class="cell-value" :class="getStatusClass(row.value1)">
											<text>{{row.value1}}</text>
										</view>
										<text v-if="row.value1 === '是'" class="detail-link" @tap="goDetail(true,index)">查看详情</text>
										<text v-if="row.value1 === '否'" class="detail-link" @tap="goDetail(false,index)">查看详情</text>
										<text v-if="row.value1 === '无需办理'" class="detail-link" @tap="goDetail(true,index)">查看详情</text>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="popup-close" @tap="closePopup">
					<text class="close-icon">×</text>
				</view>
			</view>
		</uni-popup>

		<!-- 项目进展弹窗 -->
		<uni-popup ref="popup_progress" type="center" :mask-click="false">
			<view class="popup-wrapper">
				<view class="popup-content">
					<view class="popup-header">
						<text class="popup-title">项目进展情况</text>
					</view>
					<scroll-view class="scroll-container" scroll-y>
						<view class="progress-content">
							<text class="progress-text">{{project_progress}}</text>
						</view>
					</scroll-view>
				</view>
				<view class="popup-close" @tap="closePopupProgress">
					<text class="close-icon">×</text>
				</view>
			</view>
		</uni-popup>

		<!-- 项目图片卡片 -->
		<view class="card project-image-card">
			<image class="project-image" :src="projectInfo.image || '/static/projects/smart-city.png'"
				mode="aspectFill"></image>
		</view>
		
		<!-- 可拖动悬浮关注按钮 -->
		<view 
			class="floating-follow-button" 
			:class="{'followed': isFollowed, 'dragging': isDragging}"
			@tap="toggleFollow"
			@touchstart="dragStart"
			@touchmove="dragMove"
			@touchend="dragEnd"
			:style="buttonStyle">
			<text>{{ isFollowed ? '已关注' : '关注' }}</text>
		</view>

		<!-- 基本信息卡片 -->
		<view class="card">
			<view class="card-header" @tap="toggleCollapse('basicInfo')">
				<text class="card-title">基本信息</text>
				<text class="card-arrow" :class="{'is-open': collapseState.basicInfo}">›</text>
			</view>
			<view class="card-content" v-if="collapseState.basicInfo">
				<view class="info-list">
					<view class="info-item">
						<text class="info-label">调度层级</text>
						<text class="info-value">{{projectInfo.level}}</text>
					</view>
					<view class="info-item">
						<text class="info-label">项目名称</text>
						<text class="info-value">{{projectInfo.name}}</text>
					</view>
					<view class="info-item">
						<text class="info-label">投资主体</text>
						<text class="info-value">{{projectInfo.investor}}</text>
					</view>
					<view class="info-item">
						<text class="info-label">建设性质</text>
						<text class="info-value">{{projectInfo.nature}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 投资信息卡片 -->
		<view class="card">
			<view class="card-header" @tap="toggleCollapse('investInfo')">
				<text class="card-title">投资信息</text>
				<text class="card-arrow" :class="{'is-open': collapseState.investInfo}">›</text>
			</view>
			<view class="card-content" v-if="collapseState.investInfo">
				<view class="info-list">
					<view class="info-item">
						<text class="info-label">总投资</text>
						<text class="info-value">{{projectInfo.totalInvestment}}万元</text>
					</view>
					<view class="info-item">
						<text class="info-label">2025年计划完成投资</text>
						<text class="info-value">{{projectInfo.plannedInvestment2025}}万元</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 时间信息卡片 -->
		<view class="card">
			<view class="card-header" @tap="toggleCollapse('timeInfo')">
				<text class="card-title">时间信息</text>
				<text class="card-arrow" :class="{'is-open': collapseState.timeInfo}">›</text>
			</view>
			<view class="card-content" v-if="collapseState.timeInfo">
				<view class="info-list">
					<view class="info-item">
						<text class="info-label">计划开复工时间</text>
						<text class="info-value">{{projectInfo.plannedStartDate}}</text>
					</view>
					<view class="info-item">
						<text class="info-label">计划完工时间</text>
						<text class="info-value">{{projectInfo.plannedEndDate}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 责任信息卡片 -->
		<view class="card">
			<view class="card-header" @tap="toggleCollapse('responsibilityInfo')">
				<text class="card-title">责任信息</text>
				<text class="card-arrow" :class="{'is-open': collapseState.responsibilityInfo}">›</text>
			</view>
			<view class="card-content" v-if="collapseState.responsibilityInfo">
				<view class="info-list">
					<view class="info-item">
						<text class="info-label">分管领导</text>
						<text class="info-value">{{projectInfo.supervisor}}</text>
					</view>
					<view class="info-item">
						<text class="info-label">责任单位</text>
						<text class="info-value">{{projectInfo.responsibleUnit}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 前期手续办理情况 -->
		<view class="card action-card" @tap="openPopup">
			<view class="card-header">
				<text class="card-title">前期手续办理情况</text>
				<text class="card-action">查看</text>
			</view>
		</view>

		<!-- 项目进展情况 -->
		<view class="card action-card" @tap="openPopupProgress">
			<view class="card-header">
				<text class="card-title">项目进展情况</text>
				<text class="card-action">查看</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import {
		ref,
		reactive,
		computed,
		onMounted
	} from 'vue'
	import config from '../../config'

	const popup = ref(null)
	const popup_progress = ref(null)
	const project_progress = ref("大板铁路站房改扩建项目2024年5月16日取得可研批复，巴林右旗人民政府和集通公司于6月14号签订合作协议，施工图纸评审和造价评审都已完毕，根据合作协议，旗政府于8月20日向共管账户转入2300万元用于项目建设。该项目于8月29日发布招标公告，最终中标单位为中铁建设集团有限公司和内蒙古铁建工程项目管理有限责任公司联合体。施工企业11月2日已进场施工并完成入统工作。")
	const itemId = ref(null)
	const isFollowed = ref(false)
	
	// 按钮位置状态
	const buttonPosition = reactive({
		x: 40,
		y: 120
	})
	const buttonStyle = computed(() => {
		return {
			right: buttonPosition.x + 'rpx',
			bottom: buttonPosition.y + 'rpx'
		}
	})
	// 拖动状态
	const isDragging = ref(false)
	const startPosition = reactive({
		x: 0,
		y: 0
	})
	const projectInfo = ref({
		level: '市级重点项目',
		name: '智慧城市建设项目',
		investor: '城市发展投资有限公司',
		nature: '新建',
		totalInvestment: '50000',
		plannedInvestment2025: '20000',
		plannedStartDate: '2025-03-01',
		plannedEndDate: '2025-12-31',
		supervisor: '张三',
		responsibleUnit: '城市建设局',
	})
	const goDetail = (staus,index)=>{
		const json = {'text':tableData.value[0].blqx}
		// const js = 
		
		if(staus===false){
			uni.navigateTo({
				url:'/pages/project_status/project_status_false'
			})
		}else if(staus===true){
			uni.navigateTo({
				url:'/pages/project_status/project_status_true'
			})
		}
		
	}

	const tableData = ref([
		{
		header1: '立项',
		value1: '无需办理',
		handling_level:'',//办理层级
		handling_time:''
		
		
		},
		{
		header1: '建设工程文物保护和考古许可（预审意见或许可）',
		value1: '是'},
		{
		header1: '用地预审和规划选址意见书',
		value1: '否'},
		{
		header1: '新增建设用地审批',
		value1: '无需办理'},
		{
		header1: '建设用地规划许可审批',
		value1: '是'},
		{
		header1: '建设工程规划许可审批',
		value1: '是'},
		{
		header1: '节能审查',
		value1: '无需办理'},
		{
		header1: '林地征占手续',
		value1: '无需办理'},
		{
		header1: '草地征占手续',
		value1: '无需办理'},
		{
		header1: '环境影响评价手续',
		value1: '无需办理'},
		{
		header1: '取水许可手续',
		value1: '无需办理'},
		{
		header1: '开工许可手续',
		value1: '无需办理'},
		
		])

	// 折叠状态管理
	const collapseState = reactive({
		basicInfo: false,
		investInfo: false,
		timeInfo: false,
		responsibilityInfo: false
	})

	const toggleCollapse = (section) => {
		collapseState[section] = !collapseState[section]
	}

	// 拖动事件处理
	const dragStart = (e) => {
		// 防止触发点击事件
		e.stopPropagation()
		e.preventDefault() // 阻止默认行为
		isDragging.value = true
		
		// 记录触摸起始点
		startPosition.x = e.touches[0].clientX
		startPosition.y = e.touches[0].clientY
		
		// 获取屏幕信息
		const systemInfo = uni.getSystemInfoSync()
		const screenWidth = systemInfo.windowWidth
		const screenHeight = systemInfo.windowHeight
		const rpxRatio = 750 / screenWidth
		
		// 计算初始按钮位置（用于显示反馈）
		const rightRpx = (screenWidth - startPosition.x) * rpxRatio
		const bottomRpx = (screenHeight - startPosition.y) * rpxRatio
		
		// 显示轻微的触觉反馈（如果设备支持）
		if (uni.vibrateShort) {
			uni.vibrateShort({
				success: function() {}
			})
		}
		
		// 显示拖动提示
		uni.showToast({
			title: '正在拖动按钮',
			icon: 'none',
			duration: 1000
		})
		
		console.log('开始拖动', startPosition.x, startPosition.y)
	}
	
	const dragMove = (e) => {
		if (!isDragging.value) return
		
		// 阻止默认行为，防止页面滚动
		e.stopPropagation()
		e.preventDefault()
		
		// 获取当前触摸点位置
		const currentX = e.touches[0].clientX
		const currentY = e.touches[0].clientY
		
		// 获取屏幕信息
		const systemInfo = uni.getSystemInfoSync()
		const screenWidth = systemInfo.windowWidth
		const screenHeight = systemInfo.windowHeight
		const rpxRatio = 750 / screenWidth
		
		// 计算按钮应该位于的位置（直接跟随手指）
		// 注意：按钮的中心应该位于手指的位置
		const buttonWidth = 120 // 估计按钮宽度，单位rpx
		const buttonHeight = 60 // 估计按钮高度，单位rpx
		
		// 将手指位置转换为rpx，并计算按钮右下角的位置
		const rightRpx = (screenWidth - currentX) * rpxRatio - (buttonWidth / 2)
		const bottomRpx = (screenHeight - currentY) * rpxRatio - (buttonHeight / 2)
		
		// 设置按钮位置，确保按钮跟随手指移动
		buttonPosition.x = rightRpx > 0 ? rightRpx : 0
		buttonPosition.y = bottomRpx > 0 ? bottomRpx : 0
		
		// 限制按钮不超出屏幕边界
		if (buttonPosition.x < 20) buttonPosition.x = 20
		if (buttonPosition.y < 20) buttonPosition.y = 20
		if (buttonPosition.x > 710) buttonPosition.x = 710
		if (buttonPosition.y > 1200) buttonPosition.y = 1200
		
		console.log('拖动中', buttonPosition.x, buttonPosition.y, '手指位置', currentX, currentY)
	}
	
	const dragEnd = (e) => {
		if (!isDragging.value) return
		
		if (e) {
			e.stopPropagation() // 阻止事件冒泡
		}
		
		isDragging.value = false
		
		// 保存按钮位置到本地存储
		uni.setStorageSync('followButtonPosition', {
			x: buttonPosition.x,
			y: buttonPosition.y
		})
		
		console.log('拖动结束', buttonPosition.x, buttonPosition.y)
		
		// 显示提示，确认拖动已完成
		uni.showToast({
			title: '按钮位置已保存',
			icon: 'none',
			duration: 1500
		})
	}
	
	const toggleFollow = (e) => {
		// 如果正在拖动，不触发关注/取消关注
		if (isDragging.value) {
			console.log('正在拖动，不触发关注/取消关注')
			return
		}
		
		isFollowed.value = !isFollowed.value
		uni.showToast({
			title: isFollowed.value ? '已关注项目' : '已取消关注',
			icon: 'none'
		})
		
		// Here you would typically make an API call to update the follow status
		// For example:
		// uni.request({
		//   url: config.getUrl('follow_project'),
		//   method: 'POST',
		//   data: {
		//     id: itemId.value,
		//     followed: isFollowed.value
		//   },
		//   success(res) {
		//     console.log('Follow status updated', res.data)
		//   }
		// })
	}

	const getStatusClass = (value) => {
		return {
			'status-yes': value === '是',
			'status-no': value === '否',
			'status-not-required': value === '无需办理'
		}
	}

	const truncateText = (text, maxLength) => {
		if (text && text.length > maxLength) {
			return text.substring(0, maxLength) + '...'
		}
		return text
	}

	const openPopupProgress = () => {
		popup_progress.value?.open('center')
	}

	const openPopup = () => {
		popup.value?.open('center')
		console.log(itemId.value)
		uni.request({
			url:config.getUrl('preliminary_procedures'),
			method: 'GET',
			data: {
				id: itemId.value
			},
			success(res) {
				   console.log(res.data)
				   tableData.value = res.data.result.records.map(item => ({
					header1: item.blgc,
					value1: item.xmzt_dictText,
					handling_level:item.blcj_dictText,
					handling_time:item.blqx
				}))
			}
		})
	}

	const closePopup = () => {
		popup.value?.close()
	}

	const closePopupProgress = () => {
		popup_progress.value?.close()
	}

	// 获取项目详情
	const getProjectDetail = async (id) => {
		try {
			const response = await uni.request({
				url:config.getUrl('project_progress'),
				method: 'GET',
				data: {
					id: id
				}
			})

			let res = response.data.result
			console.log('项目详情', res.data)
			console.log(response.data)
			projectInfo.value.level = res.ddcj
			projectInfo.value.name = res.xmmc
			projectInfo.value.investor = res.tzzt
			projectInfo.value.nature = res.jsxz
			projectInfo.value.totalInvestment = res.ztz
			projectInfo.value.plannedInvestment2025 = res.jhwc
			projectInfo.value.plannedStartDate = res.fgsj
			projectInfo.value.plannedEndDate = res.wgsj
			projectInfo.value.supervisor = res.fgld
			projectInfo.value.responsibleUnit = res.fzdw
			project_progress.value = res.xmjzqk
			// projectInfo.value.handling_level = res.blcj
		} catch (error) {
			console.error('获取项目详情失败：', error)
			// uni.showToast({
			// 	title: '获取项目详情失败',
			// 	icon: 'none'
			// })
		}
	}

	onMounted(() => {
		const pages = getCurrentPages()
		const currentPage = pages[pages.length - 1]
		console.log("测试", currentPage)
		const id = currentPage.options.id
		if (id) {
			getProjectDetail(id)
			itemId.value = id
		}
		console.log("页面传回的id", id)
		
		// 从本地存储加载按钮位置
		try {
			const savedPosition = uni.getStorageSync('followButtonPosition')
			if (savedPosition) {
				buttonPosition.x = savedPosition.x
				buttonPosition.y = savedPosition.y
			}
		} catch (e) {
			console.error('读取按钮位置失败', e)
		}
	})
</script>

<style lang="scss" scoped>
	// 全局变量
	$primary-color: #2D5BFF;
	$success-color: #10B981;
	$warning-color: #F59E0B;
	$background-color: #F8FAFC;
	$card-color: #FFFFFF;
	$text-primary: #1A1F36;
	$text-secondary: #4E5D78;
	$text-tertiary: #8A94A6;
	$border-radius: 16rpx;
	$shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
	$transition: all 0.2s ease;

	// 基础样式
	.detail-container {
		min-height: 100vh;
		background: $background-color;
		padding: 32rpx;
	}

	// 卡片样式
	.card {
		background: $card-color;
		border-radius: $border-radius;
		margin-bottom: 24rpx;
		box-shadow: $shadow;
		overflow: hidden;

		&.project-image-card {
			padding: 0;
			position: relative;
		}

		&.action-card {
			transition: $transition;

			&:active {
				opacity: 0.9;
			}
		}
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 32rpx;
		position: relative;
	}

	.card-title {
		font-size: 32rpx;
		font-weight: 600;
		color: $text-primary;
	}

	.card-arrow {
		font-size: 36rpx;
		color: $text-tertiary;
		transform: rotate(90deg);
		transition: $transition;

		&.is-open {
			transform: rotate(270deg);
		}
	}

	.card-action {
		font-size: 28rpx;
		color: $primary-color;
		font-weight: 500;
	}

	.card-content {
		padding: 0 32rpx 24rpx;
	}

	// 项目图片
	.project-image {
		width: 100%;
		height: 360rpx;
		display: block;
		background-color: rgba(0, 0, 0, 0.03);
	}

	// 悬浮关注按钮
	.floating-follow-button {
		position: fixed;
		bottom: 120rpx;
		right: 40rpx;
		background-color: $primary-color;
		color: #FFFFFF;
		padding: 16rpx 32rpx;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-weight: 500;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.15);
		z-index: 100;
		touch-action: none; /* 禁用浏览器默认的触摸行为 */
		transition: opacity 0.2s, transform 0.2s; /* 只对透明度和变换添加过渡效果 */
		
		&:active {
			opacity: 0.9;
			transform: scale(0.98);
		}
		
		&.followed {
			background-color: rgba(45, 91, 255, 0.1);
			color: $primary-color;
			border: 1rpx solid $primary-color;
		}
		
		&.dragging {
			transition: none; /* 拖动时禁用过渡效果，确保实时跟随 */
			opacity: 0.8; /* 拖动时稍微透明 */
			transform: scale(1.05); /* 拖动时稍微放大 */
		}
	}

	// 信息列表
	.info-list {
		.info-item {
			display: flex;
			padding: 20rpx 0;
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);

			&:last-child {
				border-bottom: none;
				padding-bottom: 0;
			}

			&:first-child {
				padding-top: 0;
			}
		}

		.info-label {
			width: 280rpx;
			font-size: 28rpx;
			color: $text-tertiary;
			flex-shrink: 0;
		}

		.info-value {
			flex: 1;
			font-size: 28rpx;
			color: $text-primary;
			word-break: break-all;
		}
	}

	// 弹窗样式
	.popup-wrapper {
		width: 90vw;
		max-width: 650rpx;
		position: relative;
	}

	.popup-content {
		background: $card-color;
		border-radius: $border-radius;
		overflow: hidden;
		box-shadow: $shadow;
	}

	.popup-header {
		padding: 32rpx;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
	}

	.popup-title {
		font-size: 32rpx;
		font-weight: 600;
		color: $text-primary;
		text-align: center;
		display: block;
	}

	.popup-close {
		width: 64rpx;
		height: 64rpx;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: -80rpx;
		right: 0;

		.close-icon {
			font-size: 40rpx;
			color: #FFFFFF;
			font-weight: 300;
		}
	}

	// 滚动容器
	.scroll-container {
		max-height: 60vh;
	}

	// 表格内容
	.table-content {
		padding: 24rpx 32rpx;

		.table-row {
			margin-bottom: 16rpx;

			&:last-child {
				margin-bottom: 0;
			}
		}

		.table-cell {
			background: rgba(0, 0, 0, 0.02);
			border-radius: 8rpx;
			padding: 20rpx 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.cell-label {
				font-size: 28rpx;
				color: $text-secondary;
				max-width: 60%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.cell-value-container {
				display: flex;
				align-items: center;
				gap: 16rpx;
			}

			.cell-value {
				display: flex;
				align-items: center;
				gap: 8rpx;
				font-size: 28rpx;

				&.status-yes {
					color: $success-color;
					background-color: rgba(16, 185, 129, 0.1);
					padding: 4rpx 12rpx;
					border-radius: 6rpx;

					.status-dot {
						width: 12rpx;
						height: 12rpx;
						border-radius: 50%;
						background: $success-color;
					}
				}

				&.status-no {
					color: #EF4444;
					background-color: rgba(239, 68, 68, 0.1);
					padding: 4rpx 12rpx;
					border-radius: 6rpx;
				}

				&.status-not-required {
					color: #9CA3AF;
					background-color: rgba(156, 163, 175, 0.1);
					padding: 4rpx 12rpx;
					border-radius: 6rpx;
				}
			}
		}
	}

	.detail-link {
		color: #1890FF;
		font-size: 24rpx;
		font-weight: 500;
		padding: 4rpx 12rpx;
		background-color: rgba(24, 144, 255, 0.1);
		border-radius: 6rpx;
	}

	// 项目进展内容
	.progress-content {
		padding: 32rpx;

		.progress-text {
			font-size: 28rpx;
			color: $text-secondary;
			line-height: 1.6;
			text-align: justify;
		}
	}

	// 美化滚动条
	::-webkit-scrollbar {
		width: 4rpx;
		background: transparent;
	}

	::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.1);
		border-radius: 2rpx;
	}
</style>
