<template>
	<div
		class="h-screen flex flex-col justify-between ddivide-y dark:divide-slate-700 space-y-6"
	>
		<Header class="shrink-0" />
		<div class="h-full">
			<Calculator />
		</div>
		<Footer class="shrink-0" />
	</div>
</template>

<script setup>
import Calculator from "./components/Calculator.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
</script>

<style scoped></style>
