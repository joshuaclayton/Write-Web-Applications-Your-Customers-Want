!SLIDE bullets incremental
# What's it NOT good for?
* A _really_ fast test suite

!SLIDE bullets incremental
# Cucumber scenarios are integration tests
* No mocking/stubbing means data is persisted, images are processed, etc.
* But... tools like Testjour and Hydra exist to mitigate speed issues

!SLIDE bullets incremental
# It's not good for...
* Testing behavior that uses Javascript

!SLIDE bullets
# JUST KIDDING!
* Selenium (yuck)
* Env.js, Johnson, HolyGrail...

!SLIDE code smaller
    Scenario: Receive answer suggestions
      Given the question "How old are you?" has been answered with:
        | grandfather      |
        | great, grand     |
        | fifteen          |
      When I go to the members homepage
      And I start to fill in "answer" with "gr"
      Then I should see the following suggestions:
        | grandfather |
        | great       |
        | grand       |
