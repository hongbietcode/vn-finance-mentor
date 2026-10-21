<p align="center">
  <h1 align="center">finance-kit</h1>
  <p align="center">
    Vietnam and US market data, research signals, and paper monitoring.
    <br />
    Fundamentals &bull; Technicals &bull; Macro &bull; News &bull; Screening &bull; Fund Analysis
  </p>
</p>

<p align="center">
  <a href="https://pypi.org/project/finance-kit/"><img src="https://img.shields.io/pypi/v/finance-kit?color=blue&label=PyPI" alt="PyPI Version" /></a>
  <a href="https://www.npmjs.com/package/finance-kit-cli"><img src="https://img.shields.io/npm/v/finance-kit-cli?color=green&label=npm" alt="npm Version" /></a>
  <a href="https://pypi.org/project/finance-kit/"><img src="https://img.shields.io/pypi/pyversions/finance-kit" alt="Python Versions" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/hongbietcode/finance-kit" alt="License" /></a>
</p>

---

## Overview

**finance-kit** is a Python library for Vietnam/US market data,
deterministic research signals, backtesting, and self-hosted paper monitoring.
The AI plugin provides Vietnamese market analysis for **Codex**, **Claude Code**,
**Cursor**, and **GitHub Copilot**, with repository marketplaces for Codex and
Claude Code.

Version `0.2.0` adds the self-hosted VN/US market monitor runtime alongside the
existing data and strategy APIs.

Ask natural language questions — the plugin auto-routes to the right analysis workflow:

```
"Analyze FPT stock"
"Market overview today"
"Compare VNM vs MSN"
"Latest news sentiment for HPG"
```

### Example: Stock Analysis in Action

<p align="center">
  <a href="https://github.com/hongbietcode/finance-kit/releases/latest">
    <img src="assets/image.png" alt="Finance Kit analyzing HPG stock" width="800" />
  </a>
  <br />
  <em>Claude Code analyzing HPG stock — orchestrating fundamental and technical agents in parallel. <a href="https://github.com/hongbietcode/finance-kit/releases/latest">Download plugin →</a></em>
</p>

## Features

- **Codex Marketplace** — install the bundled plugin from this repository or generate a plugin and marketplace in another project
- **Stock Analysis** — valuation, financial health, technical indicators, screening, sentiment, sector analysis
- **Market Research** — market valuation (P/E, P/B), sector comparison, fund analysis, commodities
- **Technical Analysis** — 30+ indicators: SMA, EMA, RSI, MACD, Bollinger Bands, ATR, OBV, and more
- **Macro Research** — GDP, CPI, interest rates, exchange rates, FDI, trade balance
- **News & Sentiment** — crawl and classify news from Vietnamese financial sites (CafeF, VnExpress, etc.)
- **Fund Analysis** — 58+ mutual funds: NAV, holdings, industry allocation, performance
- **Bond Analysis** — corporate and government bond discovery plus OHLCV, trades, and quotes
- **Batch Collection** — scheduled OHLCV, financial, and intraday data collection tasks
- **Official Market Feeds** — DNSE, SSI FastConnect, Alpaca IEX, and SEC EDGAR
- **Capability Routing** — opt-in `source="AUTO"` with `source`, `attempted_sources`, `market`, `fetched_at`, `data_timestamp`, `delayed_seconds`, and `coverage` provenance
- **Signal Validation** — long-only regime strategies, next-bar backtests, and strict walk-forward holdout gates that downgrade to `NO_TRADE`
- **Paper Monitor** — unusual-flow detection, restart-safe SQLite paper/equity state, Telegram alerts, daily HTML summaries, and Docker deployment; paper-trade only, no broker connections

## Installation

The Python distribution is `finance-kit`, the npm installer is `finance-kit-cli`,
and its executable is `finance-kit`. Python code continues to import
`claude_finance_kit`; monitor commands use `cfk`.

Use Python **3.12** for the verified setup. The package currently declares
Python 3.10+, but Python 3.10 has a known import failure involving `datetime.UTC`.

### 1. Install the Python library from source

From the repository root:

```bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -e .
```

For realtime monitoring, install the extra in the same environment:

```bash
python -m pip install -e ".[monitor]"
```

<details>
<summary><strong>Install published packages</strong></summary>

To install a published Python release from PyPI:

```bash
pip install finance-kit
```

For realtime monitoring:

```bash
pip install "finance-kit[monitor]"
cfk monitor init
cfk monitor doctor
cfk monitor run
```

</details>

`monitor doctor` performs live data, stream-auth/entitlement, and Telegram
authentication probes by default. Use `--offline` only for a local
configuration check.

