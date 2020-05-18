class Api::Competitions::Scrambles::Show < ApiAction
  nested_route do
    Api::Auth::RequireScrambleAccess.validate(competition_id, scramble_id)
    file "assets/scrambles/#{scramble_id}", "application/pdf", "inline"
  end
end
