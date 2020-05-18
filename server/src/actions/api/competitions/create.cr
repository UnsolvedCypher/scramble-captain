class Api::Competitions::Create < ApiAction
  route do
    competition = SaveCompetition.create!(params)
    competition_access = SaveCompetitionAccess.create!(competition_id: competition.id, comp_delegate_id: current_user.id)
    head HTTP::Status::CREATED
  end
end
