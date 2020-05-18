class Competition < BaseModel
  table do
    column name : String
    has_many competition_accesses : CompetitionAccess
    has_many comp_delegates : User, through: :competition_accesses # , foreign_key: :comp_delegate_id
    has_many scramblers : User
    has_many scrambles : Scramble
  end
end
