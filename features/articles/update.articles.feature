Feature: As the author I can edit blog articles

  Scenario: As the author I can edit an article, and its publication date stays the same
    Given I use seed data
    And I use admin token
    When I send a "PUT" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """
      {
        "title": "Hello again, world",
        "content": "This article has been edited."
      }
      """
    Then the response status should be 200
    And the response body should contain:
      """
      {
        "id": "5e1f0a2b-0001-4000-8000-000000000001",
        "title": "Hello again, world",
        "content": "This article has been edited.",
        "publishedAt": "2026-09-01T08:00:00.000Z",
        "createdAt": "@date('within 1 minute from now')",
        "updatedAt": "@date('within 1 minute from now')"
      }
      """
    When I send a "GET" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001"
    Then the response status should be 200
    And the response body should contain:
      """
      {
        "id": "5e1f0a2b-0001-4000-8000-000000000001",
        "title": "Hello again, world",
        "content": "This article has been edited.",
        "publishedAt": "2026-09-01T08:00:00.000Z",
        "createdAt": "@date('within 1 minute from now')",
        "updatedAt": "@date('within 1 minute from now')"
      }
      """

  Scenario: As the author I cannot edit an article with too short a title and content
    Given I use admin token
    When I send a "PUT" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
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

  Scenario Outline: As the author I cannot edit an article with the field <field>, because the server owns it or does not know it
    Given I use admin token
    When I send a "PUT" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """
      {
        "title": "Hello again, world",
        "content": "This article has been edited.",
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

  Scenario: As the author I cannot edit an article that does not exist
    Given I use admin token
    When I send a "PUT" request to "/api/v1/articles/5e1f0a2b-0009-4000-8000-000000000009" with body:
      """
      {
        "title": "Hello again, world",
        "content": "This article has been edited."
      }
      """
    Then the response status should be 404
    And the response body should contain:
      """
      {
        "statusCode": 404,
        "error": "Not Found",
        "message": "Article with given id does not exist."
      }
      """

  Scenario: As the author I cannot edit an article with an invalid ID
    Given I use admin token
    When I send a "PUT" request to "/api/v1/articles/not-a-uuid" with body:
      """
      {
        "title": "Hello again, world",
        "content": "This article has been edited."
      }
      """
    Then the response status should be 400
    And the response body should contain:
      """
      {
        "statusCode": 400,
        "error": "Bad Request",
        "message": "Validation failed (uuid v 4 is expected)"
      }
      """

  Scenario: As a stranger I cannot edit an article without a token
    Given I use no token
    When I send a "PUT" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """
      {
        "title": "Hello again, world",
        "content": "This article has been edited."
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

  Scenario: As a stranger I cannot edit an article with a wrong token
    Given I use a wrong token
    When I send a "PUT" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """
      {
        "title": "Hello again, world",
        "content": "This article has been edited."
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

  Scenario: As a stranger I learn nothing about the rules when I send an invalid ID and invalid data without a token
    Given I use no token
    When I send a "PUT" request to "/api/v1/articles/not-a-uuid" with body:
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
