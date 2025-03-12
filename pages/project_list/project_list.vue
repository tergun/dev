<template>
	<zero-loading v-if="loading" type="wobble" show-text="true" text="正在加载..."></zero-loading>
	<view v-if="isConnected" class="project-container">
		<swiper indicator-dots indicator-color="#999999" indicator-active-color="#ffffff" autoplay interval="2000" circular>
			<swiper-item>
				<image src="/static/projects/swiper1.jpg" class="image" mode="widthFix center"></image>
			</swiper-item>
			<swiper-item>
				<image src="/static/projects/swiper2.jpg" class="image" mode="widthFix center"></image>
			</swiper-item>
			<swiper-item>
				<image src="/static/projects/swiper3.jpg" class="image" mode="widthFix center"></image>
			</swiper-item>
		</swiper>
		<!-- 搜索栏 -->
		<view class="search-bar">
			<view class="search-input">
				<view class="search-icon">
					<image src="/static/icons/search.png" mode="aspectFit"></image>
				</view>
				<input type="text" v-model="searchKey" @input="handleSearch" placeholder="搜索项目"
					placeholder-class="placeholder" />
			</view>
			<!-- 筛选按钮 -->
			<view class="filter-buttons">
				<view class="filter-button" :class="{ active: filterStatus === 'all' }" @tap="setFilter('all')">
					<text>全部</text>
				</view>
				<view class="filter-button" :class="{ active: filterStatus === 'completed' }" @tap="setFilter('completed')">
					<text>已完成</text>
				</view>
				<view class="filter-button" :class="{ active: filterStatus === 'uncompleted' }" @tap="setFilter('uncompleted')">
					<text>未完成</text>
				</view>
			</view>
		</view>

		<!-- 项目列表 -->
		<view class="project-list">
			<!-- <template v-if="loading">
				<view class="loading">加载中...</view>
			</template>
			<template v-else-if="projectList.length === 0">
				<view class="empty">暂无项目</view>
			</template> -->
			<view class="project-item"  v-for="item in projectList" :key="item.id"
				@tap="handleProjectClick(item)">
				<!-- 进度蒙层 -->
				<view class="progress-overlay" :style="{ width: item.progress + '%' }">
					
				</view>
				<view style="height: 100%;display: block;align-items: end;">
					<text class="progress-text">形象进度：{{item.progress}}%</text>
				</view>
				<view class="project-info">
					<image class="project-image" :src="item.image || '/static/title.png'" mode="aspectFill">
					</image>
					<view class="content">
						<view class="project-header">
							<text class="project-name" style="width: 80%;">{{item.name}}</text>
							<text v-if="isRecentlyUpdated(item.updatedAt)" class="update-badge">近期更新</text>
							<!-- <image src="/static/update.png" style="width: 130rpx; height: 50rpx;"></image> -->
						</view>
						<view class="project-investor">
							<text class="label">投资主体：</text>
							<text class="value">{{item.investor}}</text>
						</view>

					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="isConnect" v-else-if="!isConnected" >
		<image src="/static/server.png"></image>
		<text>服务器断开，请联系管理人员！</text>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
	} from 'vue'
	import { onShow, onLoad } from '@dcloudio/uni-app'
	import config from '../../config'
	const loading = ref(false)

	const searchKey = ref('')
	const filterStatus = ref('all') // 筛选状态：all, completed, uncompleted
	const isConnected = ref(true)
	const originalProjectList = ref([
		{
			id: 1,
			name: '智慧城市建设项目',
			investor: '城市发展投资有限公司',
			image: '/static/projects/smart-city.png',
			updatedAt: new Date(),
			investorUpdatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
			progress: 100
		},
		{
			id: 2,
			name: '绿色能源产业园',
			investor: '新能源科技集团',
			image: '/static/projects/green-energy.png',
			updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
			investorUpdatedAt: new Date(),
			progress: 45
		},
		{
			id: 3,
			name: '智能制造产业基地',
			investor: '工业发展有限公司',
			image: '/static/projects/smart-manufacturing.png',
			updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
			investorUpdatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
			progress: 30
		},
		{
			id: 4,
			name: '文化创意产业园',
			investor: '文化传媒投资集团',
			image: '/static/projects/cultural-creative.png',
			updatedAt: new Date(),
			investorUpdatedAt: new Date(),
			progress: 90
		}
	])
	
	// 项目列表（经过筛选和搜索后的结果）
	const projectList = ref([])
	

	// 检查是否最近7天内更新
	const isRecentlyUpdated = (date) => {
		const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
		return new Date(date) > sevenDaysAgo
	}

	// 设置筛选状态
	const setFilter = (status) => {
		filterStatus.value = status
		applyFilters()
	}
	
	// 应用筛选和搜索
	const applyFilters = () => {
		loading.value = true
		setTimeout(() => {
			const keyword = searchKey.value.toLowerCase()
			
			// 先应用筛选条件
			let filteredList = [...originalProjectList.value]
			
			// 根据完成状态筛选
			if (filterStatus.value === 'completed') {
				filteredList = filteredList.filter(item => item.progress === 100)
			} else if (filterStatus.value === 'uncompleted') {
				filteredList = filteredList.filter(item => item.progress < 100)
			}
			
			// 再应用搜索关键词
			if (keyword) {
				filteredList = filteredList.filter(item =>
					item.name.toLowerCase().includes(keyword) ||
					item.investor.toLowerCase().includes(keyword)
				)
			}
			
			projectList.value = filteredList
			loading.value = false
		}, 300)
	}
	
	// 搜索处理
	const handleSearch = () => {
		applyFilters()
	}

	// 查看项目详情
	const handleProjectClick = (project) => {
		console.log(project.id)
		
		uni.navigateTo({
			url: `/pages/project_detail/project_detail?id=${project.id}`,
			fail: () => {
				uni.showToast({
					title: '页面跳转失败',
					icon: 'none'
				})
			}
		})
	}
	const getProjectList = ()=>{
		uni.request({
			url:config.getUrl('project_list'),
			method:'GET',
			data:{
				pageNo:1,
				pageSize:10
			},
			success: (res) => {
				loading.value = false
				console.log('项目列表',res.data)
				originalProjectList.value = res.data.result.records.map(item=>({
					id:item.id,
					name:item.xmmc,
					investor:item.tzzt,
					progress:item.wcqk					
				}))
				// 初始化显示所有项目
				applyFilters()
			},
			fail: (res) => {
				console.log('失败')
				loading.value = true
			},
			complete: (res) => {
				console.log('完成',res.errMsg == "request:fail")
				if(res.errMsg == "request:fail"){
						 isConnected.value = false
						 loading.value = false
				}
				
			}
			
		})
	}
	onShow(() => {
		loading.value = true
		getProjectList()
	});
	

	onMounted(() => {
		// 初始化项目列表
		projectList.value = [...originalProjectList.value]
	})
	
