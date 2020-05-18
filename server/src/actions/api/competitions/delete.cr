class Api::Competitions::Delete < ApiAction
  route do
    Api::Auth::RequireCompetitionAdmin.validate(competition_id)
    comp = CompetitionQuery.new
      .id(competition_id)
      .first
      .delete
    head HTTP::Status::OK
  end
end
