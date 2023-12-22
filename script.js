// Elements
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const homeText = document.querySelector("#text");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const xpText = document.querySelector("#xpText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealth = document.querySelector("#monsterHealth");

// Some const stats
const playerHealth = 100;
const slimeHealth = 15;
const fangedHealth = 60;
const dragonHealth = 300;

// Locations (bc you can fight monsters )
const scenarios = [
    {
        name: "town square",
        buttonText: ["Go to store", "Go to cave", "Fight the dragon"],
        buttonFunctions: [goStore, goCave, fightMonster],
        text: `You are in the town square. You see a sign that says "Store."`
    },
    {
        name: "cave",
        buttonText: ["Fight slime", "Fight fanged beast", "Go to town square"],
        buttonFunctions: [fightMonster, fightMonster, backSquare],
        text: `You enter the cave. You see some monsters.`
    },
    {
        name: "store",
        buttonText: ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        buttonFunctions: [buyHealth, buyWeapon, backSquare],
        text: `You enter the store.`
    },
    {
        name: "fight",
        buttonText: ["Attack", "Dodge", "Run"],
        buttonFunctions: [fightMonster, goCave, backSquare],
        text: `You are fighting a monster.`
    },
]

function updateScenario(scenario) {
    homeText.innerText = scenario.text;
    button1.innerText = scenario.buttonText[0];
    button2.innerText = scenario.buttonText[1];
    button3.innerText = scenario.buttonText[2];
    button1.onclick = scenario.buttonFunctions[0];
    button2.onclick = scenario.buttonFunctions[1];
    button1.onclick = scenario.buttonFunctions[2];
    console.log(scenario);

}

// Classes

class Weapon {
    constructor(buyPrice, sellPrice, attack) {
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
        this.attack = attack;
    }
}


class Player {
    constructor(xp, health, gold, inventory) {
        this.xp = xp;
        this.health = health;
        this.gold = gold;
        this.inventory = inventory;
    }

    attackMonster(monsta) {
        monsta.health -= this.inventory.attack;
    }

    gainExperience(exp) {
        this.xp += exp;
    }

    loseHealth(amount) {
        this.health -= amount;
        healthText.innerText = (Number(healthText.innerText) - amount).toString();
    }

    healHealth() {
        this.health += 10;
        healthText.innerText = (Number(healthText.innerText) + amount).toString();
    }

    getWeapon(weapon) {
        this.inventory.push(weapon);
    }

    sellWeapon() {
        this.inventory.shift();
    }

    getGold(amount) { // either from selling or killing or game
        this.gold += amount;
        goldText.innerText = (Number(goldText.innerText) + amount).toString();

    }

    loseGold(amount) { // either from buying health or weapons
        this.gold -= amount;
        healthText.innerText = (Number(healthText.innerText) - amount).toString();
    }
}

class Monster {
    constructor(xp, health, attack, gold) {
        this.xp = xp; // amount dropped
        this.health = health;
        this.attack = attack;
        this.gold = gold; // amount dropped
    }

    attackPlayer() {
        
    }

    dropGold() { // when killed
        return this.gold;
    }

    dropExp() {
        return this.xp;
    }

    loseHealth(amount) {
        this.health -= amount;
        if(this.health <= 0) {
            homeText.innerHTML = `The monster screams "Arg!" as it dies. You gain experience points and find gold. Your dagger breaks.`;
        }
    }
}

// don't do this!!!
let player = new Player(0, playerHealth, 50, ["stick"]);

function initializeButtons() {
    button1.onclick = goStore;
    button2.onclick = goCave;
    button3.onclick = fightMonster;
}

function initializePlayerStats(player) {
    xpText.innerText = player.xp;
    healthText. innerText = player.health;
    goldText.innerText = player.gold;
}
// initialize buttons
function backSquare() {
    updateScenario(scenarios[0]);
 }

function goCave() {
    updateScenario(scenarios[1]);
}

function goStore() {
    updateScenario(scenarios[2]);
}

function fightMonster() { // also use for dragon
    updateScenario(scenarios[3]);
}

function buyHealth() {
    if(player.gold >= 10) {
        homeText.innerText = "You are healed 10 health points."
        player.healHealth();
        player.loseGold(10);
    } else {
        homeText.innerText = "You do not have enough gold to buy health points."
    }
}

function buyWeapon() {
    if(player.gold >= 30) {
        player.loseGold(30);
        homeText.innerText = `You now have a ${dagger}. In your inventory you have: ${player.inventory}.`
    } else {
        homeText.innerText = `You do not have enough gold to buy a weapon.`
    }
}

function startGame() {
    initializeButtons();
    initializePlayerStats(player);
    let i = 0;
    while(player.health > 0) {
        if(i === 1) return;
        i++;
    }
    homeText.innerHTML = `You died. ☠️`;
}

startGame();