/**
 * <leader-signals-card>
 * ─────────────────────────────────────────────────────────────────────────────
 * Asifah Analytics — reusable Web Component for the Leader Commodity
 * Interventions module ("Butterfly Build", Phase 1).
 *
 * USAGE:
 *
 *   <!-- Country mode (India stability page, etc.) -->
 *   <leader-signals-card
 *     country="india"
 *     backend="https://asifah-asia-backend.onrender.com/api/asia">
 *   </leader-signals-card>
 *
 *   <!-- Commodity mode (gold-specific cross-country view) -->
 *   <leader-signals-card
 *     commodity="gold"
 *     backend="https://asifah-backend.onrender.com/api">
 *   </leader-signals-card>
 *
 *   <!-- Global mode (commodities.html dashboard panel) -->
 *   <leader-signals-card
 *     backend="https://asifah-backend.onrender.com/api">
 *   </leader-signals-card>
 *
 * BACKEND ATTRIBUTE:
 *   The component appends "/leader-interventions[/<country>|/commodity/<c>]"
 *   to the `backend` URL. Pass the parent path:
 *     - ME direct:  "https://asifah-backend.onrender.com/api"
 *     - Asia proxy: "https://asifah-asia-backend.onrender.com/api/asia"
 *     - WHA proxy:  "https://asifah-wha-backend.onrender.com/api/wha"
 *     - EU proxy:   "https://asifa-europe-backend.onrender.com/api/europe"
 *       (note: "asifa", no "h" — Render service typo, canonical)
 *
 * THEME INHERITANCE:
 *   The card reads these CSS custom properties from its parent page if set:
 *     --lsc-bg              card background           (default: #0d1b2e)
 *     --lsc-border          card border               (default: #1e3a5f)
 *     --lsc-accent          accent color              (default: #38bdf8)
 *     --lsc-text-primary    primary text              (default: #e2f0fb)
 *     --lsc-text-secondary  secondary text            (default: #93c5fd)
 *     --lsc-text-muted      muted text                (default: #6b7d99)
 *
 * REFRESH:
 *   Auto-refreshes every 5 minutes. Call element.refresh() to force.
 *
 * v1.0.0 — May 11 2026
 * ─────────────────────────────────────────────────────────────────────────────
 */

class LeaderSignalsCard extends HTMLElement {

