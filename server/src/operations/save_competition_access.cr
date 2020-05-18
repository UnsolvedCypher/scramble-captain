class SaveCompetitionAccess < CompetitionAccess::SaveOperation
  permit_columns competition_id, comp_delegate_id
end
