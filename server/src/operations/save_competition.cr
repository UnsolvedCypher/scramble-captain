class SaveCompetition < Competition::SaveOperation
  permit_columns name
end
