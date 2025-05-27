export enum DatabaseModelNames {
  Branch_Model = "branches",
  Table_Model = "tables",
  Order_Model = "orders",
  MenuItem_Model = "menu_items",
  Session_Model = "sessions",
}

export enum DocumentStatus {
  NEW = "NEW",
  UPDATED = "UPDATED",
  DELETED = "DELETED",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum TableStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  RESERVED = "RESERVED",
}

export enum OrderStatus {
  pending = "pending",
  preparing = "preparing",
  ready = "ready",
  completed = "completed",
  cancelled = "cancelled",
  delivered = "delivered",
}

export enum OrderType {
  dine_in = "dine_in",
  takeaway = "takeaway",
  delivery = "delivery",
}

export enum PaymentStatus {
  pending = "pending",
  processing = "processing",
  paid = "paid",
  failed = "failed",
  cancelled = "cancelled",
  refunded = "refunded",
}

export enum PaymentMethod {
  paypal = "paypal",
  debit_card = "debit_card",
  credit_card = "credit_card",
  apple_pay = "apple_pay",
  google_pay = "google_pay",
  instapay = "instapay",
  vodafone_cash = "vodafone_cash",
  valu = "valu",
  cash = "cash",
  bank_installments = "bank_installments",
}

export enum TransactionStatus {
  pending = "pending",
  completed = "completed",
  failed = "failed",
}

export enum TableType {
  INDOOR = "INDOOR",
  OUTDOOR = "OUTDOOR",
}

export enum SupplierStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum PaymentTerms {
  CASH = "CASH",
  CREDIT = "CREDIT",
  BANK_TRANSFER = "BANK_TRANSFER",
}
