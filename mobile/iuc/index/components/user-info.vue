<template>
	<a href="javascript:;">
		<i class="cuIcon-profile rounded-xl bg-fade-blue2-dark color-blue2-dark font-16"></i>
		<span class="font-16">黄玺</span>
		<strong class="font-14">信息学院</strong>
		<i class="fab cu-load" :class="{ 'cuIcon-right': !isLoading, 'load-cuIcon': isLoading, 'loading': isLoading }"></i>
	</a>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				required: true
			},
			desc: {
				type: String,
				required: true
			},
			isLoading: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {}
		}
	}
</script>

<style lang="scss">
	.list-custom-large a i:first-child {
	    width: 32px;
	    height: 32px;
	    line-height: 32px;
	    margin-top: 14px;
	    text-align: center;
	    float: left;
	    margin-right: 15px;
	}

	.list-custom-large a span:not(.badge) {
	    font-size: 14px;
	    position: absolute;
	    margin-top: -14px;
	}

	.list-custom-large a strong {
	    font-size: 7px;
	    position: absolute;
	    font-size: 11px;
	    margin-top: 4px;
	    color: #adb5bd;
	    font-weight: 500;
	}

	.list-custom-large i {
		line-height: 60px;
	}
</style>
