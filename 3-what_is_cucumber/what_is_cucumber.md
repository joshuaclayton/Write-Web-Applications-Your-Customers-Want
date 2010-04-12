!SLIDE
# So, what exactly is Cucumber?

!SLIDE bullets incremental
# Cucumber...
* Allows programmers to describe the behavior of an application in a straightforward way

!SLIDE bullets incremental
# Features + Scenarios
* Acceptance tests
* Readable by customers
* Test full application integration (usually)
* Written in Gherkin, a business-readable DSL

!SLIDE
# Want a teaser?

!SLIDE small
    Feature: CSS generation using Less
      In order to ensure I've written proper CSS syntax
      As a developer
      I should be able to generate CSS with the More plugin

      Scenario: Generate CSS via the rake task
        When I run the command "rake more:generate"
        Then the exit status should be 0
