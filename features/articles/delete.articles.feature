Feature: As the author I can delete blog articles

  Scenario: As the author I can delete an article, and then nobody can read it
    Given I use seed data
    And I use admin token
    When I send a "DELETE" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001"
    Then the response status should be 204
    When I send a "GET" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001"
    Then the response status should be 404
    And the response body should contain:
      """
      {
        "statusCode": 404,
        "error": "Not Found",
        "message": "Article with given id does not exist."
      }
      """

  Scenario: As the author I cannot delete an article that does not exist
    Given I use admin token
    When I send a "DELETE" request to "/api/v1/articles/5e1f0a2b-0009-4000-8000-000000000009"
    Then the response status should be 404
    And the response body should contain:
      """
      {
        "statusCode": 404,
        "error": "Not Found",
        "message": "Article with given id does not exist."
      }
      """

  Scenario: As the author I cannot delete an article with an invalid ID
    Given I use admin token
    When I send a "DELETE" request to "/api/v1/articles/not-a-uuid"
    Then the response status should be 400
    And the response body should contain:
      """
      {
        "statusCode": 400,
        "error": "Bad Request",
        "message": "Validation failed (uuid v 4 is expected)"
      }
      """

  Scenario: As a stranger I cannot delete an article without a token
    Given I use no token
    When I send a "DELETE" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001"
    Then the response status should be 401
    And the response body should contain:
      """
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      """

  Scenario: As a stranger I cannot delete an article with a wrong token
    Given I use a wrong token
    When I send a "DELETE" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001"
    Then the response status should be 403
    And the response body should contain:
      """
      {
        "statusCode": 403,
        "error": "Forbidden",
        "message": "Forbidden resource"
      }
      """

  Scenario: As a stranger I learn nothing about the rules when I send an invalid ID without a token
    Given I use no token
    When I send a "DELETE" request to "/api/v1/articles/not-a-uuid"
    Then the response status should be 401
    And the response body should contain:
      """
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      """
