class Api::Competitions::Scramblers::Create < ApiAction
  def generate_password
    allowed_chars = "abcdefghijklmnopqrstuvwxyz1234567890"
    password_length = 15
    password = ""
    password_length.times do
      password += allowed_chars[Random::Secure.rand (0...allowed_chars.size)]
    end
    return password
  end

  nested_route do
    Api::Auth::RequireCompetitionAdmin.validate(competition_id)
    password = generate_password
    user = SignUpUser.create!(name: params.from_json["name"].as_s, password: password, password_confirmation: password, competition_id: competition_id.to_i64)
    json({id: user.id, password: password})
  end
end
