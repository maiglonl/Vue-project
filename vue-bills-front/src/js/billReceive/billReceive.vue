<template>
	<div>
		<div class="section">
			<div class="container">
				<h4>{{ title }}</h4>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				title: "Contas a Receber",
			};
		}
	};
</script>