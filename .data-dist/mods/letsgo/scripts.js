"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const BattleScripts = {
	inherit: 'gen7',
	init() {
		this.modData('Abilities', 'noability').isNonstandard = null;
		for (const i in this.data.Pokedex) {
			this.modData('Pokedex', i).abilities = {0: 'No Ability'};
		}
	},
	/**
	 * Given a table of base stats and a pokemon set, return the actual stats.
	 */
	spreadModify(baseStats, set) {
		const modStats = {hp: 10, atk: 10, def: 10, spa: 10, spd: 10, spe: 10};
		let statName;
		for (statName in modStats) {
			const stat = baseStats[statName];
			modStats[statName] = Math.floor((Math.floor(2 * stat + set.ivs[statName]) * set.level / 100 + 5));
		}
		if ('hp' in baseStats) {
			const stat = baseStats['hp'];
			modStats['hp'] = Math.floor(Math.floor(2 * stat + set.ivs['hp'] + 100) * set.level / 100 + 10);
		}
		return this.dex.natureModify(modStats, set);
	},

	/**
	 * @param {StatsTable} stats
	 * @param {PokemonSet} set
	 * @return {StatsTable}
	 */
	natureModify(stats, set) {
		const nature = this.dex.getNature(set.nature);
		if (nature.plus) stats[nature.plus] = Math.floor(stats[nature.plus] * 1.1);
		if (nature.minus) stats[nature.minus] = Math.floor(stats[nature.minus] * 0.9);
		set.happiness = 70;
		const friendshipValue = Math.floor((set.happiness / 255 / 10 + 1) * 100);
		let stat;
		for (stat in stats) {
			if (stat !== 'hp') {
				stats[stat] = Math.floor(stats[stat] * friendshipValue / 100);
			}
			// @ts-ignore
			stats[stat] += this.getAwakeningValues(set, stat);
		}
		return stats;
	},

	pokemon: {
		getWeight() {
			let weighthg = this.battle.runEvent('ModifyWeight', this, null, null, this.weighthg);
			if (weighthg < 1) weighthg = 1;
			const weightModifierFinal = 20 * Math.random() * 0.01;
			return weighthg + (weighthg * (this.battle.random(2) === 1 ? 1 : -1) * weightModifierFinal);
		},
	},
}; exports.BattleScripts = BattleScripts;

exports.BattleScripts = exports.BattleScripts;
