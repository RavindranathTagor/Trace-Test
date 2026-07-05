// Billing service data layer.
// Migrating off Postgres to MongoDB for schema flexibility as the billing model
// keeps evolving (usage tiers, credits, proration). Uses Mongoose for the ODM.

const mongoose = require("mongoose");

const MONGO_URI = process.env.BILLING_MONGO_URI || "mongodb://localhost:27017/billing";

async function connect() {
  await mongoose.connect(MONGO_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });
  return mongoose.connection;
}

const invoiceSchema = new mongoose.Schema(
  {
    accountId: { type: String, index: true, required: true },
    amountCents: { type: Number, required: true },
    currency: { type: String, default: "usd" },
    status: { type: String, enum: ["draft", "open", "paid", "void"], default: "draft" },
    lineItems: { type: Array, default: [] }, // flexible shape while the model evolves
  },
  { timestamps: true },
);

const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);

module.exports = { connect, Invoice };
