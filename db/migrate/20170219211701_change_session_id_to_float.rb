class ChangeSessionIdToFloat < ActiveRecord::Migration[5.0]
  def change
    reversible do |dir|
      dir.up do
        change_column(:areas, :session_id, :float)
      end
      dir.down do
        change_column(:areas, :session_id, :integer)
      end
    end
  end
end
