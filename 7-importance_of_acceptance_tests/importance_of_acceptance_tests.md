!SLIDE bullets incremental
# Why are acceptance tests important?
* They test behavior from an interaction standpoint
* Easier to locate flaws during the process of completing a scenario
* Controller and model tests aren't written to cover everything

!SLIDE bullets incremental
# Acceptance tests > View + Controller + Model tests
* SERIOUSLY

!SLIDE code smaller
    @@@ ruby
    context "A user" do
      setup do
        @user     = Factory(:user)
        @password = @user.password
      end

      should "authenticate with good credentials" do
        assert ::User.authenticate(@user.email, @password)
        assert @user.authenticated?(@password)
      end

      should "not authenticate with bad credentials" do
        assert ! ::User.authenticate(@user.email, 'bad_password')
        assert ! @user.authenticated?('bad_password')
      end
    end

!SLIDE bullets incremental
# Don't get me wrong...
## I'm not against unit testing
## I'm saying that a bunch of unit tests won't test application behavior

!SLIDE bullets incremental
# Web applications != code libraries
* Without testing behavior, you're not _really_ testing the application
* It's pretty well known among developers that "100% test coverage" doesn't mean shit
* JUST model and controller tests don't mean shit either

!SLIDE bullets
# Behavior is king
* Real-world (&lt; 2 weeks ago) example of a behavior issue

!SLIDE
> i posted the item as [primary email address]@gmail.com, got the email from you to that address. When I clicked on it, I was already logged in with my other test account. The message displayed and I was able to respond even though I was logged into the wrong account. Then when you replied, it sent email to [secondary email address]@gmail.com.. who was not selling the item in the first place

!SLIDE code smaller
    Scenario: User responds as another user
      Given the following users exist:
        | name                     | email                |
        | Josh (Primary account)   | primary@person.com   |
        | Josh (Secondary account) | secondary@person.com |
        | John                     | john@person.com      |
      Given the following post exists:
        | title    | user                      |
        | backpack | email: primary@person.com |
      And the user "john@person.com" responds to the "backpack" post with "hi"
      And I have signed in with "secondary@person.com/password"
      When I follow the message respond link
      Then I should not see "hi"
      When I fill in "message_body" with "This is my response"
      And I press "Submit"
      Then "primary@person.com" should receive a contact email with "This is my response"
      When I sign out
      And I sign in as "john@person.com/password"
      And I follow the message respond link
      Then I should see "hi"
      And I fill in "message_body" with "This is for primary again"
      And I press "Submit"
      Then "primary@person.com" should receive a contact email with "This is for primary again"

!SLIDE center
# Put that in your pipe and smoke it
![Pipe](pipe.jpg)

!SLIDE bullets incremental
# Augmentation
* Cucumber should augment your test suite
* Model and controller tests are the "in" of outside-in development
* I rarely write controller tests if they're RESTful
