package entity

import (
	"database/sql/driver"
	"fmt"
	"time"

	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
	CreatedBy    string `gorm:"type:varchar(50);not null" json:"createdBy"`
	UpdatedBy    string `gorm:"type:varchar(50);not null" json:"updatedBy"`
	DeletedBy    string `gorm:"type:varchar(50);not null" json:"deletedBy"`
	IsDeleted    bool   `gorm:"type:tinyint;not null" json:"-"`
	Name         string `gorm:"type:varchar(50);not null" json:"name"`
	StudentEmail string `gorm:"type:varchar(50);not null" json:"studentEmail"`
	Password     string `gorm:"type:varchar(255);not null" json:"-"`
}

type StudentDetail struct {
	gorm.Model
	CreatedBy     string `gorm:"type:varchar(50);not null" json:"createdBy"`
	UpdatedBy     string `gorm:"type:varchar(50);not null" json:"updatedBy"`
	DeletedBy     string `gorm:"type:varchar(50);not null" json:"deletedBy"`
	IsDeleted     bool   `gorm:"type:tinyint;not null" json:"-"`
	IsDropOut     bool   `gorm:"type:tinyint;not null" json:"isDropOut"`
	Grade         int    `gorm:"type:int;not null" json:"grade"`
	Class         int    `gorm:"type:int;not null" json:"class"`
	StudentNumber int    `gorm:"type:int;not null" json:"studentNumber"`
	Gender        Gender `gorm:"type:enum('Male','Female','Unknown');not null" json:"gender"`
	Birthday      Date   `gorm:"type:date;not null" json:"birthday"`
	StudentID     int    `gorm:"not null" json:"-"`
	Student       Student
}

// AutoMigrateでDBのマイグレーションを実行
// studentsテーブルとstudent_detailsテーブルを作成し、外部キー制約を設定
// db.AutoMigrate(&Student{}, &StudentDetail{})
// db.Model(&StudentDetail{}).AddForeignKey("student_id", "students(id)", "CASCADE", "CASCADE")

type StudentRequest struct {
	gorm.Model
	CreatedBy string `gorm:"type:varchar(50);not null" json:"createdBy"`
	UpdatedBy string `gorm:"type:varchar(50);not null" json:"updatedBy"`
	DeletedBy string `gorm:"type:varchar(50);not null" json:"deletedBy"`
	IsDeleted bool   `gorm:"type:tinyint;not null" json:"-"`

	Name          string `gorm:"type:varchar(50);not null" json:"name"`
	StudentEmail  string `gorm:"type:varchar(50);not null" json:"studentEmail"`
	Password      string `gorm:"type:varchar(255);not null" json:"-"`
	IsDropOut     bool   `gorm:"type:tinyint;not null" json:"isDropOut"`
	Grade         int    `gorm:"type:int;not null" json:"grade"`
	Class         int    `gorm:"type:int;not null" json:"class"`
	StudentNumber int    `gorm:"type:int;not null" json:"studentNumber"`
	Gender        Gender `gorm:"type:enum('Male','Female','Unknown');not null" json:"gender"`
	Birthday      Date   `gorm:"type:date;not null" json:"birthday"`
}

func (sr *StudentRequest) FromJSON(s *Student, sd *StudentDetail) StudentRequest {
	return StudentRequest{
		Model:     s.Model,
		CreatedBy: s.CreatedBy,
		UpdatedBy: s.UpdatedBy,
		DeletedBy: s.DeletedBy,
		IsDeleted: s.IsDeleted,

		Name:          s.Name,
		StudentEmail:  s.StudentEmail,
		Password:      s.Password,
		IsDropOut:     sd.IsDropOut,
		Grade:         sd.Grade,
		Class:         sd.Class,
		StudentNumber: sd.StudentNumber,
		Gender:        Gender(sd.Gender),
		Birthday:      Date{Time: sd.Birthday.Time},
	}
}

func (s *Student) TableNameInStudent() string {
	return "students"
}

func (d *Date) UnmarshalJSONInStudent(b []byte) error {
	var err error
	d.Time, err = time.Parse("\"2006-01-02\"", string(b))
	return err
}

func (d Date) MarshalJSONInStudent() ([]byte, error) {
	return []byte(fmt.Sprintf("\"%s\"", d.Time.Format("2006-01-02"))), nil
}

func (d *Date) ScanInStudent(value any) error {
	d.Time = value.(time.Time)
	return nil
}

func (d Date) ValueInStudent() (driver.Value, error) {
	return d.Time, nil
}
