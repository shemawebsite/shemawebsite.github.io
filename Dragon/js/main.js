const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return{
            warriorHealth: 100,
            dragonHealth: 100,
            numofSpecialAttack: 3,
            numofHeal: 3,
            winner: null,
            battleLogMessages : [],
            swordSlash: new Audio ('../sounds/sword_slash.mp3'),
            dragonBreath: new Audio ('..sounds/dragon_breath.mp3'),
            healthEffect: new Audio ('../sounds/heal_effect.mp3'),
            speacialAttackEffect: new Audio ('..sounds/specialAttack.mp'),
        }
    },
    watch: {
        warriorHealth(value){
            if (value <= 0 && this.dragonHealth <= 0) {
                // Fair
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'dragon'
            }
        },
        dragonHealth(value){
            if (value <= 0 && this.warriorHealth <= 0) {
                // Fair
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'warrior'
            }
        },

    },
    computed: {
        warriorHealthBar() {
            if (this.warriorHealth < 0) {
                return {width: '0%'};
            } else {
                if (this.warriorHealth <= 50) {
                    return{ width: this.warriorHealth + '%', background: 'red'};
                }else{
                    return { width: this.warriorHealth + '%'};
                }
            }
        },
        dragonHealthBar() {
            if (this.dragonHealth < 0) {
                return {width: '0%'};
            } else {
                if (this.dragonHealth <= 50) {
                    return{ width: this.dragonHealth + '%', background: 'red'};
                }else{
                    return { width: this.dragonHealth + '%'};
                }
            }
        }
    },

    methods: {
        startFight() {
            this.warriorHealth = 100;
            this.dragonHealth = 100;
            numofSpecialAttack = 3;
            numofHeal = 3;
            this.winner = null;
            this.battleLogMessages = [];
        },
        
        attackDragon() {
            const attackDamage = getRandomValue(6, 15);
            // check if the dragon's health bar is greater than zero
            if (this.dragonHealth - attackDamage < 0) {
                this.dragonHealth = 0;
            } else {
                this.dragonHealth -= attackDamage;
            }
            this.swordSlash.play();
            this.addBattleLog('warrior', 'attack', attackDamage);
            this.attackWarrior();
        },

        attackWarrior() {
            const attackDamage = getRandomValue(8, 20);
            // check if the warrior's health bar is greater than zero
            if (this.warriorHealth - attackDamage < 0) {
                this.warriorHealth = 0;
            } else {
                this.warriorHealth -= attackDamage;
            }

            setTimeout(() => {
                this.dragonBreath.play();
                setTimeout(() =>{
                    this.dragonBreath.pause();
                }, 2000)
            }, 0);

            this.addBattleLog('dragon', 'attack', attackDamage);
        },

        speacialAttack() {
            this.numofSpecialAttack --;
            const attackDamage = getRandomValue(10, 25);
            if (this.dragonHealth - attackDamage < 0) {
                this.dragonHealth = 0;
            } else {
                this.speacialAttackEffect.play();
                this.dragonHealth -= attackDamage;
            }
            this.addBattleLog('warrior', 'special-attack', attackDamage);
            this.attackWarrior();
        },
        heal() {
            this.numofHeal --;
            const healValue = getRandomValue(10, 25);
            if (this.warriorHealth - attackDamage < 0) {
                this.warriorHealth = 100;
            } else {
                this.warriorHealth += healValue;
            }
            this.healthEffect.play();
            this.addBattleLog('warrior', 'heal', healValue);
        },
        forfeit() {
            this.winner = 'dragon';
        },
        addBattleLog(who, what, value){
            this.battleLogMessages.unshift({
                attacker : who,
                actionType : what,
                actionValue: value,
            });
        }
    }
})    

app.mount('#game')