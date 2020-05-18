module Api::Auth::RequireCompetitionAdmin
  macro validate(competition_id)
    if CompetitionAccessQuery.new.comp_delegate_id(current_user.id).competition_id(competition_id).first?
      continue
    else
      return head HTTP::Status::FORBIDDEN
    end
  end
end
