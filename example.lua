-- Simple Text-Based RPG Game

-- Player setup
Player = {
    name = "Hero",
    hp = 100,
    attack = 10,
    defense = 5,
    level = 1,
    experience = 0,
}

-- Enemy setup
Enemy = {
    name = "Goblin",
    hp = 50,
    attack = 5,
    defense = 2,
    level = 1,
}

-- Function to display player stats
function displayStats()
    print("Player Stats:")
    print("Name: " .. Player.name)
    print("HP: " .. Player.hp)
    print("Attack: " .. Player.attack)
    print("Defense: " .. Player.defense)
    print("Level: " .. Player.level)
    print("Experience: " .. Player.experience)
end

-- Function to display enemy stats
function displayEnemyStats()
    print("Enemy Stats:")
    print("Name: " .. Enemy.name)
    print("HP: " .. Enemy.hp)
    print("Attack: " .. Enemy.attack)
    print("Defense: " .. Enemy.defense)
    print("Level: " .. Enemy.level)
end

-- Function to simulate attack
function attack(attacker, defender)
    local damage = attacker.attack - defender.defense
    if damage < 0 then damage = 0 end
    defender.hp = defender.hp - damage
    print(attacker.name .. " attacks " .. defender.name .. " for " .. damage .. " damage!")
    if defender.hp < 0 then defender.hp = 0 end
end

-- Function to check if player or enemy is defeated
function isDefeated(character)
    return character.hp <= 0
end

-- Function to simulate battle
function battle()
    print("A wild " .. Enemy.name .. " appears!")
    displayEnemyStats()

    while Player.hp > 0 and Enemy.hp > 0 do
        attack(Player, Enemy)
        if isDefeated(Enemy) then
            print("You defeated the " .. Enemy.name .. "!")
            Player.experience = Player.experience + 10
            if Player.experience >= 100 then
                Player.level = Player.level + 1
                Player.experience = 0
                print("You leveled up! You are now level " .. Player.level .. "!")
            end
            break
        end

        attack(Enemy, Player)
        if isDefeated(Player) then
            print("You were defeated by the " .. Enemy.name .. "...")
            break
        end
    end
end

-- Main game loop
function main()
    print("Welcome to the Text-Based RPG!")
    displayStats()

    while Player.hp > 0 do
        print("\nWhat would you like to do?")
        print("1. Battle an enemy")
        print("2. View stats")
        print("3. Quit game")
        local choice = io.read("*n")

        if choice == 1 then
            battle()
        elseif choice == 2 then
            displayStats()
        elseif choice == 3 then
            print("Thank you for playing!")
            break
        else
            print("Invalid choice, please try again.")
        end

        if Player.hp <= 0 then
            print("Game Over!")
            break
        end
    end
end

-- Start the game
main()
