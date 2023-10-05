BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "TokenProbabilities" (
	"id"	INTEGER,
	"token"	TEXT NOT NULL,
	"category"	TEXT NOT NULL,
	"probability"	REAL NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	UNIQUE("token","category"),
	FOREIGN KEY("category") REFERENCES "CategoryProbabilities"("category")
);
CREATE TABLE IF NOT EXISTS "CategoryProbabilities" (
	"id"	INTEGER,
	"category"	TEXT NOT NULL UNIQUE,
	"probability"	REAL NOT NULL,
	"model_name"	varchar(255),
	PRIMARY KEY("id" AUTOINCREMENT)
);
COMMIT;
