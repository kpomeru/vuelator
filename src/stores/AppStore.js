import { evaluate, round } from "mathjs"
import { defineStore } from "pinia";

export const useAppStore = defineStore("app-store", {
	state: () => {
		return {
			mathString: 0,
			solve: false,
		};
	},

	getters: {
		result() {
			return this.solve ? (evaluate(this.mathString)) : false;
		},
	},
});
