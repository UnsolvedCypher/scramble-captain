class CompetitionSerializer < BaseSerializer
  def initialize(@competition : Competition)
  end

  def render
    {
      id:         @competition.id,
      name:       @competition.name,
      delegates:  @competition.comp_delegates.map { |d| {id: d.id, name: d.name} }.to_a,
      scramblers: @competition.scramblers.map { |s| {
        id:      s.id,
        name:    s.name,
        viewing: s.open_scrambles.map(&.name).to_a,
      } }.to_a,
      scrambles: @competition.scrambles.map { |s| ScrambleSerializer.new(s).render }.to_a,
    }
  end
end
