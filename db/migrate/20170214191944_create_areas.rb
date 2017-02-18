class CreateAreas < ActiveRecord::Migration[5.0]
  def change
    create_table :areas do |t|
      t.string :name
      t.integer :importance
      t.integer :satisfaction

      t.timestamps
    end
  end
end