  // ───── Setup ────────────────────────────────────────────────────────────
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._refreshIntervalMs = 5 * 60 * 1000;
    this._refreshTimer = null;
  }

  static get observedAttributes() {
    return ['country', 'commodity', 'backend'];
  }

  attributeChangedCallback(_name, oldVal, newVal) {
    if (oldVal !== newVal && this.isConnected) {
      this.refresh();
    }
  }

  connectedCallback() {
    this._renderShell();
    this.refresh();
    this._refreshTimer = setInterval(() => this.refresh(), this._refreshIntervalMs);
  }

  disconnectedCallback() {
    if (this._refreshTimer) clearInterval(this._refreshTimer);
  }

  // ───── Mode resolution ──────────────────────────────────────────────────
  _getMode() {
    if (this.getAttribute('country'))   return 'country';
    if (this.getAttribute('commodity')) return 'commodity';
    return 'global';
  }

  _getEndpointUrl() {
    const backend = (this.getAttribute('backend') || '').replace(/\/+$/, '');
    if (!backend) return null;
    const mode = this._getMode();
    if (mode === 'country')   return `${backend}/leader-interventions/${encodeURIComponent(this.getAttribute('country').toLowerCase())}`;
    if (mode === 'commodity') return `${backend}/leader-interventions/commodity/${encodeURIComponent(this.getAttribute('commodity').toLowerCase())}`;
    return `${backend}/leader-interventions`;
  }

  // ───── Data fetch + render ──────────────────────────────────────────────
  async refresh() {
    const url = this._getEndpointUrl();
    if (!url) {
      this._renderError('No backend URL configured. Set the `backend` attribute.');
      return;
    }
    this._renderLoading();
    try {
      const resp = await fetch(url, { method: 'GET' });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      this._renderData(data);
    } catch (err) {
      this._renderError(`Could not load leader signals: ${err.message}`);
    }
  }

  // ───── Render: skeleton shell (only once on connect) ────────────────────
  _renderShell() {
    this.shadowRoot.innerHTML = `
      <style>${this._css()}</style>
      <div class="card" part="card">
        <div class="header">
          <div class="title-row">
            <span class="icon">🗣️</span>
            <h3 class="title">Leader Commodity Signals</h3>
            <span class="live-dot" title="Auto-refreshes every 5 minutes"></span>
          </div>
          <p class="subtitle" id="subtitle">Verbal interventions by senior officials affecting commodity markets.</p>
        </div>
        <div class="body" id="body">
          <div class="state-loading">
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
          </div>
        </div>
        <div class="footer">
          <span class="footer-text">Asifah Analytics · Butterfly Build v1.0</span>
        </div>
      </div>
    `;
  }

  // ───── Render: loading state ─────────────────────────────────────────────
  _renderLoading() {
    const body = this.shadowRoot.getElementById('body');
    if (!body) return;
    body.innerHTML = `
      <div class="state-loading">
        <div class="skeleton"></div>
        <div class="skeleton"></div>
        <div class="skeleton"></div>
      </div>
    `;
  }

  // ───── Render: error state ──────────────────────────────────────────────
  _renderError(msg) {
    const body = this.shadowRoot.getElementById('body');
    if (!body) return;
    body.innerHTML = `
      <div class="state-error">
        <div class="state-error-icon">⚠️</div>
        <div class="state-error-msg">${this._escape(msg)}</div>
        <div class="state-error-hint">The card will retry automatically.</div>
      </div>
    `;
  }

  // ───── Render: data ─────────────────────────────────────────────────────
  _renderData(data) {
    const body = this.shadowRoot.getElementById('body');
    const subtitle = this.shadowRoot.getElementById('subtitle');
    if (!body) return;

    const interventions = (data && data.interventions) || [];
    const mode = this._getMode();

    // Update the subtitle to reflect the mode
    if (subtitle) {
      if (mode === 'country') {
        subtitle.textContent = `Verbal commodity interventions by ${this._titleCase(this.getAttribute('country'))} officials.`;
      } else if (mode === 'commodity') {
        const cName = data.commodity_name || this.getAttribute('commodity');
        subtitle.textContent = `Cross-country leader interventions affecting ${cName}.`;
      } else {
        subtitle.textContent = 'Global feed of verbal commodity interventions by senior officials worldwide.';
      }
    }

    // Empty state — intentional design, not a broken fetch
    if (interventions.length === 0) {
      body.innerHTML = `
        <div class="state-empty">
          <div class="state-empty-icon">🕊️</div>
          <div class="state-empty-msg">No active leader commodity signals.</div>
          <div class="state-empty-hint">
            This card tracks verbal interventions ("jawboning") by heads of state, finance ministers,
            and central bank governors that move commodity markets without formal policy action.
            Quiet here means quiet on the wires.
          </div>
        </div>
      `;
      return;
    }

    // Build breakdown header for global/commodity mode (skip for country)
    let breakdownHtml = '';
    if (mode === 'global' && data.breakdown_by_country) {
      const topCountries = Object.entries(data.breakdown_by_country)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4);
      breakdownHtml = `
        <div class="breakdown">
          <span class="breakdown-label">${interventions.length} active · top:</span>
          ${topCountries.map(([c, n]) => `<span class="breakdown-pill">${this._titleCase(c)} <b>${n}</b></span>`).join('')}
        </div>
      `;
    } else if (mode === 'commodity' && data.countries_with_intervention && data.countries_with_intervention.length) {
      breakdownHtml = `
        <div class="breakdown">
          <span class="breakdown-label">${interventions.length} active across ${data.countries_with_intervention.length} ${data.countries_with_intervention.length === 1 ? 'country' : 'countries'}:</span>
          ${data.countries_with_intervention.slice(0, 6).map(c => `<span class="breakdown-pill">${this._titleCase(c)}</span>`).join('')}
        </div>
      `;
    } else if (mode === 'country') {
      breakdownHtml = `
        <div class="breakdown">
          <span class="breakdown-label">${interventions.length} active ${interventions.length === 1 ? 'signal' : 'signals'} for ${this._titleCase(this.getAttribute('country'))}</span>
        </div>
      `;
    }

    // Build the intervention list
    const listHtml = interventions.map(iv => this._renderIntervention(iv, mode)).join('');

    body.innerHTML = breakdownHtml + `<div class="intervention-list">${listHtml}</div>`;
  }

  // ───── Single intervention block ────────────────────────────────────────
  _renderIntervention(iv, mode) {
    const directionMeta = this._directionMeta(iv.direction);
    const intensityClass = `intensity-${iv.intensity || 'moderate'}`;
    const sourceTitle = this._sourceLabel(iv.source_title);
    const dateStr = this._formatDate(iv.date);
    const langTag = (iv.language || 'en').toUpperCase();
    const priceReaction = this._priceReactionBadge(iv.price_reaction_pct_24h);
    const commodity = (iv.commodity || 'unknown').toUpperCase();
    const country = this._titleCase(iv.country || '');
    const speaker = iv.speaker || 'Unknown speaker';
    const role = this._humanizeRole(iv.role);
    const rationale = this._humanizeRationale(iv.rationale);

    // Country tag is hidden in country mode (it's already in the header) but
    // shown in commodity/global mode so users can scan who's doing what.
    const countryTagHtml = (mode === 'country')
      ? ''
      : `<span class="tag tag-country">${country}</span>`;

    const url = iv.source_url || '#';
    const isClickable = !!iv.source_url;

    return `
      <a class="intervention ${isClickable ? 'clickable' : ''}" href="${this._escape(url)}" target="_blank" rel="noopener noreferrer">
        <div class="iv-top">
          <span class="iv-icon" title="${directionMeta.label}">${directionMeta.icon}</span>
          <div class="iv-headline-block">
            <div class="iv-speaker">
              <strong>${this._escape(speaker)}</strong>
              <span class="iv-role">· ${this._escape(role)}</span>
            </div>
            <div class="iv-quote">${this._escape(iv.quote_short || '')}</div>
          </div>
          <div class="iv-meta-right">
            <span class="iv-date">${dateStr}</span>
            <span class="iv-lang">${langTag}</span>
          </div>
        </div>
        <div class="iv-tags">
          ${countryTagHtml}
          <span class="tag tag-commodity">${commodity}</span>
          <span class="tag tag-direction tag-${directionMeta.cssClass}">${directionMeta.label}</span>
          ${rationale ? `<span class="tag tag-rationale">${this._escape(rationale)}</span>` : ''}
          <span class="tag tag-intensity ${intensityClass}">${(iv.intensity || 'moderate').toUpperCase()}</span>
          ${priceReaction}
          ${iv.verbal_only ? '<span class="tag tag-verbal" title="Verbal intervention with no formal policy action">VERBAL</span>' : ''}
        </div>
        <div class="iv-source">
          <span class="iv-source-label">Source:</span>
          <span class="iv-source-name">${this._escape(sourceTitle)}</span>
        </div>
      </a>
    `;
  }

  // ───── Helpers: data normalization & display ────────────────────────────
  _directionMeta(direction) {
    const map = {
      suppress_demand:     { icon: '📉', label: 'Suppress demand',     cssClass: 'down' },
      boost_demand:        { icon: '📈', label: 'Boost demand',        cssClass: 'up' },
      restrict_supply:     { icon: '🚫', label: 'Restrict supply',     cssClass: 'down' },
      boost_supply:        { icon: '🛢️', label: 'Boost supply',        cssClass: 'up' },
      build_reserves:      { icon: '🏦', label: 'Build reserves',      cssClass: 'neutral' },
      draw_reserves:       { icon: '🪙', label: 'Draw reserves',       cssClass: 'neutral' },
      threaten_ban:        { icon: '⚠️', label: 'Threaten ban',        cssClass: 'down' },
      threaten_sanctions:  { icon: '⚖️', label: 'Threaten sanctions',  cssClass: 'down' },
    };
    return map[direction] || { icon: '🗣️', label: direction || 'Unknown', cssClass: 'neutral' };
  }

  _humanizeRole(role) {
    if (!role) return '';
    const map = {
      head_of_state:         'Head of state',
      finance_minister:      'Finance minister',
      central_bank_governor: 'Central bank governor',
      energy_minister:       'Energy minister',
      trade_minister:        'Trade minister',
      agriculture_minister:  'Agriculture minister',
      foreign_minister:      'Foreign minister',
    };
    return map[role] || role.replace(/_/g, ' ');
  }

  _humanizeRationale(rationale) {
    if (!rationale) return '';
    const map = {
      fx_defense:          'FX defense',
      inflation:           'Inflation',
      food_security:       'Food security',
      energy_security:     'Energy security',
      sanctions_response:  'Sanctions response',
      strategic_stockpile: 'Strategic stockpile',
      election_politics:   'Election politics',
      climate_policy:      'Climate policy',
      industrial_policy:   'Industrial policy',
    };
    return map[rationale] || rationale.replace(/_/g, ' ');
  }

  _sourceLabel(source) {
    // Defensive: backend may emit {name: '...'} dict or plain string depending
    // on which scan wrote the fingerprint. Normalize for display.
    if (!source) return 'Unknown';
    if (typeof source === 'string') return source;
    if (typeof source === 'object' && source.name) return source.name;
    return 'Unknown';
  }

  _priceReactionBadge(pct) {
    if (pct === null || pct === undefined) return '';
    const sign = pct > 0 ? '+' : '';
    const cls = pct > 0 ? 'up' : (pct < 0 ? 'down' : 'neutral');
    return `<span class="tag tag-price tag-${cls}" title="24h price reaction on linked commodity">${sign}${pct.toFixed(2)}%</span>`;
  }

  _formatDate(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      const now = new Date();
      const hours = (now - d) / (1000 * 60 * 60);
      if (hours < 1)  return 'just now';
      if (hours < 24) return `${Math.floor(hours)}h ago`;
      const days = Math.floor(hours / 24);
      if (days < 7) return `${days}d ago`;
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch (e) {
      return iso.slice(0, 10);
    }
  }

  _titleCase(s) {
    if (!s) return '';
    return s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  _escape(s) {
    if (s === null || s === undefined) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ───── CSS (Shadow DOM scoped) ──────────────────────────────────────────
  _css() {
    return `
      :host {
        display: block;
        --_bg:        var(--lsc-bg, #0d1b2e);
        --_border:    var(--lsc-border, #1e3a5f);
        --_accent:    var(--lsc-accent, #38bdf8);
        --_text:      var(--lsc-text-primary, #e2f0fb);
        --_text-2:    var(--lsc-text-secondary, #93c5fd);
        --_text-3:    var(--lsc-text-muted, #6b7d99);
        --_radius:    14px;
        --_radius-sm: 6px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: var(--_text);
      }

      .card {
        background: var(--_bg);
        border: 1px solid var(--_border);
        border-radius: var(--_radius);
        padding: 20px 22px;
        position: relative;
        overflow: hidden;
      }
      .card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--_accent), transparent);
        opacity: 0.6;
      }

      /* Header */
      .header { margin-bottom: 14px; }
      .title-row { display: flex; align-items: center; gap: 10px; }
      .icon { font-size: 1.4em; }
      .title {
        margin: 0;
        font-size: 1.1em;
        font-weight: 600;
        color: var(--_text);
        letter-spacing: 0.01em;
      }
      .live-dot {
        width: 8px; height: 8px;
        border-radius: 50%;
        background: var(--_accent);
        margin-left: auto;
        animation: pulse 2.6s ease-in-out infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50%      { opacity: 1.0; transform: scale(1.15); }
      }
      .subtitle {
        margin: 4px 0 0 0;
        font-size: 0.85em;
        color: var(--_text-3);
        line-height: 1.4;
      }

      /* Breakdown bar */
      .breakdown {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        padding: 10px 0 14px 0;
        border-bottom: 1px solid var(--_border);
        margin-bottom: 12px;
      }
      .breakdown-label {
        font-size: 0.8em;
        color: var(--_text-2);
        font-weight: 500;
      }
      .breakdown-pill {
        font-size: 0.75em;
        padding: 3px 9px;
        border-radius: 999px;
        background: rgba(56, 189, 248, 0.08);
        border: 1px solid var(--_border);
        color: var(--_text-2);
      }
      .breakdown-pill b { color: var(--_accent); font-weight: 700; margin-left: 4px; }

      /* Intervention list */
      .intervention-list { display: flex; flex-direction: column; gap: 12px; }

      .intervention {
        display: block;
        text-decoration: none;
        color: inherit;
        padding: 12px 14px;
        border: 1px solid var(--_border);
        border-radius: var(--_radius-sm);
        background: rgba(255, 255, 255, 0.015);
        transition: border-color 0.15s ease, background 0.15s ease, transform 0.15s ease;
      }
      .intervention.clickable { cursor: pointer; }
      .intervention.clickable:hover {
        border-color: var(--_accent);
        background: rgba(56, 189, 248, 0.04);
        transform: translateY(-1px);
      }

      .iv-top { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; }
      .iv-icon { font-size: 1.3em; flex-shrink: 0; line-height: 1.2; }
      .iv-headline-block { flex: 1; min-width: 0; }
      .iv-speaker { font-size: 0.95em; color: var(--_text); margin-bottom: 4px; }
      .iv-speaker strong { font-weight: 600; }
      .iv-role { color: var(--_text-3); font-weight: 400; font-size: 0.85em; }
      .iv-quote { font-size: 0.85em; color: var(--_text-2); line-height: 1.45; }

      .iv-meta-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 4px;
        flex-shrink: 0;
      }
      .iv-date { font-size: 0.75em; color: var(--_text-3); }
      .iv-lang {
        font-size: 0.65em;
        font-weight: 700;
        padding: 1px 6px;
        border-radius: 3px;
        background: rgba(56, 189, 248, 0.1);
        color: var(--_accent);
        letter-spacing: 0.05em;
      }

      .iv-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-bottom: 6px;
      }
      .tag {
        font-size: 0.7em;
        padding: 2px 8px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.05);
        color: var(--_text-2);
        letter-spacing: 0.03em;
        font-weight: 500;
      }
      .tag-country     { background: rgba(56, 189, 248, 0.12); color: var(--_accent); font-weight: 600; }
      .tag-commodity   { background: rgba(251, 191, 36, 0.12); color: #fbbf24; font-weight: 600; }
      .tag-direction   { font-weight: 600; }
      .tag-direction.tag-up      { background: rgba(34, 197, 94, 0.12);  color: #22c55e; }
      .tag-direction.tag-down    { background: rgba(239, 68, 68, 0.12);  color: #ef4444; }
      .tag-direction.tag-neutral { background: rgba(148, 163, 184, 0.12); color: #94a3b8; }
      .tag-rationale   { background: rgba(168, 85, 247, 0.10); color: #c084fc; }
      .tag-intensity   { font-weight: 700; letter-spacing: 0.06em; }
      .intensity-strong   { background: rgba(239, 68, 68, 0.15);   color: #f87171; }
      .intensity-moderate { background: rgba(251, 191, 36, 0.12);  color: #fbbf24; }
      .intensity-mild     { background: rgba(148, 163, 184, 0.10); color: #94a3b8; }
      .tag-price.tag-up      { background: rgba(34, 197, 94, 0.10);  color: #4ade80; }
      .tag-price.tag-down    { background: rgba(239, 68, 68, 0.10);  color: #f87171; }
      .tag-price.tag-neutral { background: rgba(148, 163, 184, 0.10); color: #94a3b8; }
      .tag-verbal { background: rgba(148, 163, 184, 0.08); color: var(--_text-3); }

      .iv-source { font-size: 0.7em; color: var(--_text-3); }
      .iv-source-label { opacity: 0.7; margin-right: 4px; }
      .iv-source-name { color: var(--_text-2); }

      /* States */
      .state-loading { display: flex; flex-direction: column; gap: 10px; padding: 8px 0; }
      .skeleton {
        height: 56px;
        border-radius: var(--_radius-sm);
        background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.06), rgba(255,255,255,0.02));
        background-size: 200% 100%;
        animation: shimmer 1.6s linear infinite;
      }
      @keyframes shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      .state-empty, .state-error {
        padding: 20px 12px;
        text-align: center;
      }
      .state-empty-icon, .state-error-icon {
        font-size: 2em;
        margin-bottom: 8px;
        opacity: 0.8;
      }
      .state-empty-msg, .state-error-msg {
        font-size: 0.95em;
        color: var(--_text);
        font-weight: 500;
        margin-bottom: 6px;
      }
      .state-empty-hint, .state-error-hint {
        font-size: 0.8em;
        color: var(--_text-3);
        line-height: 1.5;
        max-width: 420px;
        margin: 0 auto;
      }

      /* Footer */
      .footer {
        margin-top: 14px;
        padding-top: 10px;
        border-top: 1px solid var(--_border);
        text-align: right;
      }
      .footer-text {
        font-size: 0.68em;
        color: var(--_text-3);
        letter-spacing: 0.04em;
      }

      /* Responsive */
      @media (max-width: 600px) {
        .card { padding: 16px 14px; }
        .iv-top { flex-wrap: wrap; }
        .iv-meta-right { flex-direction: row; gap: 8px; width: 100%; justify-content: space-between; margin-top: 4px; }
      }
    `;
  }
}

// Register the custom element with the browser. Once this script loads on a
// page, the <leader-signals-card> tag becomes a real, working HTML element.
if (!customElements.get('leader-signals-card')) {
  customElements.define('leader-signals-card', LeaderSignalsCard);
}