</script>

<style lang="scss" scoped>
	.isConnect{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
		image{
			
			width: 100rpx;
			height: 100rpx;
		}
		text{
			margin-top: 20rpx;
		}
		
	}
	.project-container {
		min-height: 100vh;
		background: #F5F7FA;
		padding: 30rpx;

		.search-bar {
			margin-top: 20rpx;
			margin-bottom: 30rpx;

			.search-input {
				background: #FFFFFF;
				height: 80rpx;
				border-radius: 40rpx;
				display: flex;
				align-items: center;
				padding: 0 30rpx;
				margin-bottom: 20rpx;

				.search-icon {
					width: 32rpx;
					height: 32rpx;
					margin-right: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					
					image {
						width: 100%;
						height: 100%;
					}
				}

				input {
					flex: 1;
					height: 80rpx;
					font-size: 28rpx;
				}

				.placeholder {
					color: #999999;
				}
			}
			
			.filter-buttons {
				display: flex;
				justify-content: space-between;
				margin-bottom: 20rpx;
				
				.filter-button {
					flex: 1;
					height: 70rpx;
					background: #FFFFFF;
					border-radius: 35rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 10rpx;
					font-size: 28rpx;
					color: #666666;
					box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
					transition: all 0.3s ease;
					
					&:first-child {
						margin-left: 0;
					}
					
					&:last-child {
						margin-right: 0;
					}
					
					&.active {
						background: #409EFF;
						color: #FFFFFF;
						box-shadow: 0 2rpx 12rpx rgba(64, 158, 255, 0.3);
					}
				}
			}
		}
		.image{
			width: 100%;
			height: 100%;
		}

		.project-list {
			.project-item {
				background: #FFFFFF;
				border-radius: 16rpx;
				padding: 30rpx;
				margin-bottom: 20rpx;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				position: relative;
				overflow: hidden;

				.progress-text {
					color: #409EFF;
					font-weight: 600;
					font-size: 24rpx;
					
					padding: 0rpx 12rpx;
					border-radius: 20rpx;
					box-shadow: 0 2rpx 8rpx rgba(64, 158, 255, 0.15);
					position: absolute;
					bottom: 0;
					right: 0;
					align-items: center;

				}

				.progress-overlay {
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					background: linear-gradient(90deg,
							rgba(64, 158, 255, 0.6) 0%,
							rgba(64, 158, 255, 0.5) 15%,
							rgba(64, 158, 255, 0.4) 30%,
							rgba(64, 158, 255, 0.3) 45%,
							rgba(64, 158, 255, 0.2) 60%,
							rgba(64, 158, 255, 0.15) 75%,
							rgba(64, 158, 255, 0.1) 90%,
							rgba(64, 158, 255, 0.05) 100%);
					z-index: 1;
					transition: width 0.3s ease;
					border-radius: 0 16rpx 16rpx 0;
				}

				.project-info {
					flex: 1;
					display: flex;
					align-items: center;
					position: relative;
					z-index: 2;

					.project-image {
						width: 100rpx;
						height: 100rpx;
						border-radius: 8rpx;
						margin-right: 20rpx;
						flex-shrink: 0;
					}

					.content {
						flex: 1;

						.project-header {
							display: flex;
							margin-bottom: 8rpx;

							.project-name {
								font-size: 32rpx;
								font-weight: 500;
								color: #333333;
								line-height: 1.2;
							}
						}



						.project-investor {
							font-size: 28rpx;
							color: #666666;
							display: flex;
							align-items: center;
							flex-wrap: wrap;
							width: 100%;
							position: relative;

							.label {
								color: #999999;
							}

							.value {
								color: #666666;
								margin-right: 20rpx;
							}


						}
					}
				}
			}
		}

		.update-badge {
			background: #409EFF;
			color: #FFFFFF;
			font-size: 24rpx;
			padding: 4rpx 12rpx;
			border-radius: 20rpx;
			white-space: nowrap;

			&.small {
				font-size: 20rpx;
				padding: 2rpx 8rpx;
			}
		}

		.loading,
		.empty {
			text-align: center;
			padding: 40rpx 0;
			color: #999999;
			font-size: 28rpx;
		}
	}
</style>
