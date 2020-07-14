<template>
    <div class="card card-style" style="margin-top: 10px">
        <div class="content">
			<h5 class="float-left font-20 font-600">一个活动的名称</h5>
			<div class="clearfix"></div>
			<div class="divider mt-2 mb-2"></div>
			<div class="actions">
				<div class="act-btn">
					<span class="icon">5</span>
					<span  class="font-16">待审核</span>
				</div>
				<div class="act-btn">
					<span class="icon">20</span>
					<span class="font-16">已报名</span>
				</div>
			</div>
			<div class="divider mt-2 mb-0"></div>
			<div class="list-group list-custom-large mr-2">
				<user-info title="黄玺" desc="信息学院" :isLoading="true"></user-info>
				<user-info title="黄玺" desc="信息学院" @click.native="confirm(1, '黄玺')" :isLoading="false"></user-info>
			</div>
		</div>
    </div>
</template>

<script>
import userInfo from './user-info.vue'
export default {
	components: { userInfo },
    methods: {
        confirm (id, name) {
			confirm(`是否允许${name}参加活动？`)
		}
    },
    props: {
    },
    computed: {
    },
    data () {
        let data = {
        };
        return data;
    },
    mounted () {
    }
}
</script>

<style lang="scss">
	.act-btn .icon:hover {
		color: #6c6c6c;
	}
</style>
