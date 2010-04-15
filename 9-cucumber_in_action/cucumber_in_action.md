!SLIDE center
# Cucumber in Action
![Programming kitteh](kitteh.jpg)

!SLIDE bullets incremental
# Basic directory structure
* Feature files
* Step definitions
* Support files (helpers, environment)

!SLIDE code
    |~features/
    | |-web_steps.rb
    | `-html_steps.rb
    |~support/
    | |-env.rb
    | `-paths.rb
    |-less_css.feature
    |-user.feature
    `-todos.feature

!SLIDE bullets incremental
# What's in a *.feature
* Feature name and description
* Background (optional)
* Scenarios / scenario outlines

!SLIDE smaller
# Feature
    Feature: [Topic]
      In order to [goal]
      As a [user role]
      I should be able to [action]

!SLIDE smaller
# Feature
    Feature: Todos
      In order to manage things I need to do
      As a user
      I should be able to create, edit, find, and delete my todos

!SLIDE smaller
# Background
    Background:
      Given the following todos exist:
        | title     | tags          | owner            | completed |
        | active    | one,two,three | test@example.com |           |
        | completed | three,four    | test@example.com | yesterday |
      And I am logged in as "test@example.com"

!SLIDE smaller
# Scenario
    Scenario: Active tags
      When I go to the homepage
      Then I should see the active tags:
        | one   |
        | two   |
        | three |
      And I should not see the active tags:
        | four |
      When I complete the todo "active"
      And I go to the homepage
      Then I should not see any active tags

!SLIDE smaller
# Scenario Outline
    Scenario Outline: Create an invalid todo
      When I go to the new todo page
      And I fill in "<field>" with "<invalid value>"
      And I press "Create"
      Then I should see error messages
      When I fill in "<field>" with "<valid value>"
      And I press "Create"
      Then I should be on the homepage
      And I should see "created"
    Examples:
      | field | invalid value | valid value |
      | Title |               | My new todo |

!SLIDE bullets
# Step Definitions
* _Given_ - puts the system in a known state
* _When_ - describes the action
* _Then_ - observes outcomes

!SLIDE smaller
# Given
    @@@ ruby
    Given %{I have a todo titled "$title"} do |title|
      Factory :todo, :title => title,
              :owner => controller.current_user
    end

!SLIDE smaller
# When
    @@@ ruby
    When %{I complete $todo} do |todo|
      todo.update_attributes :completed_on => Date.today
    end

!SLIDE smaller
# Then
    @@@ ruby
    Then %{$todo should be complete} do |todo|
      todo.should be_complete
    end

!SLIDE smaller
# Steps can be composed of strings or regular expressions
    @@@ ruby
    Then /^I should( not)? see the active tags:$/ do |not_see, table|
      tag_options = {}
      tag_options[:count] = 0 if not_see.present?
      table.raw.each do |row|
        response.should have_tag(".active-tags li",
                        tag_options.merge(:text => row.first))
      end
    end

    Then "I should see error messages" do
      response_body.should contain(/errors? prohibited/m)
    end

!SLIDE smaller
# Steps can take multi-line strings as arguments
    @@@ ruby
    # xml_steps.rb
    When %{I POST the following XML to $url:} do |url, body|
      send(:post, url, body, {"CONTENT_TYPE" => "text/xml"})
    end

    # todos.feature
    When I POST the following XML to /todos.xml:
      """
      <?xml version="1.0"?>
      <todo>
        <title>A great todo</title>
      </todo>
      """

!SLIDE smaller
# Steps can also take tables (we've seen them before)
    Scenario Outline: Create an invalid todo
      When I go to the new todo page
      And I fill in "<field>" with "<invalid value>"
      And I press "Create"
      Then I should see error messages
      When I fill in "<field>" with "<valid value>"
      And I press "Create"
      Then I should be on the homepage
      And I should see "created"
    Examples:
      | field | invalid value | valid value |
      | Title |               | My new todo |

!SLIDE smaller
# Steps using Webrat's locators
    @@@ ruby
    When /^(?:|I )press "([^\"]*)"$/ do |button|
      click_button(button)
    end

    When /^(?:|I )follow "([^\"]*)"$/ do |link|
      click_link(link)
    end

    When /^(?:|I )follow "([^\"]*)" within "([^\"]*)"$/ do |link, parent|
      click_link_within(parent, link)
    end

    When /^(?:|I )fill in "([^\"]*)" with "([^\"]*)"$/ do |field, value|
      fill_in(field, :with => value)
    end

!SLIDE bullets incremental
# Webrat steps
* You _could_ write 90% of your scenarios with Webrat steps
* DON'T!!!
* You want to keep your features and steps DRY

!SLIDE smaller
# From this
    When I fill in "Title" with "Deposit my check"
    And I fill in "Tags" with "bank, errand"
    And I fill in "Due" with "tomorrow"

!SLIDE smaller
# To this
    @@@ ruby
    When %{I fill in the todo form with valid details} do
      When %{I fill in "Title" with "Deposit my check"}
      When %{I fill in "Tags" with "bank, errand"}
      When %{I fill in "Due" with "tomorrow"}
    end

!SLIDE
# Factory Girl provides Cucumber steps

    @@@ ruby
    # in features/support/env.rb
    require 'factory_girl/step_definitions'

!SLIDE smaller
# Factory Girl Steps
    Given a todo exists

    Given 2 todos exist

    Given a todo exists with a title of "This is fun!"

    Given 2 todos exist with an owner of "jclayton@thougtbot.com"

    Given the following todos exist:
      | title          | owner                   |
      | Learn Cucumber | jclayton@thoughtbot.com |
      | Learn Webrat   | jclayton@thoughtbot.com |

!SLIDE
# Factory Girl awesomeness
    Given the following todos exist:
      | title          | user                  |
      | Learn Cucumber | email: me@example.com |
      | Learn Webrat   | email: me@example.com |
