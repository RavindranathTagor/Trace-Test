# Trace-Test

## Billing service

The billing service data layer lives in `services/billing/`. As of this change it
runs on **MongoDB** (via Mongoose) for schema flexibility while the billing model
(usage tiers, credits, proration) is still evolving.
