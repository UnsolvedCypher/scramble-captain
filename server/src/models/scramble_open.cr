class ScrambleOpen < BaseModel
  table do
    belongs_to scrambler : User
    belongs_to scramble : Scramble
  end
end
