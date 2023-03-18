package config

import (
	"errors"
	"net/http"
	"reflect"
	"sakiyuku_backend/app/domain/entity"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

const (
	// TokenKey is authenticated token key
	TokenKey = "authenticated-token"
)

var (
	ErrExistsAccount = errors.New("account is already exists")
	// アカウント登録周り実装する時に使用する
	// ErrInvalidAccount     = errors.New("account is invalid")
	// ErrMustChangePassword = errors.New("password must be changed")
	ErrSamePassword     = errors.New("not allowed changing to same password")
	ErrUnauthorized     = errors.New("authorization failed")
	ErrValidationFailed = errors.New("validation failed")
)

// Return bad request response.
func ErrorBadRequest(c *gin.Context, message any) {
	errorJSON(c, entity.Error{
		Code:    http.StatusBadRequest,
		Message: message,
		Error:   nil,
	})
}

// Return unauthorized response.
func ErrorUnauthorized(c *gin.Context, message any) {
	errorJSON(c, entity.Error{
		Code:    http.StatusUnauthorized,
		Message: message,
		Error:   nil,
	})
}

// Return internal server error response.
func ErrorInternalServerError(c *gin.Context, err error) {
	logrus.Errorf("error: %s", err)
	errorJSON(c, entity.Error{
		Code:    http.StatusInternalServerError,
		Message: "",
		Error:   err,
	})
}

// Outputting error with JSON format
func errorJSON(c *gin.Context, err entity.Error) {
	var header string
	switch err.Code {
	case http.StatusBadRequest:
		header = "error=\"invalid_request\""
	case http.StatusUnauthorized:
		header = "error=\"invalid_token\""
	}
	if header != "" && c.GetString(TokenKey) != "" {
		c.Writer.Header().Set("WWW-Authenticate", "Bearer "+header)
	}
	if err.Message == "" {
		err.Message = http.StatusText(err.Code)
	} else {
		et := reflect.TypeOf(err.Message)
		if et.Implements(reflect.TypeOf((*error)(nil)).Elem()) {
			err.Message = err.Message.(error).Error()
		}
	}
	c.AbortWithStatusJSON(err.Code, err)
}
