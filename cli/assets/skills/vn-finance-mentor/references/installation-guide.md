# vn-finance-mentor Python Package Installation Guide

Always install **latest version**. Check first: if `.venv/` exists and `import claude_finance_kit` works, upgrade instead.

```bash
pip install -U vn-finance-mentor              # Core (upgrade to latest)
pip install -U "vn-finance-mentor[all]"       # All optional dependencies
pip install -U "vn-finance-mentor[ta]"        # + Technical analysis
pip install -U "vn-finance-mentor[collector]" # + Batch data collector
pip install -U "vn-finance-mentor[news]"      # + News crawlers
pip install -U "vn-finance-mentor[search]"    # + Perplexity web search
```

Requires Python >= 3.10.

## Environment Variables

| Variable             | Required               | Description            |
| -------------------- | ---------------------- | ---------------------- |
| `FMP_API_KEY`        | Only for FMP source    | Global stocks (non-VN) |
| `PERPLEXITY_API_KEY` | Only for Search module | Perplexity web search  |

## Source Fallback

If VCI returns 403 (common on cloud IPs): `Stock("FPT", source="KBS")`
