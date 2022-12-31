<template>
	<div
		class="!overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-700 relative"
	>
		<History />
		<ResultDisplay />
		<div class="divide-y dark:divide-slate-800">
			<div
				v-for="(kg, kgi) in keys"
				:key="`key-group${kgi}`"
				class="grid grid-cols-4 divide-x dark:divide-slate-800"
			>
				<KeyButton
					v-for="key in kg"
					:key="`key-${key.name}`"
					:allowed-button-keys="allowedButtonKeys"
					:key-button="key"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";

import History from "./History.vue";
import KeyButton from "./KeyButton.vue";
import ResultDisplay from "./ResultDisplay.vue";

import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/AppStore";
const appStore = useAppStore();
const { mathString, solve } = storeToRefs(appStore);

const keys = [
	[
		{ category: "modifier", label: "c", name: "clear", value: "clear" },
		{
			category: "modifier",
			label: "(  )",
			name: "bracket",
			value: "(",
		},
		{ category: "modifier", label: "%", name: "percent", value: "%" },
		{ category: "operand", label: "/", name: "divide", value: "/" },
	],

	[
		{ category: "number", label: "7", name: "7", value: "7" },
		{ category: "number", label: "8", name: "8", value: "8" },
		{ category: "number", label: "9", name: "9", value: "9" },
		{ category: "operand", label: "x", name: "multiply", value: "*" },
	],

	[
		{ category: "number", label: "4", name: "4", value: "4" },
		{ category: "number", label: "5", name: "5", value: "5" },
		{ category: "number", label: "6", name: "6", value: "6" },
		{ category: "operand", label: "-", name: "minus", value: "-" },
	],

	[
		{ category: "number", label: "1", name: "1", value: "1" },
		{ category: "number", label: "2", name: "2", value: "2" },
		{ category: "number", label: "3", name: "3", value: "3" },
		{ category: "operand", label: "+", name: "plus", value: "+" },
	],

	[
		{ category: "modifier", label: "", name: "plus-minus", value: "-+" },
		{ category: "number", label: "0", name: "0", value: "0" },
		{ category: "number", label: ".", name: "dot", value: "." },
		{ category: "operand", label: "=", name: "solve", value: "solve" },
	],
];

const allowedButtonKeys = computed(() => {
	return keys.flat().map((i) => i.value);
});

const processBackspace = (e) => {
	if (e.key === "Backspace" && !solve.value) {
		if (mathString.value !== "0" && mathString.value) {
			const y = mathString.value.toString().split("");
			y[y.length - 1] = "";
			mathString.value =
				mathString.value && mathString.value.length > 1
					? y.join("")
					: 0;
		}
	}
};

onMounted(() => {
	window.addEventListener("keydown", processBackspace);
});

onUnmounted(() => {
	window.removeEventListener("keydown", processBackspace);
});
</script>
