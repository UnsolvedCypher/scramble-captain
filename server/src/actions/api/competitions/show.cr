class Api::Competitions::Show < ApiAction
  route do
    Api::Auth::RequireCompetitionAdmin.validate(competition_id)
    competition = CompetitionQuery
      .new
      .preload_comp_delegates
      .preload_scramblers
      .preload_scrambles
      .id(competition_id)
      .first
    json CompetitionSerializer.new competition
  end
end
