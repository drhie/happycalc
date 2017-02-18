class Area < ApplicationRecord
  after_initialize :ensure_defaults

  def ensure_defaults
    self.importance ||= 5
    self.satisfaction ||= 5
  end

end
