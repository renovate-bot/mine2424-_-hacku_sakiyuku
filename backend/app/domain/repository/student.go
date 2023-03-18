package repository

import (
	"errors"
	"fmt"
	"sakiyuku_backend/app/domain/entity"

	"gorm.io/gorm"
)

type Student interface {
	Exists(id uint) (bool, error)
	FindAll() (*[]entity.StudentRequest, error)
	FindByStudentEmail(studentEmail string) (*entity.Student, error)
	FindDetail(id uint) (*entity.StudentDetail, error)
	Create(s *entity.Student) (uint, error)
	CreateDetail(s *entity.StudentDetail) (uint, error)
	Update(s *entity.Student, pass string) error
	DropOut(s *entity.Student) error
	Delete(s *entity.Student) error
}

type studentRepository struct{}

func NewStudentRepository() studentRepository {
	return studentRepository{}
}

func (r *studentRepository) Exists(id uint) (bool, error) {
	var count int64
	err := dbManager.Model(&entity.Student{}).Where(&entity.Student{Model: gorm.Model{ID: id}}).Count(&count).Error
	if err != nil {
		return false, err
	}
	return (count > 0), nil
}

func (r *studentRepository) FindAll() (*[]entity.StudentRequest, error) {
	// TODO
	var sList []entity.Student
	// var s entity.Student
	err := dbManager.Find(&sList).Error
	if err != nil {
		fmt.Println("findall error:", err)
		return nil, err
	}
	var reqList []entity.StudentRequest
	fmt.Println("sList: ", sList)
	for _, val := range sList {
		sd, err := r.FindDetail(val.ID)
		if err != nil {
			fmt.Println("findall error:", err)
			continue
		}
		student := val
		detail := *sd

		req := entity.StudentRequest{
			CreatedBy:     student.CreatedBy,
			UpdatedBy:     student.UpdatedBy,
			DeletedBy:     student.DeletedBy,
			IsDeleted:     student.IsDeleted,
			Name:          student.Name,
			StudentEmail:  student.StudentEmail,
			Password:      student.Password,
			IsDropOut:     detail.IsDropOut,
			Grade:         detail.Grade,
			Class:         detail.Class,
			StudentNumber: detail.StudentNumber,
			Gender:        detail.Gender,
			Birthday:      detail.Birthday,
		}

		reqList = append(reqList, req)
	}

	return &reqList, nil
}

func (r *studentRepository) FindByStudentEmail(studentEmail string) (*entity.Student, error) {
	var s entity.Student
	err := dbManager.Where(&entity.Student{StudentEmail: studentEmail, IsDeleted: false}).First(&s).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &s, nil
}

func (r *studentRepository) FindDetail(id uint) (*entity.StudentDetail, error) {
	var s entity.StudentDetail
	err := dbManager.Where(&entity.StudentDetail{Model: gorm.Model{ID: id}}).First(&s).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &s, nil
}

func (r *studentRepository) Create(s *entity.Student) (uint, error) {
	err := dbManager.Create(s).Error
	if err != nil {
		fmt.Println("create error:", err)
		return 0, err
	}
	return s.ID, nil
}

func (r *studentRepository) CreateDetail(s *entity.StudentDetail) (uint, error) {
	err := dbManager.Create(s).Error
	if err != nil {
		return 0, err
	}
	return s.ID, nil
}

// TODO: 要修正（全て更新可能にする）
func (r *studentRepository) Update(s *entity.Student, pass string) error {
	err := dbManager.Model(&s).Update("", pass).Error
	if err != nil {
		return err
	}
	return nil
}

func (r *studentRepository) DropOut(s *entity.Student) error {
	err := dbManager.Model(&s).Update("isDropOut", true).Error
	if err != nil {
		return err
	}
	return nil
}

func (r *studentRepository) Delete(s *entity.Student) error {
	err := dbManager.Update("isDeleted", true).Delete(&s).Error
	if err != nil {
		return err
	}
	return nil
}
