<template>
	<div id="role">
		<topBar name="迷你德国指数交易规则"></topBar>
		<back></back>
		<div class="page_cont">
			<h3>操盘流程：</h3>
			<div class="list">
				<table>
					<tr>
						<td>交易品种</td>
						<td>迷你德国指数</td>				
					</tr>
					<tr>
						<td>币种单位</td>
						<td>欧元</td>				
					</tr>
					<tr>
						<td>交易单位</td>
						<td>1个指数点</td>				
					</tr>
					<tr>
						<td>最小波动</td>
						<td>5欧元/1点</td>				
					</tr>
					<tr>
						<td>波动盈亏</td>
						<td>波动一次=5欧元</td>				
					</tr>
					<tr>
						<td>交易时间</td>
						<td>买入时间：夜间14:00:00 – 次日04:00:00，卖出时间：夜间14:00:00 – 次日03:50:00</td>				
					</tr>
					<tr>
						<td>清仓时间</td>
						<td>次日 03:50:00</td>				
					</tr>
					<tr>
						<td>交易综合费</td>
						<td>69/手</td>				
					</tr>
				</table>
			</div>
			<p>欧洲期货期权交易所德国迷你指数期货，最小波动5欧元，可买涨买跌。</p>
			<h3>什么是买涨？</h3>
			<p>当您买涨时，价格涨了你就赚钱，跌了亏钱。</p>
			<h3>什么是买跌？</h3>
			<p>当您买跌时，价格跌了你就赚钱，涨了亏钱。</p>
			<h3>什么是止盈单？</h3>
			<p>当单笔交易盈利金额大于等于设定的止盈金额时，该笔交易会被按市价自动强制平仓。由于市场价格在实时变动，不保证最终盈利金额与止盈金额一致，有可能小于设置的止盈金额。</p>
			<h3>什么是止损单？</h3>
			<p>当单笔交易亏损金额大于等于指定的止损金额时，该笔交易会被按市价自动强制平仓。由于市场价格的实时变动，不保证最终亏损金额与止损金额一致，有可能大于设置的止损金额。</p>
			<h3>什么是时间条件单</h3>
			<p>即预先设置某一价位（开仓或平仓），一旦触及该价格，系统自动提交您的委托，从而实现自动委托。保存于客户设备本地，当行情满足客户设定的条件，软件自动触发委托。注意：关机或者退出软件会导致条件单失效。</p>
			<h3>什么是价格条件单？</h3>
			<p>即预先设置某一价位（开仓或平仓），一旦触及该价格，系统自动提交您的委托，从而实现自动委托。保存于客户设备本地，当行情满足客户设定的条件，软件自动触发委托。注意：关机或者退出软件会导致条件单失效。</p>
			<h3>什么是持仓时间？</h3>
			<p>迷你德国指数最后持仓时间：03:50:00；当持仓时间到点后，持仓中的交易会被强制平仓，不保证成交价格，请务必在到期前自己选择卖出。</p>
			<h3>什么是强平线？</h3>
			<p>平台会根据交易所提提供的结果每天对您的盈亏状况进行结算，当您的账户余额达到设置的强平线时，系统将会把账户中的持仓合约强平掉，撤销掉所有挂单合约，并冻结账户。所以您在交易时，要时刻注意自己的资金状况。</p>
			<h3>什么是风险度？</h3>
			<p>风险度越高标志着您距离被强平的越近，所以您在交易时，要时刻注意自己的资金状况。所以当保证金不能在规定时间内补足，期货价格波动较大的话，您可能面临强行平仓风险。</p>
			<h3>涨跌幅限制</h3>
			<p>T+1时段的可委托价格区间为期货合约在T时段最后成交价的5%。</p>
			<h3>交易综合费</h3>
			<p>迷你德国指数买手交易综合费：69元（买进卖出只收取一次）</p>
			<h3>履约保证金</h3>
			<p>履约保证金为您委托平台冻结用于履行交易亏损赔付义务的保证金。以冻结的履约保证金作为承担交易亏损赔付，但交易亏损可能超出保证金金额，超出部分的亏损全部由您承担，平台不承担交易亏损。合作交易结束后，根据清结算结果，如交易盈利，您冻结的履约保证金全额退还。如交易亏损，从冻结的履约保证金中，扣减您所应承担的亏损赔付额，扣减后余额退还。如亏损超出保证金，则直接在您账户余额中扣除。</p>
			<h3>盈利如何分配？</h3>
			<p>盈利100%归用户所有，平台不参与盈利分成。若用户亏损超出保证金，平台也不承担超出部分的亏损金额。</p>
			<h3>实盘交易下单</h3>
			<p>您的所有迷你德国指数交易，全部经由平台的期货交易账户，下单到欧洲期货期权交易所。</p>
		</div>
	</div>
</template>

<script>
	import topBar from '../../components/topBar.vue'
	import back from '../../components/back.vue'
	export default{
		name: 'role',
		components: {topBar, back},
		activated: function(){
			//不更新画图
			this.$store.state.isshow.isklineshow = false;
			this.$store.state.isshow.isfensshow = false;
			this.$store.state.isshow.islightshow =  false;
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
     .page_cont{
    	margin-top: 1.01rem;
		h3{
			height: 0.6rem;
			line-height: 0.6rem;
			border-bottom: 0.01rem solid $bgDeep;
			padding: 0 0.3rem;
			color: $yellow;
			font-size: $fs28;
		}
		p{
			line-height: 0.4rem;
			padding: 0.1rem 0.3rem;
			border-bottom: 0.01rem solid $bgDeep;
		}
		.list{
			width: 7.5rem;
			overflow-x: scroll;
			padding: 0 0.3rem;
			table{
				width: 6.9rem;
				td{
					text-align: left;
					line-height: 0.36rem;
					padding: 0.1rem;
					border: 0.01rem solid $bgDeep;
					&:nth-child(1){
						width: 1rem;
					}
					&:nth-child(2){
						width: 3rem;
					}
				}
			}
		}
	}
</style>