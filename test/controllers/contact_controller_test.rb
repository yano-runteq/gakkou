require "test_helper"

class ContactControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get contact_new_url
    assert_response :success
  end

  test "should get create" do
    get contact_create_url
    assert_response :success
  end

  test "should get check" do
    get contact_check_url
    assert_response :success
  end

  test "should get completed" do
    get contact_completed_url
    assert_response :success
  end
end
