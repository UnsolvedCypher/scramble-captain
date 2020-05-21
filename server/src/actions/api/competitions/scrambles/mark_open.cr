class Api::Competitions::Scrambles::MarkOpen < ApiAction
  post "/api/competitions/:competition_id/scrambles/:scramble_id/mark_open" do
    existing_open_scramble = ScrambleOpenQuery
      .new
      .scrambler_id(current_user.id)
      .scramble_id(scramble_id.to_i64)
      .first?

    if existing_open_scramble.nil?
      SaveScrambleOpen.create!(scrambler_id: current_user.id, scramble_id: scramble_id.to_i64)
    else
      SaveScrambleOpen.update!(existing_open_scramble, updated_at: Time.utc)
    end

    head HTTP::Status::OK
  end
end
