class Api::Competitions::Scrambles::Create < ApiAction
  nested_route do
    Api::Auth::RequireCompetitionAdmin.validate(competition_id)
    puts "Params are: #{params.inspect}"
    params.get("numScrambles").to_i.times do |num|
      scramble_file = params.get_file("scramble-#{num}")
      scramble_name = scramble_file.metadata.filename.try(&.chomp(".pdf")) || "Scramble #{num}"
      scramble = SaveScramble.create!(name: scramble_name, competition_id: competition_id.to_i64)
      FileUtils.cp scramble_file.path, "assets/scrambles/#{scramble.id}"
    end
    head HTTP::Status::CREATED
  end
end
