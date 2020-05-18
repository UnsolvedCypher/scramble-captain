class Api::Competitions::Index < ApiAction
  route do
    json UserQuery
      .new
      .preload_competitions
      .id(current_user.id)
      .first
      .competitions
      .map { |c| {id: c.id, name: c.name} }
  end
end
