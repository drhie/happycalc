class Area < ApplicationRecord
  # after_initialize :ensure_defaults
  validates :name, :importance, :satisfaction, presence: true
  validates :importance, inclusion: {in: 1..10}
  # validates_uniqueness_of :name

  # def ensure_defaults
  #   self.importance ||= 5
  #   self.satisfaction ||= 5
  # end

end