### 2. Install the AI plugin

<details>
<summary><strong>Codex</strong></summary>

**Install through the repository marketplace**

From the repository root, register the marketplace with Codex:

```bash
codex plugin marketplace add .
codex plugin marketplace list
```

The [Codex marketplace catalog](.agents/plugins/marketplace.json) exposes the
[bundled plugin](cli/assets/.codex-plugin/plugin.json). Restart the ChatGPT desktop app, open the Plugins Directory,
choose the **Finance Kit** marketplace, and install **Finance Kit**.

**Generate a plugin template in another project**

Build the installer from this checkout:

```bash
cd cli
npm ci
npm run build
cd ..
```

In the target project, run the built installer using its absolute path:

```bash
node /absolute/path/to/finance-kit/cli/dist/index.js init --ai codex-plugin
codex plugin marketplace add .
```

The [Codex plugin template](cli/assets/templates/platforms/codex-plugin.json)
creates `.codex/plugins/finance-kit/` and registers it in
`.agents/plugins/marketplace.json`. Other plugins and marketplace metadata are
preserved; an existing `finance-kit` entry is replaced. Install Finance Kit from
that marketplace in the Plugins Directory.

After npm publication, the installer command is also available as
`npx finance-kit-cli init --ai codex-plugin`.

**Install a standalone skill**

Use `codex` when you want the skill directly in `.agents/skills/finance-kit/`:

```bash
node /absolute/path/to/finance-kit/cli/dist/index.js init --ai codex
```

Restart Codex if the skill does not appear immediately, then invoke
`$finance-kit` or ask a Vietnamese market analysis question naturally.

For uninstall commands and the full CLI reference, see the [CLI README](cli/README.md).

See OpenAI's [plugin packaging and marketplaces](https://developers.openai.com/plugins/build/plugins).

</details>

<details>
<summary><strong>Claude Code (via Marketplace)</strong></summary>

**Add the marketplace:**

```
/plugin marketplace add hongbietcode/finance-kit
```

**Browse and install:**

Run `/plugin` to open the plugin manager. Go to the **Discover** tab to find `finance-kit`.

Select it and choose an installation scope:

- **User scope** — available across all projects
- **Project scope** — available for all collaborators on this repository
- **Local scope** — available only for you in this repository

Or install directly:

```
/plugin install finance-kit@finance-kit
```

Run `/reload-plugins` to activate.

</details>

<details>
<summary><strong>CLI alternatives (Claude Code, Cursor, Copilot)</strong></summary>

```bash
npx finance-kit-cli init --ai cursor    # Cursor
npx finance-kit-cli init --ai copilot   # GitHub Copilot
npx finance-kit-cli init --ai claude    # Claude Code (CLI alternative)
```

</details>

## Quick Start

Once installed, just ask naturally — the plugin auto-invokes the right skill:

```
"Analyze FPT stock"                                        → finance-kit (stock deep dive)
"Market overview today"                                    → finance-kit (market briefing)
"Compare VNM vs MSN"                                       → finance-kit (comparative)
"Latest news sentiment for HPG"                            → finance-kit (news sentiment)
```

To invoke the skill explicitly, use `$finance-kit` in Codex or `/finance-kit`
in Claude Code, followed by your question.

### Python Library Usage

```python
from claude_finance_kit import Bond, Stock, Market, Macro, Commodity, Fund

# Stock data
stock = Stock("FPT")
stock.quote.history(start="2025-01-01", end="2025-12-31")
stock.finance.income_statement(period="quarter")
stock.company.overview()

# Bond data
bond = Bond("BAB123032")
bond.ohlcv(start="2025-01-01")
bond.trades()
bond.quote()

# Market valuation
market = Market("VNINDEX")
market.pe(duration="5Y")
market.top_gainer(limit=10)

# Macro indicators
macro = Macro()
macro.gdp()
macro.cpi()
macro.interest_rate()

# Commodities
commodity = Commodity()
commodity.gold()
commodity.oil()

# Fund analysis
fund = Fund()
fund.listing("STOCK")
```

### VN/US routing and trading data

```python
from claude_finance_kit import Stock

vn = Stock("FPT", market="VN", source="AUTO")
us = Stock("AAPL", market="US", source="AUTO")

bars = us.quote.history(start="2025-01-01")
trades = vn.trading.trades(limit=500)
quotes = us.trading.order_book(limit=100)
```

Explicit sources remain strict and backward compatible. AUTO results record
`source`, `attempted_sources`, `market`, `fetched_at`, `data_timestamp`,
`delayed_seconds`, and `coverage` in `DataFrame.attrs`.

### Realtime monitor

