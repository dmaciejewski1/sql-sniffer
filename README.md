# sql-sniffer
 Given a string, will return an array of recognize phrases (if present within
 that string) that pertain to certain System, Data Dictionary, Anonymous Block,
 DML or DDL database function.

## Usage
A simple watchdog for sensitive Database commands and transactions.

## Installation

```
npm install sql-sniffer
```


## Recognized Phrase Patterns:
All patterns are case insensitive


### Key:

|symbol| function                                                                           |
|------|------------------------------------------------------------------------------------|
|  *   | any one of the folowing characters or combos-->   ;   '   \"  --  \   /*   \'      |
| ...  | any white space between                                                            |
| ..W..| any white space and/or words between                                               |
|   C  | any "\w" character                                                                 |



### Patterns:

#### Category: Removal

|pattern|a.k.a.|
|-------|------|
|*...truncate...table|* truncate table|
|*...drop...table|* drop table|
|*...drop...procedure|* drop procedure|
|*...drop...package|* drop package|
|*...drop...function|* drop function|
|*...drop...index|* drop index|
|*...drop...bitmap...index|* drop bitmap index|
|*...drop...unique...index|* drop unique index|
|*...drop...materialized...view|* drop materialized view|
|*...drop...view|* drop view|
|*...drop...trigger|* drop trigger|
|*...drop...type|* drop type|
|*...delete...from|* delete from|
|*...purge...table|* purge table|
|*...purge...recyclebin|* purge recyclebin|


#### Category: DDL

|pattern|a.k.a.|
|-------|------|
|*...create...or...replace|* create or replace|
|*...create...table|* create table|
|*...alter...table|* alter table|
|*...create...procedure|* create table|
|*...create...package|* create package|
|*...create...function|* create function|
|*...create...index|* create index|
|*...alter...index..W..rebuild|* alter index [TEXT HERE] rebuild|
|*...alter...index..W..rename|* alter index [TEXT HERE] rename|
|*...create...bitmap...index|* create bitmap index|
|*...create...unique..index|* create unique index|
|*...create...materialized view|* create materialized view|
|*...create...view|* create view|
|*...alter...view|* alter view|
|*...create...trigger|* create trigger|
|*...create...type...as|* create type as|


#### Category: System

|pattern|a.k.a.|
|-------|------|
|*...alter...system...set|* alter system|
|*...shutdown...normal|* shutdown normal|
|*...shutdown...immediate|* shutdown immediate|
|*...shutdown...transactional|* shutdown transactional|
|*...shutdown...abort|* shutdown abort|


#### Category: DML

|pattern|a.k.a.|
|-------|------|
|*...update...set|* update set|
|*...insert...into|* insert into|
|*...insert...all...into|* insert all into|
|*...merge...into..W..using|* merge into [TEXT HERE] using|


#### Category: Anonymous Block

|pattern|a.k.a.|
|-------|------|
|*...begin..W..;...end|begin [TEXT HERE]; end|
|*...sys.C|sys.[TEXT HERE]|
|*...execute immediate|execute immediate|
|*...&&|&&|


#### Category: Data Dictionary

|pattern|a.k.a.|
|-------|------|
|v$|v$|
|from..W..all_|from [TEXT HERE] all_|
|from..W..dba_|from [TEXT HERE] dba_|
|from..W..user_|from [TEXT HERE] user_|

#### Category: Additional Patterns

|pattern|a.k.a.|
|-------|------|
|1...=...1...--|1=1--|
|1...=...1...#|1=1#|
|1...=...1.../*|1=1/*|
|'...1...'...=...'...1...--|'1'='1--|
|admin...'...--|admin'--|
|admin...'...#|admin'#|
|admin...'.../*|admin'/*|
