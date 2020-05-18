class SaveScrambleAccess < ScrambleAccess::SaveOperation
  permit_columns scramble_id, scrambler_id
end
