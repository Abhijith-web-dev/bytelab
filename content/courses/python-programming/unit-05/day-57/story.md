# The Tale of the Fleet Guilds and the Sorting of the Astral Starstones

Upon docking at the Great Citadel of Kepler, Sky-Captain Danielle and young cartographer Leo were summoned before the Council of Archons.

In the cavernous hall lay chests brimming with glowing astral starstones brought back from deep space. Navigators from three competing astral guilds—**Vanguard**, **Aetheria**, and **Helios**—crowded the gallery, eager to know which guild had harvested the most potent celestial mana.

"Look at this chaotic heap!" Danielle said, pointing to a sprawling ledger of hundreds of raw crystal logs. "Every stone has a navigator name, an assigned guild, a base resonance, and an purity rating. But we cannot compare guilds if all the entries are scrambled together like fallen autumn leaves!"

Leo stepped forward, opening the brass-bound celestial console. "Captain, to bring order to this council, we do not need to sift through every stone by hand. We will invoke the ancient trifecta of Pandas: **Split-Apply-Combine**, **Alchemical Transformation**, and **Absolute Ranking**!"

```python
import pandas as pd

# The raw Starstone harvest ledger
starstones = pd.DataFrame({
    "Navigator": ["Arun", "Priya", "Rahul", "Meena", "Kiran", "Divya"],
    "Guild": ["Vanguard", "Aetheria", "Vanguard", "Aetheria", "Helios", "Helios"],
    "Resonance": [50000.0, 45000.0, 60000.0, 48000.0, 52000.0, 58000.0]
})
```

### The Split-Apply-Combine Ritual: groupby()

"How does the Council evaluate the guilds?" Danielle asked. "They demand the average crystal resonance for each guild!"

Leo inscribed the `groupby()` glyph:
```python
guild_averages = starstones.groupby("Guild")["Resonance"].mean()
print(guild_averages)
```

The projection chamber chimed as three glowing banners crystallized above the council dais:
```text
Guild
Aetheria    46500.0
Helios      55000.0
Vanguard    55000.0
Name: Resonance, dtype: float64
```

"Witness the three phases!" Leo explained to the astonished archons.
1. **Split:** Pandas separated the ledger into three discrete guild buckets.
2. **Apply:** It computed the arithmetic mean within each bucket independently.
3. **Combine:** It stitched the resulting numbers into a unified, harmonious summary!

"Helios and Vanguard are locked in an exact tie at 55,000 lumens!" Danielle marveled.

### The Alchemical Purification: apply() and Lambda

"Hold!" declared the Chief Alchemist. "Raw resonance is unrefined! When bathed in the Citadel's solar crucible, every starstone amplifies its power by an additional 10% refinement surge!"

Danielle turned to Leo. "Can our matrix apply this alchemical law to every individual navigator?"

"Instantly," Leo replied, drawing the `.apply()` sigil:
```python
# Apply the 10% solar amplification to each resonance value
starstones["Bonus"] = starstones["Resonance"].apply(lambda r: r * 0.10)
starstones["TotalMana"] = starstones["Resonance"] + starstones["Bonus"]
```

Each crystal coordinate glowed with newly unlocked luminescence:
- Rahul's 60,000 resonance surged with 6,000 bonus mana $\to$ 66,000 total.
- Divya's 58,000 resonance surged with 5,800 bonus mana $\to$ 63,800 total.

### The Hall of Champions: sort_values()

"Now, the final decree!" Captain Danielle announced. "Who shall receive the Golden Astrolabe? We must rank the navigators from the greatest total mana down to the lowest!"

Leo called forth the sorting command:
```python
# Rank navigators by TotalMana in descending order
leaderboard = starstones.sort_values(by="TotalMana", ascending=False).reset_index(drop=True)
print(leaderboard[["Navigator", "Guild", "TotalMana"]])
```

The holographic leaderboard descended smoothly from the vaulted ceiling:
```text
  Navigator     Guild  TotalMana
0     Rahul  Vanguard    66000.0
1     Divya    Helios    63800.0
2     Kiran    Helios    57200.0
3      Arun  Vanguard    55000.0
4     Meena  Aetheria    52800.0
5     Priya  Aetheria    49500.0
```

The Archon of the Citadel stood and struck his staff upon the marble floor. "By the authority of the Council: Rahul of the Vanguard is crowned Grand Champion! And the total fleet harvest stands at an unprecedented 344,300 lumens!"

Danielle placed a proud hand on Leo's shoulder as cheers echoed through the Citadel.

"Raw data is merely noise," Danielle whispered. "But with `groupby()`, `apply()`, and `sort_values()`, we turn chaos into gold."
