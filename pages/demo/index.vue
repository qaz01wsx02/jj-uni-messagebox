<template>
	<base-view>
		<map style="width: 100%;height: 150px;"></map>
		<div class="flexColumnCenter">
			<div class="flexRow marginTopBottom">
				<button class="btn" @click="showNormalAlert">
					默认Alert
				</button>
				<button class="btn" style="margin-left: 10px;" @click="showCustomAlert('alert',false)">
					没有按钮的Alert
				</button>
				<button class="btn marginLeftRight" @click="showCustomAlert('alert')">
					自定义Alert
				</button>
				<button class="btn" @click="showCustomAlert('sheet')">
					自定义Sheet
				</button>
			</div>
			<div class="flexRow marginTopBottom">
				<button class="btn" @click="showDialog">Dialog</button>
			</div>
			<div class="flexRow marginTopBottom">
				<button class="btn" @click="showPopup">Popup</button>
			</div>
			<div class="flexRow marginTopBottom">
				<button class="btn" @click="showLoading('default')">Loading</button>
				<button class="btn" style="margin-left: 10px;" @click="showLoading('round')">Loading-round</button>
				<button class="btn marginLeftRight" @click="showLoading('taichi')">Loading-taichi</button>
				<button class="btn" @click="showLoading('custom')">Loading-自定义</button>
			</div>

			<div class="flexRow marginTopBottom">
				<button class="btn" @click="showToast('')">toast</button>
				<button class="btn marginLeftRight" @click="showToast('success')">toast-success</button>
				<button class="btn" @click="showToast('fail')">toast-fail</button>
				<button class="btn marginLeftRight" @click="showToast('warn')">toast-warn</button>
				<button class="btn" style="margin-left: 10px;" @click="showToast('custom')">toast-自定义</button>
			</div>

			<jj-dialog :visible="isShowDialog" :titleStyle="{'color':'red'}" title="提示" message="外层Dialog"
				@close="isShowDialog=false">
				<image slot="backgroundContent" class="image" :src="backgroundImg"></image>
				<div> 自定Dialog内容</div>
				<jj-dialog width="60%" title="内层Dialog" :visible="innerVisible" @close='innerVisible=false'>

				</jj-dialog>
				<div slot="footer">
					<button class="btn" style="margin-bottom: 10px;" @click="innerVisible=true">打开内层Dialog</button>
				</div>
			</jj-dialog>
			<jj-popup :visible="isShowPopup" @close="closePopup" :showClose="true" title="请选择" :touchClose="false">
				<image slot="backgroundContent" class="image" :src="backgroundImg"></image>
				<div> 今天天气不错</div>
			</jj-popup>
		</div>
	</base-view>
</template>

