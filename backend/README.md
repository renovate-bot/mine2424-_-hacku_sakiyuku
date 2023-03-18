# sakiyuku_backend

## 環境

- Golang
- Gin
- Gorm
- MySQL

※ 余裕が出てきたら Docker を導入します

## デプロイ環境

- Google App Engine
- Google Cloud SQL

## ローカルでの実行方法

```sh
### ----- Dockerを使用しないパターン ----- ###
# local環境でのmysqlのデータベース作成
mysql -u root -p

# ここでもしDB(sakiyuku_db)がなければ作成する
mysql > show databases;

mysql > create database sakiyuku_db;

# テーブルの作成
mysql -u root -p sakiyuku_db < ./sql/create_table.sql

# データの挿入
mysql -u root -p sakiyuku_db < ./sql/insert_data.sql

# ローカルでの実行
cd ./backend
go run app/main.go

```

## ディレクトリ構成

```
├── app
│   ├── application_service
│   │   └── xxx.go
│   ├── config(定数や静的な関数が集約)
│   │   └── xxx.go
│   ├── domain
│   │   ├── entity
│   │   │   └── xxx.go
│   │   ├── repository
│   │   │   └── xxx.go
│   │   └── domain_service
│   │       └── xxx.go
│   ├── server(DB,APIに直接関連するものが集約)
│   │   └── xxx.go
│   ├── main.go
```
