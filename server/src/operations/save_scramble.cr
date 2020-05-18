class SaveScramble < Scramble::SaveOperation
  permit_columns name, competition_id
end