The self-hosted monitor ships in `0.2.0` and is configured with `cfk monitor`.
`cfk monitor init` creates both `monitor.toml` and a local `.env.example`.
Populate the secrets for the providers you intend to use before running
`cfk monitor doctor` and `cfk monitor run`:

```text
SSI_CONSUMER_ID
SSI_CONSUMER_SECRET
DNSE_API_KEY
DNSE_API_SECRET
ALPACA_API_KEY
ALPACA_API_SECRET
FMP_API_KEY
CFK_SEC_USER_AGENT
CFK_TELEGRAM_BOT_TOKEN
CFK_TELEGRAM_CHAT_ID
```

An explicit VN watchlist can fall back to AUTO intraday polling when SSI/DNSE
stream credentials are unavailable. The runtime labels that mode `degraded`,
blocks BUY and never treats it as all-market scanning. SSI credentials and
`ALL` entitlement remain mandatory for a full-market VN stream. US can use
degraded FMP polling when Alpaca is unavailable, but still requires
`FMP_API_KEY`.

Passing validation is tied to the exact market, regime, benchmark, strategy
name, parameter set, source-data fingerprint, and freshness window. Feed
timestamps that are stale, out of order, duplicated, or too far in the future
block BUY. Outside the configured weekday exchange hours the feed is `idle`;
incoming extended-hours records are quarantined, and holiday calendars are not
inferred. SQLite commits signal dedupe, paper state, and the Telegram outbox
atomically so a notification failure does not lose the signal or stop the
monitor. Completed minute aggregates are restored after a restart; routine
HOLD states are not sent as recurring alerts.

The monitor writes a daily HTML report to `reports/monitor-YYYY-MM-DD-report.html`.
The `cfk backtest` command writes a backtest HTML report to
`reports/{symbol}-{strategy}-backtest-report.html`.

### Technical Analysis

```python
from claude_finance_kit import Stock
from claude_finance_kit.ta import Indicator

stock = Stock("FPT")
df = stock.quote.history(start="2025-01-01", end="2025-12-31")
df = df.set_index("time")

ind = Indicator(df)
ind.trend.sma(length=20)
ind.trend.ema(length=50)
ind.momentum.rsi(length=14)
ind.momentum.macd(fast=12, slow=26, signal=9)
ind.volatility.atr(length=14)
ind.volume.obv()
```

## Data Sources

| Source | Type | Coverage |
|--------|------|----------|
| **VCI** | Stock (default) | Quote, company, finance, listing, trading via REST — full VN coverage |
| **KBS** | Stock (fallback) | Same normalized stock coverage as VCI — full VN coverage |
| **MSN** | Stock | Historical OHLCV with dynamic MSN SecId resolution |
| **VCI** | Bond | Corporate/government listing, OHLCV, matched trades, current quote |
| **KBS** | Bond | Corporate listing and market data; no government-group discovery |
| **MAS** | Stock | Quote, intraday, financials, price depth |
| **TVS** | Stock | Company overview only |
| **VDS** | Stock | Intraday only |
| **DNSE** | VN stock | Official OHLCV, trades, bid/ask, foreign flow, instruments, WebSocket |
| **SSI** | VN stock | Official FastConnect OHLCV, listings, foreign flow, entitlement-based stream |
| **Alpaca** | US stock | IEX bars, trades, quotes, snapshots, WebSocket — free tier is partial coverage |
| **SEC** | US filings | Official EDGAR submissions and XBRL company facts |
| **FMP** | Stock (global) | Quote, company, financials — requires `FMP_API_KEY` |
| **BINANCE** | Crypto | History, intraday, depth — no API key |
| **VND** | Market | P/E, P/B, top movers |
| **MBK** | Macro | GDP, CPI, interest rates, FDI, trade balance |
| **FMARKET** | Fund | Mutual fund data (58+ funds) |
| **SPL** | Commodity | Gold, oil, steel, gas, fertilizer, agricultural |
| **Perplexity** | Search | Web search — requires `PERPLEXITY_API_KEY` |

> **Source fallback:** Explicit providers never silently change source. Use
> `Stock("FPT", market="VN", source="AUTO")` for capability-aware fallback.
> Authentication, invalid-symbol, and malformed-data errors do not trigger fallback.

## Plugin Architecture

- [Python library](src/claude_finance_kit/) — data APIs, strategies, and monitor runtime.
- [CLI installer](cli/README.md) — platform installation and removal commands.
- [Codex marketplace](.agents/plugins/marketplace.json) and [Claude Code marketplace](.claude-plugin/marketplace.json) — repository plugin catalogs.
- [Codex manifest](cli/assets/.codex-plugin/plugin.json) and [Claude Code manifest](cli/assets/.claude-plugin/plugin.json) — metadata for the bundled plugin.
- [Platform templates](cli/assets/templates/platforms/) — standalone skills and Codex plugin scaffolding.
- [Finance Kit skill](cli/assets/skills/finance-kit/SKILL.md) — analysis workflows, references, and scripts.

