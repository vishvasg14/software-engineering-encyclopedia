# Influential Database Papers

This file catalogs the foundational papers and research that inform the SQL & Databases document.

## Foundational papers

### The relational model <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23the-relational-model%0A%0ASection%20title%3A%20The%20relational%20model" target="_blank" rel="noopener" data-askgpt="The relational model" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/papers.md#the-relational-model" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23the-relational-model%0A%0ASection%20title%3A%20The%20relational%20model" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23the-relational-model%0A%0ASection%20title%3A%20The%20relational%20model" title="Ask ChatGPT about this section">💬</a>

- **"A Relational Model of Data for Large Shared Data Banks"** — Edgar F. Codd. *Communications of the ACM, 1970.*
  - The paper that invented the relational model.
  - Defined tuples, relations, relational algebra.
  - <https://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf>

### Transaction processing <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23transaction-processing%0A%0ASection%20title%3A%20Transaction%20processing" target="_blank" rel="noopener" data-askgpt="Transaction processing" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/papers.md#transaction-processing" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23transaction-processing%0A%0ASection%20title%3A%20Transaction%20processing" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23transaction-processing%0A%0ASection%20title%3A%20Transaction%20processing" title="Ask ChatGPT about this section">💬</a>

- **"ARIES: A Transaction Recovery Method Supporting Fine-Granularity Locking and Partial Rollbacks"** — Mohan, Hader, Lindsay, Pirahesh, Schwarz. *ACM TODS, 1992.*
  - The algorithm behind almost every modern database's recovery (write-ahead logging, fuzzy checkpoints, restart from log).
  - <https://www.cs.berkeley.edu/~brewer/cs262/Aries.pdf>

- **"The Notion of Consistency and Other Topics in Transaction Processing"** — Gray, Helland, McJones. *1976.*
  - Discusses ACID properties, isolation levels.

### Concurrency control <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23concurrency-control%0A%0ASection%20title%3A%20Concurrency%20control" target="_blank" rel="noopener" data-askgpt="Concurrency control" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/papers.md#concurrency-control" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23concurrency-control%0A%0ASection%20title%3A%20Concurrency%20control" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23concurrency-control%0A%0ASection%20title%3A%20Concurrency%20control" title="Ask ChatGPT about this section">💬</a>

- **"Granularity of Locks and Degrees of Consistency in a Shared Data Base"** — Gray, Lorie, Putzolu. *1975.*
  - Defines isolation levels, lock granularity, phantoms.

- **"On Optimistic Methods for Concurrency Control** — Kung, Robinson. *ACM TODS, 1981.*
  - Optimistic concurrency control vs pessimistic.

### Multi-version concurrency control (MVCC) <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23multi-version-concurrency-control-mvcc%0A%0ASection%20title%3A%20Multi-version%20concurrency%20control%20(MVCC)" target="_blank" rel="noopener" data-askgpt="Multi-version concurrency control (MVCC)" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/papers.md#multi-version-concurrency-control-mvcc" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23multi-version-concurrency-control-mvcc%0A%0ASection%20title%3A%20Multi-version%20concurrency%20control%20(MVCC)" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23multi-version-concurrency-control-mvcc%0A%0ASection%20title%3A%20Multi-version%20concurrency%20control%20(MVCC)" title="Ask ChatGPT about this section">💬</a>

- **"Multiversion Concurrency Control—Theory and Algorithms"** — Bernstein, Hadzilacos, Goodman. *ACM Computing Surveys, 1983.*

- **"An Efficient Multiversion Access Structure"** — Driscoll, Sarnak, Sleator, Tarjan. *1986.*

### ACID <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23acid%0A%0ASection%20title%3A%20ACID" target="_blank" rel="noopener" data-askgpt="ACID" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/papers.md#acid" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23acid%0A%0ASection%20title%3A%20ACID" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23acid%0A%0ASection%20title%3A%20ACID" title="Ask ChatGPT about this section">💬</a>

- **"Principles of Transaction-Oriented Database Recovery"** — Haerder, Reuter. *ACM Computing Surveys, 1983.*
  - The "ACID" acronym originates here.

## Storage and access methods

- **"Organization and Maintenance of Large Ordered Indexes"** — Bayer, McCreight. *1972.*
  - The B-tree paper.

- **"The R*-Tree: An Efficient and Robust Access Method for Points and Rectangles"** — Beckmann, Kriegel, Schneider, Seeger. *1990.*

