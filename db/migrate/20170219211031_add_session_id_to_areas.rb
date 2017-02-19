class AddSessionIdToAreas < ActiveRecord::Migration[5.0]
  def change
    add_column(:areas, :session_id, :integer)
  end
end
