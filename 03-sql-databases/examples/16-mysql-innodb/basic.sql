-- 16 — MySQL InnoDB internals

CREATE TABLE IF NOT EXISTS accounts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    balance DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB;

INSERT INTO accounts (name, balance) VALUES ('Alice', 1000.00), ('Bob', 500.00);

-- InnoDB isolation: REPEATABLE READ by default (different from PostgreSQL)
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
SELECT * FROM accounts WHERE name = 'Alice';
COMMIT;

-- SHOW ENGINE INNODB STATUS — detailed InnoDB metrics
SHOW ENGINE INNODB STATUS;

-- Inspect hidden columns
SELECT
    id,
    name,
    balance,
    DB_TRX_ID,
    DB_ROLL_PTR
FROM accounts;

-- InnoDB config
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
SHOW VARIABLES LIKE 'innodb_log_file_size';
SHOW VARIABLES LIKE 'innodb_flush_log_at_trx_commit';

-- Cleanup
DROP TABLE accounts;