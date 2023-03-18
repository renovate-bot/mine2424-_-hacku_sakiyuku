package application_service

import (
	"fmt"
	"net/http"
	"sakiyuku_backend/app/config"
	"sakiyuku_backend/app/domain/entity"
	"sakiyuku_backend/app/domain/repository"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Student interface {
	Register(c *gin.Context)
	FindAll(c *gin.Context)
	FindByStudentEmail(c *gin.Context)
	Delete(c *gin.Context)
	Update(c *gin.Context)
	DropOut(c *gin.Context)
}

type studentHandler struct {
	repo repository.Student
}

func NewStudentHandler(sr repository.Student) Student {
	return &studentHandler{
		repo: sr,
	}
}

// Register is execute registration of account
// @Summary Execute registration of account
// @Tags Authenticate
// @Accept  json
// @Produce json
// @Param data body entity.RegistrationUser true "request data"
// @Success 201 {object} entity.GeneratedPassword
// @Failure 400 {object} entity.Error
// @Failure 404 {object} entity.Error
// @Failure 405 {object} entity.Error
// @Router /v1/users [post]
func (h *studentHandler) Register(c *gin.Context) {
	var p entity.StudentRequest
	if err := c.ShouldBindJSON(&p); err != nil {
		config.ErrorBadRequest(c, config.ErrValidationFailed)
		return
	}

	// Check the same account already exists
	if res, err := h.repo.Exists(p.ID); err != nil {
		config.ErrorInternalServerError(c, err)
		return
	} else if res {
		config.ErrorBadRequest(c, config.ErrExistsAccount)
		return
	}

	// TODO: firebase authで認証されたユーザーのみ登録できるようにする

	s := entity.Student{
		Model: gorm.Model{
			ID:        p.ID,
			CreatedAt: p.CreatedAt,
			UpdatedAt: p.UpdatedAt,
			DeletedAt: p.DeletedAt,
		},
		CreatedBy: p.CreatedBy,
		UpdatedBy: p.UpdatedBy,
		DeletedBy: p.DeletedBy,
		IsDeleted: p.IsDeleted,

		Name:         p.Name,
		Password:     p.Password,
		StudentEmail: p.StudentEmail,
	}

	sd := entity.StudentDetail{
		Model: gorm.Model{
			ID:        p.ID,
			CreatedAt: p.CreatedAt,
			UpdatedAt: p.UpdatedAt,
			DeletedAt: p.DeletedAt,
		},
		CreatedBy: p.CreatedBy,
		UpdatedBy: p.UpdatedBy,
		DeletedBy: p.DeletedBy,
		IsDeleted: p.IsDeleted,

		IsDropOut:     p.IsDropOut,
		Grade:         p.Grade,
		Class:         p.Class,
		StudentNumber: p.StudentNumber,
		Gender:        p.Gender,
		Birthday:      p.Birthday,
	}

	var sID uint
	var err error
	if sID, err = h.repo.Create(&s); err != nil {
		config.ErrorInternalServerError(c, err)
		return
	}

	if _, err = h.repo.CreateDetail(&sd); err != nil {
		config.ErrorInternalServerError(c, err)
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "success",
		"ID":      sID,
	})

}

func (h *studentHandler) FindAll(c *gin.Context) {
	var list []entity.StudentRequest
	// INFO: https://github.com/gin-gonic/gin/issues/715
	err := c.Bind(list)
	if err != nil {
		fmt.Println("findall bind error: ", err)
		c.AbortWithError(400, err)
		return
	}
	// if err := c.ShouldBindJSON(&list); err != nil {
	// 	fmt.Println("findall bind error: ", err)
	// 	config.ErrorBadRequest(c, config.ErrValidationFailed)
	// 	return
	// }

	reqList, err := h.repo.FindAll()
	if err != nil {
		fmt.Println("reqlist findall bind error: ", err)
		config.ErrorInternalServerError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":        "success",
		"studentReqests": *reqList,
	})
}

func (h *studentHandler) FindByStudentEmail(c *gin.Context) {
	var p entity.StudentRequest
	if err := c.ShouldBindJSON(&p); err != nil {
		config.ErrorBadRequest(c, config.ErrValidationFailed)
		return
	}

	student, err := h.repo.FindByStudentEmail(p.StudentEmail)
	if err != nil {
		config.ErrorInternalServerError(c, err)
		return
	}

	detail, err := h.repo.FindDetail(student.ID)
	if err != nil {
		config.ErrorInternalServerError(c, err)
		return
	}

	srd := p.FromJSON(student, detail)

	c.JSON(http.StatusOK, gin.H{
		"message":       "success",
		"studentReqest": srd,
	})
}

func (h *studentHandler) Update(c *gin.Context) {
	// TODO: Update
}

func (h *studentHandler) Delete(c *gin.Context) {
	// TODO: Delete
}

func (h *studentHandler) DropOut(c *gin.Context) {
	// TODO: DropOut
}
