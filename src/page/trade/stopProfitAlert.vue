<template>
	<div id="stopMoneyAlert" v-if="show">
		<div class="bg"></div>
		<div class="main">
			<div class="title">
				<ul>
					<template v-for="(v, index) in tabList">
						<li><span>{{v}}</span></li>
					</template>
				</ul>
			</div>
			<div class="row">
				<span>合约</span>
				<em class="name">{{commodityName}}</em>
				<span>{{commodityType}}</span>
				<span class="percent pl">最新：<em>{{lastPrice}}</em></span>
			</div>
			<div class="row">
				<span>止盈价</span>
				<input type="text" v-model="profitPrice" />
				<span class="percent">{{percentProfit}}%</span>
			</div>
			<div class="row">
				<span>手数</span>
				<input type="text" v-model="num" />
				<span class="percent price">止损委托价：<em>市价</em></span>
			</div>
			<div class="btn_box">
				<span @click="confirmEvent">确认</span>
				<span @click="cancelEvent">取消</span>
			</div>
		</div>
		<selectBox ref="selectBox" :obj="obj" :type="type"></selectBox>
	</div>
</template>

<script>
	import selectBox from "../../components/selectBox.vue"
	import { Toast, MessageBox } from 'mint-ui';
	export default{
		name: "stopMoneyAlert",
		components: {selectBox},
		data(){
			return{
				show: false,
				tabList: ['修改止盈单'],
				currentNum: 0,
				obj: ['止损价','动态价'],
				type: 'price',
				commodityName: '',
				commodityNo: '',
				commodityType: '',
				holdAvgPrice: '',
				lastPrice: '',
				profitPrice: '',
				num: '',
				percentProfit: '0.00',
			}
		},
		computed: {
			parameters(){
				return this.$store.state.market.Parameters;
			},
			orderTemplist(){
				return	this.$store.state.market.orderTemplist;
			},
			tradeSocket() {
				return this.$store.state.tradeSocket;
			},
			dosize(){
				return this.orderTemplist[this.commodityNo].DotSize;
			},
			miniTikeSize(){
				return this.orderTemplist[this.commodityNo].MiniTikeSize;
			},
		},
		watch: {
			parameters: function(n, o){
				if(this.commodityNo != undefined && this.commodityNo != ''){
					n.forEach(function(o, i){
						if(this.commodityNo == o.CommodityNo){
							this.lastPrice = this.orderTemplist[this.commodityNo].LastQuotation.LastPrice;
							this.lastPrice = parseFloat(this.lastPrice).toFixed(this.dosize);
						}
					}.bind(this));
				}
			},
			profitPrice: function(n, o){
				if(n != undefined){
					this.percentProfit = parseFloat((n - this.holdAvgPrice)/this.holdAvgPrice*100).toFixed(2);
				}
			}
		},
		methods: {
			openSelectType: function(){
				$(".select_cont").css({bottom: -3.55 + 'rem'});
				this.$refs.selectBox.shadeShow = true;
			},
			confirmEvent: function(){
				//公式（判断输入价格是否符合最小变动价）
//				var a = 46.41;
//				var b = 0.01;
//				var c = a/b;
//				var d = a%b;
//				if (d < 0.000000001 || b-d < 0.0000000001){
//					alert("yes");
//				}
				let a0, b0, d0, confirmText;
				if(!(this.profitPrice == '' || this.profitPrice == 0 || this.profitPrice == undefined)){
					 a0 = this.profitPrice;
					 b0 = this.miniTikeSize;
					 d0 = a0%b0;
				}
				if(this.profitPrice == '' || this.profitPrice <= 0 || this.profitPrice == undefined){
					Toast({message: '请输入止盈价', position: 'bottom', duration: 1000});
				}else if(this.num == '' || this.num <= 0 || this.num == undefined){
					Toast({message: '请输入止盈手数', position: 'bottom', duration: 1000});
				}else if(d0 >= 0.000000001 && parseFloat(b0-d0) >= 0.0000000001){
					Toast({message: '输入价格不符合最小变动价，最小变动价为：' + b0, position: 'bottom', duration: 1000});
				}else{
					if(this.commodityType == '多'){
						if(parseFloat(this.profitPrice) <= parseFloat(this.lastPrice)){	
							Toast({message: '输入价格应该高于最新价', position: 'bottom', duration: 1000});return;
						}
					}
					if(this.commodityType == '空'){
						if(parseFloat(this.profitPrice) >= parseFloat(this.lastPrice)){	
							Toast({message: '输入价格应该低于最新价', position: 'bottom', duration: 1000});return;
						}
					}
					confirmText = '是否添加限价止盈？';
					let b = {
						"Method":'ModifyStopLoss',
						"Parameters":{
							'StopLossNo': this.$parent.currentId,
							'ModifyFlag': 0,
							'Num': parseInt(this.num),
							'StopLossType': 1,
							'OrderType': 1,
							'StopLossPrice': parseFloat(this.profitPrice),
							'StopLossDiff': 0
						}
					};
					MessageBox.confirm(confirmText,"提示").then(action=>{
						this.tradeSocket.send(JSON.stringify(b));
						this.$parent.currentId = '';
						this.$parent.selectedNum = -1;
						this.show = false;
						$('.list li').css({'height': 'auto'});
						this.$parent.toolShow = false;
					}).catch(err=>{});
				}
			},
			cancelEvent: function(){
				this.show = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.main{
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 100;
		margin: -2.27rem 0 0 -3rem;
		width: 6rem;
		height: 4.54rem;
		overflow: hidden;
		border-radius: 0.1rem;
		background: $bg;
		.title{
			display: flex;
			justify-content: center;
			width: 6rem;
			height: 0.88rem;
			line-height: 0.88rem;
			font-size: $fs28;
			border-bottom: 0.01rem solid $black;
			li{
				float: left;
				width: 3rem;
				text-align: center;
				span{
					display: inline-block;
					line-height: 0.8rem;
				}
				&.current{
					span{
						border-bottom: 0.04rem solid $blue;
						color: $blue;
					}
				}
			}
		}
		.row{
			width: 6rem;
			height: 0.88rem;
			overflow: hidden;
			border-bottom: 0.01rem solid $black;
			span{
				float: left;
				display: inline-block;
				width: 1rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				border-right: 0.01rem solid $black;
				&.percent{
					width: auto;
					border: 0;
				}
				&.pl{
					padding-left: 0.1rem;
				}
				&.price{
					padding-left: 0.25rem;
					border-left: 0.01rem solid $black;
				}
				em{
					color: $white;
				}
			}
			.name{
				float: left;
				display: inline-block;
				width: 2rem;
				height: 0.88rem;
				line-height: 0.88rem;
				text-align: center;
				border-right: 0.01rem solid $black;
			}
			input{
				float: left;
				display: inline-block;
				width: 1.8rem;
				height: 0.64rem;
				line-height: 0.64rem;
				background: #1b1f26;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				margin: 0.12rem 0.1rem;
				color: $white;
				text-align: center;
				&.spe{
					margin: 0.12rem 0.1rem 0.12rem 0;
				}
			}
			.order{
				width: 1.8rem;
				height: 0.64rem;
				line-height: 0.64rem;
				background: #1b1f26;
				border: 0.01rem solid $black;
				border-radius: 0.1rem;
				margin: 0.12rem 0.1rem;
				color: $white;
				text-align: center;
				position: relative;
				b{
					font-weight: normal;
				}
				.icon_triangle{
					width: 0.1rem;
					height: 0.1rem;
					background: url(../../assets/images/account/subscript_01.png) no-repeat center center;
					background-size: 100% 100%;
					position: absolute;
					bottom: 0.1rem;
					right: 0.1rem;
				}
			}
		}
		.btn_box{
			display: flex;
			justify-content: center;
			width: 6rem;
			height: 0.92rem;
			line-height: 0.92rem;
			border-top: 0.15rem solid #1b1f26;
			span{
				width: 50%;
				text-align: center;
			}
		}
	}
</style>