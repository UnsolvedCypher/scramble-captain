class Api::Competitions::Scramblers::Delete < ApiAction
  nested_route do
    Api::Auth::RequireCompetitionAdmin.validate(competition_id)
    user = UserQuery.new
      .id(scrambler_id)
      .competition_id(competition_id)
      .first
      .delete
    head HTTP::Status::OK
  end
end