### Skills & Agents

| Component | Type | Role |
|-----------|------|------|
| `finance-kit` | Skill | Senior analyst orchestrator (Marcus Vance). Single entry point — routes by complexity, spawns specialists, produces reports |
| `fundamental-analyst` | Agent | Financials, valuation, earnings (spawned by skill) |
| `technical-analyst` | Agent | Price trends, momentum, S/R levels (spawned by skill) |
| `macro-researcher` | Agent | GDP, CPI, rates, FX, commodities (spawned by skill) |
| `lead-analyst` | Agent | Synthesis + decision for T3/T4 analysis (spawned by skill) |
| `html-report-writer` | Agent | Self-contained HTML report generation for Claude Code; Codex falls back to the active agent |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `FMP_API_KEY` | Optional | For global stock data via Financial Modeling Prep |
| `PERPLEXITY_API_KEY` | Optional | For web search via Perplexity API |
| `DNSE_API_KEY`, `DNSE_API_SECRET` | DNSE stream | Official DNSE credentials |
| `SSI_CONSUMER_ID`, `SSI_CONSUMER_SECRET` | SSI | FastConnect credentials |
| `ALPACA_API_KEY`, `ALPACA_API_SECRET` | US realtime | Alpaca Market Data credentials |
| `CFK_SEC_USER_AGENT` | SEC | Application name and contact email |
| `CFK_TELEGRAM_BOT_TOKEN`, `CFK_TELEGRAM_CHAT_ID` | Telegram | Outbound-only alerts |

## Documentation

| Guide | Description |
|-------|-------------|
| [Getting Started](docs/01-getting-started.md) | Installation, quickstart, architecture |
| [Stock Module](docs/02-stock-module.md) | Stock API with data models |
| [Market Module](docs/03-market-module.md) | Market valuation API |
| [Macro Module](docs/04-macro-module.md) | Macro indicators API |
| [Fund Module](docs/05-fund-module.md) | Fund analysis API |
| [Commodity Module](docs/06-commodity-module.md) | Commodity API |
| [Technical Analysis](docs/07-technical-analysis.md) | TA indicators reference |
| [Collector Module](docs/08-collector-module.md) | Collector tasks, scheduler |
| [News Module](docs/09-news-module.md) | News crawlers, sites |
| [Advanced Topics](docs/10-advanced-topics.md) | Provider registry, error handling |
| [Search Module](docs/11-search-module.md) | Perplexity Search API |
| [Bond Module](docs/12-bond-module.md) | Bond listing, OHLCV, trades, and quotes |
| [Market Monitor](docs/13-market-monitor.md) | VN/US providers, backtests, unusual flow, Telegram, Docker |

## Development

```bash
cd cli
npm install
npm run build              # Build CLI TypeScript
npm run bump -- patch      # Bump version (patch|minor|major)
```

### Version Sync

[`npm run bump`](cli/src/scripts/bump-version.ts) synchronizes the Python,
npm, and plugin versions. The Codex marketplace reads the bundled plugin's
manifest version.

### Publishing

The [release workflow](.github/workflows/release.yml) creates a release when a
pull request merges into `main`, publishes Python/npm packages, and attaches
the plugin ZIP. The [publish workflow](.github/workflows/publish.yml) also handles
published GitHub releases. Pushing a tag alone does not trigger either workflow.

To publish only the Python package at the version in `pyproject.toml`, run:

```bash
gh workflow run publish.yml --repo hongbietcode/finance-kit --ref main
```

PyPI Trusted Publishing must authorize repository `hongbietcode/finance-kit`,
workflow `publish.yml`, and environment `release`. Configure a pending publisher
in [PyPI account publishing settings](https://pypi.org/manage/account/publishing/)
before the first release under a new package name. The merge-triggered release
workflow uses `release.yml` and needs its own trusted publisher.

To build the plugin archive locally, run `npm run package` inside `cli/` after
building the installer. The output is `cli/finance-kit-<version>.zip` and includes
both plugin manifests. The repository marketplace catalog is distributed with
the repository itself.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes (`git commit -m 'feat: add my feature'`)
4. Push to the branch (`git push origin feat/my-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE)

## Disclaimer

Reports generated by this toolkit are for **reference only** and do not constitute investment advice. You are responsible for your own capital allocation and risk management.
