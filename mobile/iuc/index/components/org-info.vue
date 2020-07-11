<template>
	<view class="card card-style">
		<view class="content">
			<view class="d-flex">
				<view class="icon-size">
					<text class="cuIcon-album color-green1-dark fab fa-4x"></text>
				</view>
				<view>
					<view class="h1 mb-0 font-600 font-22" style="padding-left: 1em;">{{model.Name}}</view>
					<text class="pl-2 opacity-30 font-14">
						<text class="fa cuIcon-calendar pl-2"></text>{{model.date}}
					</text>
					<text class="pl-2 opacity-30 font-14">
						<text class="fa cuIcon-apps pl-2"></text>{{model.college}}
					</text>
				</view>
			</view>
			<p class="p pt-3 font-14">
				{{model.abstract}}
			</p>
			<a class="btn bg-green1-dark btn-m btn-full font-900 rounded-sm shadow-l font-14">{{btnText}}</a>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			model: {
				type: Object,
				default: () => {
					return {
						Name: "我的社团",
						date: "2020年7月10日",
						college: "信息学院",
						"abstract": "这是一个测试学院"
					}
				}
			},
			btnText: {
				type: String,
				default: "申请加入"
			}
		},
		data () {
			return{

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">

</style>
