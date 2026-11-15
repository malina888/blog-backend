Feature: As a visitor I can read a single blog article

  Scenario: As a visitor I can read an article that exists
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001"
    Then the response status should be 200
    And the response body should contain:
      """
      {
        "id": "5e1f0a2b-0001-4000-8000-000000000001",
        "title": "Hello, world",
        "content": "This is the first article on my blog.",
        "publishedAt": "2026-09-01T08:00:00.000Z",
        "createdAt": "@date('within 1 minute from now')",
        "updatedAt": "@date('within 1 minute from now')"
      }
      """

  Scenario: As a visitor I cannot read an article that does not exist
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles/5e1f0a2b-0009-4000-8000-000000000009"
    Then the response status should be 404
    And the response body should contain:
      """
      {
        "statusCode": 404,
        "error": "Not Found",
        "message": "Article with given id does not exist."
      }
      """

  Scenario: As a visitor I cannot read an article with an invalid ID
    When I send a "GET" request to "/api/v1/articles/not-a-uuid"
    Then the response status should be 400
    And the response body should contain:
      """
      {
        "statusCode": 400,
        "error": "Bad Request",
        "message": "Validation failed (uuid v 4 is expected)"
      }
      """
