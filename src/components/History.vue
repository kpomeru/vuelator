<template>
	<div
		ref="target"
		:class="[
			'absolute inset-x-0 z-10 p-4 pb-6 flex flex-col space-y-4',
			{
				' backdrop-blur-[2px] bg-white/90 dark:bg-black/80 max-h-[67%]':
					history,
			},
		]"
	>
		<span
			:class="[
				'shrink-0 leading-none px-2 h-6 inline-flex items-center justify-center rounded text-xs cursor-pointer self-start',
				history
					? 'bg-violet-200 text-violet-700 dark:bg-violet-500 dark:text-white'
					: 'bg-slate-200 dark:bg-slate-700',
				{ ' opacity-30 pointer-events-none': !currentHistory.length },
			]"
			@click="toggleViewHistory"
		>
			<span>History</span>
		</span>
		<div
			v-if="history"
			class="divide-y dark:divide-white/20 h-full overflow-y-scroll px-4"
		>
			<div
				v-for="(item, index) in currentHistory"
				:key="`history-item-${index}`"
				:class="[
					'py-4 flex flex-col items-end cursor-pointer',
					{ 'pt-0': !index },
				]"
				@click="setHistory(item.eq)"
			>
				<span class="text-lg">
					{{ item.eq }}
				</span>
				<span class="text-2xl font-medium text-lime-500">
					={{ item.r }}
				</span>
			</div>
			<div class="pt-4 flex justify-end">
				<span
					:class="[
						'leading-none px-2 h-6 inline-flex items-center justify-center rounded text-xs cursor-pointer bg-slate-700 text-white dark:bg-slate-200 dark:text-slate-700',
					]"
					@click="clearHistory"
				>
					<span>Clear</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useAppStore } from "../stores/AppStore";
const appStore = useAppStore();
const { history, mathString, solve } = storeToRefs(appStore);

const target = ref(null);
onClickOutside(target, () => (history.value = false));

const currentHistory = ref([]);

const toggleViewHistory = () => {
	if (currentHistory.value.length) {
		history.value = !history.value;
	}
};

const clearHistory = (eq) => {
	history.value = false;
	currentHistory.value = [];
	localStorage.removeItem("vuelatorHistory");
};

const setHistory = (eq) => {
	mathString.value = eq;
	solve.value = true;
	history.value = false;
};

watch(
	() => solve.value,
	(v) => {
		const lastHistory =
			currentHistory.value[currentHistory.value.length - 1];
		const lastEq = (lastHistory && lastHistory.eq) || "";
		if (v && appStore.result !== false && lastEq !== mathString.value) {
			currentHistory.value.push({
				eq: mathString.value,
				r: appStore.result,
			});
			localStorage.setItem(
				"vuelatorHistory",
				JSON.stringify(currentHistory.value)
			);
		}
	}
);

onMounted(() => {
	const ch = JSON.parse(localStorage.getItem("vuelatorHistory"));
	if (ch) {
		currentHistory.value = ch;
	}
});
</script>
