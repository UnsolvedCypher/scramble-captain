class MakeUserEmailOptional::V20200518033636 < Avram::Migrator::Migration::V1
  def migrate
    make_optional :users, :email
  end

  def rollback
    # drop table_for(Thing)
  end
end