<script>
	import jjDialog from '../components/jj-messagebox/dialog/jj-dialog.vue'
	import jjPopup from '../components/jj-messagebox/popup/jj-popup.vue'
	export default {
		components: {
			jjPopup,
			jjDialog
		},
		data() {
			return {
				isShowDialog: false,
				innerVisible: false,
				isShowPopup: false,
				backgroundImg: require('../../static/background_image.jpeg')
			}
		},
		methods: {
			showNormalAlert() {

				let alert = this.$jj_alert('提示', '时间就像海绵里的水,\n只要愿挤总还是有的。', '知道了')
				let loading = this.$jj_loading()
				let that = this
				setTimeout(function() {
					loading.close()
					that.$jj_toast('已经更新 Alert 数据')
					//更新数据
					alert.update({
						titleStyle: {
							'color': 'red',
							'font-size': '18px'
						},
						btns: [{
							title: "确定",
							activeBackground: '#2A8AFF',
							activeColor: "#fff",
							style: {
								'color': '#4CD964',
							},
							click: () => {
								console.log("点击-----确定")
							}
						}]
					})
				}, 2000)
			},
			showCustomAlert(type, isShowBtn = true) {
				let that = this
				let confirmBtn = {
					title: "Confirm",
					activeBackground: '#2f2',
					style: {
						'background': '#2A8AFF',
						'color': '#fff'
					},
					touchClose: false, //点击按钮时，是否自动关闭弹窗
					click: function() {
						/*
						有时候需要进行网络请求处理后，在是否进行关闭弹窗
						这时候可以选择手动关闭弹窗
						注意：click这个方法，不要使用箭头函数=>方法，使用function方法，这时候this表示的当前按钮对象
						*/
						that.simulateNetworkRequest(this)
					}
				}
				let alert = this.$jj_alert({
					type: type, //弹窗的类型有alert和sheet
					width: '70%', //设置弹窗的宽度
					padding: '20px 30px', //设置内容的上下左右偏移
					maskColor: "rgba(0, 0, 0, 0.6)", //遮罩层的背景颜色
					touchClose: true, //点击背景图层，是否关闭弹框
					showClose: true, //是否显示右上角的关闭按钮
					// position:'bottom',
					// closeStyle: {
					// 	'height': '0.85rem',
					// 	'width': '0.85rem'
					// },
					title: '提示', //标题
					titleStyle: {
						'color': '#fb2408',
						'font-size': '20px'
					}, //标题的样式
					message: '事实上确实是当我们失去的时候，才知道自己曾经拥有；但有没有注意到当有些东西来临的时候，我们已错过。', //内容
					messageStyle: {
						"justify-content": 'left',
						"display": "flex",
						"color": '#8a8a8a',
						'text-align': 'left'
					}, //内容的样式
					btns: isShowBtn === false ? [] : [{
						title: "Cancel",
						activeBackground: '#2A8AFF',
						activeColor: "#fff",
						click: () => {
							console.log("点击Cancel")
						}
					}, {
						title: "Destructive",
						style: {
							'color': 'red',
							'font-size': '15px'
						},
						click: () => {
							console.log("点击Destructive")
						}
					}, {
						title: "Confirm",
						activeBackground: '#2f2',
						style: {
							'background': '#2A8AFF',
							'color': '#fff',
						},
						touchClose: false, //点击按钮时，是否自动关闭弹窗
						click: function() {
							/*
							有时候需要进行网络请求处理后，在是否进行关闭弹窗
							这时候可以选择手动关闭弹窗
							注意：click这个方法，不要使用箭头函数=>方法，使用function方法，这时候this表示的当前按钮对象
							*/
							that.simulateNetworkRequest(this, alert)
						}
					}]
				})
			},

			simulateNetworkRequest(btn, alert) {
				//进行网络模拟，请求网络时候，禁止按钮再次点击，等结果回来后，在考虑是否启用按钮点击事件和是否关闭弹框
				this.count = this.count || 0
				this.$jj_toast('按钮被禁用,网络请求中...')
				btn.isDisable = true
				console.log(btn)
				let that = this
				if (this.count % 2 === 0) {
					setTimeout(function() {
						//启用按钮点击事件
						btn.isDisable = false
						that.$jj_toast('请求失败，请点击按钮重新请求')
					}, 2000)
				} else {
					setTimeout(function() {
						that.$jj_toast('网络请求成功')
						//关闭弹窗
						alert.close()
						// uni.navigateTo({
						//     url: '/pages/demo/index'
						// })
					}, 2000)
				}
				this.count += 1
			},
			showDialog() {
				this.isShowDialog = true
			},
			showPopup() {
				uni.hideTabBar()
				this.isShowPopup = true
			},
			closePopup() {
				uni.showTabBar()
				this.isShowPopup = false
			},
			showLoading(type) {

				if (type === 'default') {
					let loading = this.$jj_loading('加载中...')
					
					setTimeout(function() {
						loading.update('Update...')
					}, 2000)
					setTimeout(function() {
						loading.close()
					}, 4000)
				} else {
					const loadingData = {
						imageSize: {
							width: '32px',
							height: '32px'
						}, //设置图片的大小
						userInteractionEnabled: true, //是否启用用户交互，默认是false,启用后，遮罩层下的图层事件允许点击
						type: type //设置加载框的类型，有default、round、taichi三种
					}
					if (type === 'custom') {
						loadingData['imageUrl'] = require('../../static/loading_custom.png') //图片链接
						loadingData['background'] = '#fff' //设置弹框内容的背景色
						loadingData['width'] = '120px'
						loadingData['message'] = '自定义Loading' //自定义文本
						loadingData['messageStyle'] = {
							color: '#2A8AFF',
							'font-size': '14px'
						} //修改文本样式
						loadingData['maskColor'] = 'rgba(0, 0, 0, 0.5)' //设置遮罩层的背景色
					} else if (type === 'round') {
						loadingData['message'] = 'round...'
					} else if (type === 'taichi') {
						loadingData['message'] = 'taichi...'
					}
					let loading = this.$jj_loading(loadingData)
					setTimeout(() => {
						loading.close()
					}, 5000)
				}
			},
			showToast(type) {
				let message = '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈。。。'
				const toastData = {
					duration: -1, //不自动关闭，需要手动关闭
					radius: 3
				}
				if (type === 'custom') {
					//自定义
					toastData['message'] = message
					toastData['background'] = '#f24'
					toastData['maxWidth'] = '60%'
					toastData['messageStyle'] = {
						'color': '#fe2',
						'text-align': 'center'
					}
					toastData['padding'] = '20px'
					toastData["imageSize"] = {
						width: '60px',
						height: '60px'
					}
					toastData["imageUrl"] = require('../../static/logo.png')
					let toast = this.$jj_toast(toastData)
					setTimeout(function() {
						toast.close()
					}, 5000)

				} else if (type.length > 0) {

					//第一个参数为提示信息文本，第二个参数为提示类型，第三个参数为显示的时长
					this.$jj_toast(type, type, 1)
				} else {
					this.$jj_toast(message)
				}

			}

		}
	}
</script>



<style scoped>
	.flexColumnCenter {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.flexRow {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
	}

	.marginTopBottom {
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.marginLeftRight {
		margin-right: 10px;
		margin-left: 10px;
	}

	.btn {
		border-radius: 5px;
		background-color: #2A8AFF;
		border-color: #FFFFFF;
		color: #FFFFFF;
		padding: 0px 20px;
		height: 44px;
	}

	.image {
		height: 100%;
		width: 100%;
		background-repeat: no-repeat;
		background-size: contain;
	}
</style>
