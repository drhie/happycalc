require 'test_helper'

class AreasControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get areas_index_url
    assert_response :success
  end

  test "should get new" do
    get areas_new_url
    assert_response :success
  end

  test "should get create" do
    get areas_create_url
    assert_response :success
  end

  test "should get show" do
    get areas_show_url
    assert_response :success
  end

end
