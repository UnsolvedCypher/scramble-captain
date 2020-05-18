class Api::Competitions::Scrambles::Create < ApiAction
  nested_route do
    Api::Auth::RequireCompetitionAdmin.validate(competition_id)
    scramble_file = params.get_file(:scramble_file)
    scramble = SaveScramble.create!(name: scramble_file.name.chomp(".pdf"), competition_id: competition_id.to_i64)
    FileUtils.cp scramble_file.path, "assets/scrambles/#{scramble.id}"
    head HTTP::Status::CREATED
  end
end
