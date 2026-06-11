# Skill: Update Daily Picks

## Purpose
This skill is used when the user provides betting picks to be uploaded to the Transparent Tips Aether 1.0 website. The agent must parse the user's prompt, generate the correct HTML for each match box, and update `index.html`.

## When to Activate
Activate this skill when the user provides a message containing match headings (e.g. "England vs Croatia") followed by player market lines. The user may also say things like "update the picks", "upload these", "put these on the site", etc.

---

## Step 1: Parse the User's Prompt

### Input Format
The user will provide data in roughly this format (spacing/casing may vary):

```
[Team A] vs [Team B]

[Player] [market description] [odds] [bookmaker]
[Player] [market description] [odds] [bookmaker]
...

[Team C] vs [Team D]

[Player] [market description] [odds] [bookmaker]
...
```

### Parsing Rules
1. **Match headings** are lines containing "vs" (case-insensitive) with a team name on each side. Extract `Team A` and `Team B`.
2. **Pick lines** are all non-empty lines below a match heading until the next match heading or end of input.
3. For each pick line, extract:
   - **Player name**: The first word(s) before the market description begins (usually a proper noun)
   - **Market description**: The action/bet type (e.g. "booked", "fouled 2+ times", "2+ SOT", "to score")
   - **Odds**: A decimal number (e.g. `1.32`, `2.14`). If no number is present, odds are missing.
   - **Bookmaker**: The last word — always one of: `bet365`, `skybet`, `paddypower`, `williamhill`
4. **If odds are missing**, display `@ TBC` instead of `@ X.XX`.
5. Maximum 6 matches. Assign them to boxes 1–6 in the order they appear.

---

## Step 2: Expand Abbreviations

Before inserting market text into the HTML, expand all known abbreviations. Matching should be **case-insensitive**.

| Abbreviation | Expanded Text |
|---|---|
| SOT | shots on target |
| SoT | shots on target |
| OT | on target |
| TKL | tackles |
| FK | fouls |
| YC | yellow card |
| RC | red card |
| AG | anytime goalscorer |
| ATG | anytime goalscorer |
| FGS | first goalscorer |
| LGS | last goalscorer |
| CS | corners |
| BTTS | both teams to score |
| O1.5 | over 1.5 goals |
| O2.5 | over 2.5 goals |
| O3.5 | over 3.5 goals |
| U1.5 | under 1.5 goals |
| U2.5 | under 2.5 goals |
| U3.5 | under 3.5 goals |

When expanding, replace the abbreviation with the full text naturally. For example:
- `Ronaldo 2+ SOT skybet` → market name becomes `Ronaldo 2+ shots on target`
- `Kane YC bet365` → market name becomes `Kane yellow card`

---

## Step 3: Resolve Country Flags

Map each team name from the match heading to the correct flag `.png` file in `/src/assets/`. Use the ISO 3166-1 alpha-2 country code (lowercase) as the filename.

### Common World Cup Nations

