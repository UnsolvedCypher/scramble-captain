class InitialModels::V20200517195929 < Avram::Migrator::Migration::V1
  def migrate
    create table_for(Competition) do
      primary_key id : Int64
      add_timestamps
      add name : String
    end

    create table_for(Scramble) do
      primary_key id : Int64
      add_timestamps
      add name : String
      add_belongs_to competition : Competition, on_delete: :cascade
    end

    create table_for(CompetitionAccess) do
      primary_key id : Int64
      add_timestamps
      add_belongs_to competition : Competition, on_delete: :cascade
      add_belongs_to comp_delegate : User, on_delete: :cascade
    end

    create table_for(ScrambleAccess) do
      primary_key id : Int64
      add_timestamps
      add_belongs_to scramble : Scramble, on_delete: :cascade
      add_belongs_to scrambler : User, on_delete: :cascade
    end

    create table_for(ScrambleOpen) do
      primary_key id : Int64
      add_timestamps
      add_belongs_to scrambler : User, on_delete: :cascade
      add_belongs_to scramble : Scramble, on_delete: :cascade
    end

    alter table_for(User) do
      add_belongs_to latest_permitted_scramble : Scramble?, on_delete: :cascade
      add_belongs_to competition : Competition?, on_delete: :cascade
      add name : String, fill_existing_with: :nothing
    end
  end

  def rollback
    alter table_for(User) do
      remove :latest_permitted_scramble_id
      remove :competition_id
      remove :name
    end
    drop table_for(ScrambleOpen)
    drop table_for(ScrambleAccess)
    drop table_for(CompetitionAccess)
    drop table_for(Scramble)
    drop table_for(Competition)
  end
end
