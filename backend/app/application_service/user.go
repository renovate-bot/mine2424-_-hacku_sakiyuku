package application_service

import (
	"errors"
	"net/http"
	"sakiyuku_backend/app/config"
	"sakiyuku_backend/app/domain/entity"
	"sakiyuku_backend/app/domain/repository"

	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/sirupsen/logrus"
)

// User is action handler about user data
type User interface {
	Register(c *gin.Context)
	Activate(c *gin.Context)
	Identity(c *gin.Context)
}

type userHandler struct {
	repo repository.User
}

// NewUserHandler is create action handler for user
func NewUserHandler(ur repository.User) User {
	return &userHandler{
		repo: ur,
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
func (h *userHandler) Register(c *gin.Context) {
	var p entity.RegistrationUser
	if err := c.ShouldBindJSON(&p); err != nil {
		var verr validator.ValidationErrors
		if errors.As(err, &verr) {
			config.ErrorBadRequest(c, config.ValidationErrors(verr, &p))
			return
		}
		config.ErrorBadRequest(c, config.ErrValidationFailed)
		return
	}

	// Check the same account already exists
	if res, err := h.repo.Exists(p.Account); err != nil {
		config.ErrorInternalServerError(c, err)
		return
	} else if res {
		config.ErrorBadRequest(c, config.ErrExistsAccount)
		return
	}

	t, err := time.Parse(p.Birthday, "2006-01-02")
	if err != nil {
		config.ErrorInternalServerError(c, err)
		return
	}

	u := entity.User{
		Account:     p.Account,
		Name:        p.Name,
		Gender:      entity.Gender(p.Gender),
		MailAddress: p.MailAddress,
		Birthday:    entity.Date{Time: t},
	}

	if p.Role != nil {
		u.Role = entity.Role(*p.Role)
	}

	pass, err := h.repo.Create(&u)
	if err != nil {
		config.ErrorInternalServerError(c, err)
		return
	}

	c.JSON(http.StatusCreated, entity.GeneratedPassword{
		Password: pass,
	})
}

// Activate is enable account with update password
// @Summary Enable account with update password
// @Tags Authenticate
// @Accept  json
// @Produce json
// @Param data body entity.Activate true "request data"
// @Success 200
// @Failure 400 {object} entity.Error
// @Failure 404 {object} entity.Error
// @Failure 405 {object} entity.Error
// @Router /v1/activate [post]
func (h *userHandler) Activate(c *gin.Context) {
	// Execute validation
	var a entity.Activate
	if err := c.ShouldBindJSON(&a); err != nil {
		var verr validator.ValidationErrors
		if errors.As(err, &verr) {
			config.ErrorBadRequest(c, config.ValidationErrors(verr, &a))
			return
		}
		config.ErrorBadRequest(c, config.ErrValidationFailed)
		return
	}

	// Deny change to same password
	if a.Password == a.NewPassword {
		config.ErrorBadRequest(c, config.ErrSamePassword)
		return
	}

	// Search user
	user, err := h.repo.FindByAccount(a.Account)
	if err != nil {
		config.ErrorInternalServerError(c, err)
		return
	}
	if user == nil {
		config.ErrorUnauthorized(c, config.ErrUnauthorized)
		return
	}

	// Check password matching from user has password
	if err := h.repo.MatchPassword(user.Password, a.Password); err != nil {
		logrus.Error(err)
		config.ErrorUnauthorized(c, config.ErrUnauthorized)
		return
	}

	// Enable account with update password
	user.IsEnable = true
	if err := h.repo.UpdatePassword(user, a.NewPassword); err != nil {
		config.ErrorInternalServerError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}

// Identity is get authenticated user
// @Summary Return authenticated user
// @Tags Authenticate
// @Security ApiKeyAuth
// @Produce json
// @Success 200 {object} entity.User
// @Failure 401 {object} entity.Error
// @Failure 404 {object} entity.Error
// @Failure 405 {object} entity.Error
// @Router /v1/me [get]
func (h *userHandler) Identity(c *gin.Context) {
	identity, _ := c.Get(config.IdentityKey)
	user := *identity.(*entity.User)

	c.JSON(http.StatusOK, user)
}