| Country Name(s) | Code | File |
|---|---|---|
| Afghanistan | `af` | `af.png` |
| Albania | `al` | `al.png` |
| Algeria | `dz` | `dz.png` |
| Andorra | `ad` | `ad.png` |
| Angola | `ao` | `ao.png` |
| Argentina | `ar` | `ar.png` |
| Armenia | `am` | `am.png` |
| Australia | `au` | `au.png` |
| Austria | `at` | `at.png` |
| Azerbaijan | `az` | `az.png` |
| Bahrain | `bh` | `bh.png` |
| Bangladesh | `bd` | `bd.png` |
| Belgium | `be` | `be.png` |
| Bolivia | `bo` | `bo.png` |
| Bosnia / Bosnia and Herzegovina | `ba` | `ba.png` |
| Brazil | `br` | `br.png` |
| Bulgaria | `bg` | `bg.png` |
| Burkina Faso | `bf` | `bf.png` |
| Cameroon | `cm` | `cm.png` |
| Canada | `ca` | `ca.png` |
| Chile | `cl` | `cl.png` |
| China | `cn` | `cn.png` |
| Colombia | `co` | `co.png` |
| Congo / DR Congo | `cd` | `cd.png` |
| Costa Rica | `cr` | `cr.png` |
| Croatia | `hr` | `hr.png` |
| Cuba | `cu` | `cu.png` |
| Czech Republic / Czechia | `cz` | `cz.png` |
| Denmark | `dk` | `dk.png` |
| Ecuador | `ec` | `ec.png` |
| Egypt | `eg` | `eg.png` |
| El Salvador | `sv` | `sv.png` |
| England | `gb-eng` | `gb-eng.png` |
| Estonia | `ee` | `ee.png` |
| Finland | `fi` | `fi.png` |
| France | `fr` | `fr.png` |
| Gabon | `ga` | `ga.png` |
| Georgia | `ge` | `ge.png` |
| Germany | `de` | `de.png` |
| Ghana | `gh` | `gh.png` |
| Greece | `gr` | `gr.png` |
| Guatemala | `gt` | `gt.png` |
| Guinea | `gn` | `gn.png` |
| Haiti | `ht` | `ht.png` |
| Honduras | `hn` | `hn.png` |
| Hungary | `hu` | `hu.png` |
| Iceland | `is` | `is.png` |
| India | `in` | `in.png` |
| Indonesia | `id` | `id.png` |
| Iran | `ir` | `ir.png` |
| Iraq | `iq` | `iq.png` |
| Ireland / Republic of Ireland | `ie` | `ie.png` |
| Israel | `il` | `il.png` |
| Italy | `it` | `it.png` |
| Ivory Coast / Côte d'Ivoire | `ci` | `ci.png` |
| Jamaica | `jm` | `jm.png` |
| Japan | `jp` | `jp.png` |
| Jordan | `jo` | `jo.png` |
| Kazakhstan | `kz` | `kz.png` |
| Kenya | `ke` | `ke.png` |
| Kosovo | `xk` | `xk.png` |
| Kuwait | `kw` | `kw.png` |
| Latvia | `lv` | `lv.png` |
| Lithuania | `lt` | `lt.png` |
| Luxembourg | `lu` | `lu.png` |
| Mali | `ml` | `ml.png` |
| Mexico | `mx` | `mx.png` |
| Montenegro | `me` | `me.png` |
| Morocco | `ma` | `ma.png` |
| Mozambique | `mz` | `mz.png` |
| Netherlands / Holland | `nl` | `nl.png` |
| New Zealand | `nz` | `nz.png` |
| Nicaragua | `ni` | `ni.png` |
| Niger | `ne` | `ne.png` |
| Nigeria | `ng` | `ng.png` |
| North Korea | `kp` | `kp.png` |
| North Macedonia | `mk` | `mk.png` |
| Northern Ireland | `gb-nir` | `gb-nir.png` |
| Norway | `no` | `no.png` |
| Oman | `om` | `om.png` |
| Pakistan | `pk` | `pk.png` |
| Palestine | `ps` | `ps.png` |
| Panama | `pa` | `pa.png` |
| Paraguay | `py` | `py.png` |
| Peru | `pe` | `pe.png` |
| Philippines | `ph` | `ph.png` |
| Poland | `pl` | `pl.png` |
| Portugal | `pt` | `pt.png` |
| Qatar | `qa` | `qa.png` |
| Romania | `ro` | `ro.png` |
| Russia | `ru` | `ru.png` |
| Rwanda | `rw` | `rw.png` |
| Saudi Arabia | `sa` | `sa.png` |
| Scotland | `gb-sct` | `gb-sct.png` |
| Senegal | `sn` | `sn.png` |
| Serbia | `rs` | `rs.png` |
| Slovakia | `sk` | `sk.png` |
| Slovenia | `si` | `si.png` |
| South Africa | `za` | `za.png` |
| South Korea / Korea Republic / Korea | `kr` | `kr.png` |
| Spain | `es` | `es.png` |
| Sweden | `se` | `se.png` |
| Switzerland | `ch` | `ch.png` |
| Syria | `sy` | `sy.png` |
| Tanzania | `tz` | `tz.png` |
| Thailand | `th` | `th.png` |
| Trinidad and Tobago | `tt` | `tt.png` |
| Tunisia | `tn` | `tn.png` |
| Turkey / Türkiye | `tr` | `tr.png` |
| Uganda | `ug` | `ug.png` |
| Ukraine | `ua` | `ua.png` |
| United Arab Emirates / UAE | `ae` | `ae.png` |
| United States / USA / US | `us` | `us.png` |
| Uruguay | `uy` | `uy.png` |
| Uzbekistan | `uz` | `uz.png` |
| Venezuela | `ve` | `ve.png` |
| Vietnam | `vn` | `vn.png` |
| Wales | `gb-wls` | `gb-wls.png` |
| Zambia | `zm` | `zm.png` |
| Zimbabwe | `zw` | `zw.png` |

