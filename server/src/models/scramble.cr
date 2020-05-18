class Scramble < BaseModel
  table do
    has_many scramble_accesses : ScrambleAccess
    has_many scramblers : User, through: :scramble_accesses
    belongs_to competition : Competition
    column name : String
  end
end
