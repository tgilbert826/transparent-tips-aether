# Add a New Pick Skill

When the user asks you to add a new pick, they will provide:
1. The game/match it belongs to (to identify the correct info-box in `index.html`).
2. The player pick / market description.
3. The odds.
4. The site/bookmaker.

## Workflow

1. **Locate the Box**: Search `index.html` for the match the user specifies (e.g., look for `<span class="box-label">ENGLAND VS SPAIN</span>`).
2. **Find the Container**: Inside that `.info-box`, locate the `<div class="box-content market-container">`.
3. **Format the HTML**: Construct the following exact HTML block for the pick, replacing the placeholders with the user's data:

```html
<div class="market-item">
  <span class="market-name">{{ PICK_DESCRIPTION }}</span>
  <a href="{{ SITE_URL }}" target="_blank" class="market-odds-btn" aria-label="Bet at {{ SITE_NAME }}">
    <span class="market-odds">@ {{ ODDS }}</span>
    <span class="odds-divider"></span>
    <div class="bookmaker-logo-wrapper">
      <img src="/bookmakers/{{ SITE_LOGO_FILENAME }}" alt="{{ SITE_NAME }}" class="bookmaker-logo{{ EXTRA_LOGO_CLASS }}">
    </div>
  </a>
</div>
```

### Site/Bookmaker Mapping
Use this mapping for URLs and Logos:
- **bet365**: `href="https://www.bet365.com"`, `src="/bookmakers/bet365.png"`
- **SkyBet**: `href="https://www.skybet.com"`, `src="/bookmakers/skybet.png"`, `class="bookmaker-logo skybet-logo"` (Note the extra `skybet-logo` class)
- **William Hill**: `href="https://www.williamhill.com"`, `src="/bookmakers/williamhill.webp"`
- **PaddyPower**: `href="https://www.paddypower.com"`, `src="/bookmakers/Paddypower.png"`

4. **Insert and Save**: Append the newly formatted `<div class="market-item">` block directly inside the target `.market-container` in `index.html`.

5. **Update Timestamp**: Whenever you add or update picks in a box, locate the corresponding `<span class="box-timestamp">` at the bottom of the `.info-box`. Update its text to reflect the exact current time (e.g., `Last updated: 14:30 EST`).

*Ensure you use the exact HTML structure to keep the UI perfectly consistent.*