If a country name is not in this table, try matching it to the ISO 3166-1 alpha-2 code. All flag files live at `/src/assets/{code}.png`.

---

## Step 4: Resolve Bookmaker Logos

Map the bookmaker name from each pick to the correct image file and CSS class.

| User Input (case-insensitive) | File Path | Alt Text | Extra CSS Class |
|---|---|---|---|
| `bet365` | `/bookmakers/bet365.png` | `bet365` | _(none)_ |
| `skybet` / `sky bet` | `/bookmakers/skybet.png` | `SkyBet` | `skybet-logo` |
| `williamhill` / `william hill` | `/bookmakers/williamhill.webp` | `William Hill` | _(none)_ |
| `paddypower` / `paddy power` | `/bookmakers/Paddypower.png` | `PaddyPower` | _(none)_ |

**CRITICAL**: The SkyBet logo MUST always include the extra class `skybet-logo` to correct its visual scaling. All other bookmakers use only `bookmaker-logo`.

---

## Step 5: Generate the HTML

### Per-Box Template

For each match provided by the user, generate one box using this exact template. Replace all `{{placeholders}}`.

```html
        <!-- Box {{BOX_NUMBER}} -->
        <div class="info-box reveal" id="info-box-{{BOX_NUMBER}}" style="{{DISPLAY_STYLE}}">
          <div class="box-number">{{BOX_NUMBER_PADDED}}</div>
          <div class="box-header">
            <div class="match-flags">
              <img src="/src/assets/{{TEAM_A_CODE}}.png" alt="{{TEAM_A_NAME}}" class="country-flag">
              <span class="match-vs">VS</span>
              <img src="/src/assets/{{TEAM_B_CODE}}.png" alt="{{TEAM_B_NAME}}" class="country-flag">
            </div>
            <span class="box-label">{{TEAM_A_NAME_UPPER}} VS {{TEAM_B_NAME_UPPER}}</span>
          </div>
          <div class="box-stat">—</div>
          <h3 class="box-title">Match Markets</h3>
          <div class="box-content market-container">
{{MARKET_ITEMS}}
          </div>
          <div class="box-footer">
            <span class="box-timestamp">Last updated: {{TIMESTAMP}}</span>
          </div>
        </div>
```

### Placeholder Values

| Placeholder | Value |
|---|---|
| `{{BOX_NUMBER}}` | `1` through `6` |
| `{{BOX_NUMBER_PADDED}}` | `01` through `06` |
| `{{DISPLAY_STYLE}}` | Empty string `""` for active boxes. `"display: none;"` for unused boxes. |
| `{{TEAM_A_CODE}}` | ISO code from country lookup (e.g. `gb-eng`) |
| `{{TEAM_A_NAME}}` | Team name with proper capitalisation (e.g. `England`) |
| `{{TEAM_A_NAME_UPPER}}` | Team name uppercased (e.g. `ENGLAND`) |
| `{{TEAM_B_CODE}}` | Same as Team A but for the second team |
| `{{TEAM_B_NAME}}` | Same as Team A but for the second team |
| `{{TEAM_B_NAME_UPPER}}` | Same as Team A but for the second team |
| `{{TIMESTAMP}}` | Current date and time, e.g. `11 Jun 2026, 15:00` |
| `{{MARKET_ITEMS}}` | All market item HTML blocks concatenated |

### Per-Market-Item Template

For each pick within a match, generate one market item:

```html
            <div class="market-item">
              <span class="market-name">{{MARKET_NAME}}</span>
              <div class="market-value">
                <span class="market-odds">{{ODDS_DISPLAY}}</span>
                <div class="bookmaker-logo-wrapper">
                  <img src="{{BOOKMAKER_FILE}}" alt="{{BOOKMAKER_ALT}}" class="bookmaker-logo{{BOOKMAKER_EXTRA_CLASS}}">
                </div>
              </div>
            </div>
```

