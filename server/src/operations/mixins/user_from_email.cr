module UserFromEmail
  private def user_from_email : User?
    email.value.try do |value|
      UserQuery.new.email(value).first? || UserQuery.new.id.nilable_eq(value.to_i?).first?
    end
  end
end
