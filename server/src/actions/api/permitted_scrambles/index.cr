class Api::PermittedScrambles::Index < ApiAction
  route do
    scrambles = UserQuery
      .new
      .preload_permitted_scrambles
      .id(current_user.id)
      .first
      .permitted_scrambles
      .map { |s| {id: s.id, name: s.name} }
      .to_a
    json({permittedScrambles: scrambles, competitionId: current_user.competition_id})
  end
end
