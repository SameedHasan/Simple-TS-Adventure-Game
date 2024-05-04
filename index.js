#!/usr/bin/env node
import inquirer from "inquirer";
const enemies = ["Zombie", "Skeleton", "Warrior", "Assassin"];
const maxEnemyHealth = 75;
const enemeyAttackDamage = 25;
let health = 100;
const attackDamage = 50;
let numHealthPotions = 3;
const healthPotionHealAmount = 30;
const healthPotionDropChance = 50;
let running = true;
// Generate a random integer between 0 and 9 (inclusive)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
console.log("Welcome to the Dungeon!");
while (running) {
    console.log("-----------------------------------");
    let enemyHealth = getRandomInt(maxEnemyHealth);
    let enemy = enemies[getRandomInt(enemies.length)];
    console.log(`# ${enemy} has appeared! #\n`);
    while (enemyHealth > 0) {
        console.log(`Your HP: ${health}`);
        console.log(`${enemy}'s HP: ${enemyHealth}\n`);
        const answer = await inquirer.prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                {
                    name: `1. Attack`,
                    value: 1,
                },
                {
                    name: `2. Drink health potion`,
                    value: 2,
                },
                {
                    name: `3. Run!`,
                    value: 3,
                },
            ],
        });
        if (answer.action === 1) {
            const damageDealt = getRandomInt(attackDamage);
            const damageTaken = getRandomInt(enemeyAttackDamage);
            enemyHealth -= damageDealt;
            health -= damageTaken;
            console.log(`\nYou strike the ${enemy} for ${damageDealt} damage.`);
            console.log(`You receive ${damageTaken} in retaliation!.`);
            if (health < 1) {
                console.log("You have taken too much damage, you are too weak to go on!");
                break;
            }
        }
        else if (answer.action === 2) {
            if (numHealthPotions > 0) {
                health += healthPotionHealAmount;
                numHealthPotions--;
                console.log(`\nYou drink a health potion, healing yourself for ${healthPotionHealAmount} \n You now have ${health} HP. \n You have ${numHealthPotions} health potions left. `);
            }
            else {
                console.log("\nYou have no health potions left! Defeat enemies for a chance to get one! ");
            }
        }
        else {
            console.log(`\nYou run away from the ${enemy}!`);
            continue;
        }
    }
    if (health < 1) {
        console.log("\nYou limp out of the dungeon, weak for battle.");
        break;
    }
    console.log("\n-----------------------------------");
    console.log(`# ${enemy} was defeated! #`);
    console.log(`# You have ${health} HP left #`);
    if (getRandomInt(100) < healthPotionDropChance) {
        numHealthPotions++;
        console.log(`# The ${enemy} dropped a health potion! #`);
        console.log(`# You now have ${numHealthPotions} health potion(s). #`);
    }
    console.log("-----------------------------------\n");
    const answer = await inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do now?",
        choices: [
            {
                name: `1. Continue fighting`,
                value: 1,
            },
            {
                name: `2. Exit Dungeon`,
                value: 2,
            },
        ],
    });
    if (answer.action === 1) {
        console.log("You continue on your adventure!");
    }
    else {
        console.log("You exit the dungeon, successful from your adventures!");
        break;
    }
}
console.log("\n#######################");
console.log("# THANKS FOR PLAYING! #");
console.log("#######################");
