module Api::Auth::RequireScrambleAccess
  macro validate(competition_id, scramble_id)
    comp_access = CompetitionAccessQuery
      .new
      .comp_delegate_id(current_user.id)
      .competition_id(competition_id)
      .first?

    scramble_access = ScrambleAccessQuery
      .new
      .scrambler_id(current_user.id)
      .scramble_id(scramble_id)
      .first?

    if comp_access || scramble_access
      continue
    else
      return head HTTP::Status::FORBIDDEN
    end
  end
end
