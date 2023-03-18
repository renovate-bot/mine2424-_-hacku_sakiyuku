package repository

import (
	"fmt"
	"sakiyuku_backend/app/config"
	"sakiyuku_backend/app/domain/entity"

	gmysql "gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	// Instance of connected database
	dbManager *gorm.DB
)

func InitDB() error {
	fmt.Println("DB connecting")
	dbUser := config.GetenvOrDefault("DB_USER", "sakiyuku")
	dbPwd := config.GetenvOrDefault("DB_PASS", "password")
	dbName := config.GetenvOrDefault("DB_NAME", "sakiyuku_db")
	instanceConnectionName := config.GetenvOrDefault("INSTANCE_CONNECTION_NAME", "127.0.0.1:3306")
	isDebug := config.GetenvOrDefault("APP_ENV", "dev")

	fmt.Println(instanceConnectionName)

	if isDebug == "dev" {
		if err := connectLocalDB(dbUser, dbPwd, dbName, instanceConnectionName); err != nil {
			fmt.Println(err)
			return err
		}
	} else if isDebug == "prod" {
		if err := connectCloudSQLUsingUnix(instanceConnectionName, dbUser, dbPwd, dbName); err != nil {
			fmt.Println(err)
			return err
		}
	}

	dbManager.AutoMigrate(&entity.Student{}, &entity.StudentDetail{}, &entity.StudentRequest{})
	fmt.Println("DB connected")
	return nil
}

func connectLocalDB(dbUser, dbPwd, dbName, instanceConnectionName string) error {
	fmt.Println("connecting localSQL")
	dbURI := fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true", dbUser, dbPwd, instanceConnectionName, dbName)
	db, err := gorm.Open(gmysql.Open(dbURI), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("gorm.Open: %v", err)
	}
	dbManager = db
	fmt.Println("connected localSQL")
	return nil
}

func connectCloudSQLUsingUnix(instanceConnectionName, dbUser, dbPwd, dbName string) error {
	fmt.Println("connecting cloudSQL unix")

	// MySQL Connection, comment out to use PostgreSQL.
	// connection string format: USER:PASSWORD@unix(/cloudsql/PROJECT_ID:REGION_ID:INSTANCE_ID)/[DB_NAME]
	dbURI := fmt.Sprintf("%s:%s@unix(%s/%s)/%s", dbUser, dbPwd, "/cloudsql", instanceConnectionName, dbName)
	var err error
	dbManager, err = gorm.Open(gmysql.Open(dbURI), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("sql.Open: %v", err)
	}

	return nil
}

// func connectCloudSQLUsingconnector(instanceConnectionName, isDebug, dbUser, dbPwd, dbName string) error {
// 	fmt.Println("connecting cloudSQL connector")
// 	d, err := cloudsqlconn.NewDialer(context.Background())
// 	if err != nil {
// 		return fmt.Errorf("cloudsqlconn.NewDialer: %v", err)
// 	}
// 	var opts []cloudsqlconn.DialOption
// 	if isDebug != "dev" {
// 		opts = append(opts, cloudsqlconn.WithPrivateIP())
// 	}
// 	mysql.RegisterDialContext("cloudsqlconn",
// 		func(ctx context.Context, addr string) (net.Conn, error) {
// 			return d.Dial(ctx, instanceConnectionName, opts...)
// 		})
//
// 	dbURI := fmt.Sprintf("%s:%s@cloudsqlconn(localhost:3306)/%s?parseTime=true", dbUser, dbPwd, dbName)
//
// 	dbManager, err = gorm.Open(gmysql.Open(dbURI), &gorm.Config{})
// 	if err != nil {
// 		return fmt.Errorf("sql.Open: %v", err)
// 	}
//
// 	fmt.Println("connected cloudSQL!")
// 	return nil
// }
