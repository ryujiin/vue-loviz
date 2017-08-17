<template lang="pug">
.container
	.columns.is-6.is-offset-4
		.column
			.notification.is-danger.has-text-centered
				slot(name="cuerpo") Algo salio mal
</template>

<style lang="scss" scoped>
.notification{
	margin: 10px;
}
</style>
