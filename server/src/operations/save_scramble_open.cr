class SaveScrambleOpen < ScrambleOpen::SaveOperation
  permit_columns scramble_id, scrambler_id
end
