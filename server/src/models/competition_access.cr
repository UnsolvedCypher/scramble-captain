class CompetitionAccess < BaseModel
  table do
    belongs_to comp_delegate : User
    belongs_to competition : Competition
  end
end
