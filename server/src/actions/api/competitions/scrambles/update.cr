class Api::Competitions::Scrambles::Update < ApiAction
  nested_route do
    Api::Auth::RequireCompetitionAdmin.validate(competition_id)

    scramble = ScrambleQuery
      .new
      .preload_scramblers
      .preload_scramble_accesses
      .id(scramble_id)
      .first

    params.from_json["open"]?.try do |open_scrambles|
      open_scrambles.as_a.each do |scrambler_id|
        unless scramble.scramblers.any? { |id| id == scrambler_id }
          SaveScrambleAccess.create!(scrambler_id: scrambler_id.as_i64,
            scramble_id: scramble_id.to_i64)
        end
      end
    end

    params.from_json["close"]?.try do |close_scrambles|
      scrambler_ids_to_remove = close_scrambles.as_a
      scramble.scramble_accesses.each do |access|
        if scrambler_ids_to_remove.includes? access.scrambler_id
          access.delete
        end
      end
    end

    json ScrambleSerializer.new(scramble)
  end
end