### Log-structured merge-trees (LSM) <a class="askgpt-btn" href="https://chatgpt.com/?prompt=Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23log-structured-merge-trees-lsm%0A%0ASection%20title%3A%20Log-structured%20merge-trees%20(LSM)" target="_blank" rel="noopener" data-askgpt="Log-structured merge-trees (LSM)" data-askgpt-url="https://github.com/vishvasg14/software-engineering-encyclopedia/blob/main/03-sql-databases/references/papers.md#log-structured-merge-trees-lsm" data-askgpt-prompt-depth="Read%20this%20section%20of%20my%20encyclopedia%20and%20explain%20it%20in%20depth%20with%20concrete%20examples%2C%20the%20main%20trade-offs%2C%20and%20common%20pitfalls%20a%20practitioner%20should%20know%3A%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23log-structured-merge-trees-lsm%0A%0ASection%20title%3A%20Log-structured%20merge-trees%20(LSM)" data-askgpt-prompt-examples="Read%20this%20section%20of%20my%20encyclopedia%20and%20give%20me%202-3%20real-world%20production%20examples%20for%20it.%20For%20each%3A%20what%20went%20right%2C%20what%20went%20wrong%2C%20and%20the%20lessons%20learned.%20Include%20company%20%2F%20project%20names%20if%20relevant.%0A%0Ahttps%3A%2F%2Fgithub.com%2Fvishvasg14%2Fsoftware-engineering-encyclopedia%2Fblob%2Fmain%2F03-sql-databases%2Freferences%2Fpapers.md%23log-structured-merge-trees-lsm%0A%0ASection%20title%3A%20Log-structured%20merge-trees%20(LSM)" title="Ask ChatGPT about this section">💬</a>

- **"The Log-Structured Merge-Tree (LSM-Tree)"** — O'Neil, Cheng, Gawlick, O'Neil. *1996.*
  - The basis for modern write-optimized stores (LevelDB, RocksDB, Cassandra).

## Query optimization

- **"Access Path Selection in a Relational Database Management System"** — Selinger, Astrahan, Chamberlin, Lorie, Price. *SIGMOD 1979.*
  - System R's optimizer; the foundation of cost-based optimization.
  - Introduces join ordering via dynamic programming.

- **"Query Optimization"** — Ioannidis. *ACM Computing Surveys, 1996.*

## Distributed databases

- **"Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services"** — Gilbert, Lynch. *2002.*
  - The CAP theorem proof.

- **"BASE: An Acid Alternative"** — Pritchett. *ACM Queue, 2008.*
  - The BASE acronym (Basically Available, Soft state, Eventual consistency).

- **"Paxos Made Simple"** — Lamport. *2001.*
  - The canonical Paxos paper.

- **"In Search of an Understandable Consensus Algorithm"** — Ongaro, Ousterhout. *USENIX ATC 2014.*
  - The Raft paper.

- **"Dynamo: Amazon's Highly Available Key-value Store"** — DeCandia, Hastorun, Jampani, Kakulapati, Lakshman, Pilchin, Sivasubramanian, Vosshall, Vogels. *SOSP 2007.*
  - Inspired DynamoDB, Riak, Cassandra.

- **"Spanner: Google's Globally-Distributed Database"** — Corbett, Dean, Epstein, Fikes, Frost, Furman, Ghemawat, Gubarev, Heiser, Hochschild, Hsieh, Kanthak, Kogan, Li, Lloyd, Melnik, Mwaura, Narkhede, Quigley, Rea, Rodes-Tanguay, Rollins, Sussman, Theimer, To, Wahli, Wellings. *OSDI 2012.*
  - External consistency via TrueTime.

- **"F1: A Distributed SQL Database That Scales"** — Shute, Oancea, Bodrin, Ercegovac, Faleev, Gershony, Györödi, Jin, Hodász, Iyer, Jigilevich, Kalmuk, Knafel, Krueger, Langenborg, Lee, Ly, Mallipeddi, Moser, Melts, Noetzli, Ovchar, Paganelli, Peschke, Ravindran, Roy, Saha, Sankaran, Schmitt, Seibold, Shoa, Socko, Sun, Volkov, Wang, Wong, Yan, Ylonen. *VLDB 2013.*
  - Google's Spanner-based F1 (now Spanner SQL).

- **"TAO: Facebook's Distributed Data Store for the Social Graph"** — Bronson, Amsden, Cabrera, Chakka, Dimov, Ding, Ferris, Giardullo, Kulkarni, Li, Marchukov, Petrov, Puzar, Song, Venkataramani. *USENIX ATC 2013.*

