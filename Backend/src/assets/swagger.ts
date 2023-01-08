import {ConfigFactory} from '../factories/configFactory';

export const Swagger = {
    "openapi": "3.0.3",
    "info": {
        "title": "VIA - Image Generator",
        "description": "Cílem projektu je vytvořit aplikaci, kde bude moc uživatel zadat základní údaje a aplikace mu vygeneruje obrázek podle údajů.",
        "version": ConfigFactory.getConfig().version
    },
    "servers": [
        {
            "url": "https://via-image-generator.onrender.com"
        }
    ],
    "paths": {
        "/": {
            "get": {
                "summary": "index",
                "description": "Host frontend files.",
                "operationId": "hostIndex",
                "responses": {
                    "default": {
                        "description": "Default error sample response"
                    }
                },
                "tags": [
                    "Base controller"
                ]
            }
        },
        "/health-check": {
            "get": {
                "summary": "Healt check",
                "description": "",
                "operationId": "",
                "responses": {
                    "200": {
                        "description": "If server is running correct"
                    },
                    "500": {
                        "description": "If server is down or not connected to DB"
                    }
                },
                "tags": [
                    "Base controller"
                ]
            }
        },
        "/auth/login": {
            "post": {
                "summary": "Login",
                "description": "Log in user",
                "operationId": "login",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/loginAuth"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "$ref": "#/components/responses/authorizationToken"
                    },
                    "400": {
                        "description": "Some error with log in"
                    },
                    "500": {
                        "$ref": "#/components/responses/ServerError"
                    }
                },
                "tags": [
                    "Auth"
                ]
            }
        },
        "/auth/register": {
            "post": {
                "summary": "Register",
                "description": "Register new user",
                "operationId": "register",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/registerAuth"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User is succesfuly registered"
                    },
                    "400": {
                        "description": "Some error with register"
                    },
                    "500": {
                        "$ref": "#/components/responses/ServerError"
                    }
                },
                "tags": [
                    "Auth"
                ]
            }
        },
        "/user": {
            "put": {
                "summary": "Update user",
                "description": "Updating nickname and password of existing user",
                "operationId": "updateUser",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "$ref": "#/components/responses/authorizationToken"
                    },
                    "400": {
                        "description": "Some error with updating user"
                    },
                    "401": {
                        "$ref": "#/components/responses/UnauthorizedError"
                    },
                    "500": {
                        "$ref": "#/components/responses/ServerError"
                    }
                },
                "tags": [
                    "User"
                ]
            }
        },
        "/image": {
            "get": {
                "summary": "Get user images",
                "description": "Get all images of user",
                "operationId": "getUserImages",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Return all images user"
                    },
                    "400": {
                        "description": "Some error with getting images"
                    },
                    "401": {
                        "$ref": "#/components/responses/UnauthorizedError"
                    },
                    "500": {
                        "$ref": "#/components/responses/ServerError"
                    }
                },
                "tags": [
                    "Image"
                ]
            }
        },
        "/image/all": {
            "get": {
                "summary": "Get all images",
                "description": "Get all images",
                "operationId": "getAllImages",
                "responses": {
                    "200": {
                        "description": "Return all images"
                    },
                    "400": {
                        "description": "Some error with getting images"
                    },
                    "500": {
                        "$ref": "#/components/responses/ServerError"
                    }
                },
                "tags": [
                    "Image"
                ]
            }
        },
        "/image/count": {
            "get": {
                "summary": "Get images count",
                "description": "Get count of all user images",
                "operationId": "getImageCount",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Return images count"
                    },
                    "400": {
                        "description": "Some error with getting count"
                    },
                    "401": {
                        "$ref": "#/components/responses/UnauthorizedError"
                    },
                    "500": {
                        "$ref": "#/components/responses/ServerError"
                    }
                },
                "tags": [
                    "Image"
                ]
            }
        },
        "/image/generate": {
            "post": {
                "summary": "Generate image",
                "description": "Generatin image based on prompt",
                "operationId": "generateImage",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Return generated image"
                    },
                    "400": {
                        "description": "Some error with generating image"
                    },
                    "401": {
                        "$ref": "#/components/responses/UnauthorizedError"
                    },
                    "500": {
                        "$ref": "#/components/responses/ServerError"
                    }
                },
                "tags": [
                    "Image"
                ]
            }
        },
        "/image/rating/{imageId}": {
            "post": {
                "summary": "Add rating to image",
                "description": "Add rating to image",
                "operationId": "addRating",
                "parameters": [
                    {
                        "name": "imageId",
                        "in": "path",
                        "description": "Image ID",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64"
                        }
                    }
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Adding rating was sucessfull"
                    },
                    "400": {
                        "description": "Some error with adding rating"
                    },
                    "401": {
                        "$ref": "#/components/responses/UnauthorizedError"
                    },
                    "500": {
                        "$ref": "#/components/responses/ServerError"
                    }
                },
                "tags": [
                    "Image"
                ]
            }
        },
        "/image/{imageId}": {
            "delete": {
                "summary": "Delete image",
                "description": "Deleting image by image ID",
                "operationId": "deleteImage",
                "parameters": [
                    {
                        "name": "imageId",
                        "in": "path",
                        "description": "Image ID",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int64"
                        }
                    }
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Deleting image was sucessfull"
                    },
                    "400": {
                        "description": "Some error with deleting image"
                    },
                    "401": {
                        "$ref": "#/components/responses/UnauthorizedError"
                    },
                    "500": {
                        "$ref": "#/components/responses/ServerError"
                    }
                },
                "tags": [
                    "Image"
                ]
            }
        }
    },
    "components": {
        "securitySchemes": {
            "bearerAuth": {
                "type": "apiKey",
                "in": "header",
                "name": "Authorization",
                "description": "Please insert: \"Bearer <API_KEY>\""
            }
        },
        "schemas": {
            "loginAuth": {
                "type": "object",
                "required": [
                    "email",
                    "password"
                ],
                "properties": {
                    "email": {
                        "type": "string"
                    },
                    "password": {
                        "type": "string"
                    }
                }
            },
            "registerAuth": {
                "type": "object",
                "required": [
                    "email",
                    "password",
                    "nickname"
                ],
                "properties": {
                    "email": {
                        "type": "string"
                    },
                    "nickname": {
                        "type": "string"
                    },
                    "password": {
                        "type": "string"
                    }
                }
            }
        },
        "responses": {
            "authorizationToken": {
                "description": "User is succesfuly loged in",
                "content": {
                    "application/json": {
                        "examples": {
                            "Authentication token": {
                                "value": "{\n \"token\": \"jwt_token\"\n}"
                            }
                        }
                    }
                }
            },
            "UnauthorizedError": {
                "description": "Wrong authorization token!",
                "content": {
                    "application/json": {
                        "examples": {
                            "Authentication token": {
                                "value": "{\n  \"message\": \"Wrong authorization token!\"\n}"
                            }
                        }
                    }
                }
            },
            "ServerError": {
                "description": "Server Error"
            }
        }
    }
}