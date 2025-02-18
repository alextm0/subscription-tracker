import mongoose from "mongoose";

export const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
    min: [0, "Price must be greater than 0"],
  },
  currency: {
    type: String,
    enum: ["usd", "eur", "gbp"],
    default: "usd",
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly", "yearly"],
    required: true,
  },
  category: {
    type: String,
    enum: ["entertainment", "health", "lifestyle", "tech", "education", "other"],
    required: [true, "Please provide a category"],
  },
  paymentMethod: {
    type: String,
    required: [true, "Please provide a payment method"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["active", "cancelled", "expired"],
    default: "active",
  },
  startDate: {
    type: Date,
    required: [true, "Please provide a start date"],
  },
  renewalDate: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, // Index this field for faster query performance
  },
}, { timestamps: true });

// Auto-calculate renewal date based on frequency and update status
subscriptionSchema.pre("save", function (next) {
  const renewalPeriods = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365,
  };

  if (!this.renewalDate) {
    // If no renewal date, calculate it based on startDate
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  // 🔄 If renewalDate is in the past, move it forward to the next valid cycle
  while (this.renewalDate < new Date()) {
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  // ✅ Prevents new subscriptions from immediately expiring
  if (!this.isNew && this.renewalDate < new Date()) {
    this.status = "expired";
  } else {
    this.status = "active";
  }

  next();
});


const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
