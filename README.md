# LotRO DPS Simulator Roadmap

This document outlines the roadmap for developing a comprehensive damage calculator and DPS simulator for Lord of the Rings Online (LotRO). The roadmap is broken down into phases and prioritized. This is a free to use project, please reach out if you want to collaborate @galiplays on Discord. I am utilizing the project to practice Git, Python, and eventually some ML/modeling.

Thank you to the below users for the base data for the sim:

https://github.com/LotroCompanion
https://github.com/Giseldah

---

## Phase 1: Foundation
Initial phase focuses on the basic structure and functionality of the damage calculator.

1. **Talent Calculator**  
   - **Frontend**:  
     - Create a dropdown for class selection.
     - Create a dynamic input system for selecting talent points (level-based).
     - Display talent trees or individual talent options.
   - **Backend**:  
     - Define data models for each class and their talent trees.
     - Store talent data with associated stats or abilities.
     - Ensure dynamic linking of class selection to talent trees.

2. **Spell Availability**  
   - **Frontend**:  
     - Display a list of spells available based on selected spec and talent choices.
     - Show unavailable spells with an indication that they will unlock at higher levels.
   - **Backend**:  
     - Define spell data with prerequisites based on class and spec.
     - Implement logic to dynamically update the list of available spells based on talent selection.

3. **Racial Traits**  
   - **Frontend**:  
     - Create a dropdown for race selection.
     - Display racial bonuses associated with the selected race.
     - Create a tab for racial trait slotting/selection.
   - **Backend**:  
     - Define racial trait data with associated stat bonuses.
     - Implement logic to retrieve the correct racial bonuses and traits when a user selects a race.

4. **Virtue Traits**  
   - **Frontend**:  
     - Allow users to input virtue levels.
     - Display the virtues and allow selection for up to 5 slotted virtues.
     - Display active and passive stat bonuses for the selected virtues.
   - **Backend**:  
     - Define data models for each virtue and their associated bonuses.
     - Implement logic to calculate active and passive bonuses based on user input for virtue levels and selected virtues.

---

## Phase 2: Advanced Character Customization
This phase includes deeper customization options and builds upon the foundation.

5. **Gear Builder**  
   - **Frontend**:  
     - Create a system for users to select gear items (weapon, armor, accessories).
     - Display stat bonuses provided by each piece of gear.
     - Implement gear set effects (e.g., set bonus when 3 pieces of a specific set are selected).
   - **Backend**:  
     - Define gear data with stat bonuses and set effects.
     - Implement logic to calculate bonuses from selected gear and set effects.
     - Link gear data to user profiles for tracking.

6. **Legendary Items/Traceries**  
   - **Frontend**:  
     - Create input fields to customize legendary items and traceries.
     - Allow users to select traceries and apply them to their gear.
   - **Backend**:  
     - Define data models for legendary items and traceries.
     - Implement logic to calculate bonuses from traceries and legendary item upgrades.

7. **Consumables and Buffs**  
   - **Frontend**:  
     - Create a list of consumables and buffs (e.g., food, potions, temporary boosts).
     - Allow users to select which buffs or consumables they have active as well as a set suite to apply.
   - **Backend**:  
     - Define consumable and buff data with their effects on stats or DPS.
     - Implement logic to apply buffs and consumables to the character's stats.

---

## Phase 3: Calculation and Simulation 
This phase focuses on developing the calculations required for DPS simulation and stat modeling.

8. **Ratings Calculator**  
   - **Frontend**:  
     - Display an input form for the user to input their stats and traits (based on talents, race, virtues, gear).
     - Calculate the relevant rating based on user input.
   - **Backend**:  
     - Implement formulas for calculating various ratings (e.g., critical hit, damage mitigation).
     - Integrate data from all previous phases (talents, gear, etc.) for final calculations.

9. **Game/Character Data Input**  
   - **Frontend**:  
     - Provide a form for users to input game character data (via addon or from Lotro Companion).
     - Allow importing data directly from supported tools.
   - **Backend**:  
     - Define data importers for external character data (e.g., from Lotro Companion API).
     - Map imported data to the internal data models for stats and gear.

10. **Max DPS Rotation Calculator**  
   - **Frontend**:  
     - Create an interactive tool to simulate max DPS rotation based on user input (talents, gear, buffs).
     - Allow for custom input or preset rotation sequences.
   - **Backend**:  
     - Implement logic to calculate DPS based on class, gear, buffs, and rotation.
     - Use data from previous steps (e.g., talents, gear, race) to influence DPS calculation.

---

## Phase 4: Visualization and Advanced Features
This phase focuses on providing visual outputs and more detailed calculations for users.

11. **DPS Simulation Outputs**  
   - **Frontend**:  
     - Display graphs and charts of DPS simulations over time.
     - Show DPS curves for different gear sets and traits.
   - **Backend**:  
     - Implement DPS calculation algorithms for simulation.
     - Generate output data in formats compatible with frontend visualization tools.

12. **Mitigation Data for Tanks**  
   - **Frontend**:  
     - Allow tanks to input stats and gear for mitigation calculations.
     - Display the tank’s damage reduction and mitigation capabilities based on gear and stats.
   - **Backend**:  
     - Implement formulas for calculating mitigation based on gear, traits, and stats.
     - Retrieve and apply data to generate mitigation outputs for tanks.

13. **Healing Output Calculator**  
   - **Frontend**:  
     - Create an input form for healers to input their healing abilities, gear, and stats.
     - Simulate healing output based on their inputs.
   - **Backend**:  
     - Implement logic for healing output calculation (e.g., healing per second based on gear, stats, and abilities).
     - Retrieve and apply relevant data for healing class simulations.

---

## Future Phases: Expansion and Optimization 
In this phase, additional features and optimizations will be introduced.

14. **User Profiles and Progress Tracking**  
   - Allow users to save their builds, track progression, and compare DPS outputs.
15. **Integration with LotRO API**  
   - Pull real-time data from the LotRO game API for up-to-date character information.
