Feature: As the author I can create blog articles

  Scenario: As the author I can create an article, and visitors see it in the list without a token
    Given I use seed data
    And I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """
      {
        "title": "My new article",
        "content": "Content of my new article."
      }
      """
    Then the response status should be 201
    And the response body should contain:
      """
      {
        "id": "@uuid",
        "title": "My new article",
        "content": "Content of my new article.",
        "publishedAt": "@date('within 1 minute from now')",
        "createdAt": "@date('within 1 minute from now')",
        "updatedAt": "@date('within 1 minute from now')"
      }
      """
    When I use no token
    And I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should list the "title" values in this order:
      """
      [
        "My new article",
        "What I learned about databases",
        "My first API endpoint",
        "Setting up a development environment",
        "Hello, world"
      ]
      """

  Scenario: As the author I cannot create an article with too short a title and content
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """
      {
        "title": "ab",
        "content": "Too short"
      }
      """
    Then the response status should be 400
    And the response body should contain:
      """
      {
        "statusCode": 400,
        "error": "Bad Request",
        "message": "Request validation failed.",
        "violations": {
          "title": ["title must be longer than or equal to 3 characters"],
          "content": ["content must be longer than or equal to 10 characters"]
        }
      }
      """

  Scenario: As the author I cannot create an article without a title and content
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """
      {}
      """
    Then the response status should be 400
    And the response body should contain:
      """
      {
        "statusCode": 400,
        "error": "Bad Request",
        "message": "Request validation failed.",
        "violations": {
          "title": [
            "title must be shorter than or equal to 120 characters",
            "title must be longer than or equal to 3 characters",
            "title must be a string"
          ],
          "content": [
            "content must be shorter than or equal to 50000 characters",
            "content must be longer than or equal to 10 characters",
            "content must be a string"
          ]
        }
      }
      """

  Scenario Outline: As the author I cannot create an article with the field <field>, because the server owns it or does not know it
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """
      {
        "title": "My new article",
        "content": "Content of my new article.",
        "<field>": <value>
      }
      """
    Then the response status should be 400
    And the response body should contain:
      """
      {
        "statusCode": 400,
        "error": "Bad Request",
        "message": "Request validation failed.",
        "violations": {
          "<field>": ["property <field> should not exist"]
        }
      }
      """

    Examples:
      | field       | value                                  |
      | id          | "5e1f0a2b-0009-4000-8000-000000000009" |
      | publishedAt | "2026-01-01T08:00:00.000Z"             |
      | createdAt   | "2026-01-01T08:00:00.000Z"             |
      | updatedAt   | "2026-01-01T08:00:00.000Z"             |
      | author      | "Maciej"                               |

  Scenario: As a stranger I cannot create an article without a token
    Given I use no token
    When I send a "POST" request to "/api/v1/articles" with body:
      """
      {
        "title": "My new article",
        "content": "Content of my new article."
      }
      """
    Then the response status should be 401
    And the response body should contain:
      """
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      """

  Scenario: As a stranger I cannot create an article with a wrong token
    Given I use a wrong token
    When I send a "POST" request to "/api/v1/articles" with body:
      """
      {
        "title": "My new article",
        "content": "Content of my new article."
      }
      """
    Then the response status should be 403
    And the response body should contain:
      """
      {
        "statusCode": 403,
        "error": "Forbidden",
        "message": "Forbidden resource"
      }
      """

  Scenario: As a stranger I learn nothing about the rules when I send invalid data without a token
    Given I use no token
    When I send a "POST" request to "/api/v1/articles" with body:
      """
      {
        "title": "ab",
        "id": "5e1f0a2b-0009-4000-8000-000000000009"
      }
      """
    Then the response status should be 401
    And the response body should contain:
      """
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      """
