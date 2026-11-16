Feature: As a visitor I can see the list of blog articles

  Scenario: As a visitor I can list all articles, newest first
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should contain:
      """
      [
        {
          "id": "5e1f0a2b-0003-4000-8000-000000000003",
          "title": "What I learned about databases",
          "content": "Tables, migrations and seed data explained simply.",
          "publishedAt": "2026-11-01T08:00:00.000Z",
          "createdAt": "@date('within 1 minute from now')",
          "updatedAt": "@date('within 1 minute from now')"
        },
        {
          "id": "5e1f0a2b-0004-4000-8000-000000000004",
          "title": "My first API endpoint",
          "content": "Building a read API with Nest.js and Prisma.",
          "publishedAt": "2026-11-01T08:00:00.000Z",
          "createdAt": "@date('within 1 minute from now')",
          "updatedAt": "@date('within 1 minute from now')"
        },
        {
          "id": "5e1f0a2b-0002-4000-8000-000000000002",
          "title": "Setting up a development environment",
          "content": "Docker, Node.js and a database running on my machine.",
          "publishedAt": "2026-10-01T08:00:00.000Z",
          "createdAt": "@date('within 1 minute from now')",
          "updatedAt": "@date('within 1 minute from now')"
        },
        {
          "id": "5e1f0a2b-0001-4000-8000-000000000001",
          "title": "Hello, world",
          "content": "This is the first article on my blog.",
          "publishedAt": "2026-09-01T08:00:00.000Z",
          "createdAt": "@date('within 1 minute from now')",
          "updatedAt": "@date('within 1 minute from now')"
        }
      ]
      """

  Scenario: As a visitor I always see articles published at the same moment in the same order
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should list the "id" values in this order:
      """
      [
        "5e1f0a2b-0003-4000-8000-000000000003",
        "5e1f0a2b-0004-4000-8000-000000000004",
        "5e1f0a2b-0002-4000-8000-000000000002",
        "5e1f0a2b-0001-4000-8000-000000000001"
      ]
      """
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should list the "id" values in this order:
      """
      [
        "5e1f0a2b-0003-4000-8000-000000000003",
        "5e1f0a2b-0004-4000-8000-000000000004",
        "5e1f0a2b-0002-4000-8000-000000000002",
        "5e1f0a2b-0001-4000-8000-000000000001"
      ]
      """

  Scenario: As a visitor I see an empty list when there are no articles
    Given there are no articles
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should contain:
      """
      []
      """

  Scenario: As a visitor I see every article only once after the app restarts several times
    Given I use seed data
    And the app has been restarted 3 times
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should list the "id" values in this order:
      """
      [
        "5e1f0a2b-0003-4000-8000-000000000003",
        "5e1f0a2b-0004-4000-8000-000000000004",
        "5e1f0a2b-0002-4000-8000-000000000002",
        "5e1f0a2b-0001-4000-8000-000000000001"
      ]
      """
