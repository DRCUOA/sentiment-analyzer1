BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "app_users" (
	"id"	INTEGER,
	"username"	TEXT NOT NULL UNIQUE,
	"email"	TEXT CHECK("email" LIKE '%@%') UNIQUE,
	"password"	TEXT NOT NULL,
	"created_at"	DATETIME,
	"updated_at"	DATETIME,
	"deleted_at"	DATETIME,
	"name"	TEXT,
	"auth_token"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "category_types" (
	"id"	INTEGER,
	"type"	VARCHAR(255),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "category_frequencies" (
	"id"	INTEGER,
	"frequency_name"	VARCHAR(255),
	"frequency_number"	INTEGER,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "category_groups" (
	"id"	INTEGER,
	"group_name"	VARCHAR(255),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "categories" (
	"category_id"	VARCHAR(255),
	"category_name"	VARCHAR(255),
	"category_type_id"	INTEGER,
	"category_frequency_id"	INTEGER,
	"category_description"	VARCHAR(1000),
	"category_group_id"	INTEGER,
	"category_keywords"	VARCHAR(2000),
	PRIMARY KEY("category_id"),
	FOREIGN KEY("category_type_id") REFERENCES "category_types"("id"),
	FOREIGN KEY("category_group_id") REFERENCES "category_groups"("id"),
	FOREIGN KEY("category_frequency_id") REFERENCES "category_frequencies"("id")
);
CREATE TABLE IF NOT EXISTS "accounts" (
	"account_id"	INTEGER,
	"account_name"	TEXT,
	"account_type"	TEXT,
	"account_description"	TEXT,
	"initial_balance"	REAL,
	"current_balance"	REAL,
	PRIMARY KEY("account_id")
);
CREATE TABLE IF NOT EXISTS "reconciliations" (
	"reconciliation_id"	INTEGER,
	"account_id"	INTEGER NOT NULL,
	"transaction_id"	INTEGER NOT NULL,
	"reconciliation_date"	DATETIME DEFAULT CURRENT_TIMESTAMP,
	"notes"	TEXT,
	"document_reference"	TEXT,
	"starting_balance"	REAL,
	"ending_balance"	REAL,
	"unreconciled_balance"	REAL,
	"total_reconciled_from_previous_reconciliations"	REAL DEFAULT 0,
	"reconciliation_status"	TEXT DEFAULT 'open' CHECK("reconciliation_status" IN ('open', 'closed')),
	PRIMARY KEY("reconciliation_id" AUTOINCREMENT),
	FOREIGN KEY("account_id") REFERENCES "accounts"("account_id"),
	FOREIGN KEY("transaction_id") REFERENCES "transactions"("serial_number")
);
CREATE TABLE IF NOT EXISTS "transaction_audit" (
	"audit_id"	TEXT,
	"serial_number"	INTEGER,
	"account_id"	INTEGER,
	"transaction_date"	DATE,
	"transaction_amount"	REAL,
	"balance_after_transaction"	REAL,
	PRIMARY KEY("audit_id"),
	FOREIGN KEY("account_id") REFERENCES "accounts"("account_id"),
	FOREIGN KEY("serial_number") REFERENCES "transactions"("serial_number")
);
CREATE TABLE IF NOT EXISTS "transactions" (
	"transaction_stamp"	TEXT,
	"account_id"	INTEGER,
	"transaction_type"	TEXT CHECK("transaction_type" IN ('income', 'expense')),
	"transaction_date"	DATE,
	"details"	TEXT,
	"amount"	REAL,
	"particulars"	TEXT,
	"code"	TEXT,
	"reference"	TEXT,
	"foreign_currency_amount"	REAL,
	"conversion_charge"	REAL,
	"transfer_type"	TEXT,
	"budget_cat_id"	VARCHAR(255),
	"uuid"	TEXT,
	"serial_number"	INTEGER,
	"reconciliation_status"	TEXT DEFAULT 'false',
	"balance_audit_id"	varchar(255),
	"created_by"	INTEGER,
	PRIMARY KEY("serial_number"),
	FOREIGN KEY("created_by") REFERENCES "app_users"("id"),
	FOREIGN KEY("budget_cat_id") REFERENCES "categories"("category_id"),
	FOREIGN KEY("account_id") REFERENCES "accounts"("account_id")
);
COMMIT;