## Database internals reference books

- *Database Internals: A Deep Dive into How Distributed Data Systems Work* — Alex Petrov (No Starch Press, 2019).
  - Covers storage engines, B-trees, log-structured storage, distributed transactions, consensus.
  - The most current canonical reference.

- *Transaction Processing: Concepts and Techniques* — Jim Gray, Andreas Reuter (Morgan Kaufmann, 1993).
  - Out of print but referenced everywhere; covers transaction processing deeply.

- *Readings in Database Systems* — Peter Bailis, Joseph Hellerstein, Michael Stonebraker (online, periodically updated).
  - <https://www.redbook.io/>
  - The "Red Book" — collected papers.

- *Concurrency Control and Recovery in Database Systems* — Philip Bernstein, Vassos Hadzilacos, Nathan Goodman (1987).
  - Free online.
  - <https://www.microsoft.com/en-us/research/people/philbe/_curvebook.aspx>

## Books on PostgreSQL

- *PostgreSQL: Up and Running* — Regina Obe, Leo Hsu (O'Reilly).
- *PostgreSQL 16 Administration Cookbook* — Gianni Ciolli, Boriss Mejias (Packt).
- *Mastering PostgreSQL 16* — Hans-Jürgen Schönig (Packt).

## Books on data systems

- *Designing Data-Intensive Applications* — Martin Kleppmann (O'Reilly).
  - The definitive book on distributed data systems; covers databases, replication, partitioning, transactions, consensus, stream processing.

- *Database Design for Mere Mortals* — Hernandez (Addison-Wesley).
- *SQL Antipatterns* — Bill Karwin (Pragmatic Programmers).
- *Use The Index, Luke!* — Markus Winand (free online).
- *SQL Performance Explained* — Markus Winand.

## Engineering blogs

- **PostgreSQL:** <https://www.postgresql.org/docs/>
- **Citus Data (now part of Microsoft):** <https://www.citusdata.com/blog/>
- **Crunchy Data:** <https://www.crunchydata.com/blog>
- **PgAnalyze:** <https://pganalyze.com/blog>
- **Percona Database Performance Blog:** <https://www.percona.com/blog/>
- **Planet PostgreSQL:** <https://planet.postgresql.org/>
- **MySQL Server Team blog:** <https://mysqlserverteam.com/>
- **Vitess blog:** <https://vitess.io/blog/> (MySQL sharding)
- **Planet Cassandra:** <https://cassandra.apache.org/planet/>
- **MongoDB Engineering blog:** <https://www.mongodb.com/blog>

## Conference proceedings

- **SIGMOD** — ACM Special Interest Group on Management of Data.
- **VLDB** — Very Large Data Bases.
- **ICDE** — International Conference on Data Engineering.
- **CIDR** — Conference on Innovative Data Systems Research.
- **OSDI, SOSP** — Operating systems (distributed systems papers often appear here).
- **NSDI** — Networked Systems Design and Implementation.

## Free online courses

- **CMU 15-445: Database Systems** — Andy Pavlo (YouTube).
  - The gold standard for learning database internals.
- **Stanford CS 245** — Database Systems Principles (videos online).
- **6.830: Database Systems** — MIT (older).
- **Hogwarts School of Database Wizardry (PGCon tutorials):** <https://www.youtube.com/c/pgcon>

## Blog posts

- **"What I wish someone had told me about Postgres"** — Phil Booth.
- **"How does MVCC work in Postgres?"** — Various (Alex Ignatov, etc.).
- **"Why Uber switched from Postgres to MySQL"** — <https://eng.uber.com/postgres-to-mysql-migration/>
  - Note: Uber later moved some workloads back; the post is a great historical document.
- **"PostgreSQL at GitLab"** — Various.
- **"Discord's Trillions of Messages"** — <https://discord.com/blog/how-discord-stores-billions-of-messages>
- **"Why Discord is sticking with MongoDB"** — various.

## Standards documents

- **ANSI/ISO SQL standards** (commercial, see `references/sql-standard.md`).
- **PostgreSQL documentation** (free, see `references/postgresql-docs.md`).
- **MySQL Reference Manual** (free, see `references/innodb.md`).
- **MongoDB Manual** (free, see `references/mongodb.md`).
- **Redis Documentation** (free, see `references/redis.md`).