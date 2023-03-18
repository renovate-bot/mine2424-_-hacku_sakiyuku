package server

import (
	"net/http"
	"sakiyuku_backend/app/application_service"
	"sakiyuku_backend/app/domain/repository"

	"github.com/gin-gonic/gin"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func NewRouter(debug bool) *gin.Engine {

	// Repository
	ur := repository.NewUserRepository()
	stur := repository.NewStudentRepository()

	// Handler
	sh := NewStateHandler()
	uh := application_service.NewUserHandler(ur)
	stuh := application_service.NewStudentHandler(&stur)

	// Initialize application
	r := gin.Default()
	// r.HandleMethodNotAllowed = true

	r.Use(Cros())

	// Routing
	// Root
	r.GET("/", sh.Get)
	// Not Found
	r.NoRoute(sh.NoRoute)
	// Method Not Allowed
	r.NoMethod(sh.NoMethod)
	// Application
	v1 := r.Group("v1")
	{
		v1.GET("/", sh.Get)
		v1.POST("/users", uh.Register)
		v1.GET("/student", stuh.FindAll)
		v1.POST("/student/create", stuh.Register)
		v1.GET("/student/get_by_email", stuh.FindByStudentEmail)
		v1.POST("/activate", uh.Activate)
	}

	// show swagger ui to /swagger/index.html
	if debug {
		r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}

	r.Run()

	return r
}

func Cros() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}
