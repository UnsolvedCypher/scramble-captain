class Scramble < BaseModel
  table do
    has_many scramble_accesses : ScrambleAccess
    has_many scramblers : User, through: :scramble_accesses
    has_many scramble_opens : ScrambleOpen
    has_many viewers : User, through: :scramble_opens
    belongs_to competition : Competition
    column name : String
  end
end
