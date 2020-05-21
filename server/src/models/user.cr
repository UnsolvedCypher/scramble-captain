class User < BaseModel
  include Authentic::PasswordAuthenticatable

  table do
    column email : String?
    column name : String
    column encrypted_password : String
    belongs_to latest_permitted_scramble : Scramble?                                         # the most recent scramble that has been opened to the user
    has_many scramble_opens : ScrambleOpen, foreign_key: :scrambler_id                       # hi
    has_many open_scrambles : Scramble, through: :scramble_opens, foreign_key: :scrambler_id # scrambles that are currently opened by the user
    belongs_to competition : Competition?                                                    # a non-Delegate user will be created under a competition
    has_many scramble_accesses : ScrambleAccess, foreign_key: :scrambler_id
    has_many permitted_scrambles : Scramble, through: :scramble_accesses, foreign_key: :scrambler_id
    has_many competition_accesses : CompetitionAccess, foreign_key: :comp_delegate_id
    has_many competitions : Competition, through: :competition_accesses, foreign_key: :comp_delegate_id
  end
end