| Placeholder | Value |
|---|---|
| `{{MARKET_NAME}}` | Full market text with abbreviations expanded, capitalised naturally (e.g. `Kane 1+ foul`) |
| `{{ODDS_DISPLAY}}` | `@ 1.32` if odds were provided. `@ TBC` if odds were missing. |
| `{{BOOKMAKER_FILE}}` | File path from bookmaker lookup (e.g. `/bookmakers/bet365.png`) |
| `{{BOOKMAKER_ALT}}` | Alt text from bookmaker lookup (e.g. `bet365`) |
| `{{BOOKMAKER_EXTRA_CLASS}}` | ` skybet-logo` (with leading space) for SkyBet. Empty string for all others. |

---

## Step 6: Unused Box Handling

There are always exactly 6 box slots in the HTML. If the user provides fewer than 6 matches:

- **Active boxes** (matches provided): Render normally with no inline style override.
- **Unused boxes** (no match data): Render with `style="display: none;"` and placeholder content. Use this template for unused boxes:

```html
        <!-- Box {{BOX_NUMBER}} -->
        <div class="info-box reveal" id="info-box-{{BOX_NUMBER}}" style="display: none;">
          <div class="box-number">{{BOX_NUMBER_PADDED}}</div>
          <div class="box-header">
            <div class="match-flags">
              <span class="match-vs">—</span>
            </div>
            <span class="box-label">—</span>
          </div>
          <div class="box-stat">—</div>
          <h3 class="box-title">Match Markets</h3>
          <div class="box-content market-container"></div>
          <div class="box-footer">
            <span class="box-timestamp">Last updated: —</span>
          </div>
        </div>
```

---

## Step 7: Write to index.html

### Replacement Strategy

1. **Read** the full contents of `c:\Users\gilbe\.gemini\antigravity\scratch\Transparent 1.0\index.html`
2. **Identify** the info-grid block: everything between `<div class="info-grid" id="info-grid">` and its closing `</div>` (the one just before `</section>`)
3. **Replace** the entire content inside the info-grid with the 6 generated box blocks (active + hidden)
4. **Keep everything else untouched**: `<head>`, `<nav>`, hero content, `<footer>`, etc.
5. **Write** the updated file back using `write_to_file` with `Overwrite: true`

### What Gets Replaced (Lines ~59–297 approximately)
Only the inner content of `<div class="info-grid" id="info-grid">` through its closing `</div>`. The opening and closing tags of the info-grid div itself are preserved.

---

## Step 8: Verify

After writing the file, confirm to the user:
- How many boxes were filled
- Which matches were assigned to which box numbers
- Any picks where odds were missing (showing `@ TBC`)
- Any abbreviations that were expanded
- The timestamp that was set

---

## Example

### User Input:
```
England vs Croatia

Kane booked 1.32 bet365
Bellingham fouled 2+ times 1.5 skybet
Modric 2+ tackles 2.14 paddypower

Portugal vs Uruguay

Valverde 2+ SOT skybet
Ronaldo to score skybet
Bruno Fernandes 2+ shots bet365
Vitinha to be booked bet365
```

### Expected Output:
- **Box 1**: England (🏴󠁧󠁢󠁥󠁮󠁧󠁿 `gb-eng.png`) VS Croatia (🇭🇷 `hr.png`) — 3 picks
- **Box 2**: Portugal (🇵🇹 `pt.png`) VS Uruguay (🇺🇾 `uy.png`) — 4 picks
- **Boxes 3–6**: Hidden (`display: none`)

Box 1 market items:
1. `Kane booked` → `@ 1.32` → bet365 logo
2. `Bellingham fouled 2+ times` → `@ 1.5` → SkyBet logo (with `skybet-logo` class)
3. `Modric 2+ tackles` → `@ 2.14` → PaddyPower logo

Box 2 market items:
1. `Valverde 2+ shots on target` (SOT expanded) → `@ TBC` (no odds) → SkyBet logo
2. `Ronaldo to score` → `@ TBC` (no odds) → SkyBet logo
3. `Bruno Fernandes 2+ shots` → `@ TBC` (no odds) → bet365 logo
4. `Vitinha to be booked` → `@ TBC` (no odds) → bet365 logo
