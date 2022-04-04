type EquationItem = string

type Game = {
	equation: string,
	equationItems: Array<EquationItem>
}

const GAME_CHOICES: Array<Game> = [
	{
		equation: "O + 2H -> H2O",
		equationItems: ['O', 'H', 'H2O']
	},
	{
		equation: "Ag + Cl -> AgCl",
		equationItems: ['Ag', 'Cl', 'AgCl']
	}
]

export class ThermoGameHandler {

	gameState: Game;
	start: number;	

	constructor() {
		this.gameState = GAME_CHOICES[
			getRandomInt(0, GAME_CHOICES.length - 1)
		]
		this.start = Date.now()
	}

	get getEquationArray(): Game {
		return this.gameState
	}

	get getGameTime(): number {
		return Date.now() - this.start
	}


}

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}