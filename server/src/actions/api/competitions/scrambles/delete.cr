class Api::Competitions::Scrambles::Delete < ApiAction
  nested_route do
    Api::Auth::RequireCompetitionAdmin.validate(competition_id)
    ScrambleQuery
      .new
      .id(scramble_id)
      .first
      .delete
    FileUtils.rm "assets/scrambles/#{scramble_id}"
    head HTTP::Status::OK
  end
end
