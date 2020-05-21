class Api::Competitions::Show < ApiAction
  route do
    Api::Auth::RequireCompetitionAdmin.validate(competition_id)

    # Any scramble opens that haven't been touched in 15 seconds are likely closed,
    # we remove them
    ScrambleOpenQuery
      .new
      .updated_at.lt(15.seconds.ago)
      .delete

    competition = CompetitionQuery
      .new
      .preload_comp_delegates
      .preload_scramblers(UserQuery.new.preload_open_scrambles)
      .preload_scrambles(ScrambleQuery.new.preload_scramblers)
      .id(competition_id)
      .first
    json CompetitionSerializer.new competition
  end
end
